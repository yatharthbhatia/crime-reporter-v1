"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/components/language-provider"
import { AlertTriangle, CheckCircle2, Clock, FileText } from "lucide-react"

export function AdminStats() {
  const { t } = useTranslation()

  // In a real app, these would be fetched from your API
  const stats = {
    totalReports: 156,
    pendingReports: 42,
    resolvedReports: 98,
    criticalReports: 16,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("admin.totalReports")}</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalReports}</div>
          <p className="text-xs text-muted-foreground">{t("admin.totalReportsDescription")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("admin.pendingReports")}</CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingReports}</div>
          <p className="text-xs text-muted-foreground">{t("admin.pendingReportsDescription")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("admin.resolvedReports")}</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.resolvedReports}</div>
          <p className="text-xs text-muted-foreground">{t("admin.resolvedReportsDescription")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("admin.criticalReports")}</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.criticalReports}</div>
          <p className="text-xs text-muted-foreground">{t("admin.criticalReportsDescription")}</p>
        </CardContent>
      </Card>
    </div>
  )
}
