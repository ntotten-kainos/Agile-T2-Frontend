import BasePage from "./BasePage";

export class FooterPage extends BasePage {
  private baseUrl: string = process.env.UI_TEST_URL || 'https://5chmbvngab.eu-west-1.awsapprunner.com';
  private urlPath: string = '/';
  private url: string = this.baseUrl+this.urlPath;
  constructor() {
    super();
    this.url;
  }

  //makes a call to the basepage
  async open() {
    await super.open(this.url);
  }

  async clickInstagramButton() {
    await this.clickById("instagramlinkbutton");
  }

  async clickFacebookButton() {
    await this.clickById("facebooklinkbutton");
  }
}
