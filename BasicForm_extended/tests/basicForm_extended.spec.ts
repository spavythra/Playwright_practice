import { test } from '@playwright/test';
import { openBasicForm, fillForm, submitForm, disabledSubmit } from './helpers/formLocators';
import { expectSubmissionSuccess, expectSubmissionFailure, expectError } from './helpers/assertions';

test.describe('Basic Form submission and validation', () => {

  test.beforeEach(async ({ page }) => {
    await openBasicForm(page);
  });


// Scenario: Successful submission with all required fields filled
// When the user enters a valid value into the First Name field
// And the user enters a valid value into the Last Name field
// And the user enters a valid email address
// And the user submits the form
// Then the form should be submitted successfully
// And no validation error messages should be visible

  test('Successful submission with valid data', async ({ page }) => {
    await fillForm(page, {
      firstName: 'Pavithra',
      lastName: 'Subramaniyam',
      email: 'example@example.com',
    });

    await submitForm(page);
    await expectSubmissionSuccess(page);
  });

// Scenario: Submission fails when required fields are empty
// When the user submits the form without filling any fields
// Then validation error messages should be displayed for required fields
// And the form should not be submitted

  test('Submission fails when all required fields are empty', async ({ page }) => {
    await submitForm(page);

    await expectError(page, 'First Name is required');
    await expectError(page, 'Last Name is required');
    await expectError(page, 'Email is required');
    await expectError(page, 'Survey is required');
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

// Scenario: Invalid email address is rejected
// When the user enters a valid value into the First Name field
// And the user enters a valid value into the Last Name field
// And the user enters an invalid email address
// And the user submits the form
// Then a validation error message should be displayed for the Email field
// And the form should not be submitted

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
