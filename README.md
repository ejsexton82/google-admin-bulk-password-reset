# 🔒 Google Admin: Bulk Password Resetter
[![Playwright version](https://img.shields.io/badge/npm-v1.47.1-blue.svg)](https://www.npmjs.com/package/playwright)

## Rationale

For situations when you need to reset several user passwords, but your organization does not grant you the privilege to do so.

## Requirements

Requires an account that can reset individual user passwords.

## Installation

1. Checkout the repository.
2. Install Node.js.

```
git clone https://github.com/ejsexton82/google-admin-bulk-password-reset
npm install
```

## Setup

1. Create credentials.json from credentials-example.json
2. Create passwords.csv from passwords-example.csv

## Resetting passwords

1. Authorize your account.
2. Reset passwords.

```
npx playwright test auth
npx playwright test update-passwords
```
