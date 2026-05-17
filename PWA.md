# PWA SETUP

## INSTALLATIONS

1. ```bash
   pnpm add serwist @serwist/turbopack -D
   ```

````

## FILES MODIFY

1. update `[root]/next.config.ts`

```ts
import { withSerwist } from '@serwist/turbopack'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // existing config
}

export default withSerwist(nextConfig)
````

2. create `[root]/tsconfig.worker.json`

```json
{
	"extends": "./tsconfig.json",
	"compilerOptions": {
		"lib": ["webworker", "esnext", "webworker.importscripts"],
		"allowSyntheticDefaultImports": true,
		"types": ["node"]
	},
	"include": ["src/app/sw.ts"],
	"exclude": ["node_modules"]
}
```

3. update `[root]/tsconfig.json`

```json
{
	"compilerOptions": {
		// existing options
		"lib": ["dom", "dom.iterable", "esnext", "webworker"] // add "webworker"
	},
	"exclude": ["node_modules", "src/app/sw.ts"], // add "src/app/sw.ts"
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".next/dev/types/**/*.ts"]
}
```

4. update `[root]/eslint.config.mjs`

```mjs
import jsEslint from '@eslint/js'
import next from '@next/eslint-plugin-next'
import pluginImport from 'eslint-plugin-import-x'
import globals from 'globals'
import stylistic from '@stylistic/eslint-plugin'
import eslintReact from '@eslint-react/eslint-plugin'
import tsEslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

const eslintConfig = defineConfig([
	{
		ignores: ['**/node_modules/**', '**/.next/**', '**/.git/**', '**/.vscode/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts']
	},

	{
		files: ['**/*.{ts,tsx}'],
		ignores: ['src/app/sw.ts'], // add this line to exclude sw.ts from eslint
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: tsEslint.parser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: import.meta.dirname
			},
			globals: {
				...globals.node,
				...globals.browser
			}
		},
		plugins: {
			import: pluginImport,
			'@stylistic': stylistic,
			'@next/next': next
		},
		extends: [jsEslint.configs.recommended, tsEslint.configs.recommended, eslintReact.configs['strict-typescript']],
		rules: {
			...next.configs.recommended.rules,
			...next.configs['core-web-vitals'].rules,
			'@typescript-eslint/no-base-to-string': 'error',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/unbound-method': 'error',
			'no-template-curly-in-string': 'off',
			'no-misleading-character-class': 'off',
			'no-unsafe-optional-chaining': 'off',
			'no-undef': 'off',
			'no-mixed-spaces-and-tabs': 'off',
			'no-unused-vars': 'off',
			'no-dupe-keys': 'error',
			'no-console': ['warn', { allow: ['warn', 'error', 'info', 'table'] }],
			'no-extra-boolean-cast': 'off',
			'@eslint-react/no-missing-key': 'error',
			'@eslint-react/no-missing-component-display-name': 'off',
			'@eslint-react/jsx-no-useless-fragment': 'off',
			'@eslint-react/no-array-index-key': 'off',
			'@eslint-react/no-clone-element': 'off',
			'@eslint-react/dom-no-dangerously-set-innerhtml': 'off',
			'prefer-const': 'warn',
			'no-control-regex': 'off',
			'@stylistic/padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: '*', next: 'return' },
				{ blankLine: 'always', prev: 'directive', next: '*' },
				{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
				{ blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
				{ blankLine: 'always', prev: 'block-like', next: '*' },
				{ blankLine: 'always', prev: '*', next: 'block-like' },
				{ blankLine: 'always', prev: ['multiline-const'], next: '*' },
				{ blankLine: 'always', prev: '*', next: ['multiline-const'] },
				{ blankLine: 'always', prev: '*', next: ['if', 'for', 'switch', 'try', 'while'] },
				{ blankLine: 'always', prev: ['if', 'for', 'switch', 'try', 'while'], next: '*' },
				{ blankLine: 'always', prev: 'import', next: '*' },
				{ blankLine: 'any', prev: 'import', next: 'import' },
				{ blankLine: 'always', prev: '*', next: 'export' },
				{ blankLine: 'always', prev: '*', next: ['interface', 'type', 'return'] },
				{ blankLine: 'always', prev: ['interface', 'type'], next: '*' }
			],
			'@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
			'@stylistic/jsx-child-element-spacing': 'error',
			'@stylistic/jsx-pascal-case': ['error', { allowNamespace: true }],
			'@stylistic/jsx-self-closing-comp': 'error',
			'arrow-parens': ['error', 'always'],
			'no-self-compare': 'error',
			'no-case-declarations': 'error',
			curly: ['error', 'all'],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],
			'sort-imports': [
				'error',
				{
					ignoreCase: true,
					ignoreDeclarationSort: true,
					ignoreMemberSort: false,
					allowSeparatedGroups: false
				}
			],
			'import/order': [
				'error',
				{
					groups: [['builtin', 'external'], ['internal', 'parent', 'sibling', 'index'], 'type', 'object', 'unknown'],
					alphabetize: { order: 'asc', caseInsensitive: true },
					'newlines-between': 'always',
					pathGroups: [
						{
							pattern: '@/**',
							group: 'internal'
						}
					],
					pathGroupsExcludedImportTypes: ['type']
				}
			],
			'no-restricted-syntax': [
				'error',
				{
					selector: `JSXElement[openingElement.name.name='pre'] > JSXExpressionContainer > CallExpression[callee.object.name='JSON'][callee.property.name='stringify'][arguments.length>=3]`,
					message: `Don't leave JSON.stringify inside <pre> in production code.`
				}
			],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					fixStyle: 'separate-type-imports'
				}
			],
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
			'import/no-duplicates': ['error', { 'prefer-inline': false }],
			'import/no-namespace': 'error'
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json'
				}
			}
		}
	},
	// add this config for sw.ts
	{
		files: ['src/app/sw.ts'],
		languageOptions: {
			parser: tsEslint.parser,
			parserOptions: {
				project: './tsconfig.worker.json'
			},
			globals: {
				...globals.serviceworker
			}
		},
		rules: {
			...tsEslint.configs.recommended.rules,
			'no-restricted-globals': 'off'
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.worker.json'
				}
			}
		}
	}
])

