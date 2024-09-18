import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

export const getAllDummyVendorItems = async (req: Request, res: Response) => {
  try {
    // Load vendor data from JSON file
    const filePath = path.join(__dirname, '../../../vendorList.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const dummyData = JSON.parse(jsonData);
    res.status(200).json(dummyData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }
};
