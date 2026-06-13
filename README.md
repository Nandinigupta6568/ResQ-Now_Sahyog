#  ResQNow — Real-Time Emergency Resource Coordination Platform

> Connecting people in crisis with blood donors, medicine, food, transport, shelter, and volunteers — instantly.

---

##  Table of Contents

- [About the Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [How It Works](#how-it-works)
- [API Routes](#api-routes)
- [Security](#security)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Key Design Decisions](#key-design-decisions)
- [Future Enhancements](#future-enhancements)

---

##  About the Project

**ResQNow** (Emergency Resource Connect) is a full-stack web application built to solve one of the most critical problems during emergencies in India — **coordination**. When disasters strike, people often don't know who has blood, medicine, food, or transport available nearby. ResQNow bridges that gap in real time.

Built with **Next.js 16**, **Supabase**, and **Nodemailer**, ResQNow enables anyone to request emergency resources and connects them with verified volunteers — all within seconds.

---

##  Problem Statement

During floods, accidents, medical emergencies, and natural disasters in India:

- People don't know who has the resources they need
- Volunteers don't know where help is needed
- There's no centralized, real-time system for coordination
- Existing systems require lengthy registration or are phone-based only
- SOS situations have no fast-response mechanism

---

##  Solution

ResQNow provides a **zero-friction** request system — no account needed to ask for help. Volunteers register once and get notified instantly when someone nearby needs their help. The entire approval flow is handled via email, so even people without smartphones can participate.

---

##  Features

### For People in Crisis
- Submit emergency requests in 5 categories: **Blood, Medicine, Food, Shelter, Transport**
- **No login required** to submit a request
- GPS-based location capture for precise volunteer matching
- **SOS mode** — marks request as high priority and instantly emails all registered volunteers
- Rate limiting — prevents spam (same phone number can't submit same category twice in 10 minutes)
- Track your submitted requests under **My Requests**

### For Volunteers
- Register as a volunteer with name, phone, skills, and availability
- Browse all open emergency requests in real time (Supabase Realtime subscriptions)
- Filter requests by category (blood, food, medicine, shelter, transport)
- Click **"I Can Help"** to offer assistance
- Receive confirmation email once the requester approves you

### For Requesters
- Receive an email when a volunteer offers to help
- Email contains volunteer's name and phone number
- **One-click approval** — click the link in the email to approve the volunteer
- Stay in full control — you choose who helps you

### For Admins
- Protected admin panel (server-side authentication via Next.js proxy middleware)
- View all requests, volunteers, and platform activity
- Manage and moderate the platform

### Platform-wide
- **Live map** showing emergency locations (Leaflet + OpenStreetMap)
- **Emergency directory** — hospitals, helplines, and emergency contacts
- **Resource guides** — educational content for various emergencies
- **Blood donor directory**
- **Live stats** — real counts from Supabase (active requests, volunteers, people helped, cities covered)
- Fully responsive — works on mobile and desktop

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
| Deployment | Vercel (recommended) |

---

##  Project Structure

```
final_ResQ-Now/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with live stats
│   ├── layout.tsx                # Root layout
│   ├── admin/                    # Admin dashboard (protected)
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
│   ├── signup/                   # Signup page
│   ├── transport/                # Transport help page
│   └── volunteer/                # Volunteer registration
│
├── components/
│   ├── request-forms/            # Category-specific request forms
│   │   ├── BloodForm.tsx
│   │   ├── FoodForm.tsx
│   │   ├── MedicineForm.tsx
│   │   ├── ShelterForm.tsx
│   │   └── TransportForm.tsx
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
├── proxy.ts                      # Server-side admin route protection
├── .env.local                    # Environment variables (never commit)
├── next.config.ts
├── tailwind.config
└── package.json
```

---

##  Database Schema

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
| created_at | timestamptz | Timestamp |
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
Stores additional user info linked to Supabase Auth users.

---

##  How It Works

### Normal Request Flow
```
1. Person submits request (no login needed)
      ↓
2. Request saved to Supabase with status = "open"
      ↓
3. Volunteer browses /requests page (real-time updates)
      ↓
4. Volunteer clicks "I Can Help"
      ↓
5. API sends email to requester with volunteer's name + phone
      ↓
6. Requester clicks approve link in email
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
5. Email contains emergency details + link to /requests
      ↓
6. First available volunteer offers help → requester approves
```

---

##  API Routes

### `POST /api/send-volunteer-email`
Triggered when a volunteer clicks "I Can Help" on a request.

**Body:**
```json
{
  "requesterEmail": "person@gmail.com",
  "volunteerName": "Rahul Kumar",
  "volunteerPhone": "9876543210",
  "requestId": "uuid-here",
  "category": "blood"
}
```

**What it does:** Sends an email to the requester with volunteer details and an approval link.

---

### `POST /api/sos-blast`
Triggered automatically when any form is submitted with SOS checked.

**Body:**
```json
{
  "requestId": "uuid-here",
  "category": "blood",
  "location": "Gandhi Nagar, Darbhanga",
  "description": "Blood Group: O+, Units: 2, Hospital: DMCH",
  "urgency": "high"
}
```

**What it does:** Fetches all users from `supabaseAdmin.auth.admin.listUsers()` and sends a BCC blast email to all of them with emergency details.

---

##  Security

### Admin Protection
The `/admin` route is protected by `proxy.ts` (Next.js middleware). It runs **on the server** before the page loads:
- Reads the Supabase session from cookies
- If not logged in → redirects to `/login`
- If logged in but not admin email → redirects to `/`
- Only the admin email gets access to the admin panel

This replaces the old client-side check (`if user.email !== "admin@gmail.com"`) which could be bypassed via browser DevTools.

### Rate Limiting
Every request form checks: has this phone number submitted the same category in the last 10 minutes? If yes, the request is rejected with a clear message. This prevents spam and abuse of the system.

### Volunteer Approval
Requesters always approve which volunteer helps them. When multiple volunteers offer help simultaneously, the requester receives an email for each one and chooses who to accept. This eliminates race conditions and keeps the requester in control of their safety.

### Location Privacy
Location is shown on the map so volunteers can make an informed decision about whether they can realistically travel to help. This is the same model used by Uber and Rapido. Requesters consent to sharing their location when they use the GPS capture feature.

---

##  Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Supabase account (free tier works)
- A Gmail account with 2-Step Verification enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/resqnow.git
cd resqnow/final_ResQ-Now

# Install dependencies
npm install

# For responsive UI
npm install react-dom
npm install lucide-react

# Install email dependency
npm install nodemailer

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email (Gmail SMTP)
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_16_char_app_password

# App URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### How to get these values:

**Supabase keys:**
1. Go to [supabase.com](https://supabase.com) → Your Project → Settings → API
2. Copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from "Publishable key"
3. Copy `SUPABASE_SERVICE_ROLE_KEY` from "Secret key"

**Gmail App Password:**
1. Enable 2-Step Verification on your Google account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Create a new app password → copy the 16-character code
4. Use it as `EMAIL_PASS` (not your regular Gmail password)

---

##  Pages & Routes

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

##  Key Design Decisions

**1. No login required to request help**
In an emergency, forcing someone to create an account before asking for help costs lives. Anyone can submit a request instantly.

**2. Requester always approves the volunteer**
This solves both the race condition problem (multiple volunteers offering simultaneously) and the safety problem (strangers showing up uninvited). The requester gets an email for each volunteer offer and chooses who to accept.

**3. SOS uses email blast, not push notifications**
Push notifications require a service worker and browser permission. Email works on every device, even basic smartphones, without any app installation.

**4. Geocoding uses OpenStreetMap Nominatim**
Free, no API key required, works across India. Converts GPS coordinates to human-readable addresses so volunteers understand where help is needed.

**5. Real-time via Supabase subscriptions**
The `/requests` page uses Supabase Realtime so new requests appear instantly without page refresh — critical for emergency response.

---

##  Future Enhancements

- [ ] SMS notifications via Twilio for volunteers without email
- [ ] Proximity-based volunteer matching (show only volunteers within X km)
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Hindi, Bengali, Tamil, Telugu)
- [ ] Integration with government emergency APIs (NDMA, state disaster management)
- [ ] Volunteer rating and trust score system
- [ ] WhatsApp bot for submitting requests without internet browser
- [ ] Offline mode with service workers for low connectivity areas
- [ ] Real-time chat between requester and approved volunteer
- [ ] Analytics dashboard for NGOs and government agencies

---

##  Team

Built for hackathon — ResQNow aims to make emergency response faster, smarter, and more human.

---

*ResQNow — Because every second counts.*