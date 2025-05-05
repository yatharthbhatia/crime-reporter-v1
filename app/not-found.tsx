"use client"

import Link from "next/link"
import { useTranslation } from "@/components/language-provider"

export default function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">
          {t("notFound.title")}
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {t("notFound.description")}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="relative inline-block rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 active:scale-95 dark:bg-primary-500 dark:hover:bg-primary-400"
          >
            {t("notFound.homeButton")}
          </Link>
          <Link
            href="/report"
            className="relative inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 active:scale-95 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
          >
            {t("notFound.reportButton")}
          </Link>
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px pt-12 sm:pt-20 md:pt-32 lg:pt-40 flex text-center justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 grid gap-2">
          {t("notFound.helpText")}{" "}
          <Link href="/contact" className="font-semibold text-primary-600 hover:text-primary-500 hover:outline-dotted hover:outline-offset-4 hover:rounded-md cursor-help dark:text-primary-400 dark:hover:text-primary-300">
            {t("notFound.contactUs")}
          </Link>
        </p>
      </div>
    </div>
  )
} 