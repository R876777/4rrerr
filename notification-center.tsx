"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bell, AlertTriangle, CheckCircle, Info, Clock, X } from "lucide-react"

interface NotificationCenterProps {
  language: "ar" | "en"
  count: number
}

export default function NotificationCenter({ language, count }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "emergency",
      title: "تنبيه طارئ",
      message: "مريض يحتاج متابعة فورية - غرفة 205",
      time: "منذ 5 دقائق",
      read: false,
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      id: 2,
      type: "appointment",
      title: "موعد جديد",
      message: "تم حجز موعد جديد مع د. سارة أحمد",
      time: "منذ 15 دقيقة",
      read: false,
      icon: Clock,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "system",
      title: "تحديث النظام",
      message: "تم تحديث النظام بنجاح إلى الإصدار 2.1",
      time: "منذ ساعة",
      read: true,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 4,
      type: "reminder",
      title: "تذكير",
      message: "5 مواعيد تحتاج تأكيد لليوم",
      time: "منذ ساعتين",
      read: false,
      icon: Info,
      color: "text-yellow-600",
    },
    {
      id: 5,
      type: "payment",
      title: "دفعة جديدة",
      message: "تم استلام دفعة بقيمة 500 شيكل",
      time: "منذ 3 ساعات",
      read: true,
      icon: CheckCircle,
      color: "text-green-600",
    },
  ])

  const translations = {
    ar: {
      notifications: "الإشعارات",
      markAllRead: "تحديد الكل كمقروء",
      clearAll: "مسح الكل",
      noNotifications: "لا توجد إشعارات جديدة",
      viewAll: "عرض الكل",
    },
    en: {
      notifications: "Notifications",
      markAllRead: "Mark all as read",
      clearAll: "Clear all",
      noNotifications: "No new notifications",
      viewAll: "View all",
    },
  }

  const t = translations[language]

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{t.notifications}</h3>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t.noNotifications}</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer border-b ${
                    !notification.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <notification.icon className={`w-5 h-5 mt-0.5 ${notification.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeNotification(notification.id)
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" size="sm">
              {t.viewAll}
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
