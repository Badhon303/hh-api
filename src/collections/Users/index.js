import generateForgotPasswordEmail from '../../email/generateForgotPasswordEmail'
import generateVerificationEmail from '../../email/generateVerificationEmail'

import AdminsAndUsers from '../../access/adminsAndUsers'

import CustomError from '../../utils/CustomError'

export const Users = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: AdminsAndUsers,
    update: () => false,
    delete: AdminsAndUsers,
  },
  auth: {
    tokenExpiration: Number(process.env.TOKEN_EXPIRATION), // How many seconds to keep the user logged in
    maxLoginAttempts: Number(process.env.MAX_LOGIN_ATTEMPTS), // Automatically lock a user out after X amount of failed logins
    lockTime: Number(process.env.LOCK_TIMEOUT), // Time period to allow the max login attempts
    verify: {
      generateEmailSubject: () => 'Verify your email',
      generateEmailHTML: generateVerificationEmail,
    },
    forgotPassword: {
      generateEmailSubject: () => 'Reset your password',
      generateEmailHTML: generateForgotPasswordEmail,
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'provider',
      label: 'Provider',
      type: 'select',
      saveToJWT: true,
      access: { update: () => false },
      required: true,
      options: [
        {
          label: 'Credentials',
          value: 'credentials',
        },
        {
          label: 'Google',
          value: 'google',
        },
        {
          label: 'Github',
          value: 'github',
        },
        {
          label: 'LinkedIn',
          value: 'linkedin',
        },
      ],
    },
    {
      name: 'sid',
      label: 'sid',
      type: 'text',
      admin: { readOnly: true },
      access: { update: () => false },
    },
    {
      name: 'pictureUrl',
      label: 'pictureUrl',
      type: 'text',
      // admin: { readOnly: true },
      access: { update: () => true },
    },
    {
      name: 'role',
      type: 'select',
      access: { update: () => false },
      required: true,
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Org',
          value: 'org',
        },
        {
          label: 'Applicant',
          value: 'applicant',
        },
      ],
    },
  ],
  hooks: {
    beforeOperation: [
      async ({ operation, args, req }) => {
        if (operation === 'login') {
          const { email } = args.data
          if (email) {
            const user = await req.payload.find({
              collection: 'users',
              where: { email: { equals: email } },
            })
            if (user.docs.length > 0) {
              const foundUser = user.docs[0]
              if (!foundUser._verified) {
                throw new CustomError(
                  'Your email is not verified. Please verify your email to log in.',
                  401,
                )
              }
            }
          }
        }
      },
    ],
  },
}
