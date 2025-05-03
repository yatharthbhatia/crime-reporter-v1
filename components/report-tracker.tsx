"use client"

import { useState } from "react"
import { useTranslation } from "@/components/language-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline, TimelineItem } from "@/components/timeline"
import { FileText, MessageSquare, AlertTriangle, CheckCircle2, Clock } from "lucide-react"

interface ReportDetails {
  reportId: string
  crimeType: string
  description: string
  status: string
  reportDate: string
  lastUpdated: string
  isCritical: boolean
  evidenceFiles: string[]
  timeline: {
    date: string
    status: string
    description: string
  }[]
}

export function ReportTracker() {
  const { t } = useTranslation()
  const [report, setReport] = useState<ReportDetails | null>(null)

  // This is a placeholder. In a real app, you would fetch the report details
  // based on the report ID entered by the user
  const mockReport: ReportDetails = {
    reportId: "CR-123456",
    crimeType: "phishing",
    description: "I received a suspicious email claiming to be from my bank asking for my login credentials.",
    status: "Investigating",
    reportDate: "2023-05-15T10:30:00Z",
    lastUpdated: "2023-05-18T14:45:00Z",
    isCritical: true,
    evidenceFiles: ["email-screenshot.png", "email-headers.txt"],
    timeline: [
      {
        date: "2023-05-15T10:30:00Z",
        status: "Submitted",
        description: "Report submitted successfully",
      },
      {
        date: "2023-05-16T09:15:00Z",
        status: "Under Review",
        description: "Your report is being reviewed by our team",
      },
      {
        date: "2023-05-18T14:45:00Z",
        status: "Investigating",
        description: "Our cybercrime specialists are investigating your case",
      },
    ],
  }

  if (!report) {
    return (
      <div className="text-center py-8 border rounded-md">
        <p className="text-gray-500">{t("track.enterReportId")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{t("track.reportDetails")}</h2>
          <p className="text-gray-500">{report.reportId}</p>
        </div>
        <div className="flex items-center gap-2">
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
          {report.isCritical && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {t("track.critical")}
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">{t("track.details")}</TabsTrigger>
          <TabsTrigger value="timeline">{t("track.timeline")}</TabsTrigger>
          <TabsTrigger value="evidence">{t("track.evidence")}</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>{t("track.reportInformation")}</CardTitle>
              <CardDescription>
                {t("track.reportedOn", { date: new Date(report.reportDate).toLocaleDateString() })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">{t("report.crimeType")}</h4>
                <p>{t(`report.crimeTypes.${report.crimeType}`)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">{t("report.description")}</h4>
                <p className="text-gray-700 dark:text-gray-300">{report.description}</p>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {t("track.contactInvestigator")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>{t("track.caseTimeline")}</CardTitle>
              <CardDescription>
                {t("track.lastUpdated", { date: new Date(report.lastUpdated).toLocaleString() })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline>
                {report.timeline.map((item, index) => (
                  <TimelineItem key={index} className="pb-8">
                    <TimelineItem.Indicator>
                      {item.status === "Submitted" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : item.status === "Under Review" ? (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-blue-500" />
                      )}
                    </TimelineItem.Indicator>
                    <TimelineItem.Content>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-medium">
                            {t(`track.status.${item.status.toLowerCase().replace(/\s+/g, "_")}`)}
                          </h4>
                          <p className="text-gray-500 text-sm">{item.description}</p>
                        </div>
                        <time className="text-xs text-gray-500">{new Date(item.date).toLocaleString()}</time>
                      </div>
                    </TimelineItem.Content>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence">
          <Card>
            <CardHeader>
              <CardTitle>{t("track.evidenceFiles")}</CardTitle>
              <CardDescription>{t("track.evidenceDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {report.evidenceFiles.length > 0 ? (
                  <ul className="space-y-2">
                    {report.evidenceFiles.map((file, index) => (
                      <li key={index} className="flex items-center gap-3 p-3 border rounded-md">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <span>{file}</span>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          {t("track.download")}
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">{t("track.noEvidence")}</p>
                )}

                <div className="flex justify-end">
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {t("track.addEvidence")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
