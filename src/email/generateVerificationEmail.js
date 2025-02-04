import { generateEmailHTML } from './generateEmailHTML'

const generateVerificationEmail = async (args) => {
  const { token, user } = args

  return generateEmailHTML({
    content: `<p>Hi${user.name ? ' ' + user.name : ''}! Validate your account by clicking the button below.</p>`,
    cta: {
      buttonLabel: 'Verify',
      url: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/verify?token=${token}&email=${user.email}`,
    },
    headline: 'Verify your account',
  })
}

export default generateVerificationEmail
