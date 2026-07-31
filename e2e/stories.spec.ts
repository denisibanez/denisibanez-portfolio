import { test, expect } from '@playwright/test'

// The home hero builds Instagram-style story rings from the site's own content
// (portfolio/blog/testimonials) — there is always at least one group.
test.use({ viewport: { width: 1440, height: 1000 } })

test('opens, navigates and closes the story viewer from the home rings', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: /open stories/i }).first().click()

  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()

  // Tap the next zone — the viewer stays open on the next slide.
  await dialog.getByRole('button', { name: 'Next' }).click()
  await expect(dialog).toBeVisible()

  await dialog.getByRole('button', { name: 'Close' }).click()
  await expect(dialog).toBeHidden()
})
