'use client';

import CloseButton from './close-button';

interface NavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export default function Navbar({ onMenuToggle, isMenuOpen }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-end items-start py-8 px-6 md:px-12 pointer-events-none">
      <CloseButton onClick={onMenuToggle} isOpen={isMenuOpen} />
    </header>
  );
}
