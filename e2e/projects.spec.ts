import process from 'node:process'
import { test, expect } from '@playwright/test'
import { projects } from '../src/data/projects'

// Counts are derived from the real data so the suite survives new projects.
// Mirror useProjects' visibility rule: drafts show only in dev. CI runs the
// production preview (drafts hidden); local runs the dev server (drafts shown) —
// the webServer command switches on the same `CI` flag.
const visible = projects.filter((p) => !process.env.CI || p.status !== 'draft')
const allCount = visible.length
const studyCount = visible.filter((p) => p.kind === 'study').length
const clientCount = visible.filter((p) => p.kind === 'client').length

// A taller viewport so the vertically-centred tabs + carousel aren't clipped
// under the fixed header on short screens.
test.use({ viewport: { width: 1440, height: 1000 } })

test('navigates to Projects from the nav and shows the carousel', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Projects' }).first().click()
  await expect(page).toHaveURL(/\/projects$/)

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  // Only published projects render (drafts are hidden from the list in prod).
  await expect(page.locator('article')).toHaveCount(allCount)
})

test('opens a project detail page when a card is clicked', async ({ page }) => {
  await page.goto('/projects')

  await page.locator('article').first().click()
  await expect(page).toHaveURL(/\/projects\/[a-z-]+$/)

  // Detail page shows the case-study heading and a back control.
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: /back to portfolio/i })).toBeVisible()
})

test('drills from the detail page into the project specs', async ({ page }) => {
  await page.goto('/projects')
  await page.locator('article').first().click()
  await expect(page).toHaveURL(/\/projects\/[a-z-]+$/)

  await page.getByRole('link', { name: /view details/i }).click()
  await expect(page).toHaveURL(/\/projects\/[a-z-]+\/specs$/)
  await expect(page.getByText(/project specifications/i)).toBeVisible()
})

test('filters the carousel by kind via the tabs', async ({ page }) => {
  await page.goto('/projects')
  await expect(page.locator('article')).toHaveCount(allCount)

  await page.getByRole('tab', { name: 'Study' }).click()
  await expect(page.locator('article')).toHaveCount(studyCount)

  await page.getByRole('tab', { name: 'Client' }).click()
  await expect(page.locator('article')).toHaveCount(clientCount)
})
