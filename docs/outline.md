# Resource Hiring Platform -- **HireHub**

## 1. Overview

The **HireHub** is a comprehensive system designed to streamline the hiring process for organizations and applicants. It provides tools for organizations to post jobs, manage hiring stages, and track applicants, while offering applicants the ability to create profiles, apply for jobs, and track their application status. The platform also includes administrative features for managing industry types, job roles, skills, and other metadata.

---

## 2. Key Components

### 2.1 Admin Setup

The admin setup defines the foundational data structures and metadata required for the platform to function. These include:

#### 2.1.1 Core Entities

- **User**: Represents all users in the system (admin, organization, applicant).
  - Fields: `id`, `email`, `password`, `role`, `pictureURL`, `createdAt`, `updatedAt`.
- **Role**: Defines user roles (`admin`, `org`, `applicant`).
- **IndustryType**: Categorizes industries (e.g., IT, Healthcare).
  - Fields: `id`, `title`, `description`, `createdAt`, `updatedAt`.
- **JobRole**: Defines job roles within industries (e.g., Frontend Developer, Backend Developer).
  - Fields: `id`, `industryTypeId`, `title`, `createdAt`, `updatedAt`.
- **Designation**: Represents job titles (e.g., Software Engineer, Senior Software Engineer).
  - Fields: `id`, `industryTypeId`, `title`, `createdAt`, `updatedAt`.
- **Skills**: Lists skills relevant to industries (e.g., Next.js, Node.js).
  - Fields: `id`, `industryTypeId`, `title`, `createdAt`, `updatedAt`.
- **FieldOfStudy**: Represents academic fields (e.g., Computer Science, Electrical Engineering).
  - Fields: `id`, `title`, `createdAt`, `updatedAt`.
- **DegreeLevel**: Represents academic degrees (e.g., B.Sc, M.Sc).
  - Fields: `id`, `title`, `createdAt`, `updatedAt`.
- **SocialMedia**: Defines social media platforms (e.g., Google, Facebook).
  - Fields: `id`, `title`, `createdAt`, `updatedAt`.
- **JobType**: Defines job types (e.g., Remote, Onsite, Hybrid).
  - Fields: `id`, `title`, `createdAt`, `updatedAt`.
- **EmployeeType**: Defines employment types (e.g., Full-time, Part-time, Contractual).
  - Fields: `id`, `title`, `createdAt`, `updatedAt`.
- **AcademicActivityType**: Defines academic activities (e.g., Project, Thesis, Internship).
  - Fields: `id`, `title`, `createdAt`, `updatedAt`.
- **HiringSteps**: Defines stages in the hiring process (e.g., Initial Interview, Technical Interview).
  - Fields: `id`, `title`, `description`, `createdAt`, `updatedAt`.
- **TermsAndConditions**: Stores platform terms and conditions.
  - Fields: `id`, `title`, `description`, `createdAt`, `updatedAt`.
- **PrivacyPolicy**: Stores platform privacy policies.
  - Fields: `id`, `title`, `description`, `createdAt`, `updatedAt`.
- **FAQ**: Stores frequently asked questions.
  - Fields: `id`, `question`, `answer`, `createdAt`, `updatedAt`.

#### 2.1.2 Relationships

- **User** has one **Role**.
- **JobRole**, **Designation**, and **Skills** are linked to **IndustryType**.
- **ApplicantEducations** are linked to **DegreeLevel** and **FieldOfStudy**.

---

### 2.2 Applicant Module

The applicant module allows job seekers to create profiles, showcase their skills, and apply for jobs.

#### 2.2.1 Core Entities

- **Applicant**: Represents a job seeker.
  - Fields: `id`, `userId`, `jobRoleId`, `designationId`, `skillsId`, `industryTypeId`, `name`, `objective`, `firstName`, `lastName`, `address`, `phone`, `contactInfo`, `applicantBloodGroup`, `photo`, `applicantCV`, `createdAt`, `updatedAt`.
- **ApplicantAcademicActivity**: Tracks academic activities (e.g., projects, internships).
  - Fields: `id`, `academicActivityTypeId`, `title`, `description`, `duration`, `beginning`, `ending`, `certificateUpload`, `createdAt`, `updatedAt`.
- **ApplicantSocialLinks**: Stores social media links for applicants.
  - Fields: `id`, `socialMediaId`, `socialMediaUrl`, `createdAt`, `updatedAt`.
- **ApplicantTrainingAndCertifications**: Tracks certifications and training.
  - Fields: `id`, `title`, `yearOfExperience`, `beginning`, `ending`, `certificateUpload`, `createdAt`, `updatedAt`.
- **ApplicantEducations**: Tracks educational background.
  - Fields: `id`, `degreeLevelId`, `fieldOfStudyId`, `instituteName`, `duration`, `beginning`, `ending`, `eduCertificateUpload`, `createdAt`, `updatedAt`.
- **ApplicantExperiences**: Tracks work experience.
  - Fields: `id`, `jobRoleId`, `designationId`, `companyName`, `yearOfExperience`, `beginning`, `ending`, `createdAt`, `updatedAt`.
- **ApplicantExtracurricularActivity**: Tracks extracurricular activities.
  - Fields: `id`, `title`, `description`, `createdAt`, `updatedAt`.
- **JobApplication**: Tracks job applications.
  - Fields: `id`, `applicantId`, `jobDetailsId`, `applicantStatusId`, `createdAt`, `updatedAt`.

#### 2.2.2 Relationships

