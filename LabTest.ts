import type { ObjectId } from "mongodb"

export interface LabTest {
  _id?: ObjectId
  testId: string // رقم الفحص الفريد
  patientId: ObjectId
  patientName: string
  doctorId: ObjectId
  doctorName: string
  testType: string
  category: "blood" | "urine" | "stool" | "imaging" | "cardiac" | "other"
  sampleType: "blood" | "urine" | "stool" | "saliva" | "tissue" | "other"
  requestDate: Date
  expectedDate: Date
  completedDate?: Date
  status: "requested" | "sample_collected" | "in_progress" | "completed" | "cancelled"
  priority: "routine" | "urgent" | "stat"
  fastingRequired: boolean
  specialInstructions?: string
  results?: TestResult[]
  overallResult?: "normal" | "abnormal" | "critical"
  interpretation?: string
  technicianId?: ObjectId
  technicianName?: string
  equipmentUsed?: string
  cost: number
  currency: string
  paymentStatus: "pending" | "paid" | "insurance_covered"
  reportGenerated: boolean
  reportPath?: string
  sentToDoctor: boolean
  sentToDoctorAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
  createdBy: ObjectId
}

export interface TestResult {
  parameter: string
  value: string | number
  unit?: string
  normalRange: string
  status: "normal" | "abnormal" | "critical"
  notes?: string
}

export interface CreateLabTestInput {
  patientId: ObjectId
  doctorId: ObjectId
  testType: string
  category: LabTest["category"]
  sampleType: LabTest["sampleType"]
  expectedDate: Date
  priority?: LabTest["priority"]
  fastingRequired?: boolean
  specialInstructions?: string
  cost: number
  currency: string
}
