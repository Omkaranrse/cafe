const http = require("http");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9222;
const TARGET_URL = "http://localhost:3005";
const OUT_DIR = path.join(process.cwd(), "screenshots");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

function connectWs(wsUrl) {
  const WebSocket = require("crypto"); // fallback or simple raw ws
}

// Alternatively, use Chrome --screenshot with different window sizes or scroll offsets!
console.log("Helper script ready");

