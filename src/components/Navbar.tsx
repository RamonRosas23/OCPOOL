'use client';

import Image from 'next/image';
import { useState } from 'react';

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#inicio" onClick={() => setIsMenuOpen(false)} aria-label="OCPOOL, inicio">
          <Image src="/brand/ocpool-logo.png" alt="OCPOOL" width={94} height={71} className="brand__logo" priority />
          <span className="brand__descriptor">Diseño / construcción<br />de espacios acuáticos</span>
        </a>

        <nav id="primary-navigation" className={`site-nav ${isMenuOpen ? 'site-nav--open' : ''}`} aria-label="Navegación principal">
          <div className="site-nav__links">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>
          <a className="button button--small button--outline" href="#contacto" onClick={() => setIsMenuOpen(false)}>
            Cotizar <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
