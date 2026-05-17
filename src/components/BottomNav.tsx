import { CreditCard, Home, User, Wallet } from 'lucide-react'

import styles from './BottomNav.module.css'

import type { TabType } from '@/app/page'
import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'

interface BottomNavProps {
	activeTab: TabType
	onTabChange: (tab: TabType) => void
}

const tabs: { id: TabType; label: string; Icon: LucideIcon }[] = [
	{ id: 'home', label: 'Cassafast', Icon: Home },
	{ id: 'paylater', label: 'PayLater', Icon: CreditCard },
	{ id: 'keuangan', label: 'Keuangan', Icon: Wallet },
	{ id: 'akun', label: 'Akun', Icon: User }
]

const BottomNav: FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
	return (
		<nav className={styles.nav}>
			{tabs.map(({ id, label, Icon }) => (
				<button
					type="button"
					key={id}
					id={`tab-${id}`}
					className={`${styles.tab} ${activeTab === id ? styles.active : ''}`}
					onClick={() => onTabChange(id)}>
					<span className={styles.iconWrap}>
						<Icon size={24} />
					</span>
					<span className={styles.label}>{label}</span>
				</button>
			))}
		</nav>
	)
}

export default BottomNav
