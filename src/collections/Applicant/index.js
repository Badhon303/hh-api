import { BloodGroup } from './utils/bloodGroup'
import applicantAndAdmin from '../../access/applicantAndAdmin'
import { UrlPatternValidate } from '../../utils/urlPatternValidate'
import { OnlyAdmins } from '../../access/onlyAdmins'
import { ApplicantRead } from '../../access/applicantRead'

export const Applicant = {
  slug: 'applicants',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ApplicantRead,
    create: OnlyAdmins,
    update: applicantAndAdmin,
    delete: OnlyAdmins,
  },
  fields: [
    {
      name: 'applicant',
      type: 'relationship',
      relationTo: 'users',
      access: { update: () => false },
      required: true,
      hasMany: false,
      unique: true,
    },
    {
      name: 'industryType',
      type: 'relationship',
      relationTo: 'industry-types',
      hasMany: true,
    },
    {
      name: 'jobRole',
      type: 'relationship',
      relationTo: 'job-roles',
      hasMany: true,
    },
    {
      name: 'designation',
      type: 'relationship',
      relationTo: 'designations',
      hasMany: false,
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
    },
    {
      name: 'name',
      type: 'text',
      maxLength: 50,
    },
    {
      name: 'firstName',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'lastName',
      type: 'text',
      maxLength: 100,
    },
    {
      name: 'address',
      type: 'text',
      maxLength: 500,
    },
    {
      name: 'phone',
      type: 'text',
      maxLength: 50,
    },
    {
      name: 'email', // required
      type: 'email', // required
      label: 'Applicant Email Address',
    },
    {
      name: 'contactInfo', // required
      type: 'text', // required
      maxLength: 200,
    },
    {
      name: 'applicantWebsiteUrl',
      type: 'text',
      maxLength: 200,
      validate: UrlPatternValidate,
    },
    {
      name: 'img', // required
      type: 'upload', // required
      relationTo: 'media-images', // required
    },
    {
      name: 'cv', // required
      type: 'upload', // required
      relationTo: 'media-pdfs', // required
    },
    {
      name: 'socialLinks', // required
      type: 'array', // required
      maxRows: 5,
      fields: [
        {
          name: 'socialMedia',
          type: 'relationship',
          relationTo: 'social-medias',
          required: true,
          hasMany: false,
        },
        {
          name: 'socialMediaUrl',
          type: 'text',
          maxLength: 200,
          required: true,
          validate: UrlPatternValidate,
        },
      ],
    },
    {
      name: 'bloodGroup',
      type: 'select',
      options: BloodGroup,
    },
    {
      name: 'trainingAndCertifications', // required
      type: 'array', // required
      maxRows: 20,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          maxLength: 50,
        },
        {
          name: 'yearOfExperience',
          type: 'number',
          max: 50,
          min: 0,
        },
        {
          name: 'beginning',
          type: 'date',
        },
        {
          name: 'ending',
          type: 'date',
        },
        {
          name: 'certificateUpload', // required
          type: 'upload', // required
          relationTo: 'media-pdfs', // required
        },
      ],
    },
    {
      name: 'experiences', // required
      type: 'array', // required
      maxRows: 20,
      fields: [
        {
          name: 'companyName',
          type: 'text',
          required: true,
          maxLength: 100,
        },
        {
          name: 'yearOfExperience',
          type: 'number',
          max: 50,
          min: 0,
        },
        {
          name: 'beginning',
          type: 'date',
        },
        {
          name: 'ending',
          type: 'date',
        },
        {
          name: 'jobRole',
          type: 'relationship',
          relationTo: 'job-roles',
          hasMany: true,
        },
        {
          name: 'designation',
          type: 'relationship',
          relationTo: 'designations',
          hasMany: false,
        },
      ],
    },
    {
      name: 'educations', // required
      type: 'array', // required
      maxRows: 20,
      fields: [
        {
          name: 'instituteName',
          type: 'text',
          required: true,
          maxLength: 100,
        },
        {
          name: 'duration',
          type: 'number',
          max: 50,
          min: 0,
        },
        {
          name: 'beginning',
          type: 'date',
        },
        {
          name: 'ending',
          type: 'date',
        },
        {
          name: 'fieldOfStudy',
          type: 'relationship',
          relationTo: 'field-of-studies',
          hasMany: false,
        },
        {
          name: 'degreeLevel',
          type: 'relationship',
          relationTo: 'degree-levels',
          hasMany: false,
        },
        {
          name: 'eduCertificateUpload', // required
          type: 'upload', // required
          relationTo: 'media-pdfs', // required
        },
      ],
    },
    {
      name: 'academicActivity', // required
      type: 'array', // required
      maxRows: 20,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          maxLength: 100,
        },
        {
          name: 'description',
          type: 'text',
          maxLength: 10000,
        },
        {
          name: 'duration',
          type: 'number',
          max: 50,
          min: 0,
        },
        {
          name: 'beginning',
          type: 'date',
        },
        {
          name: 'ending',
          type: 'date',
        },
        {
          name: 'academicActivityType',
          type: 'relationship',
          relationTo: 'academic-activity-types',
          hasMany: false,
        },
      ],
    },
    {
      name: 'extracurricularActivity', // required
      type: 'array', // required
      maxRows: 20,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          maxLength: 100,
        },
        {
          name: 'description',
          type: 'text',
          maxLength: 10000,
        },
      ],
    },
  ],
}
