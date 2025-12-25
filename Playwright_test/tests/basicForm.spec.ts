import { test, expect } from '@playwright/test';

test.describe('Basic Form submission and validation', () => {
  test.beforeEach(async ({ page }) => {
    // Given the user navigates to the Angular demo application
    await page.goto('https://formio.github.io/angular-demo/#/');

    // And the user opens the "Examples"
    await page.getByRole('link', { name: 'Examples' }).click();

    // And the user opens the "Simple Form"
    await page.locator("[href*='forms/simple']").click();

    // Ensure form is loaded
    await expect(page.getByText('Example Form')).toBeVisible();
  });

  test('Successful submission with all required fields filled', async ({ page }) => {
    // When the user enters a valid value into the First Name field
    await page.getByLabel('First Name').fill('Pavithra');

    // And the user enters a valid value into the Last Name field
    await page.getByLabel('Last Name').fill('Subramaniyam');

    // And the user enters a valid email address
    await page.getByLabel('Email').fill('pavithra.subramaniyam@example.com');

    // And the user submits the form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Then the form should be submitted successfully
    await expect(page.locator('.alert.alert-success')).toContainText('Submission Complete');

    // And no validation error messages should be visible
    await expect(page.locator('.has-error')).toHaveCount(0);
  });

  test('Submission fails when required fields are empty', async ({ page }) => {
    // When the user submits the form without filling any fields
    await page.getByRole('button', { name: 'Submit' }).click();

    // Then validation error messages should be displayed for required fields
    await expect(page.getByText('First Name is required')).toBeVisible();
    await expect(page.getByText('Last Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();

    // And the form should not be submitted
    await expect(page.getByText('Submission Complete')).not.toBeVisible();
  });

  test('Submission fails when First Name is missing', async ({ page }) => {

    // And the user enters a valid value into the Last Name field
    await page.getByLabel('Last Name').fill('Subramaniyam');

    // And the user enters a valid email address
    await page.getByLabel('Email').fill('pavithra.subramaniyam@example.com');

    // And the user submits the form
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('First Name is required')).toBeVisible();

    // And the form should not be submitted
    await expect(page.getByText('Submission Complete')).not.toBeVisible();
  });

  test('Submission fails when Last Name is missing', async ({ page }) => {

    // And the user enters a valid value into the Last Name field
    await page.getByLabel('First Name').fill('Pavithra');

    // And the user enters a valid email address
    await page.getByLabel('Email').fill('pavithra.subramaniyam@example.com');

    // And the user submits the form
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Last Name is required')).toBeVisible();

    // And the form should not be submitted
    await expect(page.getByText('Submission Complete')).not.toBeVisible();
  });

  test('Submission fails when Email address is missing', async ({ page }) => {

    // And the user enters a valid value into the Last Name field
    await page.getByLabel('First Name').fill('Pavithra');

    // And the user enters a valid value into the Last Name field
    await page.getByLabel('Last Name').fill('Subramaniyam');

    // And the user submits the form
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Email is required')).toBeVisible();

    // And the form should not be submitted
    await expect(page.getByText('Submission Complete')).not.toBeVisible();
  });

  test('Invalid email address is rejected', async ({ page }) => {
    // When the user enters a valid value into the First Name field
    await page.getByLabel('First Name').fill('Jane');

    // And the user enters a valid value into the Last Name field
    await page.getByLabel('Last Name').fill('Smith');

    // And the user enters an invalid email address
    await page.getByLabel('Email').fill('invalid-email');

    // And the user submits the form
    await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

    // Then a validation error message should be displayed for the Email field
    await expect(page.getByText('Email must be a valid email')).toBeVisible();

    // And the form should not be submitted
    await expect(page.getByText('Submission Complete')).not.toBeVisible();
  });
});
