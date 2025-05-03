"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useTranslation } from "@/components/language-provider"
import { Menu, X, Shield } from "lucide-react"
import { UserNav } from "@/components/user-nav"

export default function Navbar() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-600" />
            <span className="text-lg font-bold">CyberCrime Reporter</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            {t("nav.home")}
          </Link>
          <Link href="/report" className="text-sm font-medium transition-colors hover:text-primary">
            {t("nav.report")}
          </Link>
          <Link href="/track" className="text-sm font-medium transition-colors hover:text-primary">
            {t("nav.track")}
          </Link>
          <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
            {t("nav.resources")}
          </Link>
          <Link href="/feedback" className="text-sm font-medium transition-colors hover:text-primary">
            {t("nav.feedback")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ModeToggle />
          <UserNav />

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/report"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.report")}
            </Link>
            <Link
              href="/track"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.track")}
            </Link>
            <Link
              href="/resources"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.resources")}
            </Link>
            <Link
              href="/feedback"
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("nav.feedback")}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
