import { test, expect } from '@playwright/test';
import { answerSurveyQuestions, selectMultipleOptions } from './helpers/surveyHelpers.ts';
import { openBasicForm, submitForm } from './helpers/formLocators';
import { expectSubmissionSuccess, expectSubmissionFailure, expectError } from './helpers/assertions';

test.describe('Survey submission and validation', () => {

  test.beforeEach(async ({ page }) => {
    await openBasicForm(page);
    await expect(page.getByLabel('survey')).toBeVisible();
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

    await submitForm(page);

    await expect(page.locator('.has-error')).toBeVisible();
    await expectSubmissionFailure(page);
  });

  test('Survey radio questions allow only one option to be selected', async ({ page }) => {
  await selectMultipleOptions(page);
});

});
