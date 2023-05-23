import { RequestValidationError } from '../errors/request-validation-error'
import { DatabaseConnectionError } from '../errors/database-connection-error'

import {Response, Request, NextFunction} from 'express'
export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof RequestValidationError){
        console.log('Request validation error')
    }
    if(err instanceof DatabaseConnectionError){
        console.log('Database validation error')
    }
    res.status(400).send({
        message: err.message,
    })
}