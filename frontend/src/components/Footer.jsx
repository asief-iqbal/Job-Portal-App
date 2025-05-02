import React from 'react'
import { Facebook, Twitter, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent hover:from-primary/80 hover:to-primary/40 transition-all duration-300">
              ChakriHobe
            </h2>
            <p className="text-muted-foreground">
              Your trusted partner in finding the perfect career opportunities.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Browse Jobs', 'Companies', 'About Us'].map((link) => (
                <li key={link}>
                  <a 
                    href={`/${link.toLowerCase().replace(' ', '-')}`} 
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Career Advice', 'Resume Builder', 'Interview Tips'].map((resource) => (
                <li key={resource}>
                  <a 
                    href={`/${resource.toLowerCase().replace(' ', '-')}`} 
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground group">
                <Mail className="h-4 w-4 group-hover:text-primary transition-colors" />
                <a href="mailto:contact@chakrihobe.com" className="hover:text-primary transition-colors">
                  contact@chakrihobe.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground group">
                <Phone className="h-4 w-4 group-hover:text-primary transition-colors" />
                <a href="tel:+8801234567890" className="hover:text-primary transition-colors">
                  +880 1234 567890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 CSE470 Team Golf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer