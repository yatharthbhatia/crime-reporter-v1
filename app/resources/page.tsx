"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/components/language-provider"
import { FileText, AlertTriangle, Video } from "lucide-react"

export default function ResourcesPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t("resources.title")}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{t("resources.description")}</p>

        <Tabs defaultValue="articles">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="articles">{t("resources.articles")}</TabsTrigger>
            <TabsTrigger value="videos">{t("resources.videos")}</TabsTrigger>
            <TabsTrigger value="safety-tips">{t("resources.safetyTips")}</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <div className="grid gap-6 md:grid-cols-2">
              {articles.map((article, index) => (
                <ResourceCard
                  key={index}
                  icon={<FileText className="w-8 h-8 text-red-600" />}
                  title={t(article.title)}
                  description={t(article.description)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid gap-6 md:grid-cols-2">
              {videos.map((video, index) => (
                <ResourceCard
                  key={index}
                  icon={<Video className="w-8 h-8 text-red-600" />}
                  title={t(video.title)}
                  description={t(video.description)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="safety-tips">
            <div className="grid gap-6 md:grid-cols-2">
              {safetyTips.map((tip, index) => (
                <ResourceCard
                  key={index}
                  icon={<AlertTriangle className="w-8 h-8 text-red-600" />}
                  title={t(tip.title)}
                  description={t(tip.description)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ResourceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

const articles = [
  {
    title: "resources.article1Title",
    description: "resources.article1Description",
  },
  {
    title: "resources.article2Title",
    description: "resources.article2Description",
  },
  {
    title: "resources.article3Title",
    description: "resources.article3Description",
  },
  {
    title: "resources.article4Title",
    description: "resources.article4Description",
  },
]

const videos = [
  {
    title: "resources.video1Title",
    description: "resources.video1Description",
  },
  {
    title: "resources.video2Title",
    description: "resources.video2Description",
  },
  {
    title: "resources.video3Title",
    description: "resources.video3Description",
  },
  {
    title: "resources.video4Title",
    description: "resources.video4Description",
  },
]

const safetyTips = [
  {
    title: "resources.tip1Title",
    description: "resources.tip1Description",
  },
  {
    title: "resources.tip2Title",
    description: "resources.tip2Description",
  },
  {
    title: "resources.tip3Title",
    description: "resources.tip3Description",
  },
  {
    title: "resources.tip4Title",
    description: "resources.tip4Description",
  },
]
