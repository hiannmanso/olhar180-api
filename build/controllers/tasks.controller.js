var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/controllers/tasks.controller.ts
var tasks_controller_exports = {};
__export(tasks_controller_exports, {
  taskStatusPUT: () => taskStatusPUT,
  tasksDELETE: () => tasksDELETE,
  tasksGET: () => tasksGET,
  tasksPOST: () => tasksPOST,
  tasksPUT: () => tasksPUT,
  tasksSingleGET: () => tasksSingleGET
});
module.exports = __toCommonJS(tasks_controller_exports);

// src/utils/token.ts
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

// src/services/tasks.service.ts
async function insertNewTask(data, token) {
  const infosToken = decodeToken(token);
  console.log(infosToken);
  const haveThisTask = await task_repository_default.getTasksByTitle(data.title);
  for (const item of haveThisTask) {
    if (item.description === data.description && item.finalDate === data.finalDate && item.priority === data.priority) {
      throw {
        status: 404,
        message: `This task already exist.`
      };
    }
  }
  console.log(haveThisTask);
  return await task_repository_default.insert(data, infosToken.userID);
}
async function getAllTasks(token) {
  const infosToken = decodeToken(token);
  console.log(infosToken);
  const result = await task_repository_default.getAll(infosToken.userID);
  if (result.length === 0) {
    throw {
      status: 404,
      message: `You have no tasks registered`
    };
  }
  return result;
}
async function getByTaskId(id, token) {
  const infosToken = decodeToken(token);
  const result = await task_repository_default.getById(id);
  if (!result) {
    throw {
      status: 404,
      message: `Erro on load this task, please try again.`
    };
  }
  if (result.accountId !== infosToken.userID) {
    throw {
      status: 404,
      message: `This task is not yours, please try again.`
    };
  }
  return result;
}
async function editTask(data, token) {
  const infosToken = decodeToken(token);
  console.log(infosToken);
  const infoTask = await task_repository_default.getById(data.id);
  if (!infoTask) {
    throw {
      status: 404,
      message: `Erro on load this task, please try again.`
    };
  }
  if (infoTask.accountId !== infosToken.userID) {
    throw {
      status: 404,
      message: `This task is not yours, please try again.`
    };
  }
  const result = await task_repository_default.edit(data);
  return result;
}
async function changeStatus(taskId, token) {
  const infosToken = decodeToken(token);
  let status = "feito";
  console.log(infosToken);
  const infoTask = await task_repository_default.getById(taskId);
  if (!infoTask) {
    throw {
      status: 404,
      message: `Erro on load this task, please try again.`
    };
  }
  if (infoTask.accountId !== infosToken.userID) {
    throw {
      status: 404,
      message: `This task is not yours, please try again.`
    };
  }
  if (infoTask.status === "feito") {
    status = "pendente";
  }
  const result = await task_repository_default.editStatus(taskId, status);
  return result;
}
async function deleteTask(taskId, token) {
  const infosToken = decodeToken(token);
  console.log(infosToken);
  console.log(taskId);
  const infoTask = await task_repository_default.getById(taskId);
  if (!infoTask) {
    throw {
      status: 404,
      message: `Erro on load this task, please try again.`
    };
  }
  if (infoTask.accountId !== infosToken.userID) {
    throw {
      status: 404,
      message: `This task is not yours, please try again.`
    };
  }
  const result = await task_repository_default.deleteById(taskId);
  return result;
}
var taskService = { insertNewTask, getAllTasks, getByTaskId, editTask, changeStatus, deleteTask };
var tasks_service_default = taskService;

// src/controllers/tasks.controller.ts
async function tasksPOST(req, res) {
  const { authorization } = req.headers;
  const data = req.body;
  await tasks_service_default.insertNewTask(data, authorization);
  res.status(201).send("New task add.");
}
async function tasksGET(req, res) {
  const { authorization } = req.headers;
  const result = await tasks_service_default.getAllTasks(authorization);
  res.status(200).send(result);
}
async function tasksSingleGET(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
  console.log(id);
  const taskId = Number(id);
  if (isNaN(taskId)) {
    throw {
      status: 404,
      message: `This id was not recognized`
    };
  }
  const result = await tasks_service_default.getByTaskId(taskId, authorization);
  console.log(result);
  res.status(200).send(result);
}
async function tasksPUT(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
  const taskId = Number(id);
  if (isNaN(taskId)) {
    throw {
      status: 404,
      message: `This id was not recognized`
    };
  }
  const body = req.body;
  const data = __spreadProps(__spreadValues({}, body), { id: taskId });
  console.log(data);
  const result = await tasks_service_default.editTask(data, authorization);
  res.status(200).send(result);
}
async function tasksDELETE(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
  const taskId = Number(id);
  if (isNaN(taskId)) {
    throw {
      status: 404,
      message: `This id was not recognized`
    };
  }
  const result = await tasks_service_default.deleteTask(taskId, authorization);
  res.status(200).send(result);
}
async function taskStatusPUT(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
  const taskId = Number(id);
  if (isNaN(taskId)) {
    throw {
      status: 404,
      message: `This id was not recognized`
    };
  }
  const result = await tasks_service_default.changeStatus(taskId, authorization);
  res.status(200).send(result);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  taskStatusPUT,
  tasksDELETE,
  tasksGET,
  tasksPOST,
  tasksPUT,
  tasksSingleGET
});
