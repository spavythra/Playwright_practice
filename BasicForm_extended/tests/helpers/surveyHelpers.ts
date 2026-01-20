import { Page, expect } from '@playwright/test';

// Returns all survey question rows

export async function getSurveyRows(page: Page) {
  const survey = page.locator('.formio-component-survey');
  return survey.locator('tbody tr');
}

export async function answerSurveyQuestions(
  page: Page,
  skipLast: boolean = false
) {
  const rows = await getSurveyRows(page);
  const rowCount = await rows.count();

  const limit = skipLast ? rowCount - 1 : rowCount;

  for (let i = 0; i < limit; i++) {
    await rows
      .nth(i)
      .getByRole('radio')
      .first()
      .check();
  }
}

export async function selectMultipleOptions(page: Page) {

  const rows = await getSurveyRows(page);

  const firstQuestion = rows.first();
  const options = firstQuestion.getByRole('radio');
  // Select first option
  await options.nth(0).check();
  await expect(options.nth(0)).toBeChecked();

  // Select second option
  await options.nth(1).check();

  // Verify first option is automatically unchecked
  await expect(options.nth(0)).not.toBeChecked();
  await expect(options.nth(1)).toBeChecked();
};
