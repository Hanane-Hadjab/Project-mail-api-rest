import express from 'express';
import {db} from '../src/config/db.config';
import messageRoute from "./routes/message.route";
import userRoute from "./routes/user.route";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(messageRoute);
app.use('/users', userRoute);

db.then(() => {
    console.log('connected to DataBase mongoDb');
})

app.get('/home', (req, res) => {
   res.send('Hello everybody');
});

app.listen(3001);