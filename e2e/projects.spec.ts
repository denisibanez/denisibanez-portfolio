import { test, expect } from '@playwright/test'

test('navigates to Projects from the nav and shows the carousel', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Projects' }).first().click()
  await expect(page).toHaveURL(/\/projects$/)

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  // Only published projects render (drafts are hidden from the list).
  await expect(page.locator('article')).toHaveCount(5)
})

test('opens a project detail page when a card is clicked', async ({ page }) => {
  await page.goto('/projects')

  await page.locator('article').first().click()
  await expect(page).toHaveURL(/\/projects\/[a-z-]+$/)

  // Detail page shows the case-study heading and a back control.
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('button', { name: /back to portfolio/i })).toBeVisible()
})
