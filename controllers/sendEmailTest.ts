import { Request, Response } from 'express';
import SendMailer from "../helpers/sendMailer";

export const enviarEmailTest = async (req: Request, res: Response) => {
    console.log('Enviando Email...')
    const sendMailer = new SendMailer();
    sendMailer.sendEmail('adrianhoyos0216@gmail.com', 'Prueba de smart talent', 'Enviado con exito');


}
