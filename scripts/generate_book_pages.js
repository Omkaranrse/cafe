const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = path.join(process.cwd(), "public", "images", "book");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Convert local image to base64 data url for self-contained rendering
function getBase64Image(filename) {
  const filePath = path.join(process.cwd(), "public", "images", filename);
  if (!fs.existsSync(filePath)) return "";
  const ext = path.extname(filename).toLowerCase() === ".png" ? "png" : "jpeg";
  return `data:image/${ext};base64,${fs.readFileSync(filePath).toString("base64")}`;
}

const images = {
  interior: getBase64Image("cafe-interior-vibe.jpg"),
  latte: getBase64Image("latte-art.jpg"),
  flatWhite: getBase64Image("flat-white.jpg"),
  espresso: getBase64Image("espresso.jpg"),
  lambBox: getBase64Image("persian-lamb-box.jpg"),
  pancakes: getBase64Image("stacked-pancakes.jpg"),
  brownie: getBase64Image("chocolate-brownie.jpg"),
  barista: getBase64Image("cafe-barista.jpg"),
  community: getBase64Image("cafe-community.jpg"),
};

const pages = [
  // 1. FRONT COVER
  {
    name: "00_front_cover.jpg",
    html: `
      <div style="width: 800px; height: 1200px; background: #492512; color: #F8F1E9; font-family: -apple-system, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding: 70px 60px; box-sizing: border-box; position: relative; overflow: hidden; border-left: 12px solid #361a0c;">
        <!-- Texture & Border Overlay -->
        <div style="position: absolute; inset: 24px; border: 2px solid rgba(196, 122, 67, 0.4); border-radius: 8px; pointer-events: none;"></div>
        <div style="position: absolute; inset: 30px; border: 1px solid rgba(196, 122, 67, 0.2); border-radius: 6px; pointer-events: none;"></div>
        
        <!-- Top Tagline -->
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 15px; letter-spacing: 4px; text-transform: uppercase; color: #C47A43; font-weight: 700;">VOL. 01 · 2026</span>
            <span style="font-size: 15px; letter-spacing: 3px; text-transform: uppercase; color: #D7BDA5;">EST. SELLY OAK</span>
          </div>
          <div style="height: 1px; background: rgba(196, 122, 67, 0.3); margin-top: 20px;"></div>
        </div>

        <!-- Center Branding Lockup -->
        <div style="text-align: center; position: relative; z-index: 1; margin: auto 0;">
          <div style="width: 90px; height: 90px; margin: 0 auto 30px; border: 2px solid #C47A43; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(196, 122, 67, 0.1);">
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#C47A43" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </div>
          <h1 style="font-family: Georgia, serif; font-size: 78px; font-weight: normal; letter-spacing: -1px; margin: 0; line-height: 0.95; color: #F8F1E9;">
            CAFE FACE
          </h1>
          <p style="font-family: cursive, sans-serif; font-size: 30px; color: #C47A43; margin: 18px 0 0 0;">
            Good Coffee. Better Moments.
          </p>
          <div style="width: 60px; height: 2px; background: #C47A43; margin: 30px auto;"></div>
          <p style="font-size: 16px; letter-spacing: 5px; text-transform: uppercase; color: #D7BDA5; margin: 0;">
            THE ARTISAN LOOKBOOK
          </p>
        </div>

        <!-- Bottom Footer -->
        <div style="text-align: center; position: relative; z-index: 1;">
          <div style="display: inline-block; padding: 12px 28px; border-radius: 999px; background: rgba(196, 122, 67, 0.18); border: 1px solid rgba(196, 122, 67, 0.5); font-size: 14px; letter-spacing: 2px; text-transform: uppercase; color: #F8F1E9; font-weight: 600;">
            CLICK TO OPEN & TURN PAGES ↗
          </div>
          <p style="font-size: 13px; color: #D7BDA5; margin: 20px 0 0 0; letter-spacing: 1.5px;">
            519 BRISTOL ROAD · BIRMINGHAM B29 6AU
          </p>
        </div>
      </div>
    `,
  },

  // 2. PAGE 1: BEAUTIFUL CAFE FACE INTERIOR PHOTOGRAPHY
  {
    name: "01_page_interior.jpg",
    html: `
      <div style="width: 800px; height: 1200px; background: #F8F1E9; color: #492512; font-family: -apple-system, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding: 60px 50px; box-sizing: border-box; position: relative;">
        <!-- Top Page Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(73, 37, 18, 0.15); padding-bottom: 16px;">
          <span style="font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #C47A43; font-weight: 700;">CHAPTER 01</span>
          <span style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: rgba(73, 37, 18, 0.6);">THE SPACE</span>
          <span style="font-size: 13px; font-family: Georgia, serif; font-weight: bold;">01</span>
        </div>

        <!-- Headline & Story -->
        <div style="margin: 24px 0 20px 0;">
          <h2 style="font-family: Georgia, serif; font-size: 44px; margin: 0 0 12px 0; color: #492512; line-height: 1.1;">
            A Sanctuary of Warmth & Light
          </h2>
          <p style="font-size: 16px; line-height: 1.6; color: rgba(73, 37, 18, 0.8); margin: 0; max-width: 660px;">
            Designed as an intimate urban retreat in Selly Oak. Warm timber, soft natural sunlight, rich espresso aromas, and thoughtfully arranged seating for deep study sessions and effortless conversations.
          </p>
        </div>

        <!-- Large Interior Photo -->
        <div style="flex: 1; border-radius: 20px; overflow: hidden; position: relative; box-shadow: 0 15px 35px rgba(73, 37, 18, 0.12); margin-bottom: 24px;">
          <img src="${images.interior}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 18px; left: 18px; background: rgba(73, 37, 18, 0.88); color: #F8F1E9; padding: 8px 18px; border-radius: 999px; font-size: 13px; letter-spacing: 1px; backdrop-filter: blur(8px);">
            519 Bristol Road · Front Espresso Bar
          </div>
        </div>

        <!-- Bottom Spec Note -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: rgba(73, 37, 18, 0.65); border-top: 1px solid rgba(73, 37, 18, 0.12); pt-3; padding-top: 14px;">
          <span>High-Speed Wi-Fi · Power Outlets · Student Hub</span>
          <span style="color: #C47A43; font-weight: 600;">Open Daily 9 AM – 4 PM</span>
        </div>
      </div>
    `,
  },

  // 3. PAGE 2: SIGNATURE COFFEE COLLECTION
  {
    name: "02_page_coffee.jpg",
    html: `
      <div style="width: 800px; height: 1200px; background: #F8F1E9; color: #492512; font-family: -apple-system, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding: 60px 50px; box-sizing: border-box; position: relative;">
        <!-- Top Page Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(73, 37, 18, 0.15); padding-bottom: 16px;">
          <span style="font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #C47A43; font-weight: 700;">CHAPTER 02</span>
          <span style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: rgba(73, 37, 18, 0.6);">BARISTA CRAFT</span>
          <span style="font-size: 13px; font-family: Georgia, serif; font-weight: bold;">02</span>
        </div>

        <div style="margin: 20px 0 16px 0;">
          <h2 style="font-family: Georgia, serif; font-size: 42px; margin: 0 0 10px 0; color: #492512; line-height: 1.1;">
            The Signature Coffee Collection
          </h2>
          <p style="font-size: 15px; line-height: 1.5; color: rgba(73, 37, 18, 0.8); margin: 0;">
            Single-origin Ethiopian and Brazilian beans dialed in daily on our commercial espresso bar. Extracted at 9 bars for pure balance.
          </p>
        </div>

        <!-- 2-Photo Grid with Notes -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 20px;">
          <div style="border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 10px 25px rgba(73, 37, 18, 0.08); border: 1px solid rgba(73, 37, 18, 0.1);">
            <div style="height: 230px; overflow: hidden;">
              <img src="${images.flatWhite}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-family: Georgia, serif; font-size: 18px; margin: 0; color: #492512;">Velvet Flat White</h4>
                <span style="font-weight: bold; color: #C47A43; font-size: 16px;">£3.60</span>
              </div>
              <p style="font-size: 13px; color: rgba(73, 37, 18, 0.7); margin: 6px 0 0 0;">Double ristretto with silky microfoamed milk and delicate tulip art.</p>
            </div>
          </div>

          <div style="border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 10px 25px rgba(73, 37, 18, 0.08); border: 1px solid rgba(73, 37, 18, 0.1);">
            <div style="height: 230px; overflow: hidden;">
              <img src="${images.espresso}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="padding: 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-family: Georgia, serif; font-size: 18px; margin: 0; color: #492512;">Single Origin Espresso</h4>
                <span style="font-weight: bold; color: #C47A43; font-size: 16px;">£2.80</span>
              </div>
              <p style="font-size: 13px; color: rgba(73, 37, 18, 0.7); margin: 6px 0 0 0;">Thick golden crema with notes of candied orange, hazelnut & dark chocolate.</p>
            </div>
          </div>
        </div>

        <!-- Featured Spanish Latte Banner -->
        <div style="background: #492512; color: #F8F1E9; border-radius: 18px; padding: 22px 26px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <span style="font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #C47A43; font-weight: bold;">HOUSE SPECIALTY</span>
            <h3 style="font-family: Georgia, serif; font-size: 24px; margin: 4px 0 0 0;">Cafe Face Spanish Latte</h3>
            <p style="font-size: 13px; color: #D7BDA5; margin: 4px 0 0 0;">Sweet condensed milk layered with rich espresso over ice or steamed warm.</p>
          </div>
          <span style="font-family: Georgia, serif; font-size: 28px; font-weight: bold; color: #C47A43;">£4.20</span>
        </div>

        <div style="border-top: 1px solid rgba(73, 37, 18, 0.12); padding-top: 14px; font-size: 13px; color: rgba(73, 37, 18, 0.6); display: flex; justify-content: space-between;">
          <span>Alternative milks available: Minor Figures Oat · Almond · Soya</span>
          <span>100% Arabica</span>
        </div>
      </div>
    `,
  },

  // 4. PAGE 3: FOOD & DESSERTS
  {
    name: "03_page_food.jpg",
    html: `
      <div style="width: 800px; height: 1200px; background: #F8F1E9; color: #492512; font-family: -apple-system, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding: 60px 50px; box-sizing: border-box; position: relative;">
        <!-- Top Page Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(73, 37, 18, 0.15); padding-bottom: 16px;">
          <span style="font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #C47A43; font-weight: 700;">CHAPTER 03</span>
          <span style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: rgba(73, 37, 18, 0.6);">MEDITERRANEAN & BAKES</span>
          <span style="font-size: 13px; font-family: Georgia, serif; font-weight: bold;">03</span>
        </div>

        <div style="margin: 20px 0 16px 0;">
          <h2 style="font-family: Georgia, serif; font-size: 42px; margin: 0 0 8px 0; color: #492512; line-height: 1.1;">
            Fresh Bites & Sweet Delights
          </h2>
          <p style="font-size: 15px; line-height: 1.5; color: rgba(73, 37, 18, 0.8); margin: 0;">
            Authentic Middle Eastern flatbread boxes, golden toasted wraps, and comforting bakes prepared fresh to order every day.
          </p>
        </div>

        <!-- Big Food Image: Persian Lamb Kebab Box -->
        <div style="height: 340px; border-radius: 18px; overflow: hidden; position: relative; box-shadow: 0 12px 30px rgba(73, 37, 18, 0.12); margin-bottom: 18px;">
          <img src="${images.lambBox}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(73, 37, 18, 0.85) 0%, transparent 55%);"></div>
          <div style="position: absolute; bottom: 20px; left: 24px; right: 24px; display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <span style="background: #C47A43; color: #fff; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">SIGNATURE DISH · HALAL</span>
              <h3 style="font-family: Georgia, serif; font-size: 26px; color: #F8F1E9; margin: 6px 0 0 0;">Persian Lamb Kebab Flatbread Box</h3>
              <p style="font-size: 13px; color: #D7BDA5; margin: 4px 0 0 0;">Spiced lamb skewers, sumac flatbread, chopped salad, pomegranate & garlic toum.</p>
            </div>
            <span style="font-family: Georgia, serif; font-size: 30px; font-weight: bold; color: #F8F1E9;">£9.50</span>
          </div>
        </div>

        <!-- 2-Dessert mini row -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px;">
          <div style="display: flex; gap: 14px; background: #fff; padding: 14px; border-radius: 14px; border: 1px solid rgba(73, 37, 18, 0.1); align-items: center;">
            <div style="width: 80px; height: 80px; border-radius: 10px; overflow: hidden; flex-shrink: 0;">
              <img src="${images.pancakes}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div>
              <h4 style="font-family: Georgia, serif; font-size: 16px; margin: 0; color: #492512;">Stacked Pancakes</h4>
              <p style="font-size: 12px; color: rgba(73, 37, 18, 0.7); margin: 3px 0 0 0;">Maple syrup & berries.</p>
              <span style="font-weight: bold; color: #C47A43; font-size: 14px;">£7.95</span>
            </div>
          </div>

          <div style="display: flex; gap: 14px; background: #fff; padding: 14px; border-radius: 14px; border: 1px solid rgba(73, 37, 18, 0.1); align-items: center;">
            <div style="width: 80px; height: 80px; border-radius: 10px; overflow: hidden; flex-shrink: 0;">
              <img src="${images.brownie}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div>
              <h4 style="font-family: Georgia, serif; font-size: 16px; margin: 0; color: #492512;">Dark Brownie</h4>
              <p style="font-size: 12px; color: rgba(73, 37, 18, 0.7); margin: 3px 0 0 0;">Fudgy with Maldon sea salt.</p>
              <span style="font-weight: bold; color: #C47A43; font-size: 14px;">£3.50</span>
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid rgba(73, 37, 18, 0.12); padding-top: 14px; font-size: 13px; color: rgba(73, 37, 18, 0.6); display: flex; justify-content: space-between;">
          <span>All meats 100% Halal certified · Vegan options available</span>
          <span>Dine-in & Takeaway</span>
        </div>
      </div>
    `,
  },

  // 5. PAGE 4: BRAND STORY & AMBIENCE
  {
    name: "04_page_story.jpg",
    html: `
      <div style="width: 800px; height: 1200px; background: #F8F1E9; color: #492512; font-family: -apple-system, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding: 60px 50px; box-sizing: border-box; position: relative;">
        <!-- Top Page Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(73, 37, 18, 0.15); padding-bottom: 16px;">
          <span style="font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #C47A43; font-weight: 700;">CHAPTER 04</span>
          <span style="font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: rgba(73, 37, 18, 0.6);">OUR ROOTS</span>
          <span style="font-size: 13px; font-family: Georgia, serif; font-weight: bold;">04</span>
        </div>

        <div style="margin: 24px 0 16px 0;">
          <h2 style="font-family: Georgia, serif; font-size: 44px; margin: 0 0 12px 0; color: #492512; line-height: 1.1;">
            More Than Just Your Daily Coffee
          </h2>
          <p style="font-family: cursive, sans-serif; font-size: 26px; color: #C47A43; margin: 0 0 16px 0;">
            “A little coffee, a little comfort, a lot of good moments.”
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: rgba(73, 37, 18, 0.85); margin: 0;">
            Born right on Bristol Road in Selly Oak, Cafe Face is Birmingham’s neighborhood hub where students from the University of Birmingham, doctors from Queen Elizabeth Hospital, and local food enthusiasts connect over honest flavours.
          </p>
        </div>

        <!-- 2 Photo Mood Layout -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 24px; flex: 1;">
          <div style="border-radius: 18px; overflow: hidden; position: relative; box-shadow: 0 12px 25px rgba(73, 37, 18, 0.1);">
            <img src="${images.barista}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; bottom: 12px; left: 12px; background: rgba(73, 37, 18, 0.85); color: #fff; font-size: 11px; padding: 4px 10px; border-radius: 6px; letter-spacing: 1px;">
              PASSION IN EVERY CUP
            </div>
          </div>
          <div style="border-radius: 18px; overflow: hidden; position: relative; box-shadow: 0 12px 25px rgba(73, 37, 18, 0.1);">
            <img src="${images.community}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; bottom: 12px; left: 12px; background: rgba(73, 37, 18, 0.85); color: #fff; font-size: 11px; padding: 4px 10px; border-radius: 6px; letter-spacing: 1px;">
              SELLY OAK COMMUNITY
            </div>
          </div>
        </div>

        <!-- Quote Callout -->
        <div style="background: rgba(196, 122, 67, 0.1); border-left: 4px solid #C47A43; padding: 16px 20px; border-radius: 0 12px 12px 0; margin-bottom: 20px;">
          <p style="font-size: 14px; font-style: italic; color: #492512; margin: 0; line-height: 1.5;">
            “We don’t cut corners on ingredients, and we never rush an extraction. We’re here to make every visit your favourite part of the day.”
          </p>
        </div>

        <div style="border-top: 1px solid rgba(73, 37, 18, 0.12); padding-top: 14px; font-size: 13px; color: rgba(73, 37, 18, 0.6); display: flex; justify-content: space-between;">
          <span>519 Bristol Road · Selly Oak</span>
          <span style="color: #C47A43; font-weight: bold;">Cafe Face Team</span>
        </div>
      </div>
    `,
  },

  // 6. BACK COVER
  {
    name: "05_back_cover.jpg",
    html: `
      <div style="width: 800px; height: 1200px; background: #361a0c; color: #F8F1E9; font-family: -apple-system, sans-serif; display: flex; flex-direction: column; justify-content: space-between; padding: 70px 60px; box-sizing: border-box; position: relative; overflow: hidden; border-right: 12px solid #492512;">
        <!-- Texture & Border Overlay -->
        <div style="position: absolute; inset: 24px; border: 2px solid rgba(196, 122, 67, 0.35); border-radius: 8px; pointer-events: none;"></div>
        <div style="position: absolute; inset: 30px; border: 1px solid rgba(196, 122, 67, 0.18); border-radius: 6px; pointer-events: none;"></div>

        <!-- Top Tagline -->
        <div style="text-align: center; position: relative; z-index: 1;">
          <span style="font-size: 14px; letter-spacing: 4px; text-transform: uppercase; color: #C47A43; font-weight: 700;">YOUR NEIGHBORHOOD CAFÉ</span>
        </div>

        <!-- Center Information -->
        <div style="text-align: center; position: relative; z-index: 1;">
          <h2 style="font-family: Georgia, serif; font-size: 48px; font-weight: normal; margin: 0 0 16px 0; color: #F8F1E9;">
            Visit Cafe Face
          </h2>
          <p style="font-size: 17px; line-height: 1.6; color: #D7BDA5; margin: 0 0 30px 0;">
            519 Bristol Road, Selly Oak<br/>
            Birmingham B29 6AU<br/>
            United Kingdom
          </p>

          <div style="width: 40px; height: 2px; background: #C47A43; margin: 0 auto 30px;"></div>

          <div style="font-size: 15px; color: #F8F1E9; line-height: 2;">
            <p style="margin: 0;"><strong>Opening Hours:</strong> 9:00 AM – 4:00 PM Daily</p>
            <p style="margin: 0;"><strong>Telephone:</strong> +44 121 415 4651</p>
            <p style="margin: 0; color: #C47A43;"><strong>Instagram:</strong> @cafeface_sellyoak</p>
          </div>
        </div>

        <!-- Bottom Barcode & Coordinates -->
        <div style="text-align: center; position: relative; z-index: 1;">
          <div style="font-family: monospace; font-size: 12px; letter-spacing: 3px; color: #D7BDA5; margin-bottom: 8px;">
            52.4432° N, 1.9366° W · SELLY OAK
          </div>
          <p style="font-size: 12px; color: rgba(248, 241, 233, 0.4); margin: 0;">
            © 2026 Cafe Face Ltd. Handcrafted in Birmingham.
          </p>
        </div>
      </div>
    `,
  },
];

async function generate() {
  console.log("Launching headless Chrome to render book pages...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 1200, deviceScaleFactor: 1 });

  for (const p of pages) {
    console.log("Rendering", p.name, "...");
    await page.setContent(p.html, { waitUntil: "load" });
    const outPath = path.join(OUT_DIR, p.name);
    await page.screenshot({ path: outPath, quality: 90, type: "jpeg" });
    console.log("✓ Saved", p.name);
  }

  await browser.close();
  console.log("All 6 book pages rendered successfully!");
}

generate().catch((err) => {
  console.error("Generation error:", err);
  process.exit(1);
});

