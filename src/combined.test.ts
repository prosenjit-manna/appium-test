import { App } from "./app";

console.log(process.cwd() + '/app/' + process.env.PARTNER_APP);
describe("combined", () => {
  const app1_capabilities: any = {
    platformName: "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "Android",
    "appium:app": process.cwd() + '/app/' + process.env.PARTNER_APP, // Ensure the 'app' capability is set
    "appium:appPackage": "com.snapecab.partner",
    "appium:autoGrantPermissions": true,
    "appium:appWaitForLaunch": "false"
  };

  const app2_capabilities: any = {
    platformName: "Android",
    "appium:automationName": "UiAutomator2",
    "appium:deviceName": "Android",
    "appium:app": process.cwd() + '/app/' + process.env.CUSTOMER_APP, // Ensure the 'app' capability is set
    "appium:appPackage": "com.snapecab.customer",
    "appium:autoGrantPermissions": true,
    "appium:appWaitForLaunch": "false"
  };

  let app1: App;
  let app2: App;

  it("should return the sum of two numbers", async () => {
    app1 = new App();
    await app1.init(app1_capabilities);
     // Find mobile input field by ID and type phone number
     const mobileInput = await app1.findElement('//android.widget.EditText[@resource-id="com.snapecab.partner:id/etMobileNumber"]');
     await mobileInput.setValue('9876543210');
     

    // Optional: Add a small wait to verify the input
    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  it("should return the sum of two numbers", async () => {
    app2 = new App();
    await app2.init(app2_capabilities);
     // Find mobile input field by ID and type phone number
     const mobileInput = await app2.findElement('//android.widget.EditText[@resource-id="com.snapecab.customer:id/etMobileNumber"]');
     await mobileInput.setValue('9876543210');
     

    // Optional: Add a small wait to verify the input
    await new Promise(resolve => setTimeout(resolve, 1000));
  });
});