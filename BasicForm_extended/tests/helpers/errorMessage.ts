import { Page, expect } from '@playwright/test';

export async function expectSubmissionSuccess(page: Page) {
  await expect(page.locator('.alert.alert-success')).toContainText('Submission Complete');
}

export async function expectSubmissionFailure(page: Page) {
    await expect(page.getByText('Submission Complete')).not.toBeVisible();
}

export async function expectError(page: Page, message: string) {
  await expect(page.getByText(message)).toBeVisible();
}
