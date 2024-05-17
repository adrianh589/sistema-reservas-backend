import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

export default class SendMailer {
    private transporter: Transporter;

    constructor() {
        // Configurar transporte
        this.transporter = nodemailer.createTransport({
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
            } else {
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
    public sendEmail(to: string, subject: string, text: string): void {
        // Detalles del correo electrónico
        const mailOptions: nodemailer.SendMailOptions = {
            from: 'adrianhoyos0216@gmail.com',
            to,
            subject,
            text
        };

        // Enviar correo electrónico
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
            } else {
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
    public sendTemplateEmail(to: string, subject: string, templatePath: string, templateData: any): void {
        // Leer y compilar la plantilla HTML
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const template = handlebars.compile(templateSource);
        const htmlToSend = template(templateData);

        // Detalles del correo electrónico
        const mailOptions: nodemailer.SendMailOptions = {
            from: 'adrianhoyos0216@gmail.com',
            to,
            subject,
            html: htmlToSend
        };

        // Enviar correo electrónico
        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error);
            } else {
                console.log('Correo electrónico enviado:', info.response);
            }
        });
    }
}
