import { remote } from "webdriverio";

describe("Google Homepage", function () {
  let driver: WebdriverIO.Browser;

  // Increase timeout for this suite since we're dealing with real browser interactions
  this.timeout(30000);

  before(async function () {
    driver = await remote({
      capabilities: {
        browserName: "chrome",
      },
      logLevel: "error",
    });
  });

  it("should display Google search elements", async function () {
    // Navigate to Google
    await driver.url("https://www.google.com");

    // Find and verify search input using standard web locator
    const searchInput = await driver.$('textarea[name="q"]');
    await searchInput.waitForExist();
    await searchInput.setValue("webdriverio");
    // wait for certain time
    await driver.pause(10000);
  });

  after(async function () {
    if (driver) {
      await driver.deleteSession();
    }
  });
});
