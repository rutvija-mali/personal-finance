import fs from 'fs'
const errorLogger = (err, req, res, next)=>{
        const date = new Date();
        const logFile = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}.log`
        const errorLog = JSON.stringify({
            timeStamp : date.toISOString(),
            method: req.method,
            url: req.originalUrl,
            requestId: req.headers['x-request-id'] || null,
            userId: req.user?.id || 'anonymous',
            latency: Date.now() - req.startTime,
            message:err.message,
            stack: err.stack

        }) + "\n"

        fs.appendFile(`./logs/${logFile}`, errorLog, (writeError)=>{
          if(writeError) console.log("Error writing to error log:", writeError)
        })

        res.status( err.status || 500).json({
           error:{
            message: err.message || "Internal server error",
            status: err.status || 500
           }
        })

}
export default errorLogger;