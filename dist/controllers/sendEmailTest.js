"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarEmailTest = void 0;
const sendMailer_1 = __importDefault(require("../helpers/sendMailer"));
const enviarEmailTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Enviando Email...');
    const sendMailer = new sendMailer_1.default();
    sendMailer.sendEmail('adrianhoyos0216@gmail.com', 'Prueba de smart talent', 'Enviado con exito');
});
exports.enviarEmailTest = enviarEmailTest;
//# sourceMappingURL=sendEmailTest.js.map