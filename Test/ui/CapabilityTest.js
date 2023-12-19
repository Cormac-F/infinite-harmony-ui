const { Builder, By, until } = require("selenium-webdriver");
const chai = require("chai");

describe("CapabilityTest", () => {
  it("should scroll to find capability name after clicking the Employee button", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      await driver.get("http://localhost:3000/");

      await driver.findElement(By.linkText("Employee")).click();

      await driver.wait(until.elementLocated(By.id("jobs-container")), 5000);

      await driver.executeScript("arguments[0].scrollIntoView(true);", await driver.findElement(By.id("jobs-container")));

      await driver.wait(until.elementLocated(By.css("#job-table tbody tr:first-child td:last-child")), 5000);

      const capabilityName = await driver.findElement(By.css("#job-table tbody tr:first-child td:last-child")).getText();

      chai.assert.isNotEmpty(capabilityName);
    } finally {
      await driver.quit();
    }
  });
});
