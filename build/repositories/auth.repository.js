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

// src/repositories/auth.repository.ts
var auth_repository_exports = {};
__export(auth_repository_exports, {
  default: () => auth_repository_default
});
module.exports = __toCommonJS(auth_repository_exports);

// src/configs/database.ts
var import_client = __toESM(require("@prisma/client"));
var { PrismaClient } = import_client.default;
console.log("Postgres database connected.");
var prisma = new PrismaClient();

// src/repositories/auth.repository.ts
async function insert(email, password, username) {
  const result = await prisma.accounts.create({
    data: { email, password, username }
  });
  console.log(result);
  return result;
}
async function getByEmail(email) {
  return prisma.accounts.findUnique({ where: { email } });
}
async function getByUserId(userId) {
  return prisma.accounts.findUnique({ where: { id: userId } });
}
async function getAll() {
  const result = await prisma.accounts.findMany({
    select: {
      id: true,
      username: true
    }
  });
  console.log(result);
  return result;
}
var authRepository = {
  insert,
  getByEmail,
  getByUserId,
  getAll
};
var auth_repository_default = authRepository;
