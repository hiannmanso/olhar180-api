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

// src/controllers/auth.controller.ts
var auth_controller_exports = {};
__export(auth_controller_exports, {
  signInGET: () => signInGET,
  signUpPOST: () => signUpPOST
});
module.exports = __toCommonJS(auth_controller_exports);

// src/services/auth.service.ts
var import_bcrypt = __toESM(require("bcrypt"));

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

// src/utils/token.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
function generateToken(userID) {
  return import_jsonwebtoken.default.sign({ userID }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRATION
  });
}

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  signInGET,
  signUpPOST
});
