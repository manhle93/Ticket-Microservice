import express  from "express";
import {json} from 'body-parser';
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/singup";
import { errorHandle } from "./middlewares/error-handle";
const app = express();
app.use(json())
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.use(errorHandle)

app.listen(3000, () => {
    console.log('Auth service listen on port 3000')
})