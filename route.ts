import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { UserService } from "@/lib/services/userService"
import { connectToDatabase } from "@/lib/mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    // التأكد من الاتصال بقاعدة البيانات
    await connectToDatabase()

    const { email, password, role } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان" }, { status: 400 })
    }

    const userService = new UserService()

    // البحث عن المستخدم
    const user = await userService.getUserByEmail(email)

    if (!user) {
      return NextResponse.json({ error: "بيانات تسجيل الدخول غير صحيحة" }, { status: 401 })
    }

    // التحقق من الدور إذا تم تحديده
    if (role && user.role !== role) {
      return NextResponse.json({ error: "الدور المحدد غير صحيح" }, { status: 401 })
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await userService.verifyPassword(user, password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 })
    }

    // التحقق من حالة المستخدم
    if (!user.isActive) {
      return NextResponse.json({ error: "الحساب غير مفعل" }, { status: 403 })
    }

    // تحديث آخر تسجيل دخول
    await userService.updateLastLogin(user._id!.toString())

    // إنشاء JWT token
    const token = jwt.sign(
      {
        userId: user._id!.toString(),
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    )

    // إرجاع بيانات المستخدم والتوكن (بدون كلمة المرور)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: {
        ...userWithoutPassword,
        _id: user._id!.toString(),
      },
      token,
      message: "تم تسجيل الدخول بنجاح",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 })
  }
}
