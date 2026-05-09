'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Users, BookOpen, Heart, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'AI Chat Companion',
    description: 'Talk to a culturally-aware AI that understands campus life, HELB stress, and family pressure.',
    href: '/chat',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Community Groups',
    description: 'Find your people. Anonymous peer support for financial help, addiction recovery, grief, and more.',
    href: '/community',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: BookOpen,
    title: 'Private Journal',
    description: 'A safe space to vent, reflect, and track your thoughts without judgment.',
    href: '/journal',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Heart,
    title: 'Mood Check-ins',
    description: 'Quick PHQ-2 assessments with optional PHQ-9. Never diagnostic, always supportive.',
    href: '/mood',
    color: 'from-red-500 to-rose-500',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background with blur overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-800/60 to-earth-900/80 z-10" />
        
        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              A space to talk,<br />
              <span className="gradient-text">a community to belong</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Peer-powered mental health support for African university students. 
              No stigma, no judgment—just real conversations with people who get it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/chat"
                className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Start a Conversation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/community"
                className="px-8 py-4 glass text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Find Your Group
              </Link>
            </div>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '100%', label: 'Free Forever' },
              { value: '24/7', label: 'Available' },
              { value: '100%', label: 'Anonymous' },
              { value: '0', label: 'Judgment' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-primary-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/80 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-earth-900">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-earth-900 dark:text-white mb-4">
              How MindBridge Helps
            </h2>
            <p className="text-lg text-earth-600 dark:text-earth-300 max-w-2xl mx-auto">
              Built by students, for students. Every feature designed with East African campus life in mind.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={feature.href}
                  className="group block p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-earth-800 dark:to-earth-900 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-earth-700"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-earth-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-earth-600 dark:text-earth-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              You&apos;re Not Alone on This Campus
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
              Join thousands of students who found support, friendship, and hope through MindBridge.
            </p>
            <Link
              href="/chat"
              className="inline-block px-10 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-earth-900 text-earth-400 text-center text-sm">
        <p>© {new Date().getFullYear()} MindBridge. Built with 💚 for African students.</p>
        <p className="mt-2">This is not a crisis service. If you&apos;re in immediate danger, please contact emergency services.</p>
      </footer>
    </main>
  );
}
