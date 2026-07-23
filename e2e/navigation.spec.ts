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

test('switches the interface language', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('button', { name: /download resume/i })).toBeVisible()

  await page.getByRole('button', { name: /EN/ }).click()
  await page.getByRole('option', { name: 'PT' }).click()

  await expect(page.getByRole('button', { name: /baixar resume/i })).toBeVisible()
})
