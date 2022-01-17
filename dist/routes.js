"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var stories_1 = require("./routes/stories");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/story/:id', stories_1.getStoryById);
