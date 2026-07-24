import { test, expect } from '@playwright/test'

test.use({ viewport: { width: 1440, height: 1000 } })

test('opens and closes a testimonial detail modal', async ({ page }) => {
  await page.goto('/testimonials')
  // Wait out the boot loading screen so it doesn't intercept the click.
  await page
    .getByRole('status', { name: 'Loading' })
    .waitFor({ state: 'detached' })
    .catch(() => {})

  await page.locator('article').first().click()

  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()

  await dialog.getByRole('button', { name: /close/i }).click()
  await expect(dialog).toBeHidden()
})
