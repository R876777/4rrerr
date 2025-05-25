"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Activity, DollarSign, AlertTriangle, TrendingUp, Heart } from "lucide-react"

interface DashboardStats {
  patients: {
    total: number
    active: number
    newThisMonth: number
    byGender: { male: number; female: number }
  }
  appointments: {
    today: number
    thisWeek: number
    pending: number
    completed: number
  }
  financial: {
    todayRevenue: number
    monthlyRevenue: number
    pendingPayments: number
  }
  inventory: {
    lowStock: number
    expiringSoon: number
    totalItems: number
  }
}

interface RecentActivity {
  id: string
  type: "appointment" | "patient" | "payment" | "inventory"
  message: string
  time: string
  priority: "low" | "normal" | "high"
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")

      if (!token) {
        setError("لم يتم العثور على رمز المصادقة")
        return
      }

      // جلب إحصائيات المرضى
      const patientsResponse = await fetch("/api/patients/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!patientsResponse.ok) {
        throw new Error("فشل في جلب إحصائيات المرضى")
      }

      const patientsData = await patientsResponse.json()

      // جلب إحصائيات المواعيد
      const appointmentsResponse = await fetch("/api/appointments/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      let appointmentsData = {
        today: 0,
        thisWeek: 0,
        pending: 0,
        completed: 0,
      }

      if (appointmentsResponse.ok) {
        appointmentsData = await appointmentsResponse.json()
      }

      // جلب الإحصائيات المالية
      const financialResponse = await fetch("/api/financial/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      let financialData = {
        todayRevenue: 0,
        monthlyRevenue: 0,
        pendingPayments: 0,
      }

      if (financialResponse.ok) {
        financialData = await financialResponse.json()
      }

      // جلب إحصائيات المخزون
      const inventoryResponse = await fetch("/api/inventory/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      let inventoryData = {
        lowStock: 0,
        expiringSoon: 0,
        totalItems: 0,
      }

      if (inventoryResponse.ok) {
        inventoryData = await inventoryResponse.json()
      }

      setStats({
        patients: patientsData,
        appointments: appointmentsData,
        financial: financialData,
        inventory: inventoryData,
      })

      // إنشاء أنشطة حديثة تجريبية
      setRecentActivity([
        {
          id: "1",
          type: "appointment",
          message: "موعد جديد مع أحمد محمد علي",
          time: "منذ 5 دقائق",
          priority: "normal",
        },
        {
          id: "2",
          type: "patient",
          message: "تم إضافة مريض جديد: فاطمة حسن",
          time: "منذ 15 دقيقة",
          priority: "low",
        },
        {
          id: "3",
          type: "inventory",
          message: "تحذير: مخزون الباراسيتامول منخفض",
          time: "منذ 30 دقيقة",
          priority: "high",
        },
        {
          id: "4",
          type: "payment",
          message: "تم استلام دفعة بقيمة 500 ريال",
          time: "منذ ساعة",
          priority: "normal",
        },
      ])
    } catch (error) {
      console.error("خطأ في جلب بيانات لوحة التحكم:", error)
      setError("فشل في تحميل بيانات لوحة التحكم")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchDashboardData} variant="outline">
            إعادة المحاولة
          </Button>
        </div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4" />
      case "patient":
        return <Users className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "inventory":
        return <Activity className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: RecentActivity["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "normal":
        return "text-blue-600"
      case "low":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* الإحصائيات الرئيسية */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المرضى</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.patients.total}</div>
            <p className="text-xs text-muted-foreground">+{stats.patients.newThisMonth} هذا الشهر</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مواعيد اليوم</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointments.today}</div>
            <p className="text-xs text-muted-foreground">{stats.appointments.pending} في الانتظار</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إيرادات اليوم</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.financial.todayRevenue.toLocaleString()} ريال</div>
            <p className="text-xs text-muted-foreground">{stats.financial.pendingPayments} دفعة معلقة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تنبيهات المخزون</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.inventory.lowStock}</div>
            <p className="text-xs text-muted-foreground">{stats.inventory.expiringSoon} ينتهي قريباً</p>
          </CardContent>
        </Card>
      </div>

      {/* الإحصائيات التفصيلية */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">توزيع المرضى</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">المرضى النشطون</span>
              <Badge variant="secondary">{stats.patients.active}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">ذكور</span>
              <Badge variant="outline">{stats.patients.byGender.male}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">إناث</span>
              <Badge variant="outline">{stats.patients.byGender.female}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">المواعيد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">هذا الأسبوع</span>
              <Badge variant="secondary">{stats.appointments.thisWeek}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">مكتملة</span>
              <Badge variant="default">{stats.appointments.completed}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">في الانتظار</span>
              <Badge variant="outline">{stats.appointments.pending}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">النشاط الحديث</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className={`mt-1 ${getPriorityColor(activity.priority)}`}>{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* إحصائيات سريعة */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              الأداء الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">إجمالي الإيرادات</span>
                <span className="font-semibold">{stats.financial.monthlyRevenue.toLocaleString()} ريال</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">مرضى جدد</span>
                <span className="font-semibold">{stats.patients.newThisMonth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">مواعيد الأسبوع</span>
                <span className="font-semibold">{stats.appointments.thisWeek}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5" />
              حالة النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">حالة الخادم</span>
                <Badge variant="default" className="bg-green-500">
                  متصل
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">قاعدة البيانات</span>
                <Badge variant="default" className="bg-green-500">
                  نشطة
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">آخر نسخة احتياطية</span>
                <span className="text-sm text-gray-600">منذ ساعتين</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
