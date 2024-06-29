import { mkdir, writeFile, access } from "fs/promises";
import fs from "fs";

async function writeJSONToFile(directory: string, fileName: string, jsonData: any) {
  try {
    const filePath = `${directory}/${fileName}`
    const dataString = JSON.stringify(jsonData, null, 2); // Stringify with indentation

    // Check if directory exists (optional)
    const directoryPath = filePath.substring(0, filePath.lastIndexOf('/'));
    await access(directoryPath, fs.constants.F_OK).catch(async (err) => {
      if (err.code === 'ENOENT') {
        await mkdir(directoryPath, { recursive: true }); // Create directory recursively
      }
    });

    await writeFile(filePath, dataString, 'utf-8');
    console.log('JSON data written successfully to file:', filePath);
  } catch (error) {
    console.error('Error writing JSON data to file:', error);
  }
}

async function createDirectoryIfNotExists(dirPath: string) {
  try {
    await access(dirPath, fs.constants.F_OK); // Check if directory exists
    console.log('Directory already exists:', dirPath);
  } catch (error: any) {
    if (error.code === 'ENOENT') { // Handle ENOENT error (directory not found)
      await mkdir(dirPath);
      console.log('Directory created successfully:', dirPath);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export default writeJSONToFile;