'use client'

import { useState } from 'react'

import styles from './page.module.css'
import BottomNav from '@/components/BottomNav'
import HomePage from '@/components/HomePage'
import KeuanganPage from '@/components/KeuanganPage'
import PengajuanPage from '@/components/PengajuanPage'

export type TabType = 'home' | 'paylater' | 'keuangan' | 'akun'

const Page = () => {
	const [activeTab, setActiveTab] = useState<TabType>('home')
	const [showPengajuan, setShowPengajuan] = useState(false)

	const handlePinjam = () => {
		setShowPengajuan(true)
	}

	const handleBackFromPengajuan = () => {
		setShowPengajuan(false)
		setActiveTab('keuangan')
	}

	const renderContent = () => {
		if (showPengajuan) {
			return <PengajuanPage onBack={handleBackFromPengajuan} />
		}

		switch (activeTab) {
			case 'home':
				return <HomePage />
			case 'keuangan':
				return <KeuanganPage onPinjam={handlePinjam} />
			default:
				return <HomePage />
		}
	}

	return (
		<div className={styles.appShell}>
			<main className={styles.mainContent}>{renderContent()}</main>
			{!showPengajuan && (
				<BottomNav
					activeTab={activeTab}
					onTabChange={setActiveTab}
				/>
			)}
		</div>
	)
}

export default Page
