"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendEmailTest_1 = require("../controllers/sendEmailTest");
const router = express_1.default.Router();
// Rutas para enviar email
router.get('/', sendEmailTest_1.enviarEmailTest);
exports.default = router;
//# sourceMappingURL=emailService.js.map