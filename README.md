# Basic Form - Playwright Automation Assignment

## Overview
This repository contains automated UI tests for the Basic Form of the Form.io Angular demo application.

The tests are implemented using Playwright with TypeScript and are designed to validate expected behavior strictly based on the provided user stories. The primary focus is on requirement-driven testing, deterministic execution, and clear, maintainable test design.

Application under test:
https://formio.github.io/angular-demo/#/

## Testing Approach

### Requirement-Driven Testing (Primary)
The primary test suite is implemented strictly based on the provided user stories.
These tests represent the minimum expected behavior and serve as the authoritative validation of the requirements.

Characteristics of this approach:

  * Test cases map directly to the given user stories

  * No additional assumptions or inferred validation rules are introduced

  * Tests are allowed to fail if the application does not meet the stated requirements

  * Failures are treated as indicators of missing functionality, not test defects

This approach ensures:

  * Clear traceability between requirements and tests

  * Objective, requirement-driven validation

  * Fair and predictable test outcomes

### Extended Coverage (Exploratory & Interest-Driven)
In addition to the core coverage, a small set of extended tests is included to express my interest and product understanding.

These tests are:

  * Clearly separated from user-story-driven tests
  * Based only on reasonable UI observations (e.g., required fields, radio button behavior)
  * Intentionally limited in scope to avoid over-engineering

The purpose of extended coverage is to:

  * Highlight potential usability or validation gaps
  * Demonstrate curiosity and QA mindset
  * Show how the test suite could evolve in a real project

Extended tests are not treated as mandatory acceptance criteria and are included for discussion rather than enforcement.

## Automation Design Choices
### Functional Helper Approach

The solution uses Funtional helper methods to:

  * reduce repetition
  * keep tests readable

## Locator Strategy
### Preferred Locators
  * Role-based locators (```getByRole()```) for interactive elements such as buttons and links
  * Label-based locators (```getByLabel()```) for form controls where labels are semantically associated with inputs
  * Text-based locators (```getByText()```) for locating elements that contain given text

### Use of CSS Locators

In certain cases, semantic locators were not applicable due to the structure of the demo application. In such cases, CSS-based locators were used(e.g. survey root container).

## Assertions
Playwright includes test assertions in the form of ```expect``` function. To make an assertion, call ```expect(value)``` and choose a matcher that reflects the expectation. There are many generic matchers like ```toEqual```, ```toContain```, ```toBeTruthy``` that can be used to assert any conditions.
The following Playwright assertions are used in this assignment:
  * ```toBeVisible()```
      * submission success message
      * validation error messages
  * ```not.toBeVisible()```
      * form or survey is not submitted when validation fails
  * ```toBeDisabled()```
      * submit button is disabled when required inputs are missing or invalid
  * ```toBeChecked()```
      * selected radio option in survey questions
  * ```not.toBeChecked()```
      * previously selected radio option is deselected when another option is chosen

## Known Limitations / Observations
### A. User Story–Based Observations (Covered in basicForm_strict)
  * Submission is successful when all the required fields are filled
  * Submission is unsuccessful when all the required fields are missing
  * Invalid email addresses are blocked from submission

### B. Interest / Exploratory Observations (Covered in basicForm_extended)
  * Submission is unsuccessful when Firstname is missing
  * Submission is unsuccessful when Lastname missing
  * Submission is unsuccessful when survey missing
  * Submission is unsuccessful when email is missing
  * Submission is allowed when all the survey questions are answered
  * Survey questions allow only one option to be selected per question
  * Submission is allowed even when one or more survey questions are left unanswered

These gaps are intentionally surfaced through failing tests.

## How to Run the Tests
```bash
npm install
npx playwright test
```
