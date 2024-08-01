import BasePage from "./BasePage";

export class FooterPage extends BasePage {
//private url: string = 'https://5chmbvngab.eu-west-1.awsapprunner.com/job-roles';
  private url: string = "http://localhost:3000/";

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
