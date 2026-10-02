import React from 'react';
import { NavigationPage } from '../../types';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: NavigationPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#261E1B] text-[#E8DFD8] border-t border-[#3B302C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#3E3430]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <span className="font-serif text-3xl font-bold tracking-wider text-[#FAF7F2]">
                MOMENTA
              </span>
              <p className="font-serif italic text-sm text-[#F3C5AE] mt-1 tracking-wide">
                Moments Worth Remembering
              </p>
            </div>
            <p className="text-sm text-[#B8AAA2] leading-relaxed max-w-sm pt-2">
              Personalized event planning, thoughtful coordination and everything you need to bring your vision to life.
            </p>

            <div className="pt-4 flex items-center space-x-3 text-[#B8AAA2]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#352B27] flex items-center justify-center hover:bg-[#D96035] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#352B27] flex items-center justify-center hover:bg-[#D96035] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#352B27] flex items-center justify-center hover:bg-[#D96035] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F7DDD0]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C8BCB4]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('vendors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Vendor Discovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Location Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F7DDD0]">
              Atelier & Contact
            </h4>
            <div className="space-y-3 text-sm text-[#C8BCB4]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D96035] mt-1 shrink-0" />
                <span>Road No. 36, Jubilee Hills, Hyderabad 500033, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D96035] shrink-0" />
                <a href="mailto:hello@momenta.com" className="hover:text-white transition-colors">
                  hello@momenta.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D96035] shrink-0" />
                <span>+91 98490 12345</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleNav('plan')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D96035] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#C94E25] transition-colors cursor-pointer"
              >
                <span>Start Your Event Plan</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9B8E88] gap-4">
          <p>© 2026 MOMENTA. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[#C8BCB4] transition-colors">Privacy Policy</span>
            <span className="hover:text-[#C8BCB4] transition-colors">Terms of Coordination</span>
            <span className="hover:text-[#C8BCB4] transition-colors">Vendor Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
