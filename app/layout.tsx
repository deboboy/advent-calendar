import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Give Advent Calendar 2023',
  description: 'created by @deboboy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
