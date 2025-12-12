import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion, AnimatePresence } from 'framer-motion';
import ColorModeToggle from '@theme/ColorModeToggle';
import useThemeContext from '@theme/hooks/useThemeContext';
import './MobileNav.css';

export default function MobileNav() {
    const [isOpen, setIsOpen] = React.useState(false);
    const { siteConfig } = useDocusaurusContext();
    const { isDarkTheme, setLightTheme, setDarkTheme } = useThemeContext();

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Hamburger/Cross Button */}
            <button
                className="mobile-nav-toggle"
                onClick={toggleMenu}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                <motion.div
                    animate={isOpen ? 'open' : 'closed'}
                    className="hamburger-icon"
                >
                    <motion.span
                        variants={{
                            closed: { rotate: 0, y: 0 },
                            open: { rotate: 45, y: 8 }
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 }
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        variants={{
                            closed: { rotate: 0, y: 0 },
                            open: { rotate: -45, y: -8 }
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </button>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="mobile-nav-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={toggleMenu}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="mobile-nav-menu"
                            initial={{ y: '-100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '-100%', opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {/* Menu Header */}
                            <div className="mobile-nav-header">
                                {/* Logo - Left Side */}
                                <div className="mobile-nav-logo">
                                    <img src="/img/logo.png" alt={siteConfig.title} />
                                </div>

                                {/* Color Mode Toggle - Right Side */}
                                <div className="mobile-nav-color-toggle">
                                    <ColorModeToggle
                                        value={isDarkTheme ? 'dark' : 'light'}
                                        onChange={(mode) => mode === 'dark' ? setDarkTheme() : setLightTheme()}
                                    />
                                </div>
                            </div>

                            {/* Menu Items */}
                            <nav className="mobile-nav-items">
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Link
                                        to="/docs/intro"
                                        className="mobile-nav-link"
                                        onClick={toggleMenu}
                                    >
                                        Book
                                    </Link>
                                </motion.div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
