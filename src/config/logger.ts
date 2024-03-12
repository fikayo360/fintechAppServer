import {createLogger,transports,format} from 'winston'

const logger = createLogger({
    transports:[
        new transports.Console({
            level: 'info' ,
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            level: 'info',
            filename:'serverLogs.log',
            format:format.combine(format.timestamp(),format.json())
        })
    ]
})


export default logger