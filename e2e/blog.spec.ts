import process from 'node:process'
import { test, expect } from '@playwright/test'
import { posts } from '../src/data/blog'

// Mirror useBlog's visibility rule (drafts show only in dev). CI runs the prod
// preview; local runs dev. Counts derive from the data so the suite survives
// new posts.
const visible = posts.filter((p) => !process.env.CI || p.status !== 'draft')
const PER_PAGE = 3

test.use({ viewport: { width: 1440, height: 1000 } })

test('navigates to the blog from the nav and lists a page of posts', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Blog' }).first().click()
  await expect(page).toHaveURL(/\/blog$/)

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('article')).toHaveCount(Math.min(PER_PAGE, visible.length))
})

test('opens a post detail page from a card', async ({ page }) => {
  await page.goto('/blog')

  await page.locator('article a').first().click()
  await expect(page).toHaveURL(/\/blog\/[a-z0-9-]+$/)

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: /back to the blog/i })).toBeVisible()
})

test('paginates to the next page of posts', async ({ page }) => {
  await page.goto('/blog')

  const firstBefore = await page.locator('article h2').first().textContent()
  await page.getByRole('button', { name: 'Next' }).click()

  await expect(page.locator('article')).toHaveCount(Math.min(PER_PAGE, visible.length - PER_PAGE))
  await expect(page.locator('article h2').first()).not.toHaveText(firstBefore ?? '')
})
