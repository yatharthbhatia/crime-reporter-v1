"use client"

import { ReportForm } from "@/components/report-form"
import { useTranslation } from "@/components/language-provider"

export default function ReportPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t("report.title")}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{t("report.description")}</p>
        <ReportForm />
      </div>
    </div>
  )
}
