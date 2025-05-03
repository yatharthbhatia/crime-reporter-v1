"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/components/language-provider"
import { ReportList } from "@/components/report-list"
import { ReportTracker } from "@/components/report-tracker"

export default function TrackPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t("track.title")}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{t("track.description")}</p>

        <Tabs defaultValue="my-reports">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="my-reports">{t("track.myReports")}</TabsTrigger>
            <TabsTrigger value="track-by-id">{t("track.trackById")}</TabsTrigger>
          </TabsList>

          <TabsContent value="my-reports">
            <Card>
              <CardHeader>
                <CardTitle>{t("track.myReportsTitle")}</CardTitle>
                <CardDescription>{t("track.myReportsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ReportList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track-by-id">
            <Card>
              <CardHeader>
                <CardTitle>{t("track.trackByIdTitle")}</CardTitle>
                <CardDescription>{t("track.trackByIdDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <Input placeholder={t("track.reportIdPlaceholder")} />
                    <Button>{t("track.trackButton")}</Button>
                  </div>
                  <ReportTracker />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
