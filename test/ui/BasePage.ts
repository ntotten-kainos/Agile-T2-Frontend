import { Builder, By, WebDriver, until } from "selenium-webdriver";

export default class BasePage {
  public driver: WebDriver;

  constructor() {
    this.driver = new Builder().forBrowser("chrome").build();
    this.driver.manage().setTimeouts({ implicit: 10000 });
  }

  async open(url: string) {
    await this.driver.get(url);
  }

  async enterTextById(id: string, text: string) {
    await this.driver.findElement(By.id(id)).clear();
    await this.driver.findElement(By.id(id)).sendKeys(text);
  }

  async clickById(id: string) {
    await this.driver.findElement(By.id(id)).click();
  }

  async waitForElementById(id: string, timeout: number = 10000) {
    await this.driver.wait(until.elementLocated(By.id(id)), timeout);
  }

  async findElementById(id: string) {
    return await this.driver.findElement(By.id(id));
  }

  async findElementsById(id: string) {
    return await this.driver.findElements(By.id(id));
  }

  async closeBrowser() {
    await this.driver.quit();
  }
}
