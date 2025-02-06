import { OnlyAdmins } from '../../access/onlyAdmins'

export const JobDetails = {
  slug: 'job-details',
  admin: {
    useAsTitle: 'job',
  },
  access: {
    read: () => true,
    create: OnlyAdmins,
    update: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'admin' || user?.role === 'super-admin') {
          return true
        }
        if (user?.role === 'org') {
          return {
            'job.organization.organization': {
              equals: user.id,
            },
          }
        }
      }
      return false
    },
    delete: OnlyAdmins,
  },
  fields: [
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      required: true,
      hasMany: false,
      access: { update: () => false },
    },
    {
      name: 'employeeType',
      type: 'relationship',
      relationTo: 'employee-types',
      hasMany: false,
    },
    {
      name: 'jobRole',
      type: 'relationship',
      relationTo: 'job-roles',
      hasMany: true,
    },
    {
      name: 'jobType',
      type: 'relationship',
      relationTo: 'job-types',
      hasMany: false,
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
      name: 'degreeLevel',
      type: 'relationship',
      relationTo: 'degree-levels',
      hasMany: true,
    },
    {
      name: 'fieldOfStudy',
      type: 'relationship',
      relationTo: 'field-of-studies',
      hasMany: true,
    },
    {
      name: 'description',
      type: 'text',
      maxLength: 5000,
    },
    {
      name: 'yearOfExperience',
      type: 'number',
      max: 50,
      min: 0,
    },
    {
      name: 'location',
      type: 'text',
      maxLength: 500,
    },
    {
      name: 'requirements',
      type: 'text',
      maxLength: 5000,
    },
    {
      name: 'employeeBenefits',
      type: 'text',
      maxLength: 500,
    },
    {
      name: 'salary',
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
      name: 'publishDate',
      type: 'date',
    },
    {
      name: 'deadline',
      type: 'date',
    },
    {
      name: 'jobStatus',
      type: 'checkbox',
      required: true,
      defaultValue: true,
    },
  ],
}
