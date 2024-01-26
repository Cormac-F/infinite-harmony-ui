const { Builder, By, until } = require("selenium-webdriver");
const chai = require("chai");

const webdriver = require("selenium-webdriver");

describe("LoginTest", () => {
  it("should click login, try to log in and generate a fail", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      await driver.get("http://localhost:3000/");
      await driver.findElement(By.id("login")).click();
      await driver.findElement(By.id("username")).sendKeys("test@test.com");
      await driver.findElement(By.id("password")).sendKeys("test");
      await driver.findElement(By.id("btn-login")).click();

      await driver.wait(until.elementLocated(By.id("login-error")), 5000);
    } finally {
      await driver.quit();
    }
  });
});
