import{ Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import { ValidateError } from "tsoa";


export function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
  ): ExResponse | void {
    
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    next(err)
  };

  export function duplicateEntryHandler(err: any, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        code: 'ER_DUP_ENTRY',
        message: 'User already exists',
        fields: err.fields
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  
    next(err);
  }
