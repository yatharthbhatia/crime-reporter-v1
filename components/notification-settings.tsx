"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "@/components/language-provider"
import { Separator } from "@/components/ui/separator"
import { updateNotificationSettings } from "@/lib/actions"

const formSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  inAppNotifications: z.boolean().default(true),
  notificationFrequency: z.enum(["immediate", "daily", "weekly"]),
  statusUpdates: z.boolean().default(true),
  newComments: z.boolean().default(true),
  reportResolved: z.boolean().default(true),
})

type FormValues = z.infer<typeof formSchema>

export function NotificationSettings() {
  const { t } = useTranslation()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      inAppNotifications: true,
      notificationFrequency: "immediate",
      statusUpdates: true,
      newComments: true,
      reportResolved: true,
    },
  })

  async function onSubmit(values: FormValues) {
    try {
      await updateNotificationSettings(values)
      // Show success message
    } catch (error) {
      console.error("Error updating notification settings:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium">{t("account.notificationChannels")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {t("account.notificationChannelsDescription")}
          </p>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("account.emailNotifications")}</FormLabel>
                    <FormDescription>{t("account.emailNotificationsDescription")}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smsNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("account.smsNotifications")}</FormLabel>
                    <FormDescription>{t("account.smsNotificationsDescription")}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inAppNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("account.inAppNotifications")}</FormLabel>
                    <FormDescription>{t("account.inAppNotificationsDescription")}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium">{t("account.notificationFrequency")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {t("account.notificationFrequencyDescription")}
          </p>

          <FormField
            control={form.control}
            name="notificationFrequency"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="immediate" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("account.frequencyImmediate")}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="daily" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("account.frequencyDaily")}</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="weekly" />
                      </FormControl>
                      <FormLabel className="font-normal">{t("account.frequencyWeekly")}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium">{t("account.notificationTypes")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t("account.notificationTypesDescription")}</p>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="statusUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("account.statusUpdates")}</FormLabel>
                    <FormDescription>{t("account.statusUpdatesDescription")}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newComments"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("account.newComments")}</FormLabel>
                    <FormDescription>{t("account.newCommentsDescription")}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reportResolved"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("account.reportResolved")}</FormLabel>
                    <FormDescription>{t("account.reportResolvedDescription")}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-red-600 hover:bg-red-700">
            {t("account.saveSettings")}
          </Button>
        </div>
      </form>
    </Form>
  )
}
