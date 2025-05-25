"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, Globe, Eye, EyeOff, Shield, Stethoscope, Users, Settings } from "lucide-react"

interface LoginFormProps {
  onLogin: (userData: any) => void
  language: "ar" | "en"
  setLanguage: (lang: "ar" | "en") => void
}

export default function LoginForm({ onLogin, language, setLanguage }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  })

  const translations = {
    ar: {
      title: "نظام إدارة العيادات الذكي",
      subtitle: "مدعوم بالذكاء الاصطناعي",
      login: "تسجيل الدخول",
      register: "إنشاء حساب جديد",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      fullName: "الاسم الكامل",
      role: "الدور الوظيفي",
      phone: "رقم الهاتف",
      specialization: "التخصص",
      loginButton: "دخول",
      registerButton: "إنشاء الحساب",
      forgotPassword: "نسيت كلمة المرور؟",
      rememberMe: "تذكرني",
      admin: "مدير النظام",
      doctor: "طبيب",
      nurse: "ممرض/ة",
      receptionist: "موظف استقبال",
      accountant: "محاسب",
      demoAccounts: "حسابات تجريبية",
      useDemo: "استخدام حساب تجريبي",
      features: "المميزات",
      feature1: "إدارة شاملة للمواعيد والمرضى",
      feature2: "مساعد ذكي مدعوم بالذكاء الاصطناعي",
      feature3: "تحليلات وتقارير متقدمة",
      feature4: "نظام مالي متكامل",
      feature5: "أمان عالي وحماية البيانات",
      feature6: "دعم متعدد اللغات",
    },
    en: {
      title: "Smart Clinic Management System",
      subtitle: "AI-Powered Healthcare Management",
      login: "Login",
      register: "Create New Account",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      role: "Role",
      phone: "Phone Number",
      specialization: "Specialization",
      loginButton: "Login",
      registerButton: "Create Account",
      forgotPassword: "Forgot Password?",
      rememberMe: "Remember Me",
      admin: "System Admin",
      doctor: "Doctor",
      nurse: "Nurse",
      receptionist: "Receptionist",
      accountant: "Accountant",
      demoAccounts: "Demo Accounts",
      useDemo: "Use Demo Account",
      features: "Features",
      feature1: "Comprehensive appointment and patient management",
      feature2: "AI-powered smart assistant",
      feature3: "Advanced analytics and reports",
      feature4: "Integrated financial system",
      feature5: "High security and data protection",
      feature6: "Multi-language support",
    },
  }

  const t = translations[language]

  const demoAccounts = [
    {
      name: "د. أحمد محمد",
      email: "admin@clinic.com",
      role: "admin",
      icon: Shield,
      color: "bg-red-100 text-red-600",
    },
    {
      name: "د. سارة أحمد",
      email: "doctor@clinic.com",
      role: "doctor",
      icon: Stethoscope,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "فاطمة علي",
      email: "nurse@clinic.com",
      role: "nurse",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      name: "محمد حسن",
      email: "reception@clinic.com",
      role: "receptionist",
      icon: Settings,
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // محاكاة تسجيل الدخول
    const userData = {
      name: "د. أحمد محمد",
      email: loginData.email,
      role: loginData.role || "admin",
      id: "1",
    }
    onLogin(userData)
  }

  const handleDemoLogin = (account: any) => {
    const userData = {
      name: account.name,
      email: account.email,
      role: account.role,
      id: Math.random().toString(),
    }
    onLogin(userData)
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 ${language === "ar" ? "rtl" : "ltr"}`}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding & Features */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="text-center lg:text-right rtl:lg:text-left">
            <div className="flex items-center justify-center lg:justify-start rtl:lg:justify-end space-x-4 rtl:space-x-reverse mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-lg text-gray-600">{t.subtitle}</p>
              </div>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                <Stethoscope className="w-5 h-5" />
                <span>{t.features}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[t.feature1, t.feature2, t.feature3, t.feature4, t.feature5, t.feature6].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-sm text-gray-700">{feature}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Demo Accounts */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>{t.demoAccounts}</CardTitle>
              <CardDescription>{t.useDemo}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoAccounts.map((account, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  onClick={() => handleDemoLogin(account)}
                >
                  <account.icon className={`w-5 h-5 mr-3 rtl:ml-3 rtl:mr-0 ${account.color}`} />
                  <div className="text-right rtl:text-left">
                    <p className="font-medium">{account.name}</p>
                    <p className="text-xs text-muted-foreground">{account.email}</p>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center">
          <Card className="bg-white shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-between items-center mb-4">
                <div></div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "ar" ? "English" : "العربية"}</span>
                </Button>
              </div>
              <CardTitle className="text-2xl">{t.login}</CardTitle>
              <CardDescription>أدخل بياناتك للوصول إلى النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">{t.login}</TabsTrigger>
                  <TabsTrigger value="register">{t.register}</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">{t.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@clinic.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">{t.password}</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-0 top-0 h-full px-3 rtl:left-auto rtl:right-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="role">{t.role}</Label>
                      <Select
                        value={loginData.role}
                        onValueChange={(value) => setLoginData({ ...loginData, role: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الدور الوظيفي" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">{t.admin}</SelectItem>
                          <SelectItem value="doctor">{t.doctor}</SelectItem>
                          <SelectItem value="nurse">{t.nurse}</SelectItem>
                          <SelectItem value="receptionist">{t.receptionist}</SelectItem>
                          <SelectItem value="accountant">{t.accountant}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2 rtl:space-x-reverse">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{t.rememberMe}</span>
                      </label>
                      <Button variant="link" className="text-sm">
                        {t.forgotPassword}
                      </Button>
                    </div>

                    <Button type="submit" className="w-full">
                      {t.loginButton}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">{t.fullName}</Label>
                        <Input id="fullName" placeholder="الاسم الكامل" />
                      </div>
                      <div>
                        <Label htmlFor="phone">{t.phone}</Label>
                        <Input id="phone" placeholder="0599123456" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="registerEmail">{t.email}</Label>
                      <Input id="registerEmail" type="email" placeholder="email@example.com" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="registerPassword">{t.password}</Label>
                        <Input id="registerPassword" type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="registerRole">{t.role}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الدور" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">{t.doctor}</SelectItem>
                            <SelectItem value="nurse">{t.nurse}</SelectItem>
                            <SelectItem value="receptionist">{t.receptionist}</SelectItem>
                            <SelectItem value="accountant">{t.accountant}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="specialization">{t.specialization}</Label>
                        <Input id="specialization" placeholder="التخصص الطبي" />
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      {t.registerButton}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
