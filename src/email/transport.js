import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

const Transport = () => {
  // let email

  // if (process.env.NODE_ENV === "production") {
  const email = nodemailerAdapter({
    defaultFromAddress: process.env.FROM_ADDRESS,
    defaultFromName: process.env.FROM_NAME,
    // Nodemailer transportOptions
    transportOptions: {
      service: 'gmail',
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: false, // Use TLS
    },
  })
  // } else {
  //   email = {
  //     fromName: "Ethereal Email",
  //     fromAddress: "example@ethereal.com",
  //     logMockCredentials: true,
  //   }
  // }
  return email
}

// Correct the export here
export default Transport
