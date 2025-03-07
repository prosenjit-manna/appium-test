import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

/**
 * Utility function to start an Android emulator
 * @param avdName The name of the Android Virtual Device to start
 * @returns Promise that resolves when the emulator has started
 */
export async function startAndroidEmulator(avdName: string = 'Pixel_3_API_34'): Promise<void> {
  try {
    console.log(`Starting Android emulator: ${avdName}...`);
    
    // Start the emulator in the background
    const process = exec(`emulator -avd ${avdName} -no-window -no-boot-anim`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting emulator: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Emulator stderr: ${stderr}`);
      }
    });
    
    // Wait for emulator to boot
    await waitForEmulatorBoot();
    
    console.log(`Android emulator ${avdName} started successfully`);
  } catch (error) {
    console.error('Failed to start Android emulator:', error);
  }
}

/**
 * Utility function to check if Android emulator is running
 * @param avdName The name of the Android Virtual Device to check
 * @returns Promise that resolves with boolean indicating if emulator is running
 */
export async function checkAndroidEmulator(): Promise<boolean> {
  try {
    console.log('Checking if Android emulator is running...');
    
    // Check if adb devices shows any emulators
    const { stdout } = await execPromise('adb devices');
    const lines = stdout.trim().split('\n');
    
    // First line is the header, check if there are any device lines
    if (lines.length > 1) {
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].includes('emulator') && !lines[i].includes('offline')) {
          console.log('Android emulator is already running');
          return true;
        }
      }
    }
    
    console.log('No running Android emulator detected');
    console.log('');
    console.log('Please start the Android emulator manually with:');
    console.log('emulator -avd Pixel_3_API_34');
    console.log('');
    
    // Wait for user to start emulator
    return await waitForEmulatorBoot();
    
  } catch (error) {
    console.error('Error checking emulator status:', error);
    return false;
  }
}

/**
 * Wait for the Android emulator to fully boot
 * @returns Promise that resolves with boolean indicating success
 */
async function waitForEmulatorBoot(): Promise<boolean> {
  console.log('Waiting for emulator to boot...');
  
  let booted = false;
  const maxAttempts = 30; // Maximum number of attempts (30 x 2 seconds = up to 60 seconds wait)
  let attempts = 0;
  
  while (!booted && attempts < maxAttempts) {
    try {
      attempts++;
      const { stdout } = await execPromise('adb shell getprop sys.boot_completed');
      
      if (stdout.trim() === '1') {
        booted = true;
        console.log('Emulator is fully booted');
      } else {
        if (attempts % 5 === 0) {
          console.log(`Still waiting for emulator to boot... (${attempts}/${maxAttempts})`);
        }
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before checking again
      }
    } catch (error) {
      if (attempts % 5 === 0) {
        console.log(`Waiting for emulator to connect... (${attempts}/${maxAttempts})`);
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  if (!booted) {
    console.warn('Timed out waiting for emulator to boot');
    return false;
  }
  
  // Additional wait to ensure the emulator is ready
  await new Promise(resolve => setTimeout(resolve, 5000));
  return true;
}