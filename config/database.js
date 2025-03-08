// import configFile from './database-config.json' assert { type: 'json' };
import { Sequelize } from 'sequelize';
import logger from './logger.js';
import yaml from "js-yaml";
import fs from "fs";
import { fileURLToPath } from 'url'
import path from 'path'

const env = process.env.NODE_ENV || 'development';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const configFile = yaml.load(
    fs.readFileSync(__dirname+'/database-config.yml', "utf8")
);
const config = configFile[env]


let sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    {
        dialect: config.dialect,
        database: config.database,
        username: config.username,
        password: config.password,
        logging: msg => {
            logger.info(msg)
        }
    }
);

export default sequelize