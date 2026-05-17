'use client'

import { WifiOff } from 'lucide-react'

const OfflinePage = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100dvh',
				padding: '24px',
				gap: '1.5rem',
				fontFamily: 'var(--font-family), sans-serif',
				color: '#111111',
				backgroundColor: '#fafafa',
				textAlign: 'center'
			}}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '80px',
					height: '80px',
					borderRadius: '50%',
					backgroundColor: '#e8192c15',
					color: '#e8192c',
					marginBottom: '8px'
				}}>
				<WifiOff size={40} />
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
				<h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Koneksi Terputus</h1>
				<p style={{ fontSize: '15px', color: '#666666', margin: 0, maxWidth: '320px' }}>Anda sedang offline. Silakan periksa koneksi internet Anda dan coba lagi.</p>
			</div>
			<button
				type="button"
				onClick={() => window.location.reload()}
				style={{
					all: 'unset',
					cursor: 'pointer',
					backgroundColor: '#e8192c',
					color: '#ffffff',
					padding: '10px 24px',
					borderRadius: '24px',
					fontSize: '14px',
					fontWeight: '600',
					boxShadow: '0 4px 12px rgba(232, 25, 44, 0.2)',
					transition: 'all 0.2s'
				}}>
				Coba Lagi
			</button>
		</div>
	)
}

export default OfflinePage
