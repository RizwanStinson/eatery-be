import { Request, Response } from "express";
import { Iaddingredient } from "../../interfaces/inventoryInterface";
import { Idummy } from "../../interfaces/inventoryInterface";
import fs from "fs";
import path from "path";

const inventoryDetails = async (ingredient: Iaddingredient[]) => {
  console.log("Received ingredients:", ingredient);

  const filePath = path.join(__dirname, "../../../vendorList.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading vendor list:", err);
      return;
    }
    const vendorData: Idummy[] = JSON.parse(data);
    console.log("vendorData:", vendorData);
  });
};

export default inventoryDetails;
