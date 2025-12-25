import { test } from '@playwright/test';
import { openBasicForm, fillForm, submitForm, disabledSubmit } from './helpers/formLocators';
import { expectSubmissionSuccess, expectSubmissionFailure, expectError } from './helpers/assertions';

test.describe('Basic Form submission and validation', () => {

  test.beforeEach(async ({ page }) => {
    await openBasicForm(page);
  });

  test('Successful submission with valid data', async ({ page }) => {
    await fillForm(page, {
      firstName: 'Pavithra',
      lastName: 'Subramaniyam',
      email: 'example@example.com',
    });

    await submitForm(page);
    await expectSubmissionSuccess(page);
  });

  test('Submission fails when all required fields are empty', async ({ page }) => {
    await submitForm(page);

    await expectError(page, 'First Name is required');
    await expectError(page, 'Last Name is required');
    await expectError(page, 'Email is required');
    await expectSubmissionFailure(page);
  });

  test('Submission fails when Email is missing', async ({ page }) => {
    await fillForm(page, {
      firstName: 'Pavithra',
      lastName: 'Subramaniyam',
    });

    await submitForm(page);
    await expectError(page, 'Email is required');
    await expectSubmissionFailure(page);
  });

  test('Invalid email address is rejected', async ({ page }) => {
    await fillForm(page, {
      firstName: 'Pavithra',
      lastName: 'Subramaniyam',
      email: 'invalid-email',
    });

    await disabledSubmit(page);
    await expectError(page, 'Email must be a valid email');
    await expectSubmissionFailure(page);
  });

});
