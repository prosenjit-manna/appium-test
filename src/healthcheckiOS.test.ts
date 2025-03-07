import { App } from './app';

const iOSVersion = '17.4';

const capabilities = {
  platformName: 'iOS',
  'appium:platformVersion': iOSVersion,
  'appium:deviceName': 'iPhone 15 Pro Max',
  'appium:automationName': 'XCUITest',
  'appium:app': 'com.apple.Preferences',
  // 'appium:app': process.cwd() + '/app/neststartertemplateapp.app',
  'appium:locale': 'US',
  'appium:language': 'en',
  'appium:udid': 'auto',
  'appium:noReset': true,
};

describe('Healthcheck iOS Appium connection', function () {
  let app: App;

  before(async () => {
    app = new App();
    await app.init(capabilities);
  });

  after(async () => {
    await app.quit();
  });

  it('checks iOS version number on Settings App', async () => {
    // Go the the "General" section
    const generalElement = await app.findElement('//XCUIElementTypeCell[@name="General"]');
    await generalElement.click();

    // Go the the "About" section
    const aboutElement = await app.findElement('//XCUIElementTypeCell[@name="About"]');
    await aboutElement.click();

    // Go the the "iOS Version" section
    const versionElement = await app.findElement('//XCUIElementTypeCell[@name="iOS Version"]');
    await versionElement.click();

    // Check the version is the on expected
    const iosVersionElement = await app.findElement(`//XCUIElementTypeButton[contains(@name, "iOS ${iOSVersion}")]`);
    const isDisplayed = await iosVersionElement.isDisplayed();

    if (!isDisplayed) {
      throw new Error(`Could not find iOS version label ${iOSVersion} on the device`);
    }
  })
});