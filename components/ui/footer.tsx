import Link from "next/link"
import Image from "next/image"
import { Twitter, Mail } from "lucide-react"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center -ml-3">
              <Image
                src="/logowithtext.svg"
                alt="Medici"
                width={300}
                height={80}
                className="h-20 w-auto dark:invert"
                priority
              />
            </Link>
            <p className="text-neutral-800 dark:text-neutral-200 text-base max-w-xs leading-relaxed">
              A peer-to-peer platform where donors pick verified students, choose any amount and fund their education securely and directly on the blockchain
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#how-it-works" className="text-neutral-800 dark:text-neutral-200 hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-800 dark:text-neutral-200 hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-neutral-800 dark:text-neutral-200 hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacypolicy" className="text-neutral-800 dark:text-neutral-200 hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
                            <li>
                <Link href="/careers" className="text-neutral-800 dark:text-neutral-200 hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://x.com/Medici_ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 dark:text-neutral-200 hover:text-foreground transition-colors inline-flex items-center"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@medici.ac"
                  className="text-neutral-800 dark:text-neutral-200 hover:text-foreground transition-colors inline-flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/medici_ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 dark:text-neutral-200 hover:text-foreground transition-colors inline-flex items-center"
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Instagram
                </a>
              </li>
              {/* Add TikTok link with inline SVG icon */}
              <li>
                <a
                  href="https://www.tiktok.com/@medici_ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-800 dark:text-neutral-200 hover:text-foreground transition-colors inline-flex items-center"
                >
                  <Image src="/tiktok.png" alt="TikTok" width={16} height={16} className="h-4 w-4 mr-2" />
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-neutral-800 dark:text-neutral-200">
          © 2025 Medici. All rights reserved.
        </div>
      </div>
    </footer>
  )
}