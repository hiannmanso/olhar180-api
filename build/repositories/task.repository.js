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

// src/repositories/task.repository.ts
var task_repository_exports = {};
__export(task_repository_exports, {
  default: () => task_repository_default
});
module.exports = __toCommonJS(task_repository_exports);

// src/configs/database.ts
var import_client = __toESM(require("@prisma/client"));
var { PrismaClient } = import_client.default;
console.log("Postgres database connected.");
var prisma = new PrismaClient();

// src/repositories/task.repository.ts
async function insert({ title, description, finalDate, priority }, userId) {
  return prisma.task.create({ data: {
    title,
    description,
    finalDate,
    priority,
    accountId: userId
  } });
}
async function getAll(userId) {
  return prisma.task.findMany({ where: { accountId: userId } });
}
async function getById(id) {
  return prisma.task.findUnique({ where: { id } });
}
async function getTasksByTitle(title) {
  return prisma.task.findMany({ where: { title } });
}
async function edit({ id, title, description, finalDate, priority }) {
  return prisma.task.update({
    where: {
      id
    },
    data: { title, description, finalDate, priority }
  });
}
async function editStatus(id, status) {
  return prisma.task.update({ where: { id }, data: { status } });
}
async function deleteById(id) {
  console.log(id);
  return prisma.task.delete({ where: { id } });
}
var taskRepository = {
  insert,
  getAll,
  getById,
  getTasksByTitle,
  edit,
  deleteById,
  editStatus
};
var task_repository_default = taskRepository;
