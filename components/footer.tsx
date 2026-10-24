import Link from "next/link"
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Phone className="mr-2 text-white-600" size={20} />
            <span className="text-white-600">+57 3137572292</span>
          </div>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" className="text-white-600 hover:text-gray-900">
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://twitter.com" className="text-white-600 hover:text-gray-900">
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://linkedin.com" className="text-white-600 hover:text-gray-900">
              <LinkedIn size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-white/80">
          © 2023 Ing. Xiomara H. Melguizo Martinez. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

