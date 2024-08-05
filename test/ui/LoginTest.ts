import { expect } from "chai";
import { LoginPage } from "./LoginPage";


describe("LoginPage Tests", () => {
  let loginPage: LoginPage;

  before(async () => {
    loginPage = new LoginPage();
    await loginPage.open();
  });

  after(async () => {
    await loginPage.closeBrowser();
  });

  // vars
  let adminValidEmail: string = "valid.admin@email.com";
  let adminValidPassword: string = "admin!Pa$$word123";
  let applicantValidEmail: string = "regular.user@email.com";
  let applicantValidPassword: string = "regularU$er123";
  let invalidEmail: string = "invalid@gmail.com";
  let invalidPassword: string = "123";


  it("should find the email input field", async () => {
    const emailField = await loginPage.email();
    expect(emailField).to.not.be.null;
    expect(await emailField.getAttribute("name")).to.equal("email");
  });

  it("should find the password input field", async () => {
    const passwordField = await loginPage.password();
    expect(passwordField).to.not.be.null;
    expect(await passwordField.getAttribute("id")).to.equal("password");
  });

  it("should find the submit button", async () => {
    const submitButton = await loginPage.submit();
    expect(submitButton).to.not.be.null;
    expect(await submitButton.getAttribute("class")).to.include("login-button");
  });

  // invalid email and invalid password
  it("should display error message when wrong email and password entered", async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await loginPage.enterTextById('email', invalidEmail);

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys(invalidPassword);

    await loginPage.clickSubmit();

    const errorMessage = await loginPage.findElementById("error-message");
    expect(await errorMessage.getText()).to.include(
      "Invalid email or password - hover over input field for more info!"
    );
  });

    // invalid email and valid password
    it("should display error message when wrong email and valid password entered", async () => {
      const emailField = await loginPage.email();
      await emailField.clear();
      await emailField.sendKeys(invalidEmail);
  
      const passwordField = await loginPage.password();
      await passwordField.clear();
      await passwordField.sendKeys(adminValidPassword);
  
      await loginPage.clickSubmit();
  
      const errorMessage = await loginPage.findElementById("error-message");
      expect(await errorMessage.getText()).to.include(
        "Login Request: Invalid Login Credentials!"
      );
    });

  // no login details entered; click Submit button
  it("should display error message when no email or password entered", async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys("");

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys("");

    await loginPage.clickSubmit();

    const errorMessage = await loginPage.findElementById("error-message");
    expect(await errorMessage.getText()).to.include(
      "Please enter email and password"
    );
  });

  // password length < 8 "Password must be at least 8 characters long"
  it("should display error message if password invalid", async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await loginPage.enterTextById("email", adminValidEmail);

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await loginPage.enterTextById("password", invalidPassword);

    await loginPage.clickSubmit();

    const errorMessage = await loginPage.findElementById("error-message");

    expect(await errorMessage.getText()).to.include(
      "Invalid email or password - hover over input field for more info!"
    );
  });

  // successful login - Recruitment Administratior
  it("admin user should enter email and password, then click submit", async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys(adminValidEmail);
    expect(await emailField.getAttribute("value")).to.equal(adminValidEmail);

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys(adminValidPassword);
    expect(await passwordField.getAttribute("value")).to.equal(adminValidPassword);

    await loginPage.clickSubmit();

    await loginPage.clickById("viewjobsbutton")
    const currentUrl = await loginPage.driver.getCurrentUrl();

    expect(currentUrl).to.include("job-roles");
    await loginPage.driver.navigate().back();
  });

  // successful logout
it("should click logout and log the user out", async () => {
  await loginPage.clickLogout();

  const loginButton = await loginPage.findElementById("loginbutton");
  const loginButtonText = await loginButton.getText();
  expect(loginButtonText).to.equal("Log In");
});

  // no login details entered; click Submit button
  it("should display error message when no email or password entered", async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys("");

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys("");

    await loginPage.clickSubmit();

    const errorMessage = await loginPage.findElementById("error-message");
    expect(await errorMessage.getText()).to.include(
      "Please enter email and password"
    );
  });

  // successful login - Applicant User
  it("applicant user should enter email and password, then click submit", async () => {
    const emailField = await loginPage.email();
    await emailField.clear();
    await emailField.sendKeys(applicantValidEmail);
    expect(await emailField.getAttribute("value")).to.equal(applicantValidEmail);

    const passwordField = await loginPage.password();
    await passwordField.clear();
    await passwordField.sendKeys(applicantValidPassword);
    expect(await passwordField.getAttribute("value")).to.equal(applicantValidPassword);

    await loginPage.clickSubmit();

    await loginPage.clickById("viewjobsbutton")
    const currentUrl = await loginPage.driver.getCurrentUrl();

    expect(currentUrl).to.include("job-roles");
    await loginPage.driver.navigate().back();
  });

});
