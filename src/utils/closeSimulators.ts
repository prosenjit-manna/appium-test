import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

/**
 * Utility function to close all running iOS simulators
 * @returns Promise that resolves when simulators are closed
 */
export async function closeIOSSimulators(): Promise<void> {
  try {
    console.log('Shutting down all iOS simulators...');
    const { stdout, stderr } = await execPromise('xcrun simctl shutdown all');
    
    if (stderr) {
      console.error('Error when closing simulators:', stderr);
    } else {
      console.log('Successfully shut down all iOS simulators');
    }
  } catch (error) {
    console.error('Failed to close iOS simulators:', error);
  }
}