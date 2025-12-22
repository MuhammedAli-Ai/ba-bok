import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { motion } from 'framer-motion';
import { SearchOutlined } from '@ant-design/icons';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const COMPONENTS_LIST = [
  { name: 'BAButton', path: '/docs/components/babutton' },
  { name: 'BAInput', path: '/docs/components/bainput' },
  { name: 'BACheckbox', path: '/docs/components/bacheckbox' },
  { name: 'BARadio', path: '/docs/components/baradio' },
  { name: 'BASwitch', path: '/docs/components/baswitch' },
  { name: 'BASelect', path: '/docs/components/baselect' },
  { name: 'BATextArea', path: '/docs/components/batextarea' },
  { name: 'BAModal', path: '/docs/components/bamodal' },
  { name: 'BAGrid', path: '/docs/components/bagrid' },
  { name: 'BAFormGrid', path: '/docs/components/baformgrid' },
  { name: 'BAIcon', path: '/docs/components/baiconbutton' },
  { name: 'BADate', path: '/docs/components/badate' },
  { name: 'BATabs', path: '/docs/components/batabs' },
  { name: 'BACollapse', path: '/docs/components/bacollapse' },
  { name: 'BALoader', path: '/docs/components/baloader' },
  { name: 'BABackdropLoader', path: '/docs/components/babackdroploader' },
  { name: 'BAImagePicker', path: '/docs/components/baimagepicker' },
  { name: 'BADragDropFile', path: '/docs/components/badragdropfile' },
  { name: 'BAExcelUpload', path: '/docs/components/baexcelupload' },
  { name: 'BASearchLookup', path: '/docs/components/basearchlookup' },
  { name: 'BASetupGrid', path: '/docs/components/basetupgrid' },
  { name: 'BAScreenHeader', path: '/docs/components/bascreenheader' },
  { name: 'BAPagination', path: '/docs/components/bapagination' },
  { name: 'BAPera', path: '/docs/components/bapera' },
  { name: 'BABox', path: '/docs/components/babox' },
  { name: 'BAFieldset', path: '/docs/components/bafieldset' },
  { name: 'BAFormElement', path: '/docs/components/baformelement' },
  { name: 'BAMenu', path: '/docs/components/bamenu' },
  { name: 'BAComponentSwitcher', path: '/docs/components/bacomponentswitcher' },
  { name: 'MasterContainer', path: '/docs/components/mastercontainer' },
  { name: 'FileUploadToBlob', path: '/docs/components/fileuploadtoblob' },
];

function BasuiteHero() {
  const { siteConfig } = useDocusaurusContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const history = useHistory();
  const searchRef = React.useRef(null);
  const dropdownRef = React.useRef(null);

  // Click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setSearchTerm('');
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = COMPONENTS_LIST.filter(comp =>
        comp.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsDropdownOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSuggestionClick = (path) => {
    history.push(path);
    setSearchTerm('');
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50 }
    }
  };

  return (
    <header className={clsx('hero', styles.basuiteHero)}>
      <motion.div
        className="container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="row">
          <div className="col col--6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.div variants={itemVariants}>
              <Heading as="h1" className={styles.basuiteTitle}>
                {siteConfig.title}
              </Heading>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className={styles.basuiteSubtitle}>{siteConfig.tagline}</p>
            </motion.div>

            {/* Omnibar Search with Suggestions */}
            <motion.div
              ref={searchRef}
              variants={itemVariants}
              className={styles.omnibarWrapper}
              style={{ position: 'relative', zIndex: isDropdownOpen ? 9999 : 1 }}
            >
              <div className={styles.omnibar}>
                <SearchOutlined className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search components (e.g., Button)..."
                  className={styles.omnibarInput}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  aria-label="Search components"
                  aria-autocomplete="list"
                  aria-controls="search-suggestions"
                  aria-expanded={isDropdownOpen}
                  role="combobox"
                />
                <span className={styles.shortcutHint}>Ctrl + K</span>
              </div>

              {/* Search Suggestions Dropdown */}
              {isDropdownOpen && suggestions.length > 0 && (
                <motion.div
                  ref={dropdownRef}
                  id="search-suggestions"
                  role="listbox"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '10px',
                    background: 'var(--ifm-background-color)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    zIndex: 10000,
                    padding: '8px 0',
                    maxHeight: '320px',
                    overflowY: 'auto',
                    border: '1px solid var(--glass-border)',
                    maxWidth: '100%',
                  }}
                >
                  {suggestions.map((comp, index) => (
                    <div
                      key={comp.name}
                      role="option"
                      aria-selected={false}
                      onClick={() => handleSuggestionClick(comp.path)}
                      style={{
                        padding: '12px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        color: 'var(--ifm-font-color-base)',
                        fontSize: '0.95rem',
                        borderRadius: '6px',
                        margin: '0 8px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(37, 99, 235, 0.15)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{comp.name}</span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--ifm-color-emphasis-600)',
                        background: 'var(--ifm-color-emphasis-200)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}>
                        Component
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro"
                style={{ borderRadius: '50px', padding: '12px 32px' }}>
                Get Started
              </Link>
            </motion.div>
          </div>

          <div className="col col--6">
            {/* Abstract 3D Visual Placeholder - Floating Animation */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className={styles.heroVisual}
            >
              <div className={styles.glassCard}>
                <div className={styles.codeSnippet}>
                  <pre>
                    <code>
                      {`import { BAButton } from 'basuite';

function App() {
  return (
    <BAButton label="BASuite" />
  );
}`}
                    </code>
                  </pre>
                </div>
                <div className={styles.componentOutput}>
                  <span className={styles.outputLabel}>Output:</span>
                  <div className={styles.outputWrapper}>
                    <button className={styles.mockBAButton}>BASuite</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="BASUITE - Digital Knowledge Management"
      wrapperClassName="homepage-wrapper">
      <BasuiteHero />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
