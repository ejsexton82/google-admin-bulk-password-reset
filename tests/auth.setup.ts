import { test as setup, expect } from '@playwright/test';
import path from 'path';
import creds = require('../credentials.json');


const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Setup login redirect
  await page.goto('https://admin.google.com/');
  await page.waitForURL('https://accounts.google.com/**');

  // Enter email
  await page.getByLabel('Email or phone').fill(creds.username);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForURL(new RegExp(/signin\/challenge\/pwd/));

  // Enter password
  await page.getByLabel('Enter your password').fill(creds.password);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForURL(new RegExp(/signin\/challenge/));

  // Alternate 2FA
  if(page.url().startsWith('https://accounts.google.com/v3/signin/challenge/selection')) {
    await page.getByRole('button', { name: 'Get a verification code from'}).click();
    await page.waitForURL(new RegExp(/signin\/challenge\/totp/));
    //let topt = input('Hello');
    console.error('Implement me!');
  } else {
    // Wait for app authentication
    await page.waitForURL('https://admin.google.com/**');
  }

  // Store authentication
  await page.context().storageState({ path: authFile });
});
