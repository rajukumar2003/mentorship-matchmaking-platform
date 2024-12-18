# Mentorship Matchmaking Platform

A modern web application that connects mentors and mentees based on their skills, interests, and goals. Built with Next.js, TypeScript, and Prisma.

![Mentorship Platform]()
<img src="https://i.ibb.co/NsrWxh9/Screenshot-2024-12-19-at-2-44-21-AM.png" alt="Screenshot-2024-12-19-at-2-44-21-AM" border="0">

## ✨ Overview

Connect with mentors and mentees who share your professional interests and goals. Our platform uses smart matching algorithms to create meaningful mentorship relationships based on skills, experience, and learning objectives.

## 🌟 Key Features

### Core Functionality
- **Smart Matching Algorithm**: AI-powered matching based on skills, interests, and goals
- **Real-time Discovery**: Dynamic user discovery with instant search and filtering
- **Interactive Dashboard**: Personalized recommendations and match analytics
- **Secure Authentication**: Email/password and Google OAuth with NextAuth.js

### User Experience
- **Profile Management**: Rich profile creation with skill tagging
- **Match Score System**: Transparent compatibility scoring
- **Real-time Notifications**: Instant updates for connections and messages
- **Progress Tracking**: Interactive profile completion guidance

## 🛠️ Technical Stack

### Frontend
- Next.js 15.1.0
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

### Backend & Database
- Next.js API Routes
- PostgreSQL
- Prisma ORM
- TanStack Query

### Authentication & Security
- NextAuth.js
- bcrypt encryption
- CSRF protection
- Session validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm/yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mentorship-matchmaking-platform.git
cd mentorship-matchmaking-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL="your_postgresql_url"
NEXTAUTH_SECRET="your_nextauth_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

4. **Run database migrations**
```bash
npx prisma migrate dev
```

5. **Start development server**
```bash
npm run dev
```

## 🎯 Features Deep Dive

### Profile Management
- Detailed skill and interest tagging
- Experience level tracking
- Learning goals definition
- Availability settings

### Matching System
- Compatibility score calculation
- Role-based filtering
- Skill alignment analysis
- Two-way matching confirmation

### Security Implementation
- Password hashing with bcrypt
- Protected API routes
- Input sanitization
- Secure session management

## 🔍 Edge Cases & Error Handling

- Duplicate request prevention
- Profile completion validation
- Comprehensive API error handling
- Loading state management
- Input validation and sanitization

## 📊 Database Schema

### Core Tables
- Users (profile, authentication)
- MentorshipRequests (connections)
- Notifications (system updates)
- Skills (user capabilities)

### Relationships
- User -> Profile (1:1)
- User -> MentorshipRequests (1:Many)
- User -> Notifications (1:Many)

## 🚀 Deployment

The application is deployed on Vercel and can be accessed at: [Your-Deployment-URL]

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Write clean, documented code
- Follow TypeScript best practices
- Include unit tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- All contributors and testers

---

## 📞 Support

For questions, feature requests, or bug reports, please open an issue or contact [rajukumarsingh12003@gmail.com].

### Stay Connected
- Follow project updates: [https://x.com/KumarRaju12003]
- Documentation: [https://verbose-blizzard-8d6.notion.site/Mentorship-Matching-Platform-Documentation-Raju-Kumar-1606bac9ff7c8013bd6cf3b92a3cb992]
