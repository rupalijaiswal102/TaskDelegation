import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Bell, Settings, Users, ClipboardList, TrendingUp } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg border-b border-emerald-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <ClipboardList className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Task Delegations
              </h1>
              <p className="text-emerald-100 text-xs">Streamline Team Productivity</p>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1">
              <Users className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">5 Teams</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1">
              <TrendingUp className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">85% Complete</span>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-orange-500 text-white text-xs border-2 border-white">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 bg-white/20 rounded-full pl-2 pr-3 py-1">
              <Avatar className="h-7 w-7 border-2 border-white">
                <AvatarFallback className="bg-emerald-600 text-white text-xs font-medium">
                  AM
                </AvatarFallback>
              </Avatar>
              <span className="text-white text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;