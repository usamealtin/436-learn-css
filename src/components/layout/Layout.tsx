import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { FiShield, FiMail, FiLinkedin, FiTwitter, FiCode } from 'react-icons/fi';

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  gradient: string;
  socials: { linkedin?: string; twitter?: string; email?: string };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Usame Altınışık',
    role: 'Project Lead',
    initials: 'UA',
    gradient: 'from-blue-500 to-cyan-500',
    socials: { linkedin: '#', email: '#' }
  },
  {
    name: 'Ece Ergül',
    role: 'Designer',
    initials: 'EE',
    gradient: 'from-purple-500 to-pink-500',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Parsa Sadeghieh Ahari',
    role: 'Developer',
    initials: 'PA',
    gradient: 'from-emerald-500 to-teal-500',
    socials: { linkedin: '#', email: '#' }
  },
  {
    name: 'Cem Ulaş Usta',
    role: 'Content Manager',
    initials: 'CU',
    gradient: 'from-amber-500 to-orange-500',
    socials: { linkedin: '#', twitter: '#', email: '#' }
  }
];

// ==================== FULL FOOTER (Home Page Only) ====================
const FullFooter: React.FC = () => (
  <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* Column 1: Brand & Links */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FiCode className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LearnCSS
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            An interactive platform to master CSS from zero to hero. Learn by doing, track your progress, and earn certificates.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FiTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FiLinkedin /></a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FiMail /></a>
          </div>
        </div>

        {/* Column 2: About — 4 vertical profiles */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About the Team</h3>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center flex-shrink-0 shadow-sm ring-2 ring-white dark:ring-gray-800`} aria-label={`${member.name} placeholder photo`}>
                  <span className="text-white text-sm font-bold">{member.initials}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{member.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{member.role}</p>
                </div>
                <div className="flex items-center space-x-1 ml-auto flex-shrink-0">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="LinkedIn">
                      <FiLinkedin className="text-xs" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} className="p-1 text-gray-400 hover:text-blue-400 transition-colors" title="Twitter">
                      <FiTwitter className="text-xs" />
                    </a>
                  )}
                  {member.socials.email && (
                    <a href={`mailto:${member.name}`} className="p-1 text-gray-400 hover:text-green-500 transition-colors" title="Email">
                      <FiMail className="text-xs" />
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Team
              </h2>
            </div>
          </div>
        </div>

        {/* Column 3: Privacy & Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Privacy & Legal</h3>
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <FiShield className="text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">Your Data Is Safe</span>
            </div>
            <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
              Your privacy is our priority. We ensure that your personal data is stored securely and never shared with third parties.
              All progress data is encrypted and accessible only to you. We comply with GDPR and international data protection regulations.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <a href="#" className="block text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="block text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="block text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</a>
            <a href="#" className="block text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</a>
          </div>
        </div>
      </div>

      {/* Large Title */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight mb-4">
          Master CSS Today
        </h2>
        <p className="text-center text-lg text-gray-500 dark:text-gray-400 mb-6">
          Start your interactive learning journey — no credit card required.
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-gray-500">
        <span>© {new Date().getFullYear()} LearnCSS. All rights reserved.</span>
        <span className="mt-1 md:mt-0">Built with ❤️ for web developers everywhere.</span>
      </div>
    </div>
  </footer>
);

// ==================== MINIMIZED FOOTER (All Other Pages) ====================
const MinimizedFooter: React.FC = () => (
  <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 dark:text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">C</span>
          </div>
          <span>© {new Date().getFullYear()} LearnCSS</span>
        </div>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Privacy</a>
          <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Terms</a>
          <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">About</a>
        </div>
      </div>
    </div>
  </footer>
);

// ==================== MAIN LAYOUT ====================
const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Conditionally render footer based on route */}
      {isHomePage ? <FullFooter /> : <MinimizedFooter />}
    </div>
  );
};

export default Layout;
