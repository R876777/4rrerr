"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  FileText,
  BarChart3,
  MessageSquare,
  DollarSign,
  UserCheck,
  TrendingUp,
  Globe,
  Settings,
  Users,
  Shield,
  LogOut,
  Package,
  TestTube,
} from "lucide-react"
import DashboardOverview from "@/components/dashboard-overview"
import AppointmentSystem from "@/components/appointment-system"
import MedicalRecords from "@/components/medical-records"
import AIAssistant from "@/components/ai-assistant"
import Analytics from "@/components/analytics"
import FinancialManagement from "@/components/financial-management"
import UserManagement from "@/components/user-management"
import SystemSettings from "@/components/system-settings"
import NotificationCenter from "@/components/notification-center"
import InventoryManagement from "@/components/inventory-management"
import LaboratoryManagement from "@/components/laboratory-management"
import LoginForm from "@/components/login-form"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SmartClinicAI() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [notifications, setNotifications] = useState(5)

  useEffect(() => {
    // محاكاة تحقق من المصادقة
    const user = localStorage.getItem("currentUser")
    const token = localStorage.getItem("authToken")
    if (user && token) {
      setCurrentUser(JSON.parse(user))
      setIsAuthenticated(true)
    }
  }, [])

  const translations = {
    ar: {
      title: "نظام إدارة العيادات الذكي",
      subtitle: "مدعوم بالذكاء الاصطناعي",
      dashboard: "لوحة التحكم",
      appointments: "المواعيد",
      records: "السجلات الطبية",
      assistant: "المساعد الذكي",
      analytics: "التحليلات",
      financial: "الإدارة المالية",
      users: "إدارة المستخدمين",
      inventory: "إدارة المخزون",
      laboratory: "إدارة المختبر",
      settings: "الإعدادات",
      notifications: "الإشعارات",
      profile: "الملف الشخصي",
      logout: "تسجيل الخروج",
      welcome: "مرحباً",
      online: "متصل",
    },
    en: {
      title: "Smart Clinic Management System",
      subtitle: "AI-Powered Healthcare Management",
      dashboard: "Dashboard",
      appointments: "Appointments",
      records: "Medical Records",
      assistant: "AI Assistant",
      analytics: "Analytics",
      financial: "Financial",
      users: "User Management",
      inventory: "Inventory",
      laboratory: "Laboratory",
      settings: "Settings",
      notifications: "Notifications",
      profile: "Profile",
      logout: "Logout",
      welcome: "Welcome",
      online: "Online",
    },
  }

  const t = translations[language]

  const handleLogin = async (userData: any) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentUser(data.user)
        setIsAuthenticated(true)
        localStorage.setItem("currentUser", JSON.stringify(data.user))
        localStorage.setItem("authToken", data.token)
      } else {
        console.error("Login failed:", data.error)
        // يمكن إضافة toast notification هنا
      }
    } catch (error) {
      console.error("Login error:", error)
      // محاكاة تسجيل الدخول في حالة فشل الاتصال
      setCurrentUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("currentUser", JSON.stringify(userData))
    }
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
    localStorage.removeItem("authToken")
    setActiveTab("dashboard")
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} language={language} setLanguage={setLanguage} />
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${language === "ar" ? "rtl" : "ltr"}`}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-500">{t.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "ar" ? "English" : "العربية"}</span>
              </Button>

              <NotificationCenter language={language} count={notifications} />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{currentUser?.name?.charAt(0) || "د"}</span>
                    </div>
                    <div className="text-right rtl:text-left">
                      <p className="text-sm font-medium">{currentUser?.name || "د. أحمد محمد"}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1 rtl:ml-1 rtl:mr-0"></div>
                        {t.online}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {t.welcome}, {currentUser?.name || "د. أحمد"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    <Settings className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    <span>{t.profile}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("settings")}>
                    <Shield className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    <span>{t.settings}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                    <span>{t.logout}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 lg:w-auto">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2 rtl:space-x-reverse">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">{t.dashboard}</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{t.appointments}</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center space-x-2 rtl:space-x-reverse">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">{t.records}</span>
            </TabsTrigger>
            <TabsTrigger value="assistant" className="flex items-center space-x-2 rtl:space-x-reverse">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">{t.assistant}</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2 rtl:space-x-reverse">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">{t.analytics}</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center space-x-2 rtl:space-x-reverse">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">{t.financial}</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">{t.inventory}</span>
            </TabsTrigger>
            <TabsTrigger value="laboratory" className="flex items-center space-x-2 rtl:space-x-reverse">
              <TestTube className="w-4 h-4" />
              <span className="hidden sm:inline">{t.laboratory}</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{t.users}</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2 rtl:space-x-reverse">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">{t.settings}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardOverview language={language} currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentSystem language={language} currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="records">
            <MedicalRecords language={language} currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="assistant">
            <AIAssistant language={language} currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics language={language} currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialManagement language={language} currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement language={language} currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="laboratory">
            <LaboratoryManagement language={language} currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement language={language} currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings language={language} currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
