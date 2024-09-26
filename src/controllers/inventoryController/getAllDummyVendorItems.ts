import { Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { ExtendedRequest } from '../../interfaces/extendedRequest';

export const getAllDummyVendorItems = async (
  req: ExtendedRequest,
  res: Response
) => {
  try {
    // Load vendor data from JSON file
    const filePath = path.join(__dirname, '../../../vendorList.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const dummyData = JSON.parse(jsonData);

    // Get the pagination parameters from the query
    const pageNumber = parseInt((req.query.pageNumber as string) || '0'); // Default to 0 if not provided
    const pageSize = parseInt((req.query.pageSize as string) || '10'); // Default to 10 if not provided

    // Calculate the start and end index for slicing the array
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;

    // Slice the array to get the data for the current page
    const paginatedData = dummyData.slice(startIndex, endIndex);

    // Get the total number of items in the dataset
    const totalData = dummyData.length;

    // Respond with paginated data and total data count
    res.status(200).json({ ingredient: paginatedData, totalData });
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).json({ message: 'Failed to load vendor data' });
  }
};
