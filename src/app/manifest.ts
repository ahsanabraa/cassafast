import type { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => {
	return {
		name: 'Cassafast - Pinjaman Online Terdaftar OJK',
		short_name: 'Cassafast',
		start_url: '/',
		id: 'cassafast',
		theme_color: '#e8192c',
		background_color: '#FFFFFF',
		display: 'standalone',
		scope: '/',
		categories: ['keuangan', 'pinjaman'],
		description: 'Pinjaman online cepat, mudah, dan terpercaya. Terdaftar dan diawasi OJK.',
		orientation: 'portrait',
		icons: [
			{
				src: '/icons/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable'
			},
			{
				src: '/icons/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			}
		],
		screenshots: [
			{
				src: '/images/screenshoot1.png',
				sizes: '1992x1773',
				type: 'image/png',
				form_factor: 'wide'
			},
			{
				src: '/images/screenshoot2.png',
				sizes: '1992x1773',
				type: 'image/png',
				form_factor: 'wide'
			},
			{
				src: '/images/home.jpeg',
				sizes: '739x1600',
				type: 'image/jpeg',
				form_factor: 'narrow'
			},
			{
				src: '/images/keuangan.jpeg',
				sizes: '739x1600',
				type: 'image/jpeg',
				form_factor: 'narrow'
			},
			{
				src: '/images/pengajuan.jpeg',
				sizes: '739x1600',
				type: 'image/jpeg',
				form_factor: 'narrow'
			}
		],
		lang: 'id-ID'
	}
}

export default manifest
