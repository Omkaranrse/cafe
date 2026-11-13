const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PREVIEW_DIR = path.join(process.cwd(), "public", "previews");
const BASE_URL = "http://localhost:3000";

if (!fs.existsSync(PREVIEW_DIR)) fs.mkdirSync(PREVIEW_DIR, { recursive: true });

async function run() {
  console.log("Launching Chrome...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
  });

  const page = await browser.newPage();
  
  // Track console logs and errors
  page.on("console", (msg) => {
    if (msg.type() === "error") console.log("[BROWSER ERROR]:", msg.text());
  });
  page.on("pageerror", (err) => console.log("[PAGE ERROR]:", err.message));

  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 2000)));

  // 1. Hero
  console.log("Capturing Hero...");
  await page.screenshot({ path: path.join(PREVIEW_DIR, "01_hero.png") });

  // 2. Full Page Desktop
  console.log("Capturing Full Page Desktop...");
  await page.screenshot({ path: path.join(PREVIEW_DIR, "full_page_desktop.png"), fullPage: true });

  // 3. Scroll to Menu
  console.log("Scrolling to Menu...");
  await page.evaluate(() => {
    const el = document.querySelector("#menu");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 1000)));
  await page.screenshot({ path: path.join(PREVIEW_DIR, "04_menu.png") });

  // 4. Click a Menu Item Card to test Modal
  console.log("Testing Detail Modal...");
  const cardSelector = "#menu .group.cursor-pointer";
  await page.waitForSelector(cardSelector);
  await page.click(cardSelector);
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 800)));
  await page.screenshot({ path: path.join(PREVIEW_DIR, "05_modal.png") });

  // Close modal
  await page.keyboard.press("Escape");
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Close modal"]');
    if (btn) btn.click();
  });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 600)));

  // 5. Scroll to Story
  console.log("Capturing Brand Story...");
  await page.evaluate(() => {
    const el = document.querySelector("#story");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 800)));
  await page.screenshot({ path: path.join(PREVIEW_DIR, "03_story.png") });

  // 6. Scroll to Visit Us
  console.log("Capturing Visit Us...");
  await page.evaluate(() => {
    const el = document.querySelector("#visit");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 800)));
  await page.screenshot({ path: path.join(PREVIEW_DIR, "08_visit_us.png") });

  // 7. Scroll to Footer
  console.log("Capturing Footer...");
  await page.evaluate(() => {
    const el = document.querySelector("footer");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 800)));
  await page.screenshot({ path: path.join(PREVIEW_DIR, "09_footer.png") });

  // 8. Admin Page
  console.log("Navigating to Admin Portal...");
  await page.goto(`${BASE_URL}/admin`, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 1500)));
  await page.screenshot({ path: path.join(PREVIEW_DIR, "10_admin_dashboard.png") });

  // 9. Mobile Viewport Test (iPhone 15 Pro: 393 x 852)
  console.log("Testing Mobile Viewport...");
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 1500)));
  await page.screenshot({ path: path.join(PREVIEW_DIR, "11_mobile_hero.png") });

  // Scroll to mobile menu
  await page.evaluate(() => {
    const el = document.querySelector("#menu");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 800)));
  await page.screenshot({ path: path.join(PREVIEW_DIR, "12_mobile_menu.png") });

  await browser.close();
  console.log("All visual checks & screenshots completed successfully!");
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
