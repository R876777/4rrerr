"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Plus, Search, Edit, Trash2, Shield, Stethoscope, UserCheck, Settings, Eye, EyeOff } from "lucide-react"

interface UserManagementProps {
  language: "ar" | "en"
  currentUser: any
}

export default function UserManagement({ language, currentUser }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const translations = {
    ar: {
      userManagement: "إدارة المستخدمين",
      allUsers: "جميع المستخدمين",
      addUser: "إضافة مستخدم",
      roles: "الأدوار والصلاحيات",
      search: "بحث",
      filterByRole: "تصفية حسب الدور",
      all: "الكل",
      admin: "مدير النظام",
      doctor: "طبيب",
      nurse: "ممرض/ة",
      receptionist: "موظف استقبال",
      accountant: "محاسب",
      active: "نشط",
      inactive: "غير نشط",
      name: "الاسم",
      email: "البريد الإلكتروني",
      role: "الدور",
      status: "الحالة",
      lastLogin: "آخر دخول",
      actions: "الإجراءات",
      edit: "تعديل",
      delete: "حذف",
      fullName: "الاسم الكامل",
      phone: "رقم الهاتف",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      specialization: "التخصص",
      department: "القسم",
      permissions: "الصلاحيات",
      createUser: "إنشاء المستخدم",
      cancel: "إلغاء",
      save: "حفظ",
      userCreated: "تم إنشاء المستخدم بنجاح",
      userUpdated: "تم تحديث المستخدم بنجاح",
      userDeleted: "تم حذف المستخدم بنجاح",
    },
    en: {
      userManagement: "User Management",
      allUsers: "All Users",
      addUser: "Add User",
      roles: "Roles & Permissions",
      search: "Search",
      filterByRole: "Filter by Role",
      all: "All",
      admin: "System Admin",
      doctor: "Doctor",
      nurse: "Nurse",
      receptionist: "Receptionist",
      accountant: "Accountant",
      active: "Active",
      inactive: "Inactive",
      name: "Name",
      email: "Email",
      role: "Role",
      status: "Status",
      lastLogin: "Last Login",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      fullName: "Full Name",
      phone: "Phone",
      password: "Password",
      confirmPassword: "Confirm Password",
      specialization: "Specialization",
      department: "Department",
      permissions: "Permissions",
      createUser: "Create User",
      cancel: "Cancel",
      save: "Save",
      userCreated: "User created successfully",
      userUpdated: "User updated successfully",
      userDeleted: "User deleted successfully",
    },
  }

  const t = translations[language]

  const users = [
    {
      id: 1,
      name: "د. أحمد محمد",
      email: "admin@clinic.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 10:30",
      phone: "0599123456",
      specialization: "إدارة",
      department: "الإدارة",
    },
    {
      id: 2,
      name: "د. سارة أحمد",
      email: "sara@clinic.com",
      role: "doctor",
      status: "active",
      lastLogin: "2024-01-15 09:15",
      phone: "0598765432",
      specialization: "طب عام",
      department: "العيادات الخارجية",
    },
    {
      id: 3,
      name: "فاطمة علي",
      email: "fatima@clinic.com",
      role: "nurse",
      status: "active",
      lastLogin: "2024-01-15 08:45",
      phone: "0597654321",
      specialization: "تمريض عام",
      department: "التمريض",
    },
    {
      id: 4,
      name: "محمد حسن",
      email: "mohammed@clinic.com",
      role: "receptionist",
      status: "active",
      lastLogin: "2024-01-14 16:20",
      phone: "0596543210",
      specialization: "استقبال",
      department: "الاستقبال",
    },
    {
      id: 5,
      name: "نور الدين",
      email: "nour@clinic.com",
      role: "accountant",
      status: "inactive",
      lastLogin: "2024-01-10 14:30",
      phone: "0595432109",
      specialization: "محاسبة",
      department: "المالية",
    },
  ]

  const roleIcons = {
    admin: Shield,
    doctor: Stethoscope,
    nurse: UserCheck,
    receptionist: Settings,
    accountant: Users,
  }

  const roleColors = {
    admin: "bg-red-100 text-red-800",
    doctor: "bg-blue-100 text-blue-800",
    nurse: "bg-green-100 text-green-800",
    receptionist: "bg-purple-100 text-purple-800",
    accountant: "bg-yellow-100 text-yellow-800",
  }

  const permissions = {
    admin: ["إدارة المستخدمين", "إدارة النظام", "عرض التقارير", "إدارة المالية"],
    doctor: ["إدارة المرضى", "إدارة المواعيد", "السجلات الطبية", "الوصفات"],
    nurse: ["مساعدة الأطباء", "متابعة المرضى", "إدخال البيانات"],
    receptionist: ["حجز المواعيد", "إدارة الاستقبال", "التواصل مع المرضى"],
    accountant: ["إدارة الفواتير", "التقارير المالية", "المدفوعات"],
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const getRoleIcon = (role: string) => {
    const Icon = roleIcons[role as keyof typeof roleIcons] || Users
    return Icon
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t.userManagement}</h2>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2 rtl:space-x-reverse">
              <Plus className="w-4 h-4" />
              <span>{t.addUser}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{t.addUser}</DialogTitle>
              <DialogDescription>إضافة مستخدم جديد إلى النظام</DialogDescription>
            </DialogHeader>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">{t.fullName}</Label>
                  <Input id="fullName" placeholder="الاسم الكامل" />
                </div>
                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input id="email" type="email" placeholder="email@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input id="phone" placeholder="0599123456" />
                </div>
                <div>
                  <Label htmlFor="role">{t.role}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدور" />
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specialization">{t.specialization}</Label>
                  <Input id="specialization" placeholder="التخصص" />
                </div>
                <div>
                  <Label htmlFor="department">{t.department}</Label>
                  <Input id="department" placeholder="القسم" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">{t.password}</Label>
                  <div className="relative">
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
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
                  <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  {t.cancel}
                </Button>
                <Button type="submit" onClick={() => setIsAddUserOpen(false)}>
                  {t.createUser}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">{t.allUsers}</TabsTrigger>
          <TabsTrigger value="roles">{t.roles}</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground rtl:left-auto rtl:right-3" />
                <Input
                  placeholder={`${t.search}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rtl:pl-3 rtl:pr-10"
                />
              </div>
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t.filterByRole} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="admin">{t.admin}</SelectItem>
                <SelectItem value="doctor">{t.doctor}</SelectItem>
                <SelectItem value="nurse">{t.nurse}</SelectItem>
                <SelectItem value="receptionist">{t.receptionist}</SelectItem>
                <SelectItem value="accountant">{t.accountant}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>{t.allUsers}</CardTitle>
              <CardDescription>إدارة جميع مستخدمي النظام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role)
                  return (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <RoleIcon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.specialization} • {user.department}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="text-right rtl:text-left">
                          <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                            {t[user.role as keyof typeof t]}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {user.status === "active" ? t.active : t.inactive}
                          </p>
                        </div>

                        <div className="flex space-x-2 rtl:space-x-reverse">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(permissions).map(([role, perms]) => {
              const RoleIcon = getRoleIcon(role)
              return (
                <Card key={role}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                      <RoleIcon className="w-5 h-5" />
                      <span>{t[role as keyof typeof t]}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{t.permissions}:</h4>
                      <ul className="space-y-1">
                        {perms.map((permission, index) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-center space-x-2 rtl:space-x-reverse"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            <span>{permission}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
