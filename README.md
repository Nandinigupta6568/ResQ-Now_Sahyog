# 🚨 ResQNow (ResQ-Now) — Emergency Resource Connect

**A real-time, community-powered emergency resource sharing platform**

Connecting citizens, volunteers, NGOs, hospitals, and donors during emergencies for faster coordination and response.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Gmail_SMTP-EA4335?style=for-the-badge&logo=gmail&logoColor=white)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [User Registration & Access Flow](#user-registration--access-flow)
- [How It Works](#how-it-works)
- [SOS Alert System](#sos-alert-system)
- [Admin Dashboard](#admin-dashboard)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [Security](#security)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Key Design Decisions](#key-design-decisions)
- [Recent Updates](#recent-updates)
- [Future Enhancements](#future-enhancements)

---

## 🧠 About the Project

**ResQNow** is a community-driven emergency response platform designed to connect people in need with volunteers, NGOs, hospitals, blood donors, and resource providers during crises.

Unlike individual service platforms that focus on a single category (such as food delivery or transportation), ResQNow brings multiple emergency services together in one coordinated ecosystem. Users can request or offer blood donations, food, medicine, shelter, transportation, and volunteer assistance through a unified platform — enabling faster and more effective disaster response.

Whether it's a natural disaster, medical emergency, or community crisis, ResQNow helps bridge the gap between those seeking help and those ready to provide it — in real time.

---

## ❗ Problem Statement

During floods, accidents, medical emergencies, and natural disasters in India:

- People don't know who has the resources they need
- Volunteers don't know where help is needed
- There's no centralized, real-time system for coordination
- Existing systems require lengthy registration or are phone-based only
- SOS situations have no fast-response mechanism
- NGOs and hospitals operate in silos with no unified platform

---

## ✅ Solution

ResQNow provides a **zero-friction** request system — no account needed to ask for help. Volunteers register once and get notified instantly when someone needs their help. The entire approval flow is handled via email, so even people without smartphones can participate.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| **Emergency Requests** | Real-time posting and tracking of emergency requests |
| **GPS Location Capture** | Capture live GPS location while submitting emergency requests and offers |
| **Interactive Emergency Map** | 🟢 Green markers for offers and 🔴 Red markers for requests |
| **Smart Search & Sorting** | Search and filter emergency requests for faster access |
| **Volunteer & NGO Coordination** | Structured system for volunteers and organizations |
| **Resource & Blood Requests** | Dedicated blood donation and emergency resource system |
| **User Registration & Authentication** | Secure signup and login system via Supabase Auth |
| **Admin Authentication** | Server-side protected login for authorized administrators only |
| **Ask for Help** | Submit requests for blood, food, medicine, shelter, transport, and volunteers |
| **Donate Resources** | Offer blood, food, medicine, shelter, transport, and volunteer assistance |
| **Community Reviews** | Share feedback and experiences after assistance |
| **Real-Time Updates** | Live synchronization using Supabase Realtime subscriptions |
| **Modern Responsive UI** | Improved Navbar, Login, Signup, Request and Offer Forms |
| **Informative Footer** | Quick navigation and project information |
| **Email Notification Service** | Automatic email notifications for important emergency events |
| **SOS Alert System** | Instantly triggers SOS alerts and emails ALL registered volunteers |
| **Volunteer Email Alerts** | Sends emergency emails directly to registered volunteers for faster response |
| **Volunteer Approval Flow** | Requester approves which volunteer helps — full control and safety |
| **Rate Limiting** | Prevents spam — same phone can't submit same category twice in 10 minutes |
| **Fast Emergency Coordination** | Reduces response time through automated notifications and real-time updates |
| **Blood Donor Directory** | Browse registered blood donors by location and blood group |
| **Emergency Contacts Directory** | Hospitals, helplines, and emergency numbers in one place |
| **Resource Guides** | Educational content for handling various emergency situations |
| **Dashboard Analytics** | Live stats — active requests, volunteers, people helped, cities covered |

---

## 👤 User Registration & Access Flow

ResQNow follows a simple onboarding process to ensure users can quickly access emergency assistance or contribute resources during critical situations.

### Step 1: Register an Account

Users fill out the registration form with:
- Full Name
- Email Address
- Phone Number
- Location
- User Role (Citizen, Volunteer, Donor, NGO Representative, etc.)

After successful registration and login, users gain access to the platform dashboard.

### Step 2: Choose an Action

Once logged in, users can:

#### 🆘 Ask for Help
Submit emergency requests for:
- Blood requirements (with blood group, units, hospital name)
- Food assistance (food type, number of people)
- Medicines (medicine type and name)
- Shelter support (people count, women, children)
- Transportation (pickup location, destination, vehicle type)
- Volunteer support

Each request includes GPS location and emergency details for faster responder action.

#### 🤝 Donate / Provide Help
Contribute resources by offering:
- Blood donations
- Food supplies
- Medicines
- Shelter
- Transportation
- Volunteer assistance

Available resources are displayed to the community and matched with active emergency requests.

### Step 3: Real-Time Coordination

All requests and donations are synchronized in real time using Supabase Realtime, enabling:
- Faster response times
- Volunteer coordination
- NGO collaboration
- Instant status updates

### Step 4: Community Feedback

After assistance is provided, users can leave reviews and feedback to improve transparency, trust, and service quality.

---

## 🔄 How It Works

### Normal Request Flow

```
1. Person submits request (no login needed)
         ↓
2. Request saved to Supabase with status = "open"
         ↓
3. Volunteer browses /requests page (real-time updates via Supabase Realtime)
         ↓
4. Volunteer clicks "I Can Help"
         ↓
5. API sends email to requester with volunteer's name + phone number
         ↓
6. Requester clicks approve link in email → chooses which volunteer to accept
         ↓
7. Request status → "accepted", volunteer gets confirmation email
         ↓
8. Volunteer and requester coordinate directly via phone
```

### SOS Request Flow

```
1. Person submits request with SOS checkbox ticked
         ↓
2. Request saved to Supabase with is_sos = true
         ↓
3. API immediately fetches ALL registered users from Supabase Auth
         ↓
4. Blast email sent to every volunteer via BCC (within seconds)
         ↓
5. Email contains emergency category, location, urgency + link to /requests
         ↓
6. First available volunteer offers help → requester approves via email link
```

---

## 🚨 SOS Alert System

The SOS system is the most critical feature of ResQNow.

**How it's triggered:**
- Any request form (Blood, Food, Medicine, Shelter, Transport) has a "Mark as SOS Emergency" checkbox
- When checked and submitted, the form calls `/api/sos-blast` immediately after saving the request

**What happens:**
1. The API uses the Supabase Admin client (`supabaseAdmin.auth.admin.listUsers()`) to fetch every registered user's email
2. A single email is sent with all volunteers on BCC — volunteers don't see each other's emails
3. The email contains the emergency category, location, urgency level, and a direct link to `/requests`
4. This happens within seconds of the SOS being submitted

**Why email and not push notifications:**
Push notifications require browser permission and a service worker. Email works on every device without any app installation — making it more reliable in real emergencies.

---

## 🛡 Admin Dashboard

The platform includes a dedicated Admin Portal for managing the entire emergency assistance system. Only authorized administrators can access this dashboard.

### Admin Features

1. **Manage Users** — View all registered users, monitor activity, remove inappropriate records
2. **Manage Resource Offers** — View and remove invalid or outdated offers across all categories
3. **Blood Donor Management** — Monitor registered donors, access details and location
4. **Review & Feedback Management** — View ratings and suggestions to improve the platform
5. **Dashboard Analytics:**
   - Total Emergency Requests
   - Total Resource Offers
   - Total SOS Requests
   - Overall platform activity overview

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | Next.js API Routes (serverless) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Real-time | Supabase Realtime subscriptions |
| Email | Nodemailer + Gmail SMTP |
| Maps | Leaflet + React-Leaflet + OpenStreetMap |
| Geocoding | OpenStreetMap Nominatim API (free, no API key needed) |
| Forms | React Hook Form + Zod validation |
| Animations | Framer Motion |
| Icons | Lucide React, React Icons |

---

## 📁 Project Structure

```
final_ResQ-Now/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with live stats
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── admin/                    # Admin dashboard (server-side protected)
│   ├── api/
│   │   ├── send-volunteer-email/ # Emails requester when volunteer offers help
│   │   │   └── route.ts
│   │   └── sos-blast/            # Emails ALL volunteers on SOS request
│   │       └── route.ts
│   ├── approve/[id]/             # Requester approves a volunteer
│   ├── confirm/[id]/             # Volunteer gets confirmation
│   ├── dashboard/                # User dashboard
│   ├── directory/                # Emergency contacts directory
│   ├── donors/                   # Blood donor listings
│   ├── login/                    # Login page
│   ├── map/                      # Live emergency map
│   ├── my-requests/              # Track user's own requests
│   ├── offer/                    # Offer resources/help
│   ├── profile/                  # User profile
│   ├── request/                  # Submit emergency request
│   ├── requests/                 # Browse all open requests (real-time)
│   ├── resources/                # Emergency resource guides
│   ├── review/                   # Community reviews
│   ├── signup/                   # Signup page
│   ├── transport/                # Transport help page
│   └── volunteer/                # Volunteer registration
│
├── components/
│   ├── request-forms/            # Category-specific request forms
│   │   ├── BloodForm.tsx         # + rate limiting + SOS blast
│   │   ├── FoodForm.tsx          # + rate limiting + SOS blast
│   │   ├── MedicineForm.tsx      # + rate limiting + SOS blast
│   │   ├── ShelterForm.tsx       # + rate limiting + SOS blast
│   │   └── TransportForm.tsx     # + rate limiting + SOS blast
│   ├── offer-forms/              # Category-specific offer forms
│   │   ├── BloodOfferForm.tsx
│   │   ├── FoodOfferForm.tsx
│   │   ├── MedicineOfferForm.tsx
│   │   ├── ShelterOfferForm.tsx
│   │   └── TransportOfferForm.tsx
│   ├── AdminSidebar.tsx
│   ├── AuthProvider.tsx
│   ├── BloodDonorForm.tsx
│   ├── DashboardCard.tsx
│   ├── DonorList.tsx
│   ├── EmergencyMap.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LogoutButton.tsx
│   ├── Navbar.tsx
│   └── ResourceCard.tsx
│
├── lib/
│   ├── supabase.ts               # Supabase client
│   ├── geocode.ts                # Reverse geocoding via Nominatim
│   └── getUser.js                # Auth helper
│
├── public/                       # Static assets
├── .env.local                    # Environment variables (never commit)
├── next.config.ts
├── tailwind.config
└── package.json
```

---

## 🗄 Database Schema

### `requests` table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| category | text | blood / food / medicine / shelter / transport |
| name | text | Requester's name |
| phone | text | Requester's phone |
| urgency | text | high / medium / low |
| is_sos | boolean | Whether it's an SOS emergency |
| status | text | open / accepted / resolved |
| latitude | float | GPS latitude |
| longitude | float | GPS longitude |
| address | text | Full address from geocoding |
| city | text | City |
| state | text | State |
| assigned_to | text | Volunteer email who was approved |
| requester_email | text | Email of logged-in requester |
| user_id | uuid | Supabase auth user ID |
| description | text | Full description of request |
| created_at | timestamptz | Auto timestamp |
| blood_group | text | (blood only) |
| units_required | text | (blood only) |
| hospital_name | text | (blood only) |
| food_type | text | (food only) |
| quantity | text | (food only) |
| medicine_type | text | (medicine only) |
| medicine_name | text | (medicine only) |
| people_count | text | (shelter only) |
| women_count | text | (shelter only) |
| children_count | text | (shelter only) |
| pickup_location | text | (transport only) |
| destination | text | (transport only) |
| vehicle_needed | text | (transport only) |

### `profiles` table
Stores additional user info linked to Supabase Auth users (name, phone, role, location).

---

## 🔌 API Routes

### `POST /api/send-volunteer-email`
Triggered when a volunteer clicks "I Can Help" on a request.

**Request body:**
```json
{
  "requesterEmail": "person@gmail.com",
  "volunteerName": "Rahul Kumar",
  "volunteerPhone": "9876543210",
  "requestId": "uuid-here",
  "category": "blood"
}
```
Sends an email to the requester with volunteer details and a one-click approval link.

---

### `POST /api/sos-blast`
Triggered automatically when any form is submitted with SOS checked.

**Request body:**
```json
{
  "requestId": "uuid-here",
  "category": "blood",
  "location": "Gandhi Nagar, Darbhanga",
  "description": "Blood Group: O+, Units: 2, Hospital: DMCH",
  "urgency": "high"
}
```
Fetches all users via `supabaseAdmin.auth.admin.listUsers()` and sends a BCC blast email to all of them instantly.

---

## 🔒 Security

### Admin Protection (Server-side)
- Reads the Supabase session from cookies
- Not logged in → redirects to `/login`
- Logged in but not admin → redirects to `/`
- Only the designated admin email gets access
This is client-side checks which could be bypassed via browser DevTools.

### Rate Limiting
Every request form checks if the same phone number submitted the same category in the last 10 minutes. If yes, the request is rejected with a clear message — preventing spam and system abuse.

### Volunteer Approval Flow
Requesters always approve which volunteer helps them. When multiple volunteers offer help simultaneously, the requester gets an email for each one and chooses who to accept — eliminating race conditions and keeping the requester in full control of their safety.

### Location Privacy
Location is shown on the map so volunteers can make an informed decision about whether they can realistically travel to help. Requesters consent to sharing their location when they use the GPS capture feature.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm
- A Supabase account (free tier works)
- A Gmail account with 2-Step Verification enabled

### 1. Clone the Repository

```bash
git clone https://github.com/Nandinigupta6568/ResQ-Now_Sahyog.git
cd ResQ-Now_Sahyog/final_ResQ-Now
```

### 2. Install Dependencies

```bash
npm install
npm install nodemailer
npm install lucide-react
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email (Gmail SMTP)
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_16_char_app_password

# App URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Never commit your `.env.local` file.** It is already listed in `.gitignore`.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables — How to Get Them

### Supabase Keys
1. Go to [supabase.com](https://supabase.com) → Your Project → Settings → API
2. Copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from "Publishable key"
3. Copy `SUPABASE_SERVICE_ROLE_KEY` from "Secret key"

### Gmail App Password
1. Enable 2-Step Verification on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create a new app password → copy the 16-character code
4. Use it as `EMAIL_PASS` (not your regular Gmail password)

---

## 📄 Pages & Routes

| Route | Description | Auth Required |
|-------|-------------|:---:|
| `/` | Homepage with live stats and categories | No |
| `/request` | Submit an emergency request | No |
| `/requests` | Browse all open requests (real-time) | No |
| `/offer` | Offer resources or help | No |
| `/map` | Live map of emergency locations | No |
| `/directory` | Emergency contacts & helplines | No |
| `/resources` | Emergency resource guides | No |
| `/donors` | Blood donor directory | No |
| `/volunteer` | Register as a volunteer | No |
| `/review` | Community reviews & feedback | No |
| `/login` | Login page | No |
| `/signup` | Signup page | No |
| `/dashboard` | Personal dashboard | Yes |
| `/my-requests` | Track your submitted requests | Yes |
| `/profile` | Edit your profile | Yes |
| `/approve/[id]` | Approve a volunteer (via email link) | Yes |
| `/confirm/[id]` | Volunteer confirmation page | Yes |
| `/admin` | Admin panel | Admin only |
| `/transport` | Transport help info | No |

---

## 🎯 Key Design Decisions

**1. No login required to request help**
In an emergency, forcing someone to create an account before asking for help costs lives. Anyone can submit a request instantly.

**2. Requester always approves the volunteer**
Solves both the race condition problem (multiple volunteers offering simultaneously) and the safety concern (strangers showing up uninvited). The requester gets an email for each volunteer offer and chooses who to accept.

**3. SOS uses email blast, not push notifications**
Push notifications require browser permission and a service worker. Email works on every device without any app installation — making it more reliable in real emergencies.

**4. Geocoding uses OpenStreetMap Nominatim**
Free, no API key required, works across India. Converts GPS coordinates to human-readable addresses so volunteers understand where help is needed.

**5. Real-time via Supabase subscriptions**
The `/requests` page uses Supabase Realtime so new requests appear instantly without page refresh — critical for emergency response.

**6. BCC for SOS emails**
All volunteer emails are sent as BCC so volunteers cannot see each other's email addresses — protecting user privacy.

---

## 🔄 Recent Updates

- Added secure Admin Dashboard with centralized management
- Integrated GPS-based location capture in all emergency request and offer forms
- Added interactive emergency map with 🟢 green markers for offers and 🔴 red markers for requests
- Implemented search and sorting for quick access to emergency requests
- Added volunteer coordination module with approval flow
- Introduced Email Notification Service for emergency communication via Nodemailer + Gmail SMTP
- Added SOS Trigger System — instant email blast to ALL registered volunteers
- Enabled direct emergency email alerts to volunteers for faster assistance
- Added rate limiting on all 5 request forms (10-minute cooldown per phone per category)
- Secured admin panel with server-side authentication via Next.js proxy middleware
- Redesigned Navigation Bar for a cleaner and more user-friendly experience
- Enhanced Login and Sign Up pages with modern UI
- Revamped Request and Offer forms with improved, responsive interface
- Replaced hardcoded homepage stats with real live data from Supabase
- Fixed empty Transport page
- Updated README documentation

---

## 🔮 Future Enhancements

- [ ] SMS notifications via Twilio for volunteers without email
- [ ] Proximity-based volunteer matching (show only volunteers within X km)
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Hindi, Bengali, Tamil, Telugu)
- [ ] Integration with government emergency APIs (NDMA, state disaster management)
- [ ] Volunteer rating and trust score system
- [ ] WhatsApp bot for submitting requests without a browser
- [ ] Offline mode with service workers for low connectivity areas
- [ ] Real-time chat between requester and approved volunteer
- [ ] Analytics dashboard for NGOs and government agencies

---

## 👥 Team

Built for hackathon — ResQNow aims to make emergency response faster, smarter, and more human across India.

---

*ResQNow — Because every second counts.*
