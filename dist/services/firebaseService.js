"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var app_1 = require("firebase-admin/app");
dotenv_1.default.config();
var firebaseConfig = {
    credential: (0, app_1.cert)({
        projectId: process.env.PROJECT_ID,
        privateKey: (_a = process.env.PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
        clientEmail: process.env.CLIENT_EMAIL,
    }),
};
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.default = app;
