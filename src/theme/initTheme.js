export const THEME_STORAGE_KEY = 'onememoria-theme-preference'

/** @typedef {'light' | 'dark'} ThemePreference */

/**
 * @returns {ThemePreference}
 */
export function readStoredPreference() {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (raw === 'light' || raw === 'dark') return raw
    if (raw === 'system') {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, 'dark')
      } catch {
        /* ignore */
      }
      return 'dark'
    }
  } catch {
    /* ignore */
  }
  return 'dark'
}

/**
 * @param {ThemePreference} pref
 */
export function resolveDark(pref) {
  return pref === 'dark'
}

/**
 * @param {ThemePreference} pref
 */
export function applyTheme(pref) {
  const dark = resolveDark(pref)
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) themeColor.setAttribute('content', dark ? '#141211' : '#f7f1ea')
}

export function initThemeFromStorage() {
  applyTheme(readStoredPreference())
}
