import { exit } from "process";
import getSheetClient from "./google-sheet/get-sheet-client.js";
import promptUser from "./input/read-line.js";
import retriveGoogleSheetInformation from "./input/retreive-google-sheet.js";
import readJSONData from "./json/read-json-data.js";
import writeJSONToFile from "./output/write-file.js";

const range = "A:Z";
const googleSheetInfo = await retriveGoogleSheetInformation();
const outputDirectory = await promptUser("Enter output path");

const sheet = await getSheetClient();

const res = await sheet.spreadsheets.values.get({
  spreadsheetId: googleSheetInfo.sheetId,
  range: `${googleSheetInfo.tabName}!${range}`,
});

if (!res.data.values) {
  console.log(`No data in the sheet https://docs.google.com/spreadsheets/d/${googleSheetInfo.sheetId}/edit?gid=0#gid=0`);
  exit(0);
}

// const res = {
//   data: {
//     values: [
//       ["Key", "en", "es"],
//       ["Account", "Account", "Accountsss"],
//       ["Add funds", "Add funds", "Add funds"],
//       ["Add to your lists", "Add to your lists", "Add to your lists"],
//       ["Add your card?", "Add your card?", "Add your card?"],
//       ["All", "All", "All"],
//     ],
//   },
// };

// 1st column is the key
// the rest is the lang translation
const metaData = res.data.values[0];
const result: Record<string, any> = {};

if (!metaData) {
  console.log("The first row must be meta data for example key|en|es");
  exit(0);
}
// Build the meta data of the result
metaData?.slice(1).forEach((column) => {
  result[column] = {};
});

res.data.values.slice(1).forEach((row) => {
  const key = row[0];
  row.slice(1).forEach((column, index) => {
    const langKey = metaData[index + 1];
    const objectValue = result[langKey!];
    objectValue[key!] = column;
  });
});

const promiseResults = Object.keys(result).map(key => {
  return writeJSONToFile(outputDirectory, `${key}.json`, result[key]);
})

await Promise.allSettled(promiseResults);

console.log(`Finish export files to ${outputDirectory}`);