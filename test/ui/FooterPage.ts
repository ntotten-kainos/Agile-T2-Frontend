import BasePage from "./BasePage";

export class FooterPage extends BasePage {
private url: string = 'https://5chmbvngab.eu-west-1.awsapprunner.com/job-roles';

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
