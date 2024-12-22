#!/usr/bin/env node

import clipboard from 'clipboardy';
import { parseItemMarkdown, createTradeQuery } from './markdownTool.js';
import { searchPOE2Trade } from './api.js';
import { searchForItem, addModFilter } from './puppeteerActions.js';

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs/promises';
import readline from 'readline';

puppeteer.use(StealthPlugin());
// Keep track of the last clipboard content to avoid duplicates
let lastContent = '';

// Setup readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Enable raw mode to listen for keypress
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', async (key) => {
  // Check if 'S' or 's' was pressed
  if (key.toString() === 's' || key.toString() === 'S') {
    try {
      const cookies = await page.cookies();
      await fs.writeFile('cookies.json', JSON.stringify(cookies, null, 2));
      console.log('Cookies saved successfully!');
    } catch (error) {
      console.error('Error saving cookies:', error);
    }
  }
  
  // Allow Ctrl+C to exit
  if (key.toString() === '\u0003') {
    process.exit();
  }
});

console.log('Monitoring clipboard... Press Ctrl+C to exit.');

// Add this function before browser launch
async function loadSavedCookies() {
  try {
    const cookieData = await fs.readFile('cookies.json', 'utf8');
    return JSON.parse(cookieData);
  } catch (error) {
    console.log('No saved cookies found, starting fresh session');
    return null;
  }
}

// Modify the browser setup section
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// Load and set cookies if they exist
const savedCookies = await loadSavedCookies();
if (savedCookies) {
  await page.setCookie(...savedCookies);
  console.log('Loaded saved cookies successfully!');
}

await page.goto('https://www.pathofexile.com/trade2/search/poe2/Standard');

setInterval(() => {

    try {

        const currentContent = clipboard.readSync();

        // Only log if content has changed
        if (currentContent !== lastContent && currentContent.startsWith('Item Class')) {

            searchForItem(page, parseItemMarkdown(currentContent)).then(() => {
                console.log('search complete');
            })
            lastContent = currentContent

        }
    } catch (error) {
        console.error('Error reading clipboard:', error);
    }
}, 2000);


