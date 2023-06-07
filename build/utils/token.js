var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/token.ts
var token_exports = {};
__export(token_exports, {
  decodeToken: () => decodeToken,
  generateToken: () => generateToken,
  getUserIDbyToken: () => getUserIDbyToken
});
module.exports = __toCommonJS(token_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
function decodeToken(tokenController) {
  const token = tokenController == null ? void 0 : tokenController.split("Bearer ").join("");
  let infoToken;
  import_jsonwebtoken.default.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err)
      throw { status: 400, message: `Invalid token ${token}` };
    else
      infoToken = decoded;
  });
  return infoToken;
}
function generateToken(userID) {
  return import_jsonwebtoken.default.sign({ userID }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRATION
  });
}
function getUserIDbyToken(authorization) {
  const checkToken = decodeToken(authorization);
  if (!checkToken) {
    throw {
      status: 404,
      message: `token not valid`
    };
  }
  return checkToken;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decodeToken,
  generateToken,
  getUserIDbyToken
});
