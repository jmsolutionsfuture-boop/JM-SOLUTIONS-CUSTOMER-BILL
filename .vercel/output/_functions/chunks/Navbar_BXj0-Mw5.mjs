import { e as createComponent, f as createAstro, h as addAttribute, n as renderHead, o as renderSlot, r as renderTemplate, k as renderComponent } from './astro/server_QXGJpzTU.mjs';
import 'piccolore';
import { clsx } from 'clsx';
/* empty css                        */
import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Wallet, LayoutDashboard, Users, Receipt, Settings, X, Menu } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Sistema de Facturaci\xF3n Digital" } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderHead()}</head> <body class="min-h-screen bg-background font-sans antialiased"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/layouts/Layout.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Clientes", path: "/clientes", icon: Users },
  { name: "Facturas", path: "/facturas", icon: Receipt },
  { name: "Configuración", path: "/configuracion", icon: Settings }
];
const Navbar = ({ currentPath = "/" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: cn(
        "sticky top-0 z-40 w-full transition-all duration-300 border-b",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border py-1 md:py-2" : "bg-background border-transparent py-2 md:py-4"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center h-14 md:h-16", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 group cursor-pointer", onClick: () => window.location.href = "/", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Wallet, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxs("span", { className: "font-bold text-xl tracking-tight hidden sm:block", children: [
              "Facturador",
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Digital" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-1", children: navItems.map((item) => /* @__PURE__ */ jsxs(
            "a",
            {
              href: item.path,
              className: cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                currentPath === item.path ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ),
              children: [
                /* @__PURE__ */ jsx(item.icon, { className: "w-4 h-4" }),
                item.name
              ]
            },
            item.path
          )) }),
          /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
              className: "text-foreground",
              children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "md:hidden absolute top-full left-0 w-full bg-background border-b shadow-xl transition-all duration-300 origin-top",
              isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
            ),
            children: /* @__PURE__ */ jsx("div", { className: "px-4 pt-2 pb-6 space-y-1", children: navItems.map((item) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: item.path,
                className: cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  currentPath === item.path ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsx(item.icon, { className: "w-5 h-5" }),
                  item.name
                ]
              },
              item.path
            )) })
          }
        )
      ]
    }
  );
};

const $$Astro = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { currentPath = "/" } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "NavbarReact", Navbar, { "client:load": true, "currentPath": currentPath, "client:component-hydration": "load", "client:component-path": "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/layout/Navbar", "client:component-export": "default" })}`;
}, "C:/Users/Gateway pc/Desktop/mis proyectos/customer-bill/src/components/layout/Navbar.astro", void 0);

export { $$Layout as $, $$Navbar as a };
