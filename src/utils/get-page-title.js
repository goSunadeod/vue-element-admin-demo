import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Element Demo'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
