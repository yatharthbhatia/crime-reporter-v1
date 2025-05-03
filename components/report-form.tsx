"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/components/language-provider"
import { FileUploader } from "@/components/file-uploader"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { createReport } from "@/lib/actions"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const formSchema = z.object({
  crimeType: z.string({
    required_error: "Please select a type of cybercrime",
  }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(1000, { message: "Description must not exceed 1000 characters" }),
  contactName: z.string().optional(),
  contactEmail: z.string().email({ message: "Please enter a valid email" }).optional(),
  contactPhone: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  emergencyContact: z.string().optional(),
  isCritical: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export function ReportForm() {
  const { t } = useTranslation()
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      isAnonymous: false,
      emergencyContact: "",
      isCritical: false,
    },
  })

  const isAnonymous = form.watch("isAnonymous")

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Handle file uploads
      const fileUrls = []

      if (files.length > 0) {
        // In a real app, you would upload files to a storage service
        // and get back URLs to store with the report
        fileUrls.push("https://example.com/uploaded-file")
      }

      // Submit the form data
      const reportData = {
        ...values,
        evidenceFiles: fileUrls,
        reportDate: new Date().toISOString(),
        status: "Under Review",
        reportId: `CR-${Math.floor(100000 + Math.random() * 900000)}`, // Generate a random report ID
      }

      // Call the server action to create the report
      await createReport(reportData)

      // Show success message
      setSubmitSuccess(true)

      // Redirect to confirmation page after a delay
      setTimeout(() => {
        router.push(`/report/confirmation?id=${reportData.reportId}`)
      }, 2000)
    } catch (error) {
      console.error("Error submitting report:", error)
      setSubmitError("There was an error submitting your report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle>{t("report.successTitle")}</AlertTitle>
        <AlertDescription>{t("report.successMessage")}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {submitError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="crimeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("report.crimeType")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("report.selectCrimeType")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                  <FormDescription>{t("report.crimeTypeDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("report.description")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t("report.descriptionPlaceholder")} className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>{t("report.descriptionHelp")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">{t("report.evidenceTitle")}</h3>
              <FileUploader
                files={files}
                setFiles={setFiles}
                maxSize={MAX_FILE_SIZE}
                maxFiles={5}
                acceptedTypes={[".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"]}
              />
            </div>

            <FormField
              control={form.control}
              name="isAnonymous"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t("report.anonymousReporting")}</FormLabel>
                    <FormDescription>{t("report.anonymousDescription")}</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {!isAnonymous && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{t("report.contactDetails")}</h3>

                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("report.name")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("report.email")}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormDescription>{t("report.emailDescription")}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("report.phone")}</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="emergencyContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("report.emergencyContact")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>{t("report.emergencyContactDescription")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isCritical"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-red-600 dark:text-red-400">{t("report.criticalIncident")}</FormLabel>
                    <FormDescription>{t("report.criticalDescription")}</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
              {isSubmitting ? t("report.submitting") : t("report.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
