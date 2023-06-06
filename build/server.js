var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_dotenv = __toESM(require("dotenv"));

// src/app.ts
var import_express2 = __toESM(require("express"));
var import_express_async_errors2 = require("express-async-errors");
var import_cors = __toESM(require("cors"));

// src/router/index.ts
var import_express = require("express");
var import_express_async_errors = require("express-async-errors");

// src/middleware/handleError.ts
function handleError(error, req, res, next) {
  console.log(error);
  if (error) {
    return res.status(error.status).send(error.message);
  }
  res.status(500);
}

// src/router/index.ts
var router = (0, import_express.Router)();
router.get("/health", (req, res) => {
  res.send("OK");
});
router.use(handleError);
var router_default = router;

// src/app.ts
var server = (0, import_express2.default)();
server.use((0, import_cors.default)());
server.use(import_express2.default.json());
server.use(router_default);
var app_default = server;

// src/server.ts
import_dotenv.default.config();
app_default.listen(process.env.PORT || 5e3, () => {
  console.log(`Backend npmup on PORT:${process.env.PORT}`);
});
