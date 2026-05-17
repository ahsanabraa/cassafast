import {
	Banknote,
	Building2,
	Check,
	ChevronRight,
	Dice5,
	DollarSign,
	Gift,
	MapPin,
	Menu,
	MessageCircle,
	Search,
	ShoppingBag,
	ShoppingCart,
	Smartphone,
	Star,
	Tag,
	Truck,
	Tv,
	Zap
} from 'lucide-react'

import styles from './HomePage.module.css'

import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'

const categories: { id: number; label: string; Icon: LucideIcon; badge: string | null; color: string }[] = [
	{ id: 1, label: 'Pinjaman', Icon: Banknote, badge: '-10%', color: '#e8192c' },
	{ id: 2, label: 'Cicilan', Icon: Smartphone, badge: '-10%', color: '#2196f3' },
	{ id: 3, label: 'Dana Tunai', Icon: DollarSign, badge: null, color: '#ff9800' },
	{ id: 4, label: 'Hadiah', Icon: Gift, badge: null, color: '#9c27b0' },
	{ id: 5, label: 'Lucky Draw', Icon: Dice5, badge: null, color: '#f44336' },
	{ id: 6, label: 'Elektronik', Icon: Tv, badge: null, color: '#3f51b5' },
	{ id: 7, label: 'Promo', Icon: Tag, badge: null, color: '#00bcd4' },
	{ id: 8, label: 'Gratis\nOngkir', Icon: Truck, badge: 'Gratis', color: '#4caf50' },
	{ id: 9, label: 'DP Rp0', Icon: ShoppingCart, badge: 'DP0', color: '#e8192c' },
	{ id: 10, label: 'Baru', Icon: Star, badge: 'NEW', color: '#ff5722' }
]

const promoItems = [
	{
		id: 1,
		label: 'HARGA COBA',
		amount: 'Rp1.000',
		sub: 'Kuota terbatas',
		btnLabel: 'Rebut'
	},
	{
		id: 2,
		label: 'HARGA COBA',
		amount: 'Rp500',
		sub: 'Kuota terbatas',
		btnLabel: 'Rebut'
	}
]

const promoProducts: { id: number; name: string; price: string; Icon: LucideIcon }[] = [
	{ id: 1, name: 'Miliaran Subsidi', price: 'Rp8jt', Icon: Smartphone },
	{ id: 2, name: 'Mulai 1RB', price: 'Rp24rb', Icon: ShoppingBag },
	{ id: 3, name: 'Paket Hemat', price: 'Ambil 37rb', Icon: Gift }
]

