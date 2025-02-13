// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import Transport from './email/transport'
// Users
import { Users } from './collections/Users'
// Admin Set-Up
import { IndustryType } from './collections/IndustryType'
import { JobRole } from './collections/JobRole'
import { Designation } from './collections/Designation'
import { Skills } from './collections/Skills'
import { FieldOfStudy } from './collections/FieldOfStudy'
import { DegreeLevel } from './collections/DegreeLevel'
import { JobType } from './collections/JobType'
import { SocialMedia } from './collections/SocialMedia'
import { EmployeeType } from './collections/EmployeeType'
import { AcademicActivityType } from './collections/AcademicActivityType'
import { HiringStep } from './collections/HiringStep'
// Super Admin policies
import { PrivacyPolicy } from './collections/PrivacyPolicy'
import { FAQ } from './collections/FAQ'
import { TermsAndConditions } from './collections/TermsAndConditions'
// Subscription
import { RefundPolicies } from './collections/RefundPolicies'
// Media
import { ImageMedia } from './collections/ImageMedia'
import { PdfMedia } from './collections/PdfMedia'
// Applicant
import { Applicant } from './collections/Applicant'
import { JobApplication } from './collections/JobApplication'
// Organization
import { Organization } from './collections/Organization'
import { OrgSettings } from './collections/OrgSettings'
// Job
import { Job } from './collections/Job'
import { JobDetails } from './collections/JobDetails'
import { ApplicantStatus } from './collections/ApplicantStatus'
import { HiringStage } from './collections/HiringStage'

import SocialLogin from './collections/Users/endpoints/socialLogin'
import AfterEmailVerification from './collections/Users/endpoints/afterEmailVerification'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const email = Transport()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    admin: '/hh-admin',
  },
  email: email,
  collections: [
    // users
    Users,
    // Admin Set-Up
    IndustryType,
    JobRole,
    Designation,
    Skills,
    FieldOfStudy,
    DegreeLevel,
    JobType,
    SocialMedia,
    EmployeeType,
    AcademicActivityType,
    HiringStep,
    // Super Admin policies
    PrivacyPolicy,
    FAQ,
    TermsAndConditions,
    // Applicant
    Applicant,
    JobApplication,
    // Organization
    Organization,
    OrgSettings,
    // Job
    Job,
    JobDetails,
    ApplicantStatus,
    HiringStage,
    // Subscription
    RefundPolicies,
    // Media
    ImageMedia,
    PdfMedia,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  graphQL: {
    // Disable GraphQL here
    disable: true,
  },
  // disable: Boolean(Number(process.env.ADMIN_PANEL_DISABLED)),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    idType: 'uuid',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  endpoints: [
    {
      path: '/auth/social-login',
      method: 'post',
      handler: SocialLogin,
    },
    {
      path: '/auth/verify-email/:token',
      method: 'get',
      handler: AfterEmailVerification,
    },
  ],
  cors: [
    // 'http://localhost:3000', // Your front-end application
    '*', // Your front-end application
  ],
  // If you are protecting resources behind user authentication,
  // This will allow cookies to be sent between the two domains
  csrf: [
    // 'http://localhost:3000', // Your front-end application
    '*', // Your front-end application
  ],
  cookiePrefix: 'rf',
  upload: {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB, written in bytes
    },
  },
})
