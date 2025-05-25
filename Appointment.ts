import type { ObjectId } from "mongodb"

export interface Appointment {
  _id?: ObjectId
  appointmentId: string // رقم الموعد الفريد
  patientId: ObjectId
  patientName: string
  patientPhone: string
  doctorId: ObjectId
  doctorName: string
  date: Date
  time: string
  duration: number // بالدقائق
  type: "consultation" | "follow_up" | "emergency" | "procedure" | "checkup"
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled" | "no_show"
  priority: "low" | "normal" | "high" | "urgent"
  reason: string
  symptoms?: string[]
  notes?: string
  reminderSent: boolean
  paymentStatus: "pending" | "paid" | "insurance_covered"
  amount?: number
  currency: string
  room?: string
  checkedInAt?: Date
  completedAt?: Date
  cancelledAt?: Date
  cancellationReason?: string
  createdAt: Date
  updatedAt: Date
  createdBy: ObjectId
}

export interface CreateAppointmentInput {
  patientId: ObjectId
  doctorId: ObjectId
  date: Date
  time: string
  duration?: number
  type: Appointment["type"]
  priority?: Appointment["priority"]
  reason: string
  symptoms?: string[]
  notes?: string
  amount?: number
  currency?: string
  room?: string
}

export interface UpdateAppointmentInput {
  date?: Date
  time?: string
  duration?: number
  type?: Appointment["type"]
  status?: Appointment["status"]
  priority?: Appointment["priority"]
  reason?: string
  symptoms?: string[]
  notes?: string
  room?: string
  cancellationReason?: string
}
