import { Page, expect } from '@playwright/test';

export async function expectSubmissionSuccess(page: Page) {
  await expect(page.getByText('Submission Complete').first()).toBeVisible();
  await expect(page.getByText(/error|invalid/i)).toHaveCount(0);  // no validation error messages should be visible
}

export async function expectSubmissionFailure(page: Page) {
  await expect(page.getByText(/error|invalid/i)).toBeVisible();
}

export async function expectError(page: Page, message: string) {
  await expect(page.getByText(message)).toBeVisible();
}
