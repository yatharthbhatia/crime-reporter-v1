"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Eye, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { fetchCriticalReports } from "@/lib/actions"

interface Report {
  id: string
  reportId: string
  crimeType: string
  status: string
  reportDate: string
  escalationReason: string
  priority: "high" | "urgent" | "critical"
}

export function AdminEscalations() {
  const { t } = useTranslation()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReports() {
      try {
        // In a real app, this would fetch from your API
        const data = await fetchCriticalReports()
        setReports(data)
      } catch (error) {
        console.error("Error loading critical reports:", error)
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-4 w-[300px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md">
        <p className="text-gray-500 mb-4">{t("admin.noEscalations")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card
          key={report.id}
          className={
            report.priority === "critical"
              ? "border-red-500"
              : report.priority === "urgent"
                ? "border-orange-500"
                : "border-yellow-500"
          }
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>{report.reportId}</CardTitle>
                <Badge
                  variant={
                    report.priority === "critical"
                      ? "destructive"
                      : report.priority === "urgent"
                        ? "default"
                        : "outline"
                  }
                  className="flex items-center gap-1"
                >
                  <AlertTriangle className="h-3 w-3" />
                  {t(`admin.priority.${report.priority}`)}
                </Badge>
              </div>
              <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                <Link href={`/admin/reports/${report.reportId}`}>
                  <Eye className="h-4 w-4" />
                  {t("admin.view")}
                </Link>
              </Button>
            </div>
            <CardDescription className="flex items-center gap-2">
              <span>{t(`report.crimeTypes.${report.crimeType}`)}</span>
              <span>•</span>
              <span>{new Date(report.reportDate).toLocaleDateString()}</span>
              <span>•</span>
              <Badge
                variant="outline"
                className={
                  report.status === "Under Review"
                    ? "border-yellow-500 text-yellow-500"
                    : report.status === "Investigating"
                      ? "border-blue-500 text-blue-500"
                      : report.status === "Resolved"
                        ? "border-green-500 text-green-500"
                        : ""
                }
              >
                {t(`track.status.${report.status.toLowerCase().replace(/\s+/g, "_")}`)}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">{t("admin.escalationReason")}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{report.escalationReason}</p>
              <div className="flex justify-end">
                <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
                  <ArrowUpRight className="h-4 w-4" />
                  {t("admin.escalate")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
