import promptUser from "./read-line.js";

async function retriveGoogleSheetInformation() {
  // const sheetId = await promptUser("Enter sheet id");
  // const tabName = await promptUser("Enter tab name");
  return {
    sheetId : '1A9pWJjMae6PogQrClFhccL9hswYYFvUpwPvTe2oMy4g',
    tabName: 'esguys',
  }
}

export default retriveGoogleSheetInformation;
