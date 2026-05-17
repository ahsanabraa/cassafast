import { Rubik } from 'next/font/google'

import type { PropsExtendChildren } from '@/types/common'
import type { Metadata, Viewport } from 'next'
import type { FC } from 'react'

import '@/styles/global.css'

const nextFont = Rubik({
	style: ['normal', 'italic'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-family',
	adjustFontFallback: false
})

export const metadata: Metadata = {
	title: 'Cassafast - Pinjaman Online Terdaftar OJK',
	description: 'Pinjaman online cepat, mudah, dan terpercaya. Terdaftar dan diawasi OJK.'
}

export const viewport: Viewport = {
	themeColor: '#e8192c'
}

const RootLayout: FC<PropsExtendChildren> = ({ children }) => {
	return (
		<html lang="id">
			<body className={`${nextFont.variable}`}>{children}</body>
		</html>
	)
}

export default RootLayout
