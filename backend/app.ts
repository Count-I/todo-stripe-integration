import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const apiRouter = require('./src/routes')
const app: any = express();
//define cors configs
app.use(cors({
    origin: `${process.env.CLIENT_URL}`
}));

//set up server's port
const PORT: any = process.env.PORT || 3000;

//allow use of json's format
app.use(express.json());


app.use('', apiRouter);

//run the server on specified port 
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


