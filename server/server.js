import express from 'express'
const app=express();
const port=process.env.PORT || 3000
app.get('/', (req,res)=>{
   return res.status(200).json({
        message: 'Welcome to PropertyPro-Lite',
      });
})
app.listen(port);
console.log('app running on port ', port);