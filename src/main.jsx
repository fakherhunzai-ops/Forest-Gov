import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  Search,
  Menu,
  X,
  Trees,
  Leaf,
  Mountain,
  MapPin,
  Map,
  FileText,
  Download,
  BriefcaseBusiness,
  ShieldCheck,
  Mail,
  Phone,
  Globe2,
  Landmark,
} from 'lucide-react';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import '@fontsource/manrope/latin-800.css';
import { nav, page, updates, resources, departments, searchItems } from './data';
import './styles.css';
const Icons = { trees: Trees, wildlife: Mountain, leaf: Leaf };
function SourceLink({ href, children, className = '', ...props }) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}
function TextLink({ href, children, className = '' }) {
  return (
    <SourceLink href={href} className={`text-link ${className}`}>
      {children}
      <ArrowUpRight size={17} />
    </SourceLink>
  );
}
function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow ${light ? 'light' : ''}`}>
      <span />
      {children}
    </p>
  );
}
function Header({ onSearch }) {
  const [open, setOpen] = useState(null),
    [mobile, setMobile] = useState(false);
  const header = useRef(null);
  useEffect(() => {
    const close = (e) => {
      if (!header.current?.contains(e.target)) {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  function closeMenus() {
    setMobile(false);
    setOpen(null);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <div className="utility">
        <div className="container utility-inner">
          <span>
            <Landmark size={13} /> Government of Gilgit-Baltistan
          </span>
          <div>
            <a href="mailto:info@fwegb.gov.pk">
              <Mail size={13} />
              info@fwegb.gov.pk
            </a>
            <span className="utility-divider" />
            <a href="#contact">
              Get in touch <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
      <header
        ref={header}
        className="header"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            if (open !== null) {
              setOpen(null);
              e.target.closest('.nav-item')?.querySelector('button')?.focus();
            } else if (mobile) {
              setMobile(false);
              header.current?.querySelector('.menu-toggle')?.focus();
            }
          }
        }}
      >
        <div className="container brand-row">
          <a
            href="#home"
            className="brand"
            onClick={closeMenus}
            aria-label="Forest, Wildlife and Environment Department home"
          >
            <img
              src="/assets/government-emblem.png"
              alt="Government of Gilgit-Baltistan emblem"
              width="64"
              height="72"
            />
            <div>
              <span>GOVERNMENT OF GILGIT-BALTISTAN</span>
              <strong>
                Forest, Wildlife &<br className="mobile-break" /> Environment Department
              </strong>
            </div>
          </a>
          <div className="brand-right">
            <div className="brand-message">
              Conserving today.
              <br />
              <strong>For generations to come.</strong>
            </div>
            <img
              src="/assets/forest-logo.jpg"
              width="60"
              height="64"
              alt="Forest Department Gilgit Baltistan logo"
            />
            <button
              className="icon-button mobile-search"
              onClick={onSearch}
              aria-label="Search website"
            >
              <Search size={21} />
            </button>
            <button
              className="icon-button menu-toggle"
              onClick={() => setMobile(!mobile)}
              aria-expanded={mobile}
              aria-controls="primary-navigation"
              aria-label={mobile ? 'Close navigation' : 'Open navigation'}
            >
              {mobile ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        <div className="nav-border">
          <div className="container nav-container">
            <nav
              id="primary-navigation"
              className={mobile ? 'primary-nav is-open' : 'primary-nav'}
              aria-label="Main navigation"
            >
              {nav.map((item, i) => (
                <div
                  className={`nav-item ${open === i ? 'expanded' : ''}`}
                  key={item.label}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget))
                      setOpen((current) => (current === i ? null : current));
                  }}
                >
                  {item.links ? (
                    <>
                      <button
                        className="nav-trigger"
                        aria-expanded={open === i}
                        aria-controls={`nav-panel-${i}`}
                        onClick={() => setOpen(open === i ? null : i)}
                      >
                        {item.label}
                        <ChevronDown size={12} />
                      </button>
                      <div className="dropdown" id={`nav-panel-${i}`} hidden={open !== i}>
                        <span className="dropdown-heading">{item.label}</span>
                        {item.links.map(([label, path]) => (
                          <SourceLink key={path} href={page(path)} onClick={closeMenus}>
                            {label}
                            <ArrowUpRight size={14} />
                          </SourceLink>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a
                      className={`nav-trigger ${i === 0 ? 'active' : ''}`}
                      href={item.href}
                      aria-current={i === 0 ? 'page' : undefined}
                      onClick={closeMenus}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>
            <button className="nav-search" onClick={onSearch} aria-label="Search website">
              <Search size={18} />
              <span className="key-hint">/</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
function Tabs({ id, labels, active, onChange }) {
  const refs = useRef([]);
  function handleKey(e, index) {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % labels.length;
    else if (e.key === 'ArrowLeft') next = (index + labels.length - 1) % labels.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = labels.length - 1;
    else return;
    e.preventDefault();
    onChange(labels[next]);
    refs.current[next]?.focus();
  }
  return (
    <div
      className="tabs"
      role="tablist"
      aria-label={id === 'updates' ? 'Latest update categories' : 'Resource categories'}
    >
      {labels.map((label, i) => (
        <button
          key={label}
          ref={(el) => (refs.current[i] = el)}
          role="tab"
          id={`${id}-tab-${i}`}
          aria-selected={active === label}
          aria-controls={`${id}-panel`}
          tabIndex={active === label ? 0 : -1}
          onClick={() => onChange(label)}
          onKeyDown={(e) => handleKey(e, i)}
        >
          {label}
          {id === 'updates' && label === 'News' && <span className="tab-dot" />}
        </button>
      ))}
    </div>
  );
}
function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-photo"
          src="/assets/fairy-meadows.jpg"
          alt="Nanga Parbat above the forest and lake at Fairy Meadows, Gilgit-Baltistan"
          fetchPriority="high"
          width="1024"
          height="683"
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <Eyebrow light>NATURE IS OUR LEGACY</Eyebrow>
          <h1 id="hero-title">
            Protecting nature.
            <br />
            <span>Preserving our future.</span>
          </h1>
          <p>
            Working together to conserve the forests, wildlife and
            <br className="desktop-break" /> extraordinary landscapes of Gilgit-Baltistan.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#departments">
              Explore our work <ArrowUpRight size={18} />
            </a>
            <a className="button outline-white" href="#about">
              About the department <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-bottom">
            <span className="hero-promise">
              <ShieldCheck size={17} /> Conservation. Communities. A sustainable tomorrow.
            </span>
            <span className="location">
              <MapPin size={15} />
              <span>Fairy Meadows, Gilgit-Baltistan</span>
            </span>
          </div>
        </div>
      </section>
      <div className="container shortcuts">
        <a href={page('forest')}>
          <span className="shortcut-icon">
            <Trees />
          </span>
          <div>
            <strong>Forests</strong>
            <span>Restoring our green heritage</span>
          </div>
          <ArrowUpRight size={17} />
        </a>
        <a href={page('parks-and-widlife')}>
          <span className="shortcut-icon">
            <Mountain />
          </span>
          <div>
            <strong>Parks & Wildlife</strong>
            <span>Protecting life in the wild</span>
          </div>
          <ArrowUpRight size={17} />
        </a>
        <a href={page('environment')}>
          <span className="shortcut-icon">
            <Leaf />
          </span>
          <div>
            <strong>Environment</strong>
            <span>A healthier, greener region</span>
          </div>
          <ArrowUpRight size={17} />
        </a>
        <a href="#resources">
          <span className="shortcut-icon">
            <FileText />
          </span>
          <div>
            <strong>Public resources</strong>
            <span>Information at your fingertips</span>
          </div>
          <ArrowUpRight size={17} />
        </a>
      </div>
    </>
  );
}
function About() {
  return (
    <section id="about" className="container about section">
      <div className="about-intro">
        <Eyebrow>OUR VISION & MANDATE</Eyebrow>
        <h2>
          A remarkable landscape.
          <br />A shared responsibility.
        </h2>
      </div>
      <div className="about-copy">
        <p>
          From mountain forests to high-altitude wetlands, we protect, conserve and sustainably
          manage the natural heritage of Gilgit-Baltistan.
        </p>
        <p>
          Our work brings communities and conservation together—safeguarding biodiversity,
          strengthening livelihoods and supporting responsible eco-tourism.
        </p>
        <TextLink href={page('about-us')}>Discover our vision & mandate</TextLink>
      </div>
    </section>
  );
}
function Departments() {
  return (
    <section id="departments" className="departments section">
      <div className="container">
        <div className="section-heading">
          <div>
            <Eyebrow>ONE VISION. CONNECTED EFFORTS.</Eyebrow>
            <h2>Our areas of work</h2>
          </div>
          <p>
            Protecting what makes
            <br />
            Gilgit-Baltistan extraordinary.
          </p>
        </div>
        <div className="department-grid">
          {departments.map((d, i) => {
            const Icon = Icons[d.icon];
            return (
              <article className="department-card" key={d.title}>
                <a href={d.href} className="department-image" tabIndex={-1} aria-hidden="true">
                  <img
                    src={`/assets/${d.image}`}
                    alt={d.alt}
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  <span className="department-number">0{i + 1}</span>
                </a>
                <div className="department-body">
                  <span className="department-icon">
                    <Icon size={25} />
                  </span>
                  <p className="card-kicker">{d.kicker}</p>
                  <h3>{d.title}</h3>
                  <p>{d.description}</p>
                  <a className="department-link" href={d.href}>
                    Explore {d.title === 'Environment' ? 'the agency' : 'department'}
                    <span>
                      <ArrowUpRight size={18} />
                    </span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="department-note">
          <span>
            <ShieldCheck size={16} /> Rooted in conservation. Strengthened by community.
          </span>
          <a href={page('about-us')}>
            About our attached departments <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
function Updates({ openLibrary }) {
  const [active, setActive] = useState('News');
  const labels = Object.keys(updates);
  return (
    <section id="updates" className="container updates-section section">
      <div className="section-heading">
        <div>
          <Eyebrow>FROM THE DEPARTMENT</Eyebrow>
          <h2>Latest updates</h2>
        </div>
        <button className="text-link" onClick={() => openLibrary('updates')}>
          View all updates <ArrowUpRight size={17} />
        </button>
      </div>
      <Tabs id="updates" labels={labels} active={active} onChange={setActive} />
      <div
        id="updates-panel"
        role="tabpanel"
        aria-labelledby={`updates-tab-${labels.indexOf(active)}`}
        tabIndex="0"
        className="updates-panel"
      >
        {active === 'Jobs' ? (
          <div className="empty-state">
            <BriefcaseBusiness size={35} />
            <h3>No current vacancies announced</h3>
            <p>
              The official homepage currently lists no jobs. Earlier advertisements remain available
              in the career archive; check their dates and eligibility before applying.
            </p>
            <TextLink href={page('career')}>View career archive</TextLink>
          </div>
        ) : (
          <div className="update-grid">
            {updates[active].map((item, i) => (
              <article className={`update-card ${i === 0 ? 'featured' : ''}`} key={item.href}>
                <div className="update-meta">
                  <span className="tag">{item.category}</span>
                  <time dateTime={item.date}>
                    {new Date(`${item.date}T00:00:00`).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>
                </div>
                <h3>
                  <a href={item.href}>{item.title}</a>
                </h3>
                <p>{item.description}</p>
                <a className="update-link" href={item.href}>
                  {item.pdf ? 'View official notice' : 'Read full update'}
                  {item.pdf ? <Download size={17} /> : <ArrowUpRight size={17} />}
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
      <p className="source-note">
        <span className="status-dot" /> Updates as published on the official website. Publication
        dates do not indicate an open application period.
      </p>
    </section>
  );
}
function Landscape() {
  return (
    <section className="landscape-banner">
      <img
        src="/assets/deosai.jpg"
        alt="Alpine wildflowers around Sheosar Lake, Deosai National Park"
        loading="lazy"
        width="1024"
        height="614"
      />
      <div className="landscape-overlay" />
      <div className="container landscape-content">
        <div>
          <Eyebrow light>EXPLORE. UNDERSTAND. PROTECT.</Eyebrow>
          <h2>
            A world worth
            <br />
            looking after.
          </h2>
          <p>
            Discover the protected areas and natural habitats
            <br className="desktop-break" /> at the heart of Gilgit-Baltistan.
          </p>
          <a href={page('parks-and-widlife')} className="button white">
            Discover our protected areas <ArrowUpRight size={18} />
          </a>
        </div>
        <a className="map-callout" href={page('national-parks-map')}>
          <span className="map-circle">
            <Map size={28} />
          </span>
          <div>
            <span>KNOW YOUR LANDSCAPE</span>
            <h3>Explore the maps</h3>
            <p>National parks, forests & land use</p>
          </div>
          <ArrowUpRight size={24} />
        </a>
      </div>
      <span className="landscape-caption">
        <MapPin size={14} />
        Sheosar Lake, Deosai National Park
      </span>
    </section>
  );
}
function Resources({ openLibrary }) {
  const [active, setActive] = useState('Reports & Publications');
  const labels = Object.keys(resources);
  return (
    <section id="resources" className="container resources-section section">
      <div className="section-heading">
        <div>
          <Eyebrow>KNOWLEDGE FOR EVERYONE</Eyebrow>
          <h2>Resources & downloads</h2>
        </div>
        <button className="text-link" onClick={() => openLibrary('resources')}>
          Browse resource library <ArrowUpRight size={17} />
        </button>
      </div>
      <Tabs id="resources" labels={labels} active={active} onChange={setActive} />
      <div
        id="resources-panel"
        role="tabpanel"
        aria-labelledby={`resources-tab-${labels.indexOf(active)}`}
        tabIndex="0"
        className="resource-list"
      >
        {resources[active].map((item) => (
          <a
            className="resource-row"
            key={item.title}
            href={item.href}
            aria-label={`Open PDF: ${item.title}`}
          >
            <span className="document-icon">
              <FileText size={24} />
            </span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
            <span className="pdf-label">PDF</span>
            <span className="download-icon">
              <Download size={19} />
            </span>
          </a>
        ))}
      </div>
      <p className="source-note">
        Documents open from the official department website. Use your PDF viewer to save a copy.
      </p>
    </section>
  );
}
function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container contact-inner">
        <div className="contact-heading">
          <span className="contact-symbol">
            <Mail size={29} />
          </span>
          <div>
            <Eyebrow>LET’S WORK TOGETHER</Eyebrow>
            <h2>Conservation starts with a conversation.</h2>
            <p>For information, assistance or departmental enquiries, get in touch.</p>
          </div>
        </div>
        <a className="button dark" href={page('contact-us-2')}>
          Contact the department <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
function Footer({ openInfo }) {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-about">
          <div className="footer-brand">
            <img
              src="/assets/government-emblem.png"
              alt="Government of Gilgit-Baltistan emblem"
              width="54"
              height="62"
            />
            <strong>
              Forest, Wildlife &<br />
              Environment Department
            </strong>
          </div>
          <p>Government of Gilgit-Baltistan</p>
          <p>
            Conserving our natural heritage.
            <br />
            Building a sustainable future, together.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <a href={page('about-us')}>About the department</a>
          <a href="#departments">Our areas of work</a>
          <a href={page('adp')}>Development portfolio</a>
          <a href={page('national-parks-map')}>Maps & protected areas</a>
        </div>
        <div>
          <h3>Information & resources</h3>
          <a href="#updates">News & public notices</a>
          <a href={page('tender')}>Tenders & procurement</a>
          <a href={page('career')}>Careers</a>
          <a href="#resources">Publications & legislation</a>
        </div>
        <div className="footer-contact">
          <h3>Get in touch</h3>
          <p>
            <MapPin size={17} />
            <span>
              Civil Services Complex, Jutial
              <br />
              Gilgit-Baltistan, Pakistan
            </span>
          </p>
          <a href="tel:+925811920146">
            <Phone size={16} />
            +92 5811 920146
          </a>
          <a href="mailto:info@fwegb.gov.pk">
            <Mail size={16} />
            info@fwegb.gov.pk
          </a>
          <a href={page('contact-us-2')}>
            Department directory <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Forest, Wildlife & Environment Department, Gilgit-Baltistan.
        </span>
        <div>
          <button onClick={() => openInfo('source')}>Sources & image credits</button>
          <span className="footer-dot">·</span>
          <button onClick={() => openInfo('accessibility')}>Accessibility</button>
          <a href="#home" className="back-top" aria-label="Back to top">
            <ArrowUp size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
function Modal({ type, onClose }) {
  const dialog = useRef(null),
    input = useRef(null);
  const [query, setQuery] = useState(''),
    [filter, setFilter] = useState('All');
  useEffect(() => {
    const el = dialog.current;
    if (!el.open) el.showModal();
    (input.current || el.querySelector('button'))?.focus({ preventScroll: true });
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  function containFocus(event) {
    if (event.key !== 'Tab') return;
    const controls = [
      ...dialog.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => el.getClientRects().length > 0);
    const first = controls[0],
      last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  const resourceMode = type === 'resources',
    updateMode = type === 'updates',
    searchable = ['search', 'resources', 'updates'].includes(type);
  const items = resourceMode
    ? Object.entries(resources).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, category, pdf: true })),
      )
    : updateMode
      ? searchItems.filter((i) => i.date)
      : searchItems;
  const results = items.filter(
    (item) =>
      (filter === 'All' || item.category === filter) &&
      `${item.title} ${item.category} ${item.detail || ''} ${item.description || ''}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const title =
    type === 'search'
      ? 'How can we help you?'
      : resourceMode
        ? 'Resource library'
        : updateMode
          ? 'Department updates'
          : type === 'source'
            ? 'Sources & image credits'
            : 'Accessibility';
  return (
    <dialog
      className="modal"
      ref={dialog}
      aria-labelledby="modal-title"
      onKeyDown={containFocus}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
    >
      <div className="modal-inner">
        <div className="modal-heading">
          <div>
            <Eyebrow>{searchable ? 'INFORMATION, MADE ACCESSIBLE' : 'ABOUT THIS WEBSITE'}</Eyebrow>
            <h2 id="modal-title">{title}</h2>
          </div>
          <button className="icon-button" aria-label="Close dialog" onClick={onClose}>
            <X />
          </button>
        </div>
        {searchable ? (
          <>
            <div className="search-input">
              <Search size={21} />
              <input
                ref={input}
                autoFocus
                type="search"
                aria-label={
                  resourceMode
                    ? 'Search resources'
                    : updateMode
                      ? 'Search updates'
                      : 'Search the website'
                }
                placeholder={
                  resourceMode
                    ? 'Search reports, guidelines and legislation…'
                    : 'Search departments, documents, updates…'
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd>esc</kbd>
            </div>
            {resourceMode && (
              <div className="filter-buttons" aria-label="Filter resources">
                {['All', ...Object.keys(resources)].map((label) => (
                  <button
                    key={label}
                    aria-pressed={filter === label}
                    onClick={() => setFilter(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            <p className="result-count" role="status">
              {results.length} {results.length === 1 ? 'result' : 'results'}
              {query && ` for “${query}”`}
            </p>
            <div className="search-results">
              {results.length ? (
                results.map((item, i) => (
                  <a key={`${item.href}-${i}`} href={item.href} className="search-result">
                    <span className="document-icon">
                      {item.pdf ? <FileText size={21} /> : <Globe2 size={21} />}
                    </span>
                    <div>
                      <span>
                        {item.category}
                        {item.pdf ? ' · PDF' : ''}
                      </span>
                      <h3>{item.title}</h3>
                      {item.date && (
                        <p>
                          Published{' '}
                          {new Date(`${item.date}T00:00:00`).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                    <ArrowUpRight size={18} />
                  </a>
                ))
              ) : (
                <div className="empty-state">
                  <Search size={32} />
                  <h3>No matching results</h3>
                  <p>Try a broader term such as “forest”, “wildlife” or “report”.</p>
                  <button
                    className="button dark"
                    onClick={() => {
                      setQuery('');
                      setFilter('All');
                      input.current?.focus();
                    }}
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
            <div className="library-links">
              {resourceMode ? (
                <>
                  <TextLink href={page('reports')}>All official reports</TextLink>
                  <TextLink href={page('publications')}>All publications</TextLink>
                </>
              ) : updateMode ? (
                <TextLink href={page('press-release')}>Official update archive</TextLink>
              ) : null}
            </div>
            <p className="modal-footnote">
              <ShieldCheck size={14} /> Full information and documents are hosted at fwegb.gov.pk.
            </p>
          </>
        ) : type === 'source' ? (
          <div className="prose">
            <p>
              This redesign uses the{' '}
              <a href="https://fwegb.gov.pk/">
                Forest, Wildlife & Environment Department’s official website
              </a>{' '}
              as its factual content source. Homepage summaries link to full official information.
            </p>
            <h3>Source review</h3>
            <p>
              Content reviewed on 14 October 2026. Departmental notices are historical publications,
              not confirmation that a tender or recruitment window is currently open. The official
              homepage reports no current jobs; the career page contains older advertisements.
            </p>
            <h3>Original branding</h3>
            <p>
              The Gilgit-Baltistan government emblem and original Forest Department logo are
              preserved. The emblem asset was retrieved from{' '}
              <a href="https://seeklogo.com/vector-logo/411519/gilgit-baltistan-government">
                Seeklogo
              </a>
              ; the Forest Department logo is from the official website.
            </p>
            <h3>Photography</h3>
            <ul>
              <li>
                Fairy Meadows and Nanga Parbat:{' '}
                <a href="https://intothewildunknown.com/fairy-meadows-nanga-parbat-guide/">
                  Into the Wild Unknown
                </a>
                .
              </li>
              <li>
                Female markhor: <a href={page('markhor')}>official species page</a>.
              </li>
              <li>
                Sheosar Lake, Deosai:{' '}
                <a href={page('national-parks')}>official national parks page</a>; photograph bears
                the credit Gulan Khan.
              </li>
            </ul>
            <p>
              Images are stored locally for reliable display. Original image ownership remains with
              the respective rights holders. Publication permissions should be confirmed before a
              public production launch.
            </p>
          </div>
        ) : (
          <div className="prose">
            <p>This site is designed for keyboard, touch and assistive technology users.</p>
            <ul>
              <li>Use the “Skip to main content” link to bypass navigation.</li>
              <li>Use Tab to move between controls, and Enter or Space to activate buttons.</li>
              <li>Use arrow keys, Home and End within category tabs.</li>
              <li>Press Escape to close menus and dialogs.</li>
              <li>Press / outside a text field to open site search.</li>
              <li>The site respects reduced-motion preferences and browser text scaling.</li>
            </ul>
            <p>
              Linked official PDFs and external pages may have different accessibility standards.
              For assistance, contact <a href="mailto:info@fwegb.gov.pk">info@fwegb.gov.pk</a> or{' '}
              <a href="tel:+925811920146">+92 5811 920146</a>.
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}
function App() {
  const [modal, setModal] = useState(null);
  const lastFocus = useRef(null);
  function openModal(type) {
    lastFocus.current = document.activeElement;
    setModal(type);
  }
  function closeModal() {
    setModal(null);
    requestAnimationFrame(() => lastFocus.current?.focus());
  }
  useEffect(() => {
    function shortcut(e) {
      if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) &&
        !modal
      ) {
        e.preventDefault();
        openModal('search');
      }
    }
    document.addEventListener('keydown', shortcut);
    return () => document.removeEventListener('keydown', shortcut);
  }, [modal]);
  return (
    <div id="home">
      <Header onSearch={() => openModal('search')} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Departments />
        <Updates openLibrary={openModal} />
        <Landscape />
        <Resources openLibrary={openModal} />
        <Contact />
      </main>
      <Footer openInfo={openModal} />
      {modal && <Modal key={modal} type={modal} onClose={closeModal} />}
    </div>
  );
}
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
