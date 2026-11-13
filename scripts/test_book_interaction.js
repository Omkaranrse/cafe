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
  
  console.log(`Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 1500)));

  // 1. Hero with closed book
  console.log("Capturing Hero with closed book...");
  await page.screenshot({ path: path.join(PREVIEW_DIR, "hero_book_closed.png") });

  // 2. Click the book to flip to Page 1 & 2
  console.log("Clicking book to turn first page...");
  const bookSelector = "#home [style*='preserve-3d']";
  await page.waitForSelector(bookSelector);
  await page.click(bookSelector);
  
  // Wait for 3D flip animation (0.7s) to complete
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 1200)));
  console.log("Capturing Hero with book flipped open...");
  await page.screenshot({ path: path.join(PREVIEW_DIR, "hero_book_page_1_2.png") });

  // 3. Click again to turn next page
  console.log("Clicking book to turn to next page...");
  await page.click(bookSelector);
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 1200)));
  console.log("Capturing Hero with second page turn...");
  await page.screenshot({ path: path.join(PREVIEW_DIR, "hero_book_page_3_4.png") });

  // 4. Test Mobile Viewport
  console.log("Testing mobile viewport with book...");
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 1200)));
  await page.screenshot({ path: path.join(PREVIEW_DIR, "hero_book_mobile.png") });

  await browser.close();
  console.log("Interactive book test completed successfully!");
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});

