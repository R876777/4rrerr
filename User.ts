import type { ObjectId } from "mongodb"

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  role: "admin" | "doctor" | "nurse" | "receptionist" | "accountant"
  specialization?: string
  department?: string
  phone: string
  isActive: boolean
  permissions: string[]
  lastLogin?: Date
  profileImage?: string
  address?: string
  dateOfBirth?: Date
  emergencyContact?: {
    name: string
    phone: string
    relation: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserInput {
  name: string
  email: string
  password: string
  role: User["role"]
  specialization?: string
  department?: string
  phone: string
  permissions?: string[]
}

export interface UpdateUserInput {
  name?: string
  email?: string
  specialization?: string
  department?: string
  phone?: string
  isActive?: boolean
  permissions?: string[]
}
