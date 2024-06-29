import google from "googleapis";
import { sheets } from "googleapis/build/src/apis/sheets/index.js";

async function getSheetClient() {
  const serviceAccountKeyFile = process.env.SERVICE_KEY_FILE_PATH;

  async function getGoogleSheetClient() {
    const auth = new google.Auth.GoogleAuth({
      keyFile: serviceAccountKeyFile,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    // const authClient = await auth.getClient();
    const sheet = sheets({ version: "v4", auth });
    return sheet;
  }

  return await getGoogleSheetClient();
}

export default getSheetClient;
