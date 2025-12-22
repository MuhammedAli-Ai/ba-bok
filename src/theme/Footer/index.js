import React from 'react';
import { motion } from 'framer-motion';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import {
  FacebookOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import BAButton from '@site/src/components/BAButton';
import BABox from '@site/src/components/BABox';
import BAPera from '@site/src/components/BAPera';

const XIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '1em', height: '1em', fill: 'currentColor' }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export default function FooterWrapper(props) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const footerLinks = {
    Connect: [
      { label: 'Facebook', icon: <FacebookOutlined />, href: 'https://facebook.com' },
      { label: 'X', icon: <XIcon />, href: 'https://x.com' },
      { label: 'LinkedIn', icon: <LinkedinOutlined />, href: 'https://linkedin.com' }
    ]
  };

  return (
    <footer className="footer-minimalist" style={{
      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
      color: isDark ? 'rgba(209, 213, 219, 0.6)' : '#475569'
    }}>
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Centered Social Icons */}
        <BABox sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0 2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {footerLinks.Connect.map((social) => (
              <BAButton
                key={social.label}
                onClick={() => window.open(social.href, '_blank')}
                className="footer-social-ba-btn"
                sx={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  minWidth: 'auto',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
                  color: isDark ? 'rgba(209, 213, 219, 0.7)' : '#334155'
                }}
              >
                {social.icon}
              </BAButton>
            ))}
          </div>
        </BABox>

        {/* Minimalist Copyright Row */}
        <BABox sx={{ borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)', padding: '2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <BAPera style={{ color: isDark ? 'rgba(209, 213, 219, 0.4)' : '#64748b', fontSize: '0.85rem', margin: 0 }}>
            © {new Date().getFullYear()} BASUITE Digital Archive. All rights reserved.
          </BAPera>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="#" style={{ color: isDark ? 'rgba(209, 213, 219, 0.4)' : '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="#" style={{ color: isDark ? 'rgba(209, 213, 219, 0.4)' : '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>Accessibility</Link>
            <Link to="#" style={{ color: isDark ? 'rgba(209, 213, 219, 0.4)' : '#64748b', fontSize: '0.85rem', textDecoration: 'none' }}>Credits</Link>
          </div>
        </BABox>
      </motion.div>
    </footer>
  );
}
