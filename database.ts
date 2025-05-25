// محاكاة اتصال قاعدة البيانات
// في الإنتاج سيتم استخدام MongoDB أو PostgreSQL

export interface DatabaseConnection {
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

class MockDatabase implements DatabaseConnection {
  isConnected = false

  async connect(): Promise<void> {
    // محاكاة الاتصال بقاعدة البيانات
    await new Promise((resolve) => setTimeout(resolve, 100))
    this.isConnected = true
    console.log("Connected to database")
  }

  async disconnect(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    this.isConnected = false
    console.log("Disconnected from database")
  }
}

const db = new MockDatabase()

export async function connectDB(): Promise<DatabaseConnection> {
  if (!db.isConnected) {
    await db.connect()
  }
  return db
}

// نماذج البيانات
export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: "male" | "female"
  bloodType: string
  address: string
  emergencyContact: {
    name: string
    phone: string
    relation: string
  }
  medicalHistory: MedicalRecord[]
  allergies: string[]
  chronicDiseases: string[]
  currentMedications: Medication[]
  lastVisit: string
  createdAt: Date
  updatedAt: Date
}

export interface MedicalRecord {
  date: string
  diagnosis: string
  treatment: string
  doctor: string
  notes: string
}

export interface Medication {
  name: string
  dosage: string
  startDate: string
  endDate?: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  duration: number
  type: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  priority: "low" | "normal" | "high"
  reason: string
  notes: string
  createdAt: Date
  updatedAt: Date
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  type: "دواء" | "معدات" | "مستلزمات"
  currentStock: number
  minStock: number
  maxStock: number
  unit: string
  price: number
  supplier: string
  expiryDate: string
  batchNumber: string
  location: string
  status: "available" | "low_stock" | "critical" | "out_of_stock"
  lastUpdated: Date
}
