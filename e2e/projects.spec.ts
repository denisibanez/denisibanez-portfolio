import { test, expect } from '@playwright/test'

// A taller viewport so the vertically-centred tabs + carousel aren't clipped
// under the fixed header on short screens.
test.use({ viewport: { width: 1440, height: 1000 } })

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

test('drills from the detail page into the project specs', async ({ page }) => {
  await page.goto('/projects')
  await page.locator('article').first().click()
  await expect(page).toHaveURL(/\/projects\/[a-z-]+$/)

  await page.getByRole('button', { name: /view details/i }).click()
  await expect(page).toHaveURL(/\/projects\/[a-z-]+\/specs$/)
  await expect(page.getByText(/project specifications/i)).toBeVisible()
})

test('filters the carousel by kind via the tabs', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.locator('article')).toHaveCount(5)

  await page.getByRole('tab', { name: 'Study' }).click()
  await expect(page.locator('article')).toHaveCount(2)

  await page.getByRole('tab', { name: 'Client' }).click()
  await expect(page.locator('article')).toHaveCount(3)
})
