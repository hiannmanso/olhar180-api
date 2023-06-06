var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/router/index.ts
var router_exports = {};
__export(router_exports, {
  default: () => router_default
});
module.exports = __toCommonJS(router_exports);
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
