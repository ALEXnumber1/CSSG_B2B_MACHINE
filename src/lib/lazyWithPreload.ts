import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

type Module<T> = { default: T }

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- same constraint as React.lazy
export type PreloadableComponent<T extends ComponentType<any>> = LazyExoticComponent<T> & {
  preload: () => Promise<Module<T>>
}

/**
 * React.lazy plus a `preload()` that can be awaited before the first render.
 *
 * Once preloaded, the factory hands React a synchronously-resolving thenable, so the component
 * renders on the first pass without suspending. main.tsx relies on this to replace the prerendered
 * HTML with identical markup instead of flashing the Suspense fallback.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithPreload<T extends ComponentType<any>>(factory: () => Promise<Module<T>>): PreloadableComponent<T> {
  let loaded: Module<T> | undefined
  let pending: Promise<Module<T>> | undefined
  const preload = () => (pending ??= factory().then(m => (loaded = m)))
  const Component = lazy(() =>
    loaded ? ({ then: (resolve: (m: Module<T>) => void) => resolve(loaded!) } as unknown as Promise<Module<T>>) : preload()
  ) as PreloadableComponent<T>
  Component.preload = preload
  return Component
}
