import { test, expect } from '@playwright/test'

test.describe('Lingerie Website', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/')

    // Wait for the page to load
    await expect(page).toHaveTitle(/Vite \+ React/)

    // Check that we can navigate
    await expect(page.locator('div')).toBeVisible()
  })

  test('navigation works', async ({ page }) => {
    await page.goto('/')

    // Test basic navigation functionality
    // This will be expanded once we have more pages
    const bodyElement = page.locator('body')
    await expect(bodyElement).toBeVisible()
  })

  test('responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    await expect(page.locator('div')).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')

    await expect(page.locator('div')).toBeVisible()
  })
})
