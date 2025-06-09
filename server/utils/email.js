import nodemailer from 'nodemailer'

const sendEmail = async options => {
    // 1 create transport
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            user: process.env.SMPT_HOST_USERNAME,
            pass: process.env.SMPT_PASSWORD
        }
    })

    // 2 define the email options
    const mailOptions = {
        from: "kadar bache <kadar@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    // 3 send the email
    await transporter.sendMail(mailOptions)
}
export default sendEmail;