"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Eye, Search, Filter } from "lucide-react"
import Link from "next/link"
import { fetchAllReports } from "@/lib/actions"

interface Report {
  id: string
  reportId: string
  crimeType: string
  status: string
  reportDate: string
  isCritical: boolean
  contactName?: string
  isAnonymous: boolean
}

export function AdminReportList() {
  const { t } = useTranslation()
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    async function loadReports() {
      try {
        // In a real app, this would fetch from your API
        const data = await fetchAllReports()
        setReports(data)
      } catch (error) {
        console.error("Error loading reports:", error)
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [])

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.contactName && report.contactName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.crimeType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder={t("admin.searchReports")}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder={t("admin.filterByStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.allStatuses")}</SelectItem>
              <SelectItem value="Under Review">{t("track.status.under_review")}</SelectItem>
              <SelectItem value="Investigating">{t("track.status.investigating")}</SelectItem>
              <SelectItem value="Resolved">{t("track.status.resolved")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder={t("admin.filterByType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.allTypes")}</SelectItem>
              <SelectItem value="phishing">{t("report.crimeTypes.phishing")}</SelectItem>
              <SelectItem value="identity_theft">{t("report.crimeTypes.identityTheft")}</SelectItem>
              <SelectItem value="hacking">{t("report.crimeTypes.hacking")}</SelectItem>
              <SelectItem value="online_harassment">{t("report.crimeTypes.onlineHarassment")}</SelectItem>
              <SelectItem value="financial_fraud">{t("report.crimeTypes.financialFraud")}</SelectItem>
              <SelectItem value="ransomware">{t("report.crimeTypes.ransomware")}</SelectItem>
              <SelectItem value="data_breach">{t("report.crimeTypes.dataBreach")}</SelectItem>
              <SelectItem value="other">{t("report.crimeTypes.other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
          <div className="col-span-2">{t("admin.reportId")}</div>
          <div className="col-span-2">{t("admin.reportType")}</div>
          <div className="col-span-2">{t("admin.reportedBy")}</div>
          <div className="col-span-2">{t("admin.date")}</div>
          <div className="col-span-2">{t("admin.status")}</div>
          <div className="col-span-2 text-right">{t("admin.actions")}</div>
        </div>

        {filteredReports.length === 0 ? (
          <div className="p-4 text-center text-gray-500">{t("admin.noReportsFound")}</div>
        ) : (
          filteredReports.map((report) => (
            <div key={report.id} className="grid grid-cols-12 gap-4 p-4 border-b last:border-0 items-center">
              <div className="col-span-2 font-medium flex items-center gap-2">
                {report.reportId}
                {report.isCritical && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                  </Badge>
                )}
              </div>
              <div className="col-span-2">{t(`report.crimeTypes.${report.crimeType}`)}</div>
              <div className="col-span-2">
                {report.isAnonymous ? (
                  <span className="text-gray-500 italic">{t("admin.anonymous")}</span>
                ) : (
                  report.contactName || "N/A"
                )}
              </div>
              <div className="col-span-2 text-gray-500">{new Date(report.reportDate).toLocaleDateString()}</div>
              <div className="col-span-2">
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
              <div className="col-span-2 flex justify-end gap-2">
                <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                  <Link href={`/admin/reports/${report.reportId}`}>
                    <Eye className="h-4 w-4" />
                    {t("admin.view")}
                  </Link>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
