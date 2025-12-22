import React, { useState } from 'react';
import Navbar from '@theme-original/Navbar';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { SearchOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import clsx from 'clsx';

export default function NavbarWrapper(props) {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const { colorMode, setColorMode } = useColorMode();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useMotionValueEvent(scrollY, "change", (latest) => {
        // const previous = scrollY.getPrevious();
        // if (latest > previous && latest > 150) {
        //     setHidden(true);
        // } else {
        setHidden(false);
        // }
    });

    // if (!isHomePage) {
    //     return <Navbar {...props} />;
    // }

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: -120 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{
                position: isHomePage ? 'fixed' : 'absolute',
                top: '1.5rem',
                left: 0,
                right: 0,
                margin: '0 auto',
                width: '95%',
                maxWidth: '1200px',
                zIndex: 1000,
                pointerEvents: 'auto',
            }}
        >
            <div className="navbar-basuite-pill" style={{
                background: colorMode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: colorMode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '50px',
                padding: '0 2rem',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                boxShadow: colorMode === 'dark' ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.05)',
            }}>
                {/* Logo - Hanging Overflow */}
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10
                }}>
                    <img
                        src="/img/logo.png"
                        alt="BASUIT Logo"
                        style={{ height: '180px', width: 'auto', margin: 0, padding: 0 }}
                    />
                </Link>

                {/* Actions */}
                <div className="navbar-actions" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginLeft: 'auto' }}>
                    <div onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')} style={{ cursor: 'pointer' }}>
                        {colorMode === 'dark' ?
                            <SunOutlined style={{ fontSize: '1.25rem', color: '#fcd34d' }} /> :
                            <MoonOutlined style={{ fontSize: '1.25rem', color: '#1e293b' }} />
                        }
                    </div>
                    <Link
                        to="https://github.com/BasitAyaz?tab=repositories"
                        style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '2px solid rgba(56, 189, 248, 0.5)',
                            padding: '0'
                        }}
                    >
                        <img
                            src="/img/profile.png"
                            alt="Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </Link>
                </div>
            </div>

            {/* Hidden Original Navbar for Docusaurus functional requirements */}
            <div style={{ display: 'none' }}>
                <Navbar {...props} />
            </div>
        </motion.nav>
    );
}
