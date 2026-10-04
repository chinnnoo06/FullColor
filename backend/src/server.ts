import morgan from 'morgan'
import express, { Express } from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import { connection } from './config/connection'
import { corsOptions } from './config/cors'
import { IS_DEV, UPLOADS_PATH } from './config/env'

import { errorHandler } from './middlewares/error'

import authRouter from './routes/auth.routes'
import fcServiceRouter from './routes/fcService.route'
import fcServiceCategoryRouter from './routes/fcServiceCategory.route'
import fcDepotProductRouter from './routes/fcDepotProduct.route'
import fcWebProjectRouter from './routes/fcWebProject.route'

connection();

const server: Express = express();

server.use(cors(corsOptions))

server.use(express.json());
server.use(cookieParser());

// Serve the uploaded files
const uploadsDir = path.resolve(UPLOADS_PATH);

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

server.use('/files', express.static(uploadsDir));

if (IS_DEV) {
    server.use(morgan('dev'))
}

server.use("/api/auth", authRouter);
server.use("/api/fc-services", fcServiceRouter);
server.use("/api/fc-category-services", fcServiceCategoryRouter);
server.use("/api/fc-depot-products", fcDepotProductRouter);
server.use("/api/fc-web-projects", fcWebProjectRouter);

server.use(errorHandler);


export default server
