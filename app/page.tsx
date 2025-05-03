"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/language-provider"
import { Shield, FileText, BookOpen } from "lucide-react"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("home.title")}</h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {t("home.subtitle")}
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                  <Link href="/report">{t("home.reportButton")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/resources">{t("home.learnButton")}</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-full opacity-20 blur-3xl"></div>
                <div className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-8 rounded-lg shadow-lg">
                  <Shield className="w-16 h-16 text-red-600 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{t("home.safetyFirst")}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{t("home.safetyDescription")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{t("home.featuresTitle")}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">{t("home.featuresSubtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-red-600" />}
              title={t("home.feature1Title")}
              description={t("home.feature1Description")}
            />
            <FeatureCard
              icon={<FileText className="w-10 h-10 text-red-600" />}
              title={t("home.feature2Title")}
              description={t("home.feature2Description")}
            />
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-red-600" />}
              title={t("home.feature3Title")}
              description={t("home.feature3Description")}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("home.ctaTitle")}</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {t("home.ctaSubtitle")}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
                <Link href="/report">{t("home.reportNow")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/track">{t("home.trackReport")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}
