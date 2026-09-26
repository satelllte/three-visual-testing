import { expect, type Locator, test } from "@playwright/test";

const BASE_URL = "http://localhost:4321/three-visual-testing";

test.beforeEach(async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
});

test("has title", async ({ page }) => {
  await expect(page).toHaveTitle("three-visual-testing");
});

test("has 2 scenes", async ({ page, browserName }) => {
  skipIfUnsupported({ browserName });

  await expect(page.locator(".scene")).toHaveCount(2);

  const sceneWebGL = page.locator(".scene").nth(0);
  const sceneWebGPU = page.locator(".scene").nth(1);

  await expect(sceneWebGL).toMatchAriaSnapshot();
  await expect(sceneWebGPU).toMatchAriaSnapshot();

  await expectThreeCanvas({ locator: sceneWebGL, engine: "webgl" });
  await expectThreeCanvas({ locator: sceneWebGPU, engine: "webgpu" });
});

test("renders scenes @visual", async ({ page, browserName }) => {
  skipIfUnsupported({ browserName });

  const sceneWebGL = page.locator(".scene").nth(0);
  const sceneWebGPU = page.locator(".scene").nth(1);

  await expectThreeCanvas({ locator: sceneWebGL, engine: "webgl" });
  await expectThreeCanvas({ locator: sceneWebGPU, engine: "webgpu" });

  await expect(page).toHaveScreenshot();
});

async function expectThreeCanvas({
  locator,
  engine = "webgl",
}: {
  locator: Locator;
  engine: "webgl" | "webgpu";
}): Promise<void> {
  const canvas = locator.locator("canvas[data-engine]");
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

function skipIfUnsupported({ browserName }: { browserName: string }): void {
  test.skip(
    browserName === "firefox" && process.platform === "linux",
    "Headless Firefox on Linux has no WebGL context",
  );
}
