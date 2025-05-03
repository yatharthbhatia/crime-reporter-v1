"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { submitFeedback } from "@/lib/actions"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  feedbackType: z.string({
    required_error: "Please select a feedback type",
  }),
  rating: z.string({
    required_error: "Please select a rating",
  }),
  message: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters" })
    .max(500, { message: "Feedback must not exceed 500 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export function FeedbackForm() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      // Submit the feedback
      await submitFeedback(values)

      // Show success message
      setSubmitSuccess(true)

      // Reset the form
      form.reset()
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle>{t("feedback.successTitle")}</AlertTitle>
        <AlertDescription>{t("feedback.successMessage")}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("feedback.name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("feedback.namePlaceholder")} {...field} />
                  </FormControl>
                  <FormDescription>{t("feedback.nameOptional")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("feedback.email")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("feedback.emailPlaceholder")} {...field} />
                  </FormControl>
                  <FormDescription>{t("feedback.emailOptional")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="feedbackType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("feedback.type")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("feedback.selectType")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">{t("feedback.types.general")}</SelectItem>
                      <SelectItem value="bug">{t("feedback.types.bug")}</SelectItem>
                      <SelectItem value="feature">{t("feedback.types.feature")}</SelectItem>
                      <SelectItem value="usability">{t("feedback.types.usability")}</SelectItem>
                      <SelectItem value="other">{t("feedback.types.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("feedback.rating")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("feedback.selectRating")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5">{t("feedback.ratings.excellent")}</SelectItem>
                      <SelectItem value="4">{t("feedback.ratings.good")}</SelectItem>
                      <SelectItem value="3">{t("feedback.ratings.average")}</SelectItem>
                      <SelectItem value="2">{t("feedback.ratings.poor")}</SelectItem>
                      <SelectItem value="1">{t("feedback.ratings.veryPoor")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("feedback.message")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("feedback.messagePlaceholder")} className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>{t("feedback.messageHelp")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
              {isSubmitting ? t("feedback.submitting") : t("feedback.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
