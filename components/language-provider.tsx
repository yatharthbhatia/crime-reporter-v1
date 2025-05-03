"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { en } from "@/locales/en"
import { hi } from "@/locales/hi"

type Locale = "en" | "hi"
type Translations = typeof en

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const translations: Record<Locale, Translations> = {
    en,
    hi,
  }

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[locale]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Fallback to key if translation not found
      }
    }

    return value as string
  }

  return <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }

  return context
}