const HomePage: FC = () => {
	return (
		<div className={styles.container}>
			{/* Header */}
			<header className={styles.header}>
				<div className={styles.headerTop}>
					<button
						type="button"
						id="btn-location"
						className={styles.locationBtn}>
						<MapPin size={20} />
					</button>

					<div className={styles.searchBar}>
						<input
							id="input-search"
							type="search"
							placeholder="Cari pinjaman, cicilan..."
							className={styles.searchInput}
							readOnly
						/>
						<button
							type="button"
							id="btn-search"
							className={styles.searchBtn}>
							<Search
								size={18}
								color="#fff"
							/>
						</button>
					</div>

					<div className={styles.headerActions}>
						<button
							type="button"
							id="btn-chat"
							className={styles.iconBtn}>
							<MessageCircle size={22} />
						</button>
						<button
							type="button"
							id="btn-cart"
							className={styles.iconBtn}>
							<ShoppingCart size={22} />
						</button>
					</div>
				</div>

				{/* Category Tabs */}
				<div className={styles.tabsRow}>
					{['Semua', 'Pinjaman', 'Cicilan', 'Digital', 'Promo'].map((tab, i) => (
						<button
							type="button"
							key={tab}
							id={`tab-cat-${i}`}
							className={`${styles.catTab} ${i === 0 ? styles.catTabActive : ''}`}>
							{tab}
						</button>
					))}
					<button
						type="button"
						id="tab-cat-more"
						className={styles.catTab}>
						<Menu size={16} />
					</button>
				</div>
			</header>

			{/* Quick Category Icons */}
			<section className={styles.section}>
				<div className={styles.categoryGrid}>
					{categories.map((cat) => (
						<button
							type="button"
							key={cat.id}
							id={`cat-${cat.id}`}
							className={styles.categoryItem}>
							<div
								className={styles.categoryIcon}
								style={{ background: `${cat.color}18` }}>
								<cat.Icon
									size={24}
									color={cat.color}
									strokeWidth={1.5}
								/>
								{cat.badge && (
									<span
										className={styles.categoryBadge}
										style={{
											background: cat.badge === 'Gratis' ? '#4caf50' : cat.badge === 'NEW' ? '#ff5722' : '#e8192c'
										}}>
										{cat.badge}
									</span>
								)}
							</div>
							<span className={styles.categoryLabel}>{cat.label}</span>
						</button>
					))}
				</div>
			</section>

			{/* Promo Banner */}
			<section className={styles.promoBanner}>
				<div className={styles.promoBannerHeader}>
					<h2 className={styles.promoBannerTitle}>
						<Zap
							size={16}
							color="#fff"
						/>
						Spesial Pengguna Baru
					</h2>
					<span className={styles.promoBannerIcon}>
						<Gift
							size={32}
							color="#fff"
						/>
					</span>
				</div>

				<div className={styles.promoBannerBody}>
					{promoItems.map((item) => (
						<div
							key={item.id}
							className={styles.promoRow}>
							<div className={styles.promoLeft}>
								<span className={styles.promoLeftLabel}>{item.label}</span>
							</div>
							<div className={styles.promoMid}>
								<span className={styles.promoAmount}>{item.amount}</span>
								<span className={styles.promoSub}>{item.sub}</span>
							</div>
							<button
								type="button"
								id={`btn-rebut-${item.id}`}
								className={styles.promoBtn}>
								{item.btnLabel}
							</button>
						</div>
					))}

					<div className={styles.promoProductsRow}>
						{promoProducts.map((p) => (
							<div
								key={p.id}
								className={styles.promoProduct}>
								<p.Icon
									size={28}
									color="#e8192c"
									strokeWidth={1.5}
									className={styles.promoProductIcon}
								/>
								<span className={styles.promoProductName}>{p.name}</span>
								<span className={styles.promoProductPrice}>{p.price}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Challenge Banner */}
			<section className={styles.challengeSection}>
				<div className={styles.challengeHeader}>
					<h3 className={styles.challengeTitle}>Tantangan 3 Pinjaman</h3>
					<span className={styles.challengeLink}>
						Ketentuan Promo <span>›</span>
					</span>
				</div>
				<div className={styles.challengeSteps}>
					{[1, 2, 3].map((n) => (
						<div
							key={n}
							className={`${styles.challengeStep} ${n === 1 ? styles.challengeStepActive : ''}`}>
							<div className={styles.challengeStepCircle}>
								{n === 1 ? (
									<span className={styles.challengeStepDone}>
										<Check size={10} />
									</span>
								) : (
									<span>{n}</span>
								)}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Info Banner */}
			<section className={styles.infoSection}>
				<div className={styles.infoCard}>
					<div className={styles.infoCardIcon}>
						<Building2
							size={28}
							color="#e87320"
							strokeWidth={1.5}
						/>
					</div>
					<div className={styles.infoCardContent}>
						<h3 className={styles.infoCardTitle}>Terpercaya &amp; Diawasi OJK</h3>
						<p className={styles.infoCardSub}>100% online, proses cepat!</p>
					</div>
					<span className={styles.infoCardArrow}>
						<ChevronRight
							size={20}
							color="#bbb"
						/>
					</span>
				</div>
			</section>
		</div>
	)
}

export default HomePage
