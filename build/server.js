import {
  app_default
} from "./chunk-LFX4WS4F.js";

// src/server.ts
import dotenv from "dotenv";
dotenv.config();
app_default.listen(process.env.PORT || 5e3, () => {
  console.log(`Backend up on PORT:${process.env.PORT}`);
});
