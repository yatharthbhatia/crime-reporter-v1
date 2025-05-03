"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { fetchUserReports } from "@/lib/actions"

interface Report {
  id: string
  reportId: string
  crimeType: string
  status: string
  reportDate: string
  isCritical: boolean
}

export function ReportList() {
  const { t } = useTranslation()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReports() {
      try {
        // In a real app, this would fetch from your API
        const data = await fetchUserReports()
        setReports(data)
      } catch (error) {
        console.error("Error loading reports:", error)
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
          <div key={index} className="flex items-center justify-between p-4 border rounded-md">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-9 w-[100px]" />
          </div>
        ))}
      </div>
    )
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md">
        <p className="text-gray-500 mb-4">{t("track.noReports")}</p>
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link href="/report">{t("track.fileReport")}</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md"
        >
          <div className="space-y-2 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{t(`report.crimeTypes.${report.crimeType}`)}</h3>
              {report.isCritical && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {t("track.critical")}
                </Badge>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-gray-500">
              <span>{report.reportId}</span>
              <span>{new Date(report.reportDate).toLocaleDateString()}</span>
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
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
            <Link href={`/track/${report.reportId}`}>
              <Eye className="h-4 w-4" />
              {t("track.viewDetails")}
            </Link>
          </Button>
        </div>
      ))}
    </div>
  )
}
