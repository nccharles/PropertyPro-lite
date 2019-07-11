import express from 'express'
import Authentication from './routers/auth';
import prouter from './routers/property';
import bodyParser from 'body-parser'
const app=express();
const port=process.env.PORT || 8080
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.get('/', (req,res)=>{
   return res.status(200).json({
        message: 'Welcome to PropertyPro-Lite',
      });
})
app.use('/api/v1/auth/',Authentication);
app.use('/api/v1/property/',prouter);
const server=app.listen(port);
console.log('app running on port ', port);
export default server;