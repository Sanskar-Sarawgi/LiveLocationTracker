import { createLogger, format, transports } from "winston";

const myFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.printf((info) => {
        return (
        "[" +
        info.timestamp +
        "]" +
        " " +
        "[" +
        info.level +
        "]" +
        " " +
        info.message
        );
    })
);

let transports_config = [
    new transports.File({
        filename: process.env.LOGGER_FILE,
        format: myFormat,
        level: "debug",
        colorize: true
    })
]

if(process.env.NODE_ENV == 'development'){
    transports_config.push(new transports.Console({
        filename: process.env.LOGGER_FILE,
        format: myFormat,
        level: "debug",
        colorize: true
    }))
}

const logger = createLogger({
    format: myFormat,
    level: 'debug',
    transports: transports_config
})

export default logger