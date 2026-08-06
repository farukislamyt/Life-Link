# 🩸 Life-Link

**Life-Link** is a modern blood donation platform that connects blood donors, recipients, hospitals, and administrators through a secure, fast, and user-friendly web application.

Built with **Next.js 16**, **Supabase**, **TypeScript**, and **Tailwind CSS**.

---

# 🚀 Features

## Authentication

- User Registration
- Email Verification
- Secure Login
- Logout
- Protected Routes
- Session Management
- Automatic Profile Creation

---

## User Profile

- Complete Profile
- Update Personal Information
- Blood Group
- Division
- District
- Phone Number
- Avatar Upload
- Donation Availability

---

## Blood Donation

- Create Blood Requests
- Browse Blood Requests
- Become a Blood Donor
- Donation History
- Nearby Donor Search
- Donation Eligibility Tracking

---

## Hospitals

- Hospital Directory
- Hospital Details
- Blood Collection Centers

---

## Notifications

- User Notifications
- Blood Request Updates
- Donation Alerts

---

## Reports

- Report Users
- Report Blood Requests
- Admin Review

---

## Admin

- Dashboard
- User Management
- Blood Request Management
- Donor Management
- Hospital Management
- Reports Management

---

# 🛠 Tech Stack

### Frontend

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend

- Supabase

### Database

- PostgreSQL

### Authentication

- Supabase Auth

### Storage

- Supabase Storage

### Deployment

- Vercel

---

# 📂 Project Structure

```
life-link
│
├── app/
│   ├── auth/
│   ├── dashboard/
│   ├── login/
│   ├── signup/
│   └── ...
│
├── components/
│
├── lib/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
│
├── public/
│
├── supabase/
│   ├── migrations/
│   └── config.toml
│
├── middleware.ts
│
├── .env.local
│
└── package.json
```

---

# 🗄 Database

The application uses Supabase PostgreSQL.

Main tables:

- profiles
- blood_requests
- donors
- donations
- hospitals
- notifications
- reports
- config

Authentication users are stored in:

```
auth.users
```

User profiles are automatically created using a PostgreSQL trigger.

---

# 🔒 Security

- Row Level Security (RLS)
- Protected Routes
- Secure Authentication
- Secure Storage Policies
- Session Validation

---

# ⚙ Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

---

# 📦 Installation

Clone the repository.

```bash
git clone https://github.com/your-username/life-link.git
```

Install dependencies.

```bash
npm install
```

Run development server.

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🧩 Supabase Setup

Login

```bash
supabase login
```

Link project

```bash
supabase link
```

Apply database migrations

```bash
supabase db push
```

---

# 🚀 Deployment

Deploy with Vercel.

```bash
vercel
```

Or connect the GitHub repository directly in Vercel.

---

# 📋 Roadmap

## Phase 1

- [x] Project Setup
- [x] Supabase Integration
- [x] Database Schema
- [x] Authentication
- [x] Email Verification

## Phase 2

- [ ] Dashboard
- [ ] Complete Profile
- [ ] Donor Registration
- [ ] Blood Request CRUD

## Phase 3

- [ ] Notifications
- [ ] Hospitals
- [ ] Reports
- [ ] Admin Panel

## Phase 4

- [ ] Analytics
- [ ] Search Optimization
- [ ] Performance Improvements
- [ ] Progressive Web App

---

# 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Faruk Islam**

Engineer

GitHub:
https://github.com/farukislamyt

---

# ❤️ About

Life-Link aims to make blood donation faster, safer, and more accessible by connecting donors, recipients, hospitals, and administrators through a modern web platform.