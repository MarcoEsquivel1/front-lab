import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const links = [{
  label: 'Home',
  route: '/',
}, {
  label: 'Facturas',
  route: '/facturas',
}
]

export const metadata = {
  title: 'Lab 3',
  description: 'Marco René Esquivel Juárez',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`min-h-screen ${inter.className}`}>
        <header>
          <nav className="bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href={links[0].route}>
                      <p className="text-white font-bold text-lg">{links[0].label}</p>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {links.map(({ label, route }) => ( route != links[0].route &&
                        <Link href={route}>
                          <p className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{label}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
