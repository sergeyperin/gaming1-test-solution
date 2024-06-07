// This file will be used to define the selectors that will be used in your tests
// Locator documentation : https://playwright.dev/docs/api/class-locator
// Example of locator usage : page.locator("CSS selector").click()

import { ITestController } from "../runnerConfiguration/runner";


export const createPageModel = (testController: ITestController) => {
  const page = testController.page!;

  return {
    myWebSite: {
      homePage: {
        myAccount: page.locator("a[href$='account']"),
        logInIcon: page.locator("a[href$='account/login']"),
      },
      myAccountPage: {
        logOutIcon: page.locator("div[class=shopify-section] a[href$='/account/logout']"),
      },
      loginForm: {
        emailInput: page.locator("input[id='CustomerEmail']"),
        passwordInput: page.locator("input[id='CustomerPassword']"),
        signInButton: page.locator("input[value='Sign In']"),
      },
    },
  };
};


