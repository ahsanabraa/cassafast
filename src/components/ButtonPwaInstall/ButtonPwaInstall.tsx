'use client'

import { Download } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import styles from './ButtonPwaInstall.module.css'

import type { FC } from 'react'

const PwaInstallButton: FC = () => {
	const [show, setShow] = useState(false)
	const installPromptRef = useRef<BeforeInstallPromptEvent | null>(null)

	const disableInAppInstallPrompt = useCallback(() => {
		installPromptRef.current = null
		setShow(false)
	}, [])

	useEffect(() => {
		const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
			event.preventDefault()
			installPromptRef.current = event
			setShow(true)
		}

		const handleAppInstalled = () => {
			disableInAppInstallPrompt()
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
		window.addEventListener('appinstalled', handleAppInstalled)

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
			window.removeEventListener('appinstalled', handleAppInstalled)
		}
	}, [disableInAppInstallPrompt])

	const handleInstall = async () => {
		if (!installPromptRef.current) {
			return
		}

		try {
			await installPromptRef.current.prompt()
		} catch {
			// safe to ignore
			return
		}

		disableInAppInstallPrompt()
	}

	if (!show) {
		return null
	}

	return (
		<button
			type="button"
			className={styles.installBtn}
			onClick={handleInstall}>
			<Download size={18} />
			Pasang Aplikasi
		</button>
	)
}

export default PwaInstallButton
