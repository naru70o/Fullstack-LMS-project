"use client"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#1B1B1B] text-white py-12 px-6">
      <div className="container mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo section */}
          <div className="col-span-1">
            <Image src="/assets/FooterLogo.svg" alt="Cudemy Logo" width={150} height={40} className="mb-4" />
          </div>

          {/* Programming courses */}
          <div className="col-span-1">
            <ul className="space-y-3">
              <li>
                <Link href="/web-programming" className="text-gray-300 hover:text-white transition-colors">
                  Web Programming
                </Link>
              </li>
              <li>
                <Link href="/mobile-programming" className="text-gray-300 hover:text-white transition-colors">
                  Mobile Programming
                </Link>
              </li>
              <li>
                <Link href="/java-beginner" className="text-gray-300 hover:text-white transition-colors">
                  Java Beginner
                </Link>
              </li>
              <li>
                <Link href="/php-beginner" className="text-gray-300 hover:text-white transition-colors">
                  PHP Beginner
                </Link>
              </li>
            </ul>
          </div>

          {/* Design courses */}
          <div className="col-span-1">
            <ul className="space-y-3">
              <li>
                <Link href="/adobe-illustrator" className="text-gray-300 hover:text-white transition-colors">
                  Adobe Illustrator
                </Link>
              </li>
              <li>
                <Link href="/adobe-photoshop" className="text-gray-300 hover:text-white transition-colors">
                  Adobe Photoshop
                </Link>
              </li>
              <li>
                <Link href="/design-logo" className="text-gray-300 hover:text-white transition-colors">
                  Design Logo
                </Link>
              </li>
            </ul>
          </div>

          {/* Creative courses */}
          <div className="col-span-1">
            <ul className="space-y-3">
              <li>
                <Link href="/writing-course" className="text-gray-300 hover:text-white transition-colors">
                  Writing Course
                </Link>
              </li>
              <li>
                <Link href="/photography" className="text-gray-300 hover:text-white transition-colors">
                  Photography
                </Link>
              </li>
              <li>
                <Link href="/video-making" className="text-gray-300 hover:text-white transition-colors">
                  Video Making
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">Copyright © codemy 2024. All Rights Reserved</p>

          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Image src="/assets/Twitter.svg" width={20} height={20} className="w-5 h-5" alt="Twitter" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Image src="/assets/Instagram.svg" width={20} height={20} className="w-5 h-5" alt="Instagram" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <Image src="/assets/Facebook.svg" width={20} height={20} className="w-5 h-5" alt="Facebook" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
