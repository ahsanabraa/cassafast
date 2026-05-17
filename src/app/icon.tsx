import { ImageResponse } from 'next/og'

import type { CSSProperties } from 'react'

export const runtime = 'edge'

export const size = {
	width: 36,
	height: 36
}

const iconStyle: CSSProperties = {
	fontSize: 24,
	background: '#111111',
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'white'
}

export const contentType = 'image/png'

const Icon = () => {
	return new ImageResponse(<div style={iconStyle}>B</div>, {
		...size
	})
}

export default Icon
