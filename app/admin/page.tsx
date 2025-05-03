"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/components/language-provider"
import { AdminReportList } from "@/components/admin-report-list"
import { AdminStats } from "@/components/admin-stats"
import { AdminEscalations } from "@/components/admin-escalations"

export default function AdminPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t("admin.title")}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{t("admin.description")}</p>

        <div className="mb-8">
          <AdminStats />
        </div>

        <Tabs defaultValue="all-reports">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="all-reports">{t("admin.allReports")}</TabsTrigger>
            <TabsTrigger value="escalations">{t("admin.escalations")}</TabsTrigger>
            <TabsTrigger value="analytics">{t("admin.analytics")}</TabsTrigger>
          </TabsList>

          <TabsContent value="all-reports">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.allReportsTitle")}</CardTitle>
                <CardDescription>{t("admin.allReportsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminReportList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escalations">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.escalationsTitle")}</CardTitle>
                <CardDescription>{t("admin.escalationsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminEscalations />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>{t("admin.analyticsTitle")}</CardTitle>
                <CardDescription>{t("admin.analyticsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border border-dashed rounded-lg">
                  <p className="text-gray-500">{t("admin.analyticsPlaceholder")}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
