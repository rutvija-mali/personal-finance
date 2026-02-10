import fs from 'fs'

const requestLogger =(req, res, next) =>{
    req.startTime = Date.now();
   res.on("finish",()=>{
    const date = new Date();
    const logFile = `request-Log-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`


    const requestLog = JSON.stringify({
        timeStamp: date.toISOString(),
        method: req.method,
        requestId: req.headers['x-request-id'] || null,
        url: req.originalUrl,
        userId: req.user?.id || 'anonymous',
        latency: Date.now() - req.startTime

    })

    fs.appendFile(`./logs/${logFile}`, requestLog, (writeError)=>{
         if(writeError) console.log("Error writing to request log:", writeError)
    })
   })

   next();

}
export default requestLogger;