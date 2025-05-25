import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"
import type { Patient, CreatePatientInput, MedicalRecord } from "@/lib/models/Patient"

export class PatientService {
  private async getCollection() {
    const db = await getDatabase()
    return db.collection<Patient>("patients")
  }

  private generatePatientId(): string {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `P${timestamp}${random}`
  }

  async createPatient(patientData: CreatePatientInput, createdBy: ObjectId): Promise<Patient> {
    const collection = await this.getCollection()

    // التحقق من وجود المريض بنفس الهاتف أو الهوية
    const existingPatient = await collection.findOne({
      $or: [{ phone: patientData.phone }, ...(patientData.nationalId ? [{ nationalId: patientData.nationalId }] : [])],
    })

    if (existingPatient) {
      throw new Error("مريض موجود بنفس رقم الهاتف أو الهوية")
    }

    const newPatient: Patient = {
      ...patientData,
      patientId: this.generatePatientId(),
      allergies: patientData.allergies || [],
      chronicDiseases: patientData.chronicDiseases || [],
      currentMedications: [],
      medicalHistory: [],
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy,
    }

    const result = await collection.insertOne(newPatient)
    return { ...newPatient, _id: result.insertedId }
  }

  async getPatientById(id: string): Promise<Patient | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  async getPatientByPatientId(patientId: string): Promise<Patient | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ patientId })
  }

  async searchPatients(query: string, limit = 20): Promise<Patient[]> {
    const collection = await this.getCollection()

    const searchRegex = new RegExp(query, "i")

    return await collection
      .find({
        $or: [
          { name: searchRegex },
          { phone: searchRegex },
          { email: searchRegex },
          { patientId: searchRegex },
          { nationalId: searchRegex },
        ],
      })
      .limit(limit)
      .sort({ updatedAt: -1 })
      .toArray()
  }

  async getAllPatients(
    page = 1,
    limit = 20,
    filters?: { status?: string; gender?: string },
  ): Promise<{ patients: Patient[]; total: number; totalPages: number }> {
    const collection = await this.getCollection()

    const query: any = {}
    if (filters?.status) query.status = filters.status
    if (filters?.gender) query.gender = filters.gender

    const total = await collection.countDocuments(query)
    const totalPages = Math.ceil(total / limit)
    const skip = (page - 1) * limit

    const patients = await collection.find(query).sort({ updatedAt: -1 }).skip(skip).limit(limit).toArray()

    return { patients, total, totalPages }
  }

  async updatePatient(id: string, updateData: Partial<Patient>): Promise<Patient | null> {
    const collection = await this.getCollection()

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    )

    return result
  }

  async addMedicalRecord(patientId: string, record: Omit<MedicalRecord, "_id">): Promise<boolean> {
    const collection = await this.getCollection()

    const result = await collection.updateOne(
      { _id: new ObjectId(patientId) },
      {
        $push: { medicalHistory: { ...record, _id: new ObjectId() } },
        $set: {
          lastVisit: record.date,
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  async updateMedicalRecord(patientId: string, recordId: string, updateData: Partial<MedicalRecord>): Promise<boolean> {
    const collection = await this.getCollection()

    const result = await collection.updateOne(
      {
        _id: new ObjectId(patientId),
        "medicalHistory._id": new ObjectId(recordId),
      },
      {
        $set: {
          "medicalHistory.$": { ...updateData },
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  async getPatientStats(): Promise<{
    total: number
    active: number
    inactive: number
    newThisMonth: number
    byGender: { male: number; female: number }
  }> {
    const collection = await this.getCollection()

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [total, active, inactive, newThisMonth, genderStats] = await Promise.all([
      collection.countDocuments(),
      collection.countDocuments({ status: "active" }),
      collection.countDocuments({ status: "inactive" }),
      collection.countDocuments({ createdAt: { $gte: startOfMonth } }),
      collection.aggregate([{ $group: { _id: "$gender", count: { $sum: 1 } } }]).toArray(),
    ])

    const byGender = {
      male: genderStats.find((g) => g._id === "male")?.count || 0,
      female: genderStats.find((g) => g._id === "female")?.count || 0,
    }

    return {
      total,
      active,
      inactive,
      newThisMonth,
      byGender,
    }
  }
}