- **Applicant** is linked to **User**, **JobRole**, **Designation**, **Skills**, and **IndustryType**.
- **ApplicantAcademicActivity** is linked to **AcademicActivityType**.
- **ApplicantSocialLinks** is linked to **SocialMedia**.
- **ApplicantEducations** is linked to **DegreeLevel** and **FieldOfStudy**.
- **ApplicantExperiences** is linked to **JobRole** and **Designation**.
- **JobApplication** is linked to **Applicant** and **JobDetails**.

---

### 2.3 Organization Module

The organization module allows companies to manage their profiles, post jobs, and track applicants.

#### 2.3.1 Core Entities

- **Organization**: Represents a company.
  - Fields: `id`, `userId`, `termsAndConditionsId`, `industryTypeId`, `orgName`, `orgTagline`, `orgMission`, `orgVision`, `orgWebsiteURL`, `orgAddress`, `orgEmail`, `orgPhone`, `orgEstablishedYear`, `aboutUs`, `img`, `createdAt`, `updatedAt`.
- **OrganizationSocialLinks**: Stores social media links for organizations.
  - Fields: `id`, `socialMediaId`, `socialMediaUrl`, `createdAt`, `updatedAt`.
- **OrgSettings**: Tracks organization settings and subscriptions.
  - Fields: `id`, `organizationId`, `subscriptionId`, `beginning`, `ending`, `numberOfJobPosted`, `numberOfCvViewed`, `createdAt`, `updatedAt`.

#### 2.3.2 Relationships

- **Organization** is linked to **User**, **TermsAndConditions**, and **IndustryType**.
- **OrganizationSocialLinks** is linked to **SocialMedia**.
- **OrgSettings** is linked to **Organization** and **Subscription**.

---

### 2.4 Job Module

The job module allows organizations to post jobs and manage hiring stages.

#### 2.4.1 Core Entities

- **Job**: Represents a job posting.
  - Fields: `id`, `organizationId`, `createdAt`, `updatedAt`.
- **JobDetails**: Stores detailed information about a job.
  - Fields: `id`, `jobId`, `employeeTypeId`, `designationID`, `jobTypeId`, `skillsId`, `degreeLevelId`, `fieldOfStudyId`, `hiringStagesId`, `title`, `description`, `yearOfExperience`, `location`, `requirements`, `employeeBenefits`, `salary`, `publishDate`, `deadline`, `jobStatus`, `createdAt`, `updatedAt`.
- **JobSocialLinks**: Stores social media links for job postings.
  - Fields: `id`, `socialMediaId`, `socialMediaUrl`, `createdAt`, `updatedAt`.
- **ApplicantStatus**: Tracks the status of job applications.
  - Fields: `id`, `jobApplicationId`, `hiringStagesId`, `status`, `timeStamp`, `comment`, `createdAt`, `updatedAt`.
- **HiringStages**: Defines stages in the hiring process.
  - Fields: `id`, `organizationId`, `stageTitle`, `order`, `description`, `createdAt`, `updatedAt`.

#### 2.4.2 Relationships

- **Job** is linked to **Organization**.
- **JobDetails** is linked to **Job**, **EmployeeType**, **JobRole**, **Designation**, **JobType**, **Skills**, **DegreeLevel**, **FieldOfStudy**, and **HiringStages**.
- **ApplicantStatus** is linked to **JobApplication** and **HiringStages**.

---

### 2.5 Subscription Module

The subscription module manages subscription plans, payments, and policies.

#### 2.5.1 Core Entities

- **Subscription**: Tracks organization subscriptions.
  - Fields: `id`, `orgSettingsId`, `plans`, `createdAt`, `updatedAt`.
- **SubscriptionPlans**: Defines subscription plans.
  - Fields: `id`, `features`, `title`, `description`, `duration`, `price`, `createdAt`, `updatedAt`.
- **SubscriptionPlanFeatures**: Defines features of subscription plans.
  - Fields: `id`, `title`, `details`, `createdAt`, `updatedAt`.
- **Payment**: Tracks payment details.
  - Fields: `id`, `subscriptionId`, `paymentStatus`, `createdAt`, `updatedAt`.
- **DiscountPolicies**: Defines discount policies.
  - Fields: `id`, `title`, `details`, `amount`, `createdAt`, `updatedAt`.
- **RefundPolicies**: Defines refund policies.
  - Fields: `id`, `title`, `details`, `refundPhoto`, `createdAt`, `updatedAt`.

#### 2.5.2 Relationships

- **Subscription** is linked to **SubscriptionPlans**.
- **SubscriptionPlans** is linked to **SubscriptionPlanFeatures**.
- **Payment** is linked to **Subscription**.

---

## 3. Key Features

- **Applicant Profile Management**: Applicants can create and manage detailed profiles, including education, experience, and certifications.
- **Job Posting and Management**: Organizations can post jobs, define hiring stages, and track applicants.
- **Hiring Process**: Hiring stages are customizable, and applicant progress is tracked.
- **Subscription Management**: Organizations can subscribe to plans with varying features and durations.
- **Analytics and Reporting**: Organizations can track job postings, CV views, and hiring metrics.

---

## 4. Technical Architecture

- **Backend**: Built using a modern stack (e.g., Node.js, Express, PostgreSQL).
- **Frontend**: Built using a responsive framework (e.g., React, Next.js).
- **Database**: PostgreSQL with Drizzle ORM for efficient querying.
- **Deployment**: Hosted on scalable cloud platforms (e.g., Vercel, AWS) or in the VPS.

---

## 5. Future Enhancements

- **Mobile App**: Develop a mobile version for easier access.
- **AI-Driven Matching**: Use AI to match applicants with jobs based on skills and experience.
- **Integration with Third-Party Tools**: Integrate with tools like Google Classroom, LinkedIn, etc.

---
