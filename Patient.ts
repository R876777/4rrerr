import type { ObjectId } from "mongodb"

export interface Patient {
  _id?: ObjectId
  patientId: string // رقم المريض الفريد
  name: string
  email?: string
  phone: string
  dateOfBirth: Date
  gender: "male" | "female"
  bloodType?: string
  address: string
  city: string
  country: string
  nationalId?: string
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
  insurance?: {
    company: string
    policyNumber: string
    expiryDate: Date
  }
  allergies: string[]
  chronicDiseases: string[]
  currentMedications: Medication[]
  medicalHistory: MedicalRecord[]
  lastVisit?: Date
  nextAppointment?: Date
  status: "active" | "inactive"
  notes?: string
  createdAt: Date
  updatedAt: Date
  createdBy: ObjectId // معرف المستخدم الذي أنشأ السجل
}

export interface MedicalRecord {
  _id?: ObjectId
  date: Date
  diagnosis: string
  treatment: string
  doctorId: ObjectId
  doctorName: string
  symptoms: string[]
  vitalSigns?: {
    temperature?: number
    bloodPressure?: {
      systolic: number
      diastolic: number
    }
    heartRate?: number
    weight?: number
    height?: number
  }
  prescriptions: Prescription[]
  labTests: ObjectId[] // مراجع لفحوصات المختبر
  notes: string
  followUpDate?: Date
  attachments?: string[] // مسارات الملفات المرفقة
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  startDate: Date
  endDate?: Date
  prescribedBy: ObjectId
  notes?: string
}

export interface Prescription {
  medicationName: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  quantity: number
}

export interface CreatePatientInput {
  name: string
  email?: string
  phone: string
  dateOfBirth: Date
  gender: "male" | "female"
  bloodType?: string
  address: string
  city: string
  country: string
  nationalId?: string
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
  insurance?: {
    company: string
    policyNumber: string
    expiryDate: Date
  }
  allergies?: string[]
  chronicDiseases?: string[]
  notes?: string
}
