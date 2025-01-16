// catchAsyncError.ts
import { Request, Response, NextFunction } from 'express';
import errorHandler from '../utils/errorHandler';

export const catchAsyncError = (theFunc:any) =>(req:Request, res:Response, next: NextFunction) =>{
    Promise.resolve(theFunc(req,res,next)).catch(next);
}