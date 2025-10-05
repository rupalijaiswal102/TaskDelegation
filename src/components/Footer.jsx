import React from 'react';
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Task Delegations
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Streamline your team's productivity with our intuitive task management platform. 
              Assign, track, and complete tasks efficiently while maintaining clear accountability.
            </p>
            <div className="flex space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-3">
                <Github className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3">
                <Twitter className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-3">
                <Linkedin className="h-5 w-5 text-white" />
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3">
                <Mail className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-emerald-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">My Tasks</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Team Tasks</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Reports</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Settings</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-400">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">API Docs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 Task Delegations. Made with <Heart className="inline h-4 w-4 text-red-500 mx-1" /> for productive teams.
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">System Status: Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;