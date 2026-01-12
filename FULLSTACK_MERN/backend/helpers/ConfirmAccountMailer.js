import nodemailer from 'nodemailer'

const CONSUMER_HEY = "9aeca3d0d0ce01869d1ac8dc9492778a"

export default async (info) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // secure:false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {email, name, token} = info

    const messageInfo = await transporter.sendMail({
        from: "Sistema Pacientes Veterinarios",
        to: email,
        subject: "Confirma el registro de tu cuenta",
        text: "Confirma el registro de tu cuenta...",
        html: `
            <h3>Un gusto escribirte ${name}</h3>
            <p>Ingresa al siguiente enlace para confirmar el registro de cuenta</p>
            <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Haz click aquí</a>
        `
    })

    console.log(`ID de mensaje enviado: ${messageInfo.messageId}`)

}
