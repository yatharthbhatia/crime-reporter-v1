"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/components/language-provider"
import { ProfileForm } from "@/components/profile-form"
import { SecuritySettings } from "@/components/security-settings"
import { NotificationSettings } from "@/components/notification-settings"

export default function AccountPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t("account.title")}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{t("account.description")}</p>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">{t("account.profile")}</TabsTrigger>
            <TabsTrigger value="security">{t("account.security")}</TabsTrigger>
            <TabsTrigger value="notifications">{t("account.notifications")}</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>{t("account.profileTitle")}</CardTitle>
                <CardDescription>{t("account.profileDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>{t("account.securityTitle")}</CardTitle>
                <CardDescription>{t("account.securityDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <SecuritySettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>{t("account.notificationsTitle")}</CardTitle>
                <CardDescription>{t("account.notificationsDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationSettings />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
