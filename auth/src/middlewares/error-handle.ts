import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { CustomError } from "../errors/custom-error";
import { Response, Request, NextFunction } from "express";
export const errorHandle = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({
    errors: [{message: "Something went wrong"}],
  });
};
