import { generateEmailHTML } from './generateEmailHTML'

const generateForgotPasswordEmail = async (args) => {
  return generateEmailHTML({
    content: '<p>Let&apos;s get you back in.</p>',
    cta: {
      buttonLabel: 'Reset your password',
      url: `${process.env.PUBLIC_SERVER_URL}/reset-password?token=${args?.token}`,
    },
    headline: 'Locked out?',
  })
}

export default generateForgotPasswordEmail
