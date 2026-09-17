import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import {connectDB} from "./config/db.js";
import {notFound, errorHandler} from "./middleware/error.middleware.js";