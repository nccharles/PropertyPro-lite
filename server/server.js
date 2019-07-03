import express from 'express'
import User from './controllers/user';
const app=express();
const port=process.env.PORT || 8080
app.use(express.json())
app.get('/', (req,res)=>{
   return res.status(200).json({
        message: 'Welcome to PropertyPro-Lite',
      });
})
app.post('/api/v1/auth/signup', User.signUp);
const server=app.listen(port);
console.log('app running on port ', port);
export default server;