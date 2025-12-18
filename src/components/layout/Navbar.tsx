
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Receipt, Settings, Menu, X, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Clientes', path: '/clientes', icon: Users },
  { name: 'Facturas', path: '/facturas', icon: Receipt },
  { name: 'Configuración', path: '/configuracion', icon: Settings },
];

export const Navbar: React.FC<{ currentPath?: string }> = ({ currentPath = '/' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-border py-1 md:py-2" 
          : "bg-background border-transparent py-2 md:py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              Facturador<span className="text-primary">Digital</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  currentPath === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-background border-b shadow-xl transition-all duration-300 origin-top",
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                currentPath === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
