'use client';

import React, { useState } from 'react';
import CustomCursor from './common/custom-cursor';
import Menu from './menu';
import Navbar from './navbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {children}
    </>
  );
}
