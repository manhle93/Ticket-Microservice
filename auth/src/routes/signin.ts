import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be vaild"),
    body("password").trim().notEmpty().withMessage("Password is requered"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email})
    if(!existingUser){
        throw new BadRequestError('Invalid credentials')
    }
    const passwordMatch = await Password.compare(existingUser.password, password);
    if(!passwordMatch){
        throw new BadRequestError('Invalid credentials, password')
    }
    const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!); // dấu ! trobg process.env.JWT_KEY! để đảm bảo process.env.JWT_KEY không undefined 
    req.session = {
      jwt: token
    };
    res.status(200).send(existingUser)
});

export { router as signinRouter };
