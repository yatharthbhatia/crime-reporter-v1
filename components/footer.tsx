"use client"

import Link from "next/link"
import { useTranslation } from "@/components/language-provider"
import { Shield } from "lucide-react"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-red-600" />
              <span className="text-lg font-bold">CyberCrime Reporter</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("footer.description")}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/report"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("nav.report")}
                </Link>
              </li>
              <li>
                <Link
                  href="/track"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("nav.track")}
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("nav.resources")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("footer.safetyTips")}
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("footer.preventionGuides")}
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("footer.faq")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("footer.termsOfService")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  {t("footer.contactUs")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CyberCrime Reporter. {t("footer.allRightsReserved")}
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
