import getSheetClient from "./google-sheet/get-sheet-client.js";
import promptUser from "./input/read-line.js";
import retriveGoogleSheetInformation from "./input/retreive-google-sheet.js";
import readJSONData from "./json/read-json-data.js";

const range = "A:B";
const googleSheetInfo = await retriveGoogleSheetInformation();
const jsonFilePath = await promptUser("Enter json file path");

const fileName = jsonFilePath.split('/').pop()?.split('.')[0];

const jsonData = await readJSONData(jsonFilePath);
const arrayOfArrays = Object.entries(jsonData).map(([key, value]) => [key, value]);
arrayOfArrays.unshift(["key", fileName]);

const sheet = await getSheetClient();

await sheet.spreadsheets.values.append({
  spreadsheetId: googleSheetInfo.sheetId,
  range: `${googleSheetInfo.tabName}!${range}`,
  valueInputOption: "RAW",
  requestBody: {
    range: `${googleSheetInfo.tabName}!${range}`,
    values: arrayOfArrays,
  },
});

console.log(`Finish import ${jsonFilePath} to https://docs.google.com/spreadsheets/d/${googleSheetInfo.sheetId}/edit?gid=0#gid=0`)
