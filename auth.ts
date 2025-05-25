import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface User {
  userId: string
  email: string
  role: string
  permissions: string[]
}

export async function verifyToken(request: NextRequest): Promise<User | null> {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as User

    return decoded
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export function generateToken(user: {
  id: string
  email: string
  role: string
  permissions: string[]
}): string {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    },
    JWT_SECRET,
    { expiresIn: "24h" },
  )
}

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission) || userPermissions.includes("*")
}
