const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.json());

const PORT= process.env.PORT || 3000; // take PORT from .env file otherwise default to 3000

app.post('/calculateAverage',(req,res)=>{  // endpoint api/calculateAverage to calculate average
    const numbersArray =req.body.numbers;
    let totalSum=0;
    for(let i=0;i<numbersArray.length;i++){
        if(typeof numbersArray[i] !== 'number'){
            return res.status(400).json({error:'All inputs should be number'});
        }
        totalSum+=numbersArray[i];
    }
    const average = totalSum/numbersArray.length;
    return res.status(200).json({average:average});
});

app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`);
});