import { test, expect } from '@playwright/test'

test('navigates to Projects from the nav and shows the carousel', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Projects' }).first().click()
  await expect(page).toHaveURL(/\/projects$/)

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  // At least a few project cards render.
  await expect(page.locator('article')).toHaveCount(6)
})
