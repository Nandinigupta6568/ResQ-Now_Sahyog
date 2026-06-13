<div align="center">

### ResQ-Now — Emergency Resource Connect

**A real-time, community-powered emergency resource sharing platform**

Connecting citizens, volunteers, NGOs, hospitals, and donors during emergencies for faster coordination and response.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge\&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge\&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)

---

# About

**ResQ-Now** is a community-driven emergency response platform designed to connect people in need with volunteers, NGOs, hospitals, blood donors, and resource providers during crises.

Unlike individual service platforms that focus on a single category (such as food delivery, transportation, or commerce), ResQ-Now brings multiple emergency services together in one coordinated ecosystem. Users can request or offer blood donations, food, medicine, shelter, transportation, and volunteer assistance through a unified platform, enabling faster and more effective disaster response.

Whether it's a natural disaster, medical emergency, or community crisis, ResQ-Now helps bridge the gap between those seeking help and those ready to provide it.

The platform also includes secure administrator authentication to support future monitoring and management capabilities.

---

## Features

| Feature | Description |
|---|---|
|  **Emergency Requests**  | Real-time posting and tracking of emergency requests  |
|  **Location-Based Tracking**  | Map-integrated resource and volunteer tracking  |
|  **Volunteer & NGO Coordination**  | Structured system for volunteers and organizations to coordinate  |
|  Resource & Blood Requests  | Dedicated blood donation and resource request system  |
|  User Registration & Authentication  | Secure signup and login system for users  |
|  Admin Authentication  | Secure login system for authorized administrators  |
|  Ask for Help  | Submit emergency requests for blood, food, medicine, shelter, transportation, and volunteer support  |
|  Donate Resources  | Provide blood donations, food, medicines, shelter, transportation, or volunteer assistance  |
|  Community Reviews  | Users can share feedback, experiences, and reviews to build trust and improve services  |
|  Real-Time Updates  | Live database synchronization using Supabase Realtime  |
|  Responsive UI  | Fast, mobile-friendly interface built with Next.js App Router  |
|  Community Collaboration  | Encourages local communities to support one another  |
|  Informative Footer  | Quick access to navigation, resources, contact information, and project information  |

---

# User Registration & Access Flow

ResQ-Now follows a simple onboarding process to ensure that users can quickly access emergency assistance or contribute resources during critical situations.

## Step 1: Register an Account

Users must fill out the registration form by providing:

* Full Name
* Email Address
* Phone Number
* Location
* User Role (Citizen, Volunteer, Donor, NGO Representative, etc.)

After successful registration and login, users gain access to the platform dashboard.

## Step 2: Choose an Action

Once logged in, users can choose one of the following options:

###  Ask for Help

Users can submit emergency requests such as:

* Blood requirements
* Food assistance
* Medicines
* Shelter support
* Transportation assistance
* Volunteer support

Each request includes location details and emergency information to help responders act quickly.

###  Donate / Provide Help

Users can contribute resources by offering:

* Blood donations
* Food supplies
* Medicines
* Shelter
* Transportation
* Volunteer assistance

Available resources are displayed to the community and can be matched with active emergency requests.

## Step 3: Real-Time Coordination

All requests and donations are synchronized in real time using Supabase Realtime, allowing:

* Faster response times
* Volunteer coordination
* NGO collaboration
* Instant status updates

## Step 4: Community Feedback

After assistance is provided, users can leave reviews and feedback to improve transparency, trust, and service quality across the platform.

---

# Admin Login

The platform provides a dedicated login system for authorized administrators.

## Admin Access

* Administrators can securely log in using authorized credentials.
* Admin authentication is separate from regular user registration.
* Only approved administrators can access administrative features of the platform.
* Additional management and monitoring features will be introduced in future updates.

---

# Tech Stack

| Layer    | Technology             |
| -------- | ---------------------- |
| Frontend | Next.js 16, TypeScript |
| Backend  | Supabase               |
| Styling  | Tailwind CSS           |
| Database | PostgreSQL             |

---

# Getting Started

## Prerequisites

* Node.js v18 or higher
* npm
* A Supabase account

## 1. Clone the Repository

```bash
git clone https://github.com/Nandinigupta6568/ResQ-Now_Sahyog.git

cd ResQ-Now_Sahyog
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Setup Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Never commit your `.env.local` file.** It is already listed in `.gitignore`.

## 4. Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.

---

# Project Structure

```text
ResQ-Now/
├── app/                    # Pages and routes (Next.js App Router)
├── components/             # Reusable UI components
├── lib/                    # Supabase client configuration
├── public/                 # Static assets (images, icons)
├── .env.local              # Environment variables (not committed)
├── tailwind.config.js      # Tailwind CSS configuration
└── next.config.js          # Next.js configuration
```

---

# Supabase Setup

1. Sign in to Supabase.
2. Create a new project.
3. Navigate to **Project Settings → API**.
4. Copy the following values:

   * **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   * **Anon/Public Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Paste them into your `.env.local` file.

> You may also need to create your database tables. Check the `/lib` folder for schema references.

---

# Future Improvements

*  AI-based emergency matching system
*  SMS / WhatsApp alert notifications
*  Admin dashboard for monitoring requests
*  Mobile app version (React Native)
*  Verified volunteer badge system
*  Multi-language support

---

# Recent Updates

* Added secure Admin Login functionality
* Improved authentication system
* Enhanced homepage footer with quick navigation links
* Improved user experience and accessibility
* Added quick navigation links in footer
* Updated README documentation

---