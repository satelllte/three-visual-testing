import { expect, type Page, test } from "@playwright/test";

test.describe("webgl page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321/");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("tsl-visual-testing - webgl");
  });

  test("has canvas with three.js webgl engine", async ({ page }) => {
    await expectThreeCanvas({ page, engine: "webgl" });
  });

  test("renders scene @visual", async ({ page }) => {
    await expectThreeCanvas({ page });
    await expect(page).toHaveScreenshot();
  });
});

test.describe("webgpu page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4321/tsl");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle("tsl-visual-testing - webgpu");
  });

  test("has canvas with three.js webgpu engine", async ({ page }) => {
    await expectThreeCanvas({ page, engine: "webgpu" });
  });

  test("renders scene @visual", async ({ page }) => {
    await expectThreeCanvas({ page, engine: "webgpu" });
    await expect(page).toHaveScreenshot();
  });
});

async function expectThreeCanvas({
  page,
  engine = "webgl",
}: {
  page: Page;
  engine?: "webgl" | "webgpu";
}): Promise<void> {
  const canvas = page.locator("canvas[data-engine]");
  await expect(canvas).toBeVisible();

  const engineAttr = await canvas.evaluate((element) =>
    element.getAttribute("data-engine"),
  );
  if (engine === "webgl") {
    await expect(engineAttr).toBe("three.js r186");
  } else {
    await expect(engineAttr).toBe("three.js r186 webgpu");
  }
}
