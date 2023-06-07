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

// src/router/index.ts
var router_exports = {};
__export(router_exports, {
  router: () => router
});
module.exports = __toCommonJS(router_exports);
var import_express_async_errors = require("express-async-errors");
var import_express3 = require("express");

// src/router/task.router.ts
var import_express = require("express");

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
function generateToken(userID) {
  return import_jsonwebtoken.default.sign({ userID }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRATION
  });
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

// src/middlewares/validateSchema.ts
function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).send(error.details.map((detail) => detail.message));
    }
    next();
  };
}

// src/schemas/task.schema.ts
var import_joi = __toESM(require("joi"));
var taskSchema = import_joi.default.object({
  id: import_joi.default.number(),
  title: import_joi.default.string().required(),
  description: import_joi.default.string().required(),
  finalDate: import_joi.default.string().required(),
  priority: import_joi.default.string().valid("baixa", "media", "alta")
});

// src/router/task.router.ts
var taskRouter = (0, import_express.Router)();
taskRouter.post("", validateSchema(taskSchema), tasksPOST);
taskRouter.get("", tasksGET);
taskRouter.get("/:id", tasksSingleGET);
taskRouter.put("/:id", validateSchema(taskSchema), tasksPUT);
taskRouter.put("/status/:id", taskStatusPUT);
taskRouter.delete("/:id", tasksDELETE);
var task_router_default = taskRouter;

// src/router/auth.router.ts
var import_express2 = require("express");

// src/services/auth.service.ts
var import_bcrypt = __toESM(require("bcrypt"));

// src/repositories/auth.repository.ts
async function insert2(email, password, username) {
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
async function getAll2() {
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
  insert: insert2,
  getByEmail,
  getByUserId,
  getAll: getAll2
};
var auth_repository_default = authRepository;

// src/services/auth.service.ts
async function signUp(data) {
  const checkEmailIsValid = await auth_repository_default.getByEmail(data.email);
  console.log(data);
  if (checkEmailIsValid) {
    throw {
      status: 401,
      message: `This email is already in use.`
    };
  }
  await auth_repository_default.insert(
    data.email,
    import_bcrypt.default.hashSync(data.password, 10),
    data.username
  );
}
async function signIN(email, password) {
  const checkEmailIsValid = await auth_repository_default.getByEmail(email);
  if (!checkEmailIsValid) {
    throw {
      status: 404,
      message: `This email  is not registered.`
    };
  }
  if (!import_bcrypt.default.compareSync(password, checkEmailIsValid.password)) {
    throw {
      status: 406,
      message: `Incorrect password or email.`
    };
  }
  const token = generateToken(checkEmailIsValid.id);
  return token;
}

// src/controllers/auth.controller.ts
async function signUpPOST(req, res) {
  const data = req.body;
  console.log(data, "DATAAAAAAAAAAA");
  await signUp(data);
  res.status(201).send(`Your account have been created!`);
}
async function signInGET(req, res) {
  const { email, password } = req.body;
  const token = await signIN(email, password);
  res.status(200).send({ token });
}

// src/schemas/signup.schema.ts
var import_joi2 = __toESM(require("joi"));
var signUpSchema = import_joi2.default.object({
  email: import_joi2.default.string().email().required(),
  password: import_joi2.default.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required(),
  confirmPassword: import_joi2.default.ref("password"),
  username: import_joi2.default.string().required()
});

// src/router/auth.router.ts
var authRouter = (0, import_express2.Router)();
authRouter.post("/signup", validateSchema(signUpSchema), signUpPOST);
authRouter.post("/signin", signInGET);
var auth_router_default = authRouter;

// src/middlewares/handleError.ts
function handleError(error, req, res, next) {
  console.table(error);
  if (error) {
    return res.status(error.status).send(error.message);
  }
  res.status(500);
}

// src/router/index.ts
var router = (0, import_express3.Router)();
router.use(auth_router_default);
router.use("/tasks", task_router_default);
router.use(handleError);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
