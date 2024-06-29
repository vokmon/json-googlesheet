import * as readline from "readline";

async function promptUser(message: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const p = new Promise((resolve, reject) => {
    rl.question(`${message}: `, async (answer) => {
      await rl.close();
      resolve(answer || "");
    });
  });
  const result = await p;
  return result as string;
}

export default promptUser;
