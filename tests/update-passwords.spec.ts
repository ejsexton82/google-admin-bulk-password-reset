import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { parse } from 'csv-parse/sync';

const records = parse(fs.readFileSync(path.join(__dirname, '../passwords.csv')), {
  columns: true,
  skip_empty_lines: true,
  bom: true
});

for (const record of records) {
  test(`${record.email}: ${record.password}`, async ({ page }) => {
    const username = record.email.split('@')[0];

    // Load the user
    await page.goto(`https://admin.google.com/u/1/ac/search?query=${record.email}`,{waitUntil:'domcontentloaded'});
    await page.getByRole('link', { name: record.email }).click();
    await page.waitForURL(new RegExp(/ac\/users/));

    // Reset the password
    await page.getByRole('button', { name: 'Reset password' }).click();
    await page.getByLabel('Create password').click();
    await page.getByLabel('Enter password of 8 to 100').waitFor();
    await page.getByLabel('Enter password of 8 to 100').fill(record.password);
    await page.getByText('Ask user to change their').click();
    await page.getByRole('button', {name: 'Reset'}).click();

    // Check the password
    await page.getByText('Reset password successful').waitFor();
    await page.getByLabel('Button to toggle visibility').click();
    await expect(page.getByText(record.password)).toBeVisible();
  });
}
