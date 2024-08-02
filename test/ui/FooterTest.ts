import { expect } from "chai";
import { urlContains } from "selenium-webdriver/lib/until";
import { FooterPage } from "./FooterPage";

describe("Footer Page Tests", () => {
  let footerPage: FooterPage;

  // Before the test runs, only called at the start of the test
  before(async () => {
    footerPage = new FooterPage();
    await footerPage.open();
  });

  // Closing the driver, this is calling the method from the BasePage class,
  after(async () => {
    await footerPage.closeBrowser();
  });


  it("should bring the user to the Instagram page", async () => {
    await footerPage.clickInstagramButton();

    await footerPage.driver.wait(urlContains("instagram"), 10000);

    const currentUrl = await footerPage.driver.getCurrentUrl();
    expect(currentUrl).to.include("instagram");
    await footerPage.driver.navigate().back();
  });

  it("should bring the user to the Facebook page", async () => {
    await footerPage.clickFacebookButton();

    await footerPage.driver.wait(urlContains("facebook"), 10000);

    const currentUrl = await footerPage.driver.getCurrentUrl();
    expect(currentUrl).to.include("facebook");
    await footerPage.driver.navigate().back();
  });
});
