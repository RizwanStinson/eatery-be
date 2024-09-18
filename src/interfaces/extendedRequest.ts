import { Request } from "express";
import { IUser } from "./userInterface";

export interface ExtendedRequest extends Request {
  user?: IUser;
}
