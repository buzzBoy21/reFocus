import { exec } from 'child_process';

/**
 *
 * @param {string} developCommand // command string such as you can see in a terminal
 * @param {string?} productionCommand // command string such as you can see in a terminal, if It is not define is  developCommand string
 * @returns {Promise<any>}
 */
function executeCommand(developCommand, productionCommand = developCommand) {
   const isDev = process.env.NODE_ENV === 'development';
   console.log('Develop command:', developCommand, 'Production command:', productionCommand); // log to check the command
   return new Promise((resolve, reject) => {
      exec(isDev ? developCommand : productionCommand, (error, stdout, stderr) => {
         if (error) {
            console.error('Error executing command:', error.message);
            reject({ success: false, error: error.message });
         } else if (stderr) {
            console.error('stderr:', stderr);
            reject({ success: false, error: stderr });
         } else {
            console.log('stdout:', stdout);
            resolve({ success: true, output: stdout });
         }
      });
   });
}
export default executeCommand;
