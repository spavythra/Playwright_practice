import { test, expect } from '@playwright/test';
import { openBasicForm, fillForm, submitForm, disabledSubmit } from './helpers/formLocators';
import { expectSubmissionSuccess, expectSubmissionFailure, expectError } from './helpers/errorMessage';
import { answerSurveyQuestions, selectMultipleOptions } from './helpers/surveyHelpers.ts';

test.describe('Basic Form submission and validation', () => {

  test.beforeEach(async ({ page }) => {
    await openBasicForm(page);
  });


// Scenario: Successful submission with all required fields filled
// When the user enters a valid value into the First Name field
// AND the user enters a valid value into the Last Name field
// AND the user enters a valid email address
// AND the user submits the form
// Then the form should be submitted successfully
// AND no validation error messages should be visible

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
// When the user submits the form without filling ANY fields
// Then validation error messages should be displayed for required fields
// AND the form should not be submitted

  test('Submission fails when any required fields are empty', async ({ page }) => {
    await submitForm(page);

    await expectError(page, 'First Name is required');
    await expectError(page, 'Last Name is required');
    await expectError(page, 'Email is required');
    await expectError(page, 'Survey is required');
    await expectSubmissionFailure(page);
  });

  test('Submission fails when Last Name is empty', async ({ page }) => {
    await fillForm(page, {
      firstName: 'Pavithra',
      email: 'example@example.com',
    });
    await submitForm(page);

    await expectError(page, 'Last Name is required');
    await expectSubmissionFailure(page);
  });

  test('Submission fails when First Name is empty', async ({ page }) => {
    await fillForm(page, {
      lastName: 'Subramaniyam',
      email: 'example@example.com',
    });

    await submitForm(page);
    await expectError(page, 'First Name is required');
    await expectSubmissionFailure(page);
  });

  test('Submission fails when Email is empty', async ({ page }) => {
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
// AND the user enters a valid value into the Last Name field
// AND the user enters an invalid email address
// AND the user submits the form
// Then a validation error message should be displayed for the Email field
// AND the form should not be submitted

  test('Invalid Email address is rejected', async ({ page }) => {
    await fillForm(page, {
      firstName: 'Pavithra',
      lastName: 'Subramaniyam',
      email: 'invalid-email',
    });

    await expectError(page, 'Email must be a valid email');
    await disabledSubmit(page);
    // await expectSubmissionFailure(page); // submission unsuccessful message validation is not required
  });

  // Scenario: Successful survey submission with all questions answered
  test('Survey is submitted successfully when all questions are answered', async ({ page }) => {
    await answerSurveyQuestions(page);
    await submitForm(page);

    await expectSubmissionSuccess(page);
  });

  // Scenario: Survey submission fails when at least one question is unanswered
  test('Survey submission fails when a question is left unanswered', async ({ page }) => {
    await answerSurveyQuestions(page, true);

    await disabledSubmit(page);
    await expectSubmissionFailure(page);
  });

  // Scenario: Survey questions allow only one option to be selected per question
  test('Survey questions allow only one option to be selected per question', async ({ page }) => {
  await selectMultipleOptions(page);
  });
});

