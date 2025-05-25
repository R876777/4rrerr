import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"
import { getDatabase } from "@/lib/mongodb"
import type { User, CreateUserInput, UpdateUserInput } from "@/lib/models/User"

export class UserService {
  private async getCollection() {
    const db = await getDatabase()
    return db.collection<User>("users")
  }

  async createUser(userData: CreateUserInput): Promise<User> {
    const collection = await this.getCollection()

    // التحقق من وجود المستخدم
    const existingUser = await collection.findOne({ email: userData.email })
    if (existingUser) {
      throw new Error("المستخدم موجود بالفعل")
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // تحديد الصلاحيات الافتراضية حسب الدور
    const defaultPermissions = this.getDefaultPermissions(userData.role)

    const newUser: User = {
      ...userData,
      password: hashedPassword,
      permissions: userData.permissions || defaultPermissions,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newUser)
    return { ...newUser, _id: result.insertedId }
  }

  async getUserById(id: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ _id: new ObjectId(id) })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ email })
  }

  async updateUser(id: string, updateData: UpdateUserInput): Promise<User | null> {
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

  async deleteUser(id: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount > 0
  }

  async getAllUsers(filters?: { role?: string; isActive?: boolean }): Promise<User[]> {
    const collection = await this.getCollection()
    const query: any = {}

    if (filters?.role) query.role = filters.role
    if (filters?.isActive !== undefined) query.isActive = filters.isActive

    return await collection.find(query).sort({ createdAt: -1 }).toArray()
  }

  async updateLastLogin(id: string): Promise<void> {
    const collection = await this.getCollection()
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { lastLogin: new Date() } })
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password)
  }

  async changePassword(id: string, newPassword: string): Promise<boolean> {
    const collection = await this.getCollection()
    const hashedPassword = await bcrypt.hash(newPassword, 12)

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  private getDefaultPermissions(role: User["role"]): string[] {
    const permissions: Record<User["role"], string[]> = {
      admin: [
        "users.create",
        "users.read",
        "users.update",
        "users.delete",
        "patients.create",
        "patients.read",
        "patients.update",
        "patients.delete",
        "appointments.create",
        "appointments.read",
        "appointments.update",
        "appointments.delete",
        "inventory.create",
        "inventory.read",
        "inventory.update",
        "inventory.delete",
        "lab.create",
        "lab.read",
        "lab.update",
        "lab.delete",
        "financial.create",
        "financial.read",
        "financial.update",
        "financial.delete",
        "reports.read",
        "settings.update",
      ],
      doctor: [
        "patients.create",
        "patients.read",
        "patients.update",
        "appointments.create",
        "appointments.read",
        "appointments.update",
        "lab.create",
        "lab.read",
        "lab.update",
        "inventory.read",
        "financial.read",
      ],
      nurse: [
        "patients.read",
        "patients.update",
        "appointments.read",
        "appointments.update",
        "lab.read",
        "lab.update",
        "inventory.read",
      ],
      receptionist: [
        "patients.create",
        "patients.read",
        "patients.update",
        "appointments.create",
        "appointments.read",
        "appointments.update",
        "financial.create",
        "financial.read",
      ],
      accountant: [
        "financial.create",
        "financial.read",
        "financial.update",
        "reports.read",
        "patients.read",
        "appointments.read",
      ],
    }

    return permissions[role] || []
  }
}
