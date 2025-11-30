import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Advent Calendar 2025',
  description: 'A modern artistic Advent calendar created by @deboboy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