export default eslintConfig
```

5. create `[root]/src/app/sw.ts`

```ts
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from '@serwist/turbopack/worker'
import { Serwist } from 'serwist'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
declare global {
	interface WorkerGlobalScope extends SerwistGlobalConfig {
		__SW_MANIFEST: (PrecacheEntry | string)[] | undefined
	}
}
declare const self: ServiceWorkerGlobalScope
const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: defaultCache,
	fallbacks: {
		entries: [
			{
				url: '/~offline',
				matcher({ request }) {
					return request.destination === 'document'
				}
			}
		]
	}
})
serwist.addEventListeners()
```

6. create `[root]/src/app/serwist.ts`

```ts
'use client'

export { SerwistProvider } from '@serwist/turbopack/react'
```

7. create `[root]/src/types/pwa.d.ts`

```ts
interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[]
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed'
		platform: string
	}>
	prompt(): Promise<void>
}

interface WindowEventMap {
	beforeinstallprompt: BeforeInstallPromptEvent
}
```

8. create `[root]/src/app/serwist/[path]/route.ts`

```tsx
import { createSerwistRoute } from '@serwist/turbopack'
import { spawnSync } from 'node:child_process'

const revision = spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).stdout?.trim() ?? crypto.randomUUID()

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute({
	additionalPrecacheEntries: [{ url: '/~offline', revision }],
	swSrc: 'src/app/sw.ts',
	useNativeEsbuild: true
})
```

9. create `[root]/src/app/~offline/page.tsx`

```tsx
const OfflinePage = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				gap: '1rem',
				fontFamily: 'var(--font-family), sans-serif',
				color: '#333333'
			}}>
			<h1>You are offline</h1>
			<p>Please check your internet connection and try again.</p>
		</div>
	)
}

export default OfflinePage
```

10. create `[root]/src/components/ButtonPwaInstall/ButtonPwaInstall.tsx`

```tsx
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
```

11. create `[root]/src/components/ButtonPwaInstall/ButtonPwaInstall.module.css`

```css
.installBtn {
	background-color: var(--olx-dark);
	color: white;
	padding: 0.75rem 1.5rem;
	border-radius: var(--radius-sm);
	font-weight: 800;
	font-size: 0.9rem;
	transition: all 0.2s;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	border: 2px solid var(--olx-dark);
}

.installBtn:hover {
	background-color: white;
	color: var(--olx-dark);
}
```

12. create `[root]/src/app/layout.tsx`

```tsx
import type { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => {
	return {
		name: 'lox',
		short_name: 'lox',
		start_url: '/',
		id: 'lox',
		theme_color: '#FFFFFF',
		background_color: '#FFFFFF',
		display: 'standalone',
		scope: '/',
		categories: ['jual', 'beli'],
		description: 'lox',
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
				type: 'image/png'
			},
			{
				src: '/images/screenshoot2.png',
				sizes: '1992x1773',
				type: 'image/png'
			}
		],
		lang: 'id-ID'
	}
}

export default manifest
```

> `screenshoot1.png` and `screenshoot2.png` must strict sizes 1992x1773 and type png (generate by ai if not exist/possible based on project context)

13. modify `[root]/src/app/layout.tsx`

```tsx
export const metadata: Metadata = {
	applicationName: 'LOX', // based on project context
	title: 'LOX - Gadget & Tech Store', // based on project context
	description: 'Jual beli smartphone, laptop, dan monitor berkualitas tinggi dengan harga terbaik.', // based on project context
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'Lox'
	},
	formatDetection: {
		telephone: false
	},
	robots: {
		index: false,
		follow: false,
		googleBot: {
			index: false,
			follow: false
		}
	}
}

export const viewport: Viewport = {
	themeColor: '#0066FF', // based on project color scheme
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,1
	userScalable: false,
	viewportFit: 'cover'
}
```

14. add `ButtonPwaInstall` to homepage or footer
