import { readFile } from 'fs/promises';

async function readJSONData(filePath: string) {
  try {
    const data = await readFile(filePath, 'utf-8'); // Read file as UTF-8 encoded text
    return JSON.parse(data); // Parse the JSON string
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error; // Or handle the error differently
  }
}

export default readJSONData;