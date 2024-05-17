"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
class SendMailer {
    constructor() {
        // Configurar transporte
        this.transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: 'adrianhoyos0216@gmail.com',
                pass: 'jxjn hgkd zuhd yjis'
            }
        });
        // Verificar conexión
        this.transporter.verify((error, success) => {
            if (error) {
                console.error('Error al verificar la conexión con el servidor de correo:', error);
            }
            else {
                console.log('Conexión exitosa con el servidor de correo');
            }
        });
    }
    /**
     * Método para enviar un correo electrónico.
     * @param to Dirección de correo electrónico del destinatario.
     * @param subject Asunto del correo electrónico.
     * @param text Contenido del correo electrónico en texto plano.
     */
    sendEmail(to, subject, text) {
        // Detalles del correo electrónico
        const mailOptions = {
            from: 'adrianhoyos0216@gmail.com',
            to,
            subject,
            text
        };
        // Enviar correo electrónico
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
            }
            else {
                console.log('Correo electrónico enviado:', info.response);
            }
        });
    }
    /**
     * Método para enviar un correo electrónico con plantilla HTML.
     * @param to Dirección de correo electrónico del destinatario.
     * @param subject Asunto del correo electrónico.
     * @param templatePath Ruta del archivo de plantilla HTML.
     * @param templateData Datos para llenar la plantilla.
     */
    sendTemplateEmail(to, subject, templatePath, templateData) {
        // Leer y compilar la plantilla HTML
        const templateSource = fs_1.default.readFileSync(templatePath, 'utf-8');
        const template = handlebars_1.default.compile(templateSource);
        const htmlToSend = template(templateData);
        // Detalles del correo electrónico
        const mailOptions = {
            from: 'adrianhoyos0216@gmail.com',
            to,
            subject,
            html: htmlToSend
        };
        // Enviar correo electrónico
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
            }
            else {
                console.log('Correo electrónico enviado:', info.response);
            }
        });
    }
}
exports.default = SendMailer;
//# sourceMappingURL=sendMailer.js.map