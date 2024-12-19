'use client';

import Link from 'next/link';
import { ArrowRight, Users, Target, UserCircle } from "lucide-react";
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient blob */}
        <div 
          className="absolute top-0 right-0 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.12) 0%, rgba(147, 51, 234, 0.08) 25%, rgba(79, 70, 229, 0.02) 50%, transparent 70%)',
            transform: 'translate(25%, -25%)',
          }}
        />

        {/* Secondary gradient blob */}
        <div 
          className="absolute bottom-0 left-0 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(219, 39, 119, 0.08) 0%, rgba(147, 51, 234, 0.06) 25%, rgba(79, 70, 229, 0.02) 50%, transparent 70%)',
            transform: 'translate(-25%, 25%)',
          }}
        />

        {/* Animated gradient lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(99,102,241,0.05)_50%,transparent_100%)] rotate-45" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(147,51,234,0.05)_50%,transparent_100%)] -rotate-45" />
        </div>

        {/* Enhanced floating elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/4 w-64 h-64"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl" />
        </motion.div>

        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            transform: 'scale(1.5)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-6">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-indigo-600">MentorMatch</span>
            <div className="space-x-4">
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-full mb-8">
              <span className="text-indigo-600 text-sm font-medium">
                🚀 Join 5000+ professionals in meaningful mentorship
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="text-indigo-600"> Mentor Match</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect with experienced mentors or passionate mentees in your field. 
              Start your growth journey today.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/signup"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Features Grid */}
          <div className="mt-32">
            <h2 className="text-2xl font-bold text-center mb-12">How MentorMatch Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-bl-full -mr-10 -mt-10" />
                  <feature.icon className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mt-32">
            <h2 className="text-2xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{testimonial.emoji}</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { value: '5000+', label: 'Active Members' },
  { value: '92%', label: 'Success Rate' },
  { value: '150+', label: 'Skills Covered' },
];

const features = [
  {
    title: "Create Your Profile",
    description:
      "Sign up and build your professional profile highlighting your skills and goals.",
    icon: UserCircle,
  },
  {
    title: "Smart Matching",
    description:
      "Our AI-powered system connects you with the most compatible mentors based on your goals and interests.",
    icon: Target,
  },
  {
    title: "Expert Network",
    description:
      "Access a diverse community of industry professionals ready to share their knowledge and experience.",
    icon: Users,
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer → Senior Developer",
    quote:
      "Found an amazing mentor who helped me advance my career in just 6 months!",
    emoji: "👩‍💻",
  },
  {
    name: "Michael Rodriguez",
    role: "UX Design Mentor",
    quote:
      "Being a mentor has been incredibly rewarding. The platform makes it easy to connect and share knowledge.",
    emoji: "👩‍💻",
  },
];
