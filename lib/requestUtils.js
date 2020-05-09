const axios = require('axios');
const fs    = require('fs');

async function axiosGet(url){
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        }
    })
    return response.data;
}

exports.downloadFile = async function(url){
    const responseData = await axiosGet(url);
    const currTime = new Date().getTime();
    const filePath = `file${currTime}.txt`;
    let writer = fs.createWriteStream(filePath);
    responseData.pipe(writer);

    await  new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })

    return filePath;
}

exports.retrunSuccessResponse = function(res,data, filePath){
   try{
       res.json(data);
        fs.unlinkSync(filePath);
   }catch( error){
    console.log(error)
   } 
}

exports.retrunFailureResponse = function(res, error, filePath){
    try{
        console.log(error.stack);
        res.status(500).json(error);
        if(filePath){
            fs.unlinkSync(filePath);
        }
    }catch( error){
     console.log(error)
    } 
}