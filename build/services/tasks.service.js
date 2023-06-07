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

// src/services/tasks.service.ts
var tasks_service_exports = {};
__export(tasks_service_exports, {
  default: () => tasks_service_default
});
module.exports = __toCommonJS(tasks_service_exports);

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
