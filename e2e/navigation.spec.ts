import { test, expect } from '@playwright/test'

test('navigates between the main sections via the nav', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'About Me' }).first().click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/about/i)

  await page.getByRole('link', { name: 'Testimonials' }).first().click()
  await expect(page).toHaveURL(/\/testimonials$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/testimonials/i)
})

test('opens the mobile nav drawer and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/')
  await page
    .getByRole('status', { name: 'Loading' })
    .waitFor({ state: 'detached' })
    .catch(() => {})

  await page.getByRole('button', { name: 'Menu' }).click()
  await page.getByRole('link', { name: 'About Me' }).click()
  await expect(page).toHaveURL(/\/about$/)
})

test('switches the interface language', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('status', { name: 'Loading' })
    .waitFor({ state: 'detached' })
    .catch(() => {})
  await expect(page.getByRole('button', { name: /download resume/i })).toBeVisible()

  // The language trigger is the listbox button in the header.
  await page.locator('button[aria-haspopup="listbox"]').click()
  await page.getByRole('option', { name: 'PT' }).click()

  await expect(page.getByRole('button', { name: /baixar resume/i })).toBeVisible()
})
