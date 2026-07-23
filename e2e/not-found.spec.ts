import { test, expect } from '@playwright/test'

test('shows the 404 page for an unknown route and returns home', async ({ page }) => {
  await page.goto('/definitely-not-a-real-page')

  const back = page.getByRole('button', { name: /back to home/i })
  await expect(back).toBeVisible()

  await back.click()
  await expect(page).toHaveURL(/\/$/)
})
