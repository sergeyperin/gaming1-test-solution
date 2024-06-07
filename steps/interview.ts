// This file will be used to define the expected behavior of every steps you'll define.

import { ITestController } from "../runnerConfiguration/runner";
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { defineParameterType } from "@cucumber/cucumber";
import { WEBSITE_INFORMATION } from "../configuration";
import { createPageModel } from "../pageModel/pageModel";

type WebSiteUrls = {
  [key: string]: string;
};

defineParameterType({
  name: "website",
  regexp: /google|facebook|twitter/,
  transformer: (website) => website,
});

const webSitesUrl: WebSiteUrls = {
  google: "https://www.google.be/",
  facebook: "https://fr-fr.facebook.com/",
  twitter: "https://x.com/",
  publicpet: "https://thepublicpet.com/",
};

/* GIVENS */

Given(
  "the user opened my website",
  async function (this: ITestController): Promise<void> {
    const page = this.page!;
    await page.goto(WEBSITE_INFORMATION.URL);
  }
);

/* WHENS */

When(
  "the user navigates to {website}",
  async function (this: ITestController, website: string): Promise<void> {
    const page = this.page!;
    await page.goto(webSitesUrl[website]);
  }
);

When(
  "the user opens the login form",
  async function (this: ITestController): Promise<void> {
    const landingPage = createPageModel(this);
    await landingPage.myWebSite.homePage.myAccount.waitFor()
    await landingPage.myWebSite.homePage.myAccount.click()
      await landingPage.myWebSite.homePage.logInIcon.waitFor()
      await landingPage.myWebSite.homePage.logInIcon.click()
  }
);

/* THENS */

Then(
  "{website} should be displayed",
  async function (this: ITestController, website: string): Promise<void> {
    const page = this.page!;
    await expect(page).toHaveURL(webSitesUrl[website]);
  }
);

Then(
    "the login form should be displayed",
    async function (this: ITestController): Promise<void> {
        const loginPage = createPageModel(this);
        await loginPage.myWebSite.loginForm.emailInput.waitFor()
        await loginPage.myWebSite.loginForm.passwordInput.waitFor()
        await loginPage.myWebSite.loginForm.signInButton.waitFor()
        await expect(loginPage.myWebSite.loginForm.emailInput).toBeEditable();
        await expect(loginPage.myWebSite.loginForm.passwordInput).toBeEditable();
        await expect(loginPage.myWebSite.loginForm.signInButton).toBeVisible();
        await expect(this.page!).toHaveURL("https://thepublicpet.com/account/login");
    }
);

When(
    "the user fills the login form",
    async function (this: ITestController): Promise<void> {
        const loginPage = createPageModel(this);
        await loginPage.myWebSite.loginForm.emailInput.waitFor()
        await loginPage.myWebSite.loginForm.passwordInput.waitFor()

        await loginPage.myWebSite.loginForm.emailInput.fill(WEBSITE_INFORMATION.USERNAME)
        await loginPage.myWebSite.loginForm.passwordInput.fill(WEBSITE_INFORMATION.PASSWORD)
        const page = this.page!;
        // usually it is bad practise to have sleep but for this web site it is tricky and time wasting place
        // need to listen carefully for certain events but due to the luck of time I speed up with the sleep.
        // may be web site under test is not selected well. I am not lucky yes :)
        await page.waitForTimeout(2000);
        //await loginPage.myWebSite.loginForm.signInButton.waitFor()
        await loginPage.myWebSite.loginForm.signInButton.click()
    }
);

Then(
    "the user is being logged in",
    async function (this: ITestController): Promise<void> {
        const loginPage = createPageModel(this);
        await expect(this.page!).toHaveTitle(" Account – The Public Pet ");
        await loginPage.myWebSite.myAccountPage.logOutIcon.waitFor({state: 'attached', timeout: 20000})
        //await expect(loginPage.myWebSite.myAccountPage.logOutIcon).toBeAttached();
    }
);



