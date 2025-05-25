import { MongoClient, type Db } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // في بيئة التطوير، استخدم متغير عام لحفظ الاتصال
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // في بيئة الإنتاج، أنشئ اتصال جديد
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db("smartclinic")
}

// دالة للتحقق من الاتصال
export async function connectToDatabase() {
  try {
    const client = await clientPromise
    await client.db("smartclinic").command({ ping: 1 })
    console.log("✅ Connected to MongoDB successfully")
    return { client, db: client.db("smartclinic") }
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error)
    throw error
  }
}
