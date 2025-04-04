import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="container mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full items-center border-t">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Pictoria AI Inc. All rights reservved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4">
          Terms of Service
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4">
          Privacy Policy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
