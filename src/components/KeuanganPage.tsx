import {
	Banknote,
	Building2,
	ChevronDown,
	ChevronRight,
	CreditCard,
	Crown,
	FileText,
	MessageCircle,
	ShieldCheck,
	ShieldPlus,
	TrendingUp,
	Users
} from 'lucide-react'
import { useEffect, useState } from 'react'

import styles from './KeuanganPage.module.css'

import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'

interface KeuanganPageProps {
	onPinjam: () => void
}

const SCENARIOS = [
	{
		limit: '3.000.000',
		hasBill: false,
		billAmount: '0',
		billDays: '',
		billDueDate: ''
	},
	{
		limit: '750.000',
		hasBill: true,
		billAmount: '785.000',
		billDays: '36 hari tersisa',
		billDueDate: '18/06/2026'
	}
]

const quickLinks: { id: number; Icon: LucideIcon; color: string; label: string; badge: string | null }[] = [
	{ id: 1, Icon: TrendingUp, color: '#e8192c', label: 'Cuan 80rb', badge: '80rb' },
	{ id: 2, Icon: ShieldPlus, color: '#4caf50', label: 'Asuransi', badge: '2M' },
	{ id: 3, Icon: Building2, color: '#e8192c', label: 'Pinjaman\nBPKB', badge: '100rb' },
	{ id: 4, Icon: Users, color: '#e8192c', label: 'Ajak Teman', badge: '2M' },
	{ id: 5, Icon: CreditCard, color: '#2196f3', label: 'Bank Card', badge: null }
]

const KeuanganPage: FC<KeuanganPageProps> = ({ onPinjam }) => {
	const [loanCount, setLoanCount] = useState(0)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const count = parseInt(localStorage.getItem('cassafast-loan-count') ?? '0', 10)

			setLoanCount(count)
		}
	}, [])

	const scenario = SCENARIOS[loanCount % 2]

	return (
		<div className={styles.container}>
			{/* Header */}
			<header className={styles.header}>
				<h1 className={styles.headerTitle}>Keuangan</h1>
				<button
					type="button"
					id="btn-keuangan-chat"
					className={styles.headerChat}>
					<MessageCircle size={22} />
					<span className={styles.badge}>99+</span>
				</button>
			</header>

			{/* Tagihan */}
			<div className={styles.tagihanRow}>
				<button
					type="button"
					id="btn-tagihan"
					className={styles.tagihanBtn}>
					<span className={styles.tagihanLabel}>Tagihan saya</span>
					<ChevronDown size={16} />
				</button>
				<button
					type="button"
					id="btn-tagihan-link"
					className={styles.tagihanLink}>
					{scenario.hasBill ? 'Ada tagihan belum dibayar' : 'Tidak ada tagihan saat ini'}
					<ChevronRight size={16} />
				</button>
			</div>

			{/* Dana Cicil Card */}
			<section className={styles.mainCard}>
				<div className={styles.mainCardInner}>
					<div className={styles.mainCardHeader}>
						<div className={styles.mainCardBrand}>
							<div className={styles.brandIcon}>
								<Banknote
									size={20}
									color="#fff"
									strokeWidth={1.5}
								/>
							</div>
							<h2 className={styles.brandName}>Dana Cicil</h2>
						</div>
						<div className={styles.fastApproval}>
							<Crown
								size={14}
								color="#f59e0b"
								strokeWidth={1.5}
							/>
							<span>Persetujuan Cepat</span>
						</div>
					</div>

					<p className={styles.limitLabel}>Pinjaman hingga</p>
					<div className={styles.limitAmount}>
						<span className={styles.limitCurrency}>Rp</span>
						<span className={styles.limitNumber}>{scenario.limit}</span>
					</div>

					<div className={styles.ojkBanner}>
						<div className={styles.ojkIcon}>
							<ShieldCheck size={22} color="#c0000f" />
							<span className={styles.ojkText}>OJK</span>
						</div>
						<div className={styles.ojkContent}>
							<p className={styles.ojkTitle}>Terpercaya &amp; Diawasi OJK</p>
							<p className={styles.ojkSub}>100% online, proses cepat!</p>
						</div>
						<ChevronRight size={18} color="#bbb" />
					</div>
				</div>

				<button
					type="button"
					id="btn-pinjam-dana-cicil"
					className={styles.pinjamBtn}
					onClick={onPinjam}>
					Pinjam
				</button>
			</section>


			{/* Tagihan Card (Skenario 2) */}
			{scenario.hasBill && (
				<section className={styles.billCard}>
					<div className={styles.billHeader}>
						<div className={styles.billTitleWrap}>
							<FileText
								size={18}
								color="#e8192c"
								strokeWidth={2}
							/>
							<h3 className={styles.billTitle}>Tagihan Belum Dibayar</h3>
						</div>
					</div>

					<div className={styles.billBody}>
						<div className={styles.billLeft}>
							<div className={styles.billCurrencyWrap}>
								<span className={styles.billCurrency}>Rp</span>
								<span className={styles.billAmount}>{scenario.billAmount}</span>
							</div>
						</div>
						<button
							type="button"
							id="btn-bayar-tagihan"
							className={styles.bayarBtn}>
							Bayar
						</button>
					</div>
				</section>
			)}

			{/* Quick Links */}
			<section className={styles.quickLinks}>
				{quickLinks.map((link) => (
					<button
						type="button"
						key={link.id}
						id={`quick-${link.id}`}
						className={styles.quickItem}>
						<div className={styles.quickIconWrap}>
							<link.Icon
								size={22}
								color={link.color}
								strokeWidth={1.5}
							/>
							{link.badge && <span className={styles.quickBadge}>{link.badge}</span>}
						</div>
						<span className={styles.quickLabel}>{link.label}</span>
					</button>
				))}
			</section>
		</div>
	)
}

export default KeuanganPage


