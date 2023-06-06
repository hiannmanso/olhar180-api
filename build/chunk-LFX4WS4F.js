// src/app.ts
import express from "express";
import "express-async-errors";
import cors from "cors";
var server = express();
server.use(cors());
server.use(express.json());
var app_default = server;

export {
  app_default
};
