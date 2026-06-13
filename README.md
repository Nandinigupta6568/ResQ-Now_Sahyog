<div align="center">

# ResQ-Now — Emergency Resource Connect

**A real-time, community-powered emergency resource sharing platform**  
Connecting citizens, volunteers, NGOs, hospitals, and donors during emergencies for faster coordination and response.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>


---

## About

**ResQ-Now** is a community-driven emergency response platform designed to connect people in need with volunteers, NGOs, hospitals, blood donors, and resource providers during crises.

Unlike individual service platforms that focus on a single category (such as food delivery, transportation, or commerce), ResQ-Now brings multiple emergency services together in one coordinated ecosystem. Users can request or offer blood donations, food, medicine, shelter, transportation, and volunteer assistance through a unified platform, enabling faster and more effective disaster response.

Whether it's a natural disaster, medical emergency, or community crisis, ResQ-Now helps bridge the gap between those seeking help and those ready to provide it.

---

## Features

| Feature | Description |
|---|---|
|  **Emergency Requests** | Real-time posting and tracking of emergency requests |
|  **Location-Based Tracking** | Map-integrated resource and volunteer tracking |
|  **Volunteer & NGO Coordination** | Structured system for volunteers and organizations to coordinate |
|  **Resource & Blood Requests** | Dedicated blood donation and resource request system |
|  **Community Reviews** | Users can share feedback, experiences, and reviews to build trust and improve services |
|  **Quick Access Footer** | Easy navigation through footer links including resources, contact information, and important pages |
|  **Real-Time Updates** | Live database synchronization using Supabase Realtime |
|  **Responsive UI** | Fast, mobile-friendly interface built with Next.js App Router |
|  **Community Collaboration** | Encourages local communities to support one another |
| **Informative Footer** | Quick access to navigation, resources, and project information |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 16, TypeScript |
| **Backend** | Supabase |
| **Styling** | Tailwind CSS |
| **Database** | PostgreeSQL|

---


### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/)
- A [Supabase](https://supabase.com/) account

### 1. Clone the Repository

```bash
git clone https://github.com/Nandinigupta6568/ResQ-Now_Sahyog.git
cd ResQ-Now_Sahyog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

>  **Never commit your `.env.local` file.** It is already listed in `.gitignore`.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📁 Project Structure

```
ResQ-Now/
├── app/                # Pages and routes (Next.js App Router)
├── components/         # Reusable UI components
├── lib/                # Supabase client configuration
├── public/             # Static assets (images, icons)
├── .env.local          # Environment variables (not committed)
├── tailwind.config.js  # Tailwind CSS configuration
└── next.config.js      # Next.js configuration
```

---

## Supabase Setup

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click **New Project** and fill in the details
3. Once the project is ready, go to **Project Settings → API**
4. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon / Public Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Paste them into your `.env.local` file

>  You may also need to create your database tables. Check the `/lib` folder for schema references.

---

##  Future Improvements

1.  AI-based emergency matching system
2.  SMS / WhatsApp alert notifications
3.  Admin dashboard for monitoring requests
4.  Mobile app version (React Native)
5.  Verified volunteer badge system
6.  Multi-language support

---

## 🆕 Recent Updates

-  Enhanced homepage footer with quick navigation links.
-  Improved user experience and site accessibility.
-  Redesigned homepage footer.
-  Added quick navigation links in footer.
-  Updated README documentation.

---

## Review & Feedback

ResQ-Now includes a dedicated Review & Feedback module that allows users to share their experience with the platform. User reviews help improve service quality, identify areas for enhancement, and foster trust within the community.

### How to Submit a Review

1. Click **share your feedback** in the footer section

2. Fill in the required details:
   - Your Name
   - Rating
   - Review Title (if applicable)
   - Feedback or Experience

3. Verify the information entered.

4. Click the **Submit Review** button.

---

### Why Reviews Matter

- Help improve the platform through user feedback.
- Enhance transparency and community trust.
- Provide insights into user experiences.
- Support continuous development and feature improvements.
