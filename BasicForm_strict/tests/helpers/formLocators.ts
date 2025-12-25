import { Page, expect } from '@playwright/test';

export async function openBasicForm(page: Page) {
    // Given the user navigates to the Angular demo application
    await page.goto('https://formio.github.io/angular-demo/#/');

    // And the user opens the "Examples"
    await page.getByRole('link', { name: 'Examples' }).click();

    // And the user opens the "Simple Form"
    await page.getByRole('link', { name: 'Simple Form' }).click();

    // Ensure form is loaded
    await expect(page.getByText('Example Form')).toBeVisible();
}

export async function fillForm(
  page: Page,
  {
    firstName,
    lastName,
    email,
  }: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }
) {
  if (firstName !== undefined) {
    await page.getByLabel('First Name').fill(firstName);
  }
  if (lastName !== undefined) {
    await page.getByLabel('Last Name').fill(lastName);
  }
  if (email !== undefined) {
    await page.getByLabel('Email').fill(email);
  }
}

export async function submitForm(page: Page) {
  await page.getByRole('button', { name: 'Submit' }).click();
}

export async function disabledSubmit(page: Page) {
  await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
}
