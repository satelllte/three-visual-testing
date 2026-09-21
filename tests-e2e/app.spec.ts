import { expect, type Page, test } from "@playwright/test";

test.describe("main page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321/");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("tsl-visual-testing");
  });

  test("has canvas with three.js engine", async ({ page }) => {
    await expectThreeCanvas({ page });
  });
});

async function expectThreeCanvas({ page }: { page: Page }): Promise<void> {
  const canvas = page.locator("canvas[data-engine]");
  await expect(canvas).toBeVisible();

  const engine = await canvas.evaluate((element) =>
    element.getAttribute("data-engine"),
  );
  await expect(engine).toBe("three.js r186");
}
