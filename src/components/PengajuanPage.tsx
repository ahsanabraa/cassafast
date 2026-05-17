'use client'

import { ArrowLeft, Calendar, Check, CheckCircle2, Wallet, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

import styles from './PengajuanPage.module.css'

import type { FC } from 'react'

interface PengajuanPageProps {
	onBack: () => void
}

type LoanStatus = 'idle' | 'loading' | 'success' | 'failed'

const TENOR_OPTIONS = [
	{ id: 1, label: '2 Bulan', months: 2 },
	{ id: 2, label: '3 Bulan', months: 3 }
]

const STORAGE_KEY = 'cassafast-loan-count'

const formatRupiah = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

const calcCicilan = (amount: number, months: number) => Math.round(amount / months + amount * 0.05)

const PengajuanPage: FC<PengajuanPageProps> = ({ onBack }) => {
	const [loanCount, setLoanCount] = useState(0)
	const [selectedAmount, setSelectedAmount] = useState({ id: 1, label: 'Rp3jt', value: 3000000 })
	const [selectedTenor, setSelectedTenor] = useState(TENOR_OPTIONS[0])
	const [status, setStatus] = useState<LoanStatus>('idle')
	const [agreed, setAgreed] = useState(false)

	const isScenario1 = loanCount % 2 === 0

	const loanAmounts = isScenario1
		? [
				{ id: 1, label: 'Rp3jt', value: 3000000 },
				{ id: 2, label: 'Rp1,5jt', value: 1500000 }
		  ]
		: [
				{ id: 1, label: 'Rp750rb', value: 750000 },
				{ id: 2, label: 'Rp500rb', value: 500000 }
		  ]

	const getLoanCount = (): number => {
		if (typeof window === 'undefined') {
			return 0
		}

		return parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10)
	}

	const isNextSuccess = (): boolean => {
		const count = getLoanCount()

		return count % 2 === 0
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const count = parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10)

			setLoanCount(count)
			
			const isS1 = count % 2 === 0

			setSelectedAmount(isS1
				? { id: 1, label: 'Rp3jt', value: 3000000 }
				: { id: 1, label: 'Rp750rb', value: 750000 }
			)
		}
	}, [])

	const handleAjukan = () => {
		if (!agreed) {
			return
		}

		const willSucceed = isNextSuccess()

		setStatus('loading')

		setTimeout(() => {
			const currentCount = getLoanCount()

			localStorage.setItem(STORAGE_KEY, String(currentCount + 1))
			setStatus(willSucceed ? 'success' : 'failed')
		}, 2500)
	}

	const handleAjukanLagi = () => {
		setStatus('idle')
		setAgreed(false)
		setSelectedAmount(loanAmounts[0])
		setSelectedTenor(TENOR_OPTIONS[0])
	}

	const cicilan = calcCicilan(selectedAmount.value, selectedTenor.months)
	const provisi = Math.round(selectedAmount.value * 0.05)
	const danaDiterima = selectedAmount.value

	const cicilanDate = (() => {
		const d = new Date()


		d.setDate(d.getDate() + 28)

		return d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
	})()

	return (
		<div className={styles.container}>
			{/* Header */}
			<header className={styles.header}>
				<button
					type="button"
					id="btn-back-pengajuan"
					className={styles.backBtn}
					onClick={onBack}>
					<ArrowLeft size={24} />
				</button>
				<h1 className={styles.headerTitle}>Dana Cicil</h1>
				<span className={styles.headerRight}>Profil</span>
			</header>

			{/* Promo Banner */}
			<div className={styles.promoBanner}>
				<span className={styles.promoBannerBadge}>Tenor Lebih Panjang</span>
				<span className={styles.promoBannerText}>dari 2 jadi 3 bulan! Bisa tembus hingga Rp15 juta</span>
			</div>

			{/* Jumlah Pinjaman */}
			<section className={styles.section}>
				<div className={styles.sectionTitle}>
					<Wallet size={20} />
					<h2 className={styles.sectionTitleText}>Jumlah Pinjaman</h2>
				</div>
				<div className={styles.optionGrid}>
					{loanAmounts.map((item) => (
						<button
							type="button"
							key={item.id}
							id={`loan-amount-${item.id}`}
							className={`${styles.optionBtn} ${selectedAmount.id === item.id ? styles.optionBtnActive : ''}`}
							onClick={() => setSelectedAmount(item)}>
							{selectedAmount.id === item.id && (
								<span className={styles.checkBadge}>
									<Check size={10} />
								</span>
							)}
							{item.label}
						</button>
					))}
				</div>
			</section>

			{/* Tenor Pinjaman */}
			<section className={styles.section}>
				<div className={styles.sectionTitle}>
					<Calendar size={20} />
					<h2 className={styles.sectionTitleText}>Tenor Pinjaman</h2>
				</div>
				<div className={styles.optionGrid}>
					{TENOR_OPTIONS.map((item) => (
						<button
							type="button"
							key={item.id}
							id={`tenor-${item.id}`}
							className={`${styles.optionBtn} ${selectedTenor.id === item.id ? styles.optionBtnActive : ''}`}
							onClick={() => setSelectedTenor(item)}>
							{selectedTenor.id === item.id && (
								<span className={styles.checkBadge}>
									<Check size={10} />
								</span>
							)}
							{item.label}
						</button>
					))}
				</div>
			</section>

			{/* Summary */}
			<section className={styles.summaryCard}>
				<div className={styles.summaryRow}>
					<span className={styles.summaryLabel}>Rencana Pelunasan</span>
					<div className={styles.summaryRight}>
						<span className={styles.summaryValueBold}>{formatRupiah(cicilan)} ›</span>
						<span className={styles.summaryValueSub}>Cicilan ke-1 {cicilanDate}</span>
					</div>
				</div>

				<div className={styles.summaryRow}>
					<span className={styles.summaryLabel}>Rekening Penerima</span>
					<span className={styles.summaryValueBold}>BRI(7500) ›</span>
				</div>

				<div className={styles.summaryRowThin}>
					<span className={styles.summaryLabelThin}>Jumlah Pinjaman</span>
					<span className={styles.summaryValueThin}>{formatRupiah(selectedAmount.value)}</span>
				</div>

				<div className={styles.summaryRowThin}>
					<span className={styles.summaryLabelThin}>Biaya Provisi</span>
					<div className={styles.summaryProvisi}>
						<span className={styles.summaryStrike}>{formatRupiah(provisi)}</span>
						<span className={styles.summaryFree}>Rp0</span>
					</div>
				</div>

				<div className={styles.summaryRowThin}>
					<span className={styles.summaryLabelThin}>Dana Diterima</span>
					<span className={styles.summaryValueThin}>{formatRupiah(danaDiterima)}</span>
				</div>
			</section>

			{/* Tujuan Pinjaman */}
			<section className={styles.tujuanCard}>
				<span className={styles.summaryLabel}>Tujuan Pinjaman</span>
				<span className={styles.tujuanValue}>Konsumsi ›</span>
			</section>

			{/* Agreement */}
			<div className={styles.agreement}>
				<button
					type="button"
					id="btn-agree"
					className={`${styles.agreementCheck} ${agreed ? styles.agreementCheckActive : ''}`}
					onClick={() => setAgreed((v) => !v)}>
					{agreed && (
						<Check
							size={14}
							color="#fff"
						/>
					)}
				</button>
				<p className={styles.agreementText}>
					Saya telah membaca, memahami dan menyetujui <span className={styles.agreementLink}>Perjanjian, Syarat dan Ketentuan Layanan Pinjaman</span>
				</p>
			</div>

			{/* Footer Action */}
			<div className={styles.footer}>
				<div className={styles.footerAmount}>
					<span className={styles.footerAmountValue}>{formatRupiah(danaDiterima)}</span>
					<span className={styles.footerAmountLabel}>Jumlah Diterima</span>
				</div>
				<button
					type="button"
					id="btn-ajukan"
					className={`${styles.ajukanBtn} ${!agreed ? styles.ajukanBtnDisabled : ''}`}
					onClick={handleAjukan}
					disabled={!agreed || status === 'loading'}>
					{status === 'loading' ? 'Memproses...' : 'Ajukan Pinjaman'}
				</button>
			</div>

			{/* Loading Overlay */}
			{status === 'loading' && (
				<div className={styles.overlay}>
					<div className={styles.overlayCard}>
						<div className={styles.spinner} />
						<p className={styles.overlayText}>Sedang memproses pengajuan...</p>
					</div>
				</div>
			)}

			{/* Success Modal */}
			{status === 'success' && (
				<div className={styles.overlay}>
					<div className={styles.modalCard}>
						<div
							className={styles.modalIcon}
							style={{ background: '#e8f8f0' }}>
							<CheckCircle2
								size={48}
								color="#2da06e"
								strokeWidth={1.5}
							/>
						</div>
						<h2 className={styles.modalTitle}>Pengajuan Diterima!</h2>
						<p className={styles.modalMsg}>Pengajuan pinjaman sedang di tinjau, dana akan masuk dalam 1x24 jam.</p>
						<button
							type="button"
							id="btn-modal-ok-success"
							className={styles.modalBtn}
							onClick={onBack}>
							Oke, Mengerti
						</button>
					</div>
				</div>
			)}

			{/* Failed Modal */}
			{status === 'failed' && (
				<div className={styles.overlay}>
					<div className={styles.modalCard}>
						<div
							className={styles.modalIcon}
							style={{ background: '#fff0f0' }}>
							<XCircle
								size={48}
								color="#e8192c"
								strokeWidth={1.5}
							/>
						</div>
						<h2
							className={styles.modalTitle}
							style={{ color: '#e8192c' }}>
							Pengajuan Gagal
						</h2>
						<p className={styles.modalMsg}>Pengajuan pinjaman gagal, silahkan ajukan pinjaman kembali.</p>
						<button
							type="button"
							id="btn-ajukan-lagi"
							className={styles.modalBtnSecondary}
							onClick={handleAjukanLagi}>
							Ajukan Lagi
						</button>
						<button
							type="button"
							id="btn-modal-back-failed"
							className={styles.modalBtnOutline}
							onClick={onBack}>
							Kembali
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default PengajuanPage
