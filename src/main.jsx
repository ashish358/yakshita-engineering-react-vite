import React, { useEffect, useMemo, useState } from "react";

import { createRoot } from "react-dom/client";
import { Analytics } from '@vercel/analytics/react';
import {

  ArrowRight, BadgeCheck, ChevronRight, Factory,

  Download, ExternalLink, FileText, Filter, Gauge, Globe2, HardHat, LogOut,

  Menu, MessageCircle, Package, Search, Settings2, ShieldCheck,

  ShoppingBag, X

} from "lucide-react";

import "./tailwind.css";
import "./styles.css";
import productsData from "./products.json";

const INDIA_MART_URL = "https://www.indiamart.com/yakshita-engineering-palghar/";

const WHATSAPP_NUMBER = "918087993179";

const STORAGE_KEY = "yakshita_products_v2";

const seedProducts = productsData;

// All categories copied from the Yakshita Engineering IndiaMART catalogue.
const allCategories = [
  "Dynamic Pass Box",
  "Clean Room Pass Box",
  "Drop Seal",
  "Hepa Filter Clamp",
  "Air Shower",
  "Air Showe Nozzle Movable",
  "Leveling Pad",
  "Pass Box",
  "Static Pass Box",
  "Stainless Steel Pass Box",
  "Weld Stud",
  "Spray Nozzles",
  "Air Nozzle",
  "Leveling Pads",
  "Glove port",
  "Dop Port Nozzle",
  "Leg Leveler",
  "Ss 304 Products",
  "Pass Box Hinges",
  "Wooden Door Glass Drop Seal",
  "Door Fittings",
  "New Items",
];

const categories = ["All", ...allCategories];

const normalizeCategory = value => (value || "").trim().toLowerCase();

// IndiaMART has a spelling variation in this category heading.
const categoryAliases = {
  "air showe nozzle movable": "air shower nozzle movable",
};

function getProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seedProducts;
  } catch {
    return seedProducts;
  }
}

function saveProducts(products) {

  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

}

function waLink(product) {

  const text = `Hello Yakshita Engineering, I am interested in ${product.name}. Please share the current price, minimum order quantity, availability and delivery details for this item.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

}

function ProductImage({product, large=false}) {

  const [failed, setFailed] = useState(false);

  return failed ? (

    <div className={`product-fallback ${large ? "large" : ""}`}>

      <Package size={large ? 48 : 34} />

      <span>{product.name}</span>

    </div>

  ) : (

    <img src={product.image} alt={product.name} onError={() => setFailed(true)} />

  );

}

function BuyOptions({product, onClose}) {

  return <div className="modal-backdrop" onClick={onClose}>

    <div className="buy-modal" onClick={e=>e.stopPropagation()}>

      <button className="modal-close" onClick={onClose}><X size={19}/></button>

      <div className="mini-icon"><ShoppingBag size={22}/></div>

      <p className="eyebrow">REQUEST PRODUCT</p>

      <h3>{product.name}</h3>

      <p className="muted">Choose how you want to continue. There is no online payment on this website.</p>

      <a className="action primary wide" href={waLink(product)} target="_blank" rel="noreferrer">

        <MessageCircle size={18}/> Enquire on WhatsApp

      </a>

      <a className="action secondary wide" href={product.indiaMartUrl || INDIA_MART_URL} target="_blank" rel="noreferrer">

        <Globe2 size={18}/> Open IndiaMART Profile

      </a>

      <p className="tiny">Your enquiry is sent directly to the supplier. Prices and availability are confirmed by the supplier.</p>

    </div>

  </div>

}

function Header({ onMenu, menuOpen, onNavigate }) {
  const navItems = [
    ["Products", "#products"],
    ["About", "#about"],
    ["Capabilities", "#capabilities"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="site-header relative z-50">
      <div className="container nav">
        <a href="#top" className="brand" onClick={onNavigate}>
          <div className="brand-mark">
            <img src="/logo.png" alt="Yakshita Engineering" />
          </div>
          <div>
            <strong>YAKSHITA</strong>
            <span>ENGINEERING</span>
          </div>
        </a>

        <nav className="desktop-nav">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="nav-actions">
          <a
            className="header-whatsapp"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>

          <button
            type="button"
            className="mobile-menu !inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100 md:!hidden"
            onClick={onMenu}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full z-50 border-t border-slate-200 bg-white px-5 py-4 shadow-xl md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={onNavigate}
                className="flex min-h-12 items-center justify-between rounded-lg px-4 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-100 hover:text-blue-700"
              >
                {label}
                <ChevronRight size={18} className="text-slate-400" />
              </a>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              onClick={onNavigate}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              <MessageCircle size={18} /> WhatsApp Enquiry
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero({onBrowse}) {

  return <section className="hero" id="top">

    <div className="hero-grid container">

      <div className="hero-copy">

        <div className="pill"><BadgeCheck size={15}/> Manufacturer • Supplier • Wholesaler</div>

        <h1>Precision hardware for <em>controlled environments.</em></h1>

        <p>Explore stainless-steel cleanroom hardware, door components, nozzles, pass box fittings and industrial accessories from Yakshita Engineering.</p>

        <div className="hero-actions">

          <button className="action primary" onClick={onBrowse}>Explore Products <ArrowRight size={17}/></button>

          <a className="action ghost" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Talk to Supplier</a>

        </div>

        <div className="hero-proof"><span><ShieldCheck size={17}/> SS 304 options</span><span><Factory size={17}/> Custom requirements</span><span><FileText size={17}/> Direct enquiry</span></div>

      </div>

      <div className="hero-visual">

        <div className="blue-orb"></div>

        <div className="product-showcase">

          <div className="showcase-top">FEATURED COMPONENT</div>

          {/* <div className="showcase-image"><ProductImage product={seedProducts[0]} large/></div> */}
          <div className="showcase-image">
  <img
    src="/products/hero.png"
    alt="Stainless Steel Screw"
    className="showcase-screw"
  />
</div>

          <div className="showcase-caption"><span>PRECISION • QUALITY • RELIABILITY</span><strong>Engineering Excellence</strong><small> Reliable components for cleaner, smarter industrial environments.</small></div>

        </div>

        <div className="floating-card"><Gauge size={19}/><div><b>Quality you can depend on.</b><span>Built for industry</span></div></div>

      </div>

    </div>

  </section>

}

function ProductCard({product, onBuy, onView}) {

  const handleCardKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onView(product);
    }
  };

  return (
    <article
      className="product-card"
      onClick={() => onView(product)}
      onKeyDown={handleCardKeyDown}
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      title="Click to view product details"
    >
      <div className="product-img">
        <ProductImage product={product}/>
        <span className="material-tag">{product.material}</span>
      </div>

      <div className="product-body">
        <p className="category-label">{product.sourceCategory || product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        {product.price && (
          <div className="product-card-price">
            <strong>{product.price}</strong>
            <span>MOQ: {product.minOrder || "As per requirement"}</span>
          </div>
        )}

        <div className="card-bottom">
          <button
            type="button"
            className="text-link"
            onClick={(event) => {
              event.stopPropagation();
              onView(product);
            }}
          >
            View details <ChevronRight size={15}/>
          </button>

          <button
            type="button"
            className="buy-btn"
            onClick={(event) => {
              event.stopPropagation();
              onBuy(product);
            }}
          >
            Enquire <ArrowRight size={15}/>
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductGallery({ product }) {
  const galleryImages = useMemo(() => {
    const images = Array.isArray(product.images) ? product.images : [];
    return [...new Set([product.image, ...images].filter(Boolean))];
  }, [product]);

  const [activeImage, setActiveImage] = useState(galleryImages[0] || "");
  const [failedImages, setFailedImages] = useState([]);

  useEffect(() => {
    setActiveImage(galleryImages[0] || "");
    setFailedImages([]);
  }, [product.id, galleryImages]);

  const visibleImages = galleryImages.filter(src => !failedImages.includes(src));
  const currentImage = visibleImages.includes(activeImage) ? activeImage : visibleImages[0];

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[76px_minmax(0,1fr)]">
        <div className="order-2 flex gap-2 overflow-x-auto pb-1 sm:order-1 sm:max-h-[520px] sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden sm:pb-0">
          {visibleImages.map((src, index) => (
            <button
              type="button"
              key={src}
              onClick={() => setActiveImage(src)}
              aria-label={`View product image ${index + 1}`}
              className={`h-[68px] w-[68px] shrink-0 rounded-xl border bg-white p-1.5 transition ${
                currentImage === src
                  ? "border-amber-600 ring-2 ring-amber-100"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <img src={src} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-contain" />
            </button>
          ))}
        </div>

        <div className="order-1 flex min-h-[280px] items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white sm:order-2 sm:min-h-[480px]">
          {currentImage ? (
            <img
              src={currentImage}
              alt={product.name}
              onError={() => setFailedImages(previous => [...previous, currentImage])}
              className="max-h-[480px] w-full object-contain p-5 sm:p-8"
            />
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 px-6 text-center text-slate-400 sm:min-h-[480px]">
              <Package size={54} strokeWidth={1.3} />
              <span className="max-w-xs text-sm font-medium text-slate-600">{product.name}</span>
              <small className="text-xs">Product image unavailable</small>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 px-1 text-xs text-slate-500">
        <span className="truncate font-medium text-slate-700">{product.name}</span>
        <span className="shrink-0">{visibleImages.length} {visibleImages.length === 1 ? "image" : "images"}</span>
      </div>
    </section>
  );
}

function ProductDetail({ product, onClose, onBuy }) {
  if (!product) return null;

  const specs = product.specifications && typeof product.specifications === "object"
    ? Object.entries(product.specifications)
    : [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/70 p-2 backdrop-blur-sm sm:p-5"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative my-2 w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:my-4 sm:rounded-3xl"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} product details`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-slate-950 sm:right-5 sm:top-5"
        >
          <X size={19} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="bg-slate-100/80 p-4 sm:p-7 lg:p-8">
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
              Product gallery
            </div>
            <ProductGallery product={product} />
            <div className="mt-4 hidden items-center gap-2 text-xs leading-5 text-slate-500 sm:flex">
              <ShieldCheck size={16} className="shrink-0 text-emerald-700" />
              Images are shown for product reference. Confirm the final specification with the supplier.
            </div>
          </div>

          <div className="px-5 pb-7 pt-16 sm:px-8 sm:pb-9 sm:pt-16 lg:px-10 lg:py-10">
            <div className="mb-3 inline-flex max-w-full items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-amber-800">
              <span className="truncate">{product.category || "Yakshita Engineering"}</span>
            </div>

            <h2 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-[2.15rem]">
              {product.name}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {product.description || "Contact Yakshita Engineering for product details and specifications."}
            </p>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Price</span>
                <p className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">
                  {product.price || "Request a quote"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Minimum order</span>
                <p className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">
                  {product.minOrder || "As per requirement"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-y border-slate-200 py-4 text-sm">
              <span className="text-slate-500">Material</span>
              <span className="text-right font-semibold text-slate-900">{product.material || "Contact supplier"}</span>
            </div>

            {specs.length > 0 && (
              <section className="mt-7">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-950">Technical specifications</h3>
                  <span className="text-xs text-slate-400">{specs.length} details</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full border-collapse text-sm">
                    <tbody>
                      {specs.map(([key, value], index) => (
                        <tr key={key} className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                          <td className="w-[44%] px-3 py-3 text-slate-500 sm:px-4">{key}</td>
                          <td className="px-3 py-3 font-semibold text-slate-800 sm:px-4">{String(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {product.brochure && (
              <a
                href={product.brochure}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-slate-50"
              >
                <FileText size={17} /> View product brochure
              </a>
            )}

            <div className="mt-7 rounded-xl bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck size={19} className="mt-0.5 shrink-0 text-emerald-700" />
                <p className="text-xs leading-5 text-slate-600">
                  Confirm current pricing, availability, customization and delivery details directly with Yakshita Engineering.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => { onClose(); onBuy(product); }}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            >
              <MessageCircle size={19} /> Enquire on WhatsApp
              <ArrowRight size={17} className="ml-auto" />
            </button>
            <p className="mt-3 text-center text-[11px] text-slate-400">
              No online payment · Direct supplier enquiry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


function Products({ products, onBuy, onView }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = useMemo(() => products.filter(p => {
    const productCategory = normalizeCategory(
      p.sourceCategory || p.category
    );

    const selectedCategory =
      categoryAliases[normalizeCategory(category)] ||
      normalizeCategory(category);

    const matchesCategory =
      category === "All" || productCategory === selectedCategory;

    const searchable = `
      ${p.name}
      ${p.material || ""}
      ${p.category || ""}
      ${p.sourceCategory || ""}
    `.toLowerCase();

    return matchesCategory && searchable.includes(query.toLowerCase());
  }), [products, query, category]);

  // Reset pagination whenever search or category changes
  useEffect(() => {
    setVisibleCount(8);
  }, [query, category]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section className="products-section" id="products">
      <div className="container">

        <div className="section-heading">
          <div>
            <p className="eyebrow">PRODUCT CATALOGUE</p>
            <h2>
              Industrial components, <em>one enquiry away.</em>
            </h2>
          </div>
          <p>
            Browse the catalogue and send a product-specific enquiry
            directly to the supplier.
          </p>
        </div>

        <div className="catalog-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products, material, category..."
            />
          </div>

          <div className="category-scroll">
            <Filter size={16} />
            {categories.map(c => (
              <button
                key={c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Product count */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Showing{" "}
            <strong className="text-slate-900">
              {visibleProducts.length}
            </strong>{" "}
            of{" "}
            <strong className="text-slate-900">
              {filtered.length}
            </strong>{" "}
            products
          </p>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {category}
          </span>
        </div>

        {/* Products grid */}
        <div className="product-grid">
          {visibleProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onBuy={onBuy}
              onView={onView}
            />
          ))}
        </div>

        {!filtered.length && (
          <div className="empty-state">
            <Package />
            <h3>No products found</h3>
            <p>Try another search or category.</p>
          </div>
        )}

        {/* Load more / Show less */}
        {filtered.length > 8 && (
          <div className="mt-10 flex flex-col items-center">
            <div className="mb-4 h-1.5 w-48 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-slate-800 transition-all duration-500"
                style={{
                  width: `${(visibleProducts.length / filtered.length) * 100}%`
                }}
              />
            </div>

            {hasMore ? (
              <button
                onClick={() => setVisibleCount(count => count + 8)}
                className="group inline-flex items-center gap-3 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700 hover:shadow-xl"
              >
                Load More Products
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            ) : (
              <button
                onClick={() => {
                  setVisibleCount(8);
                  document.getElementById("products")?.scrollIntoView({
                    behavior: "smooth"
                  });
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Show Less
                <ArrowRight size={16} className="-rotate-90" />
              </button>
            )}

            <p className="mt-3 text-xs text-slate-400">
              {visibleProducts.length} of {filtered.length} products displayed
            </p>
          </div>
        )}

      </div>
    </section>
  );
}


function About() {
  return (
    <section className="about-section" id="about">
      <div className="container">

        {/* ABOUT YAKSHITA */}
        <div className="about-grid">
          <div className="about-panel">
            <p className="eyebrow">ABOUT YAKSHITA</p>

            <h2>
              Engineering hardware with a
              <em> practical, specification-first</em> approach.
            </h2>

            <p>
              The supplied company material describes Yakshita Engineering
              as a manufacturer with additional wholesaler and trader
              activities. The brochure states an establishment year of
              2019 and highlights stainless-steel components for doors,
              pass boxes, cleanroom systems and industrial applications.
            </p>

            <div className="stats">
              <div><b>2019</b><span>Established</span></div>
              <div><b>7–8</b><span>Employees in brochure</span></div>
              <div><b>SS 304</b><span>Core material range</span></div>
            </div>
          </div>

          <div className="about-cards">
            <div>
              <div className="round-icon"><Factory /></div>
              <h3>Manufacturing</h3>
              <p>
                Product-focused manufacturing and supply for industrial
                and controlled-environment applications.
              </p>
            </div>

            <div>
              <div className="round-icon"><Settings2 /></div>
              <h3>Customization</h3>
              <p>
                Share your dimensions or application requirements and
                discuss the appropriate specification with the supplier.
              </p>
            </div>

            <div>
              <div className="round-icon"><HardHat /></div>
              <h3>Industrial use</h3>
              <p>
                Door seals, pass box hinges, handles, nozzles, clamps,
                pads and related components.
              </p>
            </div>

            <div>
              <div className="round-icon"><ShieldCheck /></div>
              <h3>Direct enquiry</h3>
              <p>
                No payment gateway. Enquiries go to WhatsApp or the
                supplier's IndiaMART profile.
              </p>
            </div>
          </div>
        </div>

        {/* CERTIFICATIONS & REGISTRATION */}
        <div className="certifications-wrapper">

          <div className="certifications-heading">
            <div className="section-eyebrow">
              <span></span>
              CERTIFICATIONS &amp; REGISTRATION
            </div>

            <h2>
              Verified company <em>credentials.</em>
            </h2>

            <p>
              A commitment to quality, consistency and trusted business
              practices, backed by official certifications and registrations.
            </p>
          </div>

          <div className="certifications-grid">

            {/* ISO CERTIFICATE */}
            <article className="certificate-card certificate-featured">
              <div className="certificate-card-top">
                <div className="certificate-icon">
                  <ShieldCheck size={21} />
                </div>

                <span className="certificate-label">
                  QUALITY CERTIFIED
                </span>
              </div>

              <a
                href="/products/QMS.png"
                target="_blank"
                rel="noreferrer"
                className="certificate-preview"
                aria-label="View ISO 9001:2015 certificate"
              >
                <img
                  src="/products/QMS.png"
                  alt="Yakshita Engineering ISO 9001:2015 Certificate"
                  loading="lazy"
                />

                <span className="certificate-preview-link">
                  <ExternalLink size={14} />
                  View full certificate
                </span>
              </a>

              <div className="certificate-content">
                <span className="certificate-type">
                  QUALITY MANAGEMENT
                </span>

                <h3>ISO 9001:2015 Certificate</h3>

                <p>
                  Quality Management System certification issued to
                  Yakshita Engineering.
                </p>

                <div className="certificate-actions">
                  <a
                    href="/products/QMS.png"
                    target="_blank"
                    rel="noreferrer"
                    className="certificate-view"
                  >
                    <ExternalLink size={15} />
                    View Certificate
                  </a>

                  <a
                    href="/certificates/iso-9001-certificate.png"
                    download
                    className="certificate-download"
                  >
                    <Download size={15} />
                    Download
                  </a>
                </div>
              </div>
            </article>

            {/* MSME CERTIFICATE */}
            <article className="certificate-card certificate-msme">
              <div className="certificate-msme-visual">
                <div className="msme-document">
                  <div className="msme-document-top">
                    <Factory size={15} />
                    <span>GOVERNMENT OF INDIA</span>
                  </div>

                  <div className="msme-document-seal">
                    <BadgeCheck size={22} />
                  </div>

                  <strong>UDYAM</strong>
                  <span>REGISTRATION CERTIFICATE</span>

                  <div className="msme-document-line"></div>

                  <small>
                    MICRO, SMALL &amp; MEDIUM ENTERPRISES
                  </small>
                </div>

                <span className="msme-format">
                  <FileText size={14} />
                  PDF DOCUMENT
                </span>
              </div>

              <div className="certificate-content">
                <div className="certificate-card-top">
                  <span className="certificate-label">
                    MSME REGISTERED
                  </span>
                </div>

                <span className="certificate-type">
                  GOVERNMENT REGISTRATION
                </span>

                <h3>Udyam / MSME Registration</h3>

                <p>
                  Registration certificate for Yakshita Engineering.
                </p>

                <div className="registration-number">
                  <span>REGISTRATION NUMBER</span>
                  <strong>UDYAM-MH-17-0054976</strong>
                </div>

                <div className="certificate-actions">
                  <a
                    href="/products/udyam-registration-certificate.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="certificate-view"
                  >
                    <ExternalLink size={15} />
                    View PDF
                  </a>

                  <a
                    href="/products/udyam-registration-certificate.pdf"
                    download="Yakshita-Udyam-Registration.pdf"
                    className="certificate-download"
                  >
                    <Download size={15} />
                    Download
                  </a>
                </div>
              </div>
            </article>

          </div>

          <div className="certifications-footer">
            <span>
              <BadgeCheck size={16} />
              DOCUMENTED CREDENTIALS
            </span>

            <p>Quality you can trust. Standards we stand by.</p>
          </div>
        </div>

        {/* COMPLETE PRODUCT CATALOGUE */}
        <div className="mt-16 border-t border-slate-200 pt-12 sm:mt-20 sm:pt-14">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div className="max-w-2xl">
              <p className="eyebrow">COMPLETE PRODUCT RANGE</p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Explore our product <em>catalogue.</em>
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Browse the complete Yakshita Engineering brochure,
                featuring our range of cleanroom, stainless-steel,
                door hardware and industrial components.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href="/products/product-catalogue.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700"
              >
                <ExternalLink size={17} />
                View Catalogue
              </a>

              <a
                href="/products/product-catalogue.pdf"
                download="Yakshita-Engineering-Product-Catalogue.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:bg-slate-50"
              >
                <Download size={17} />
                Download PDF
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}


function Capabilities() {

  return <section className="capabilities" id="capabilities">

    <div className="container">

      <div className="section-heading light"><div><p className="eyebrow">WHY THIS STORE</p><h2>A focused B2B buying journey.</h2></div><p>The website intentionally skips online payment and moves serious purchase intent to a supplier conversation.</p></div>

      <div className="cap-grid">

        <div><span>01</span><h3>Find the component</h3><p>Search by product, category or material and inspect the available catalogue.</p></div>

        <div><span>02</span><h3>Choose your route</h3><p>Use WhatsApp for a direct enquiry or continue to the IndiaMART company profile.</p></div>

        <div><span>03</span><h3>Confirm specifications</h3><p>Supplier confirms pricing, MOQ, stock, customization and delivery before the order.</p></div>

      </div>

    </div>

  </section>

}

function Contact() {

  return <section className="contact" id="contact">

    <div className="container contact-card">

      <div><p className="eyebrow">READY TO ENQUIRE?</p><h2>Tell us what you need.</h2><p>Send the product enquiry through WhatsApp or visit the Yakshita Engineering IndiaMART profile.</p></div>

      <div className="contact-actions"><a className="action primary" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp +91 74478 21692</a><a className="action secondary" href={INDIA_MART_URL} target="_blank" rel="noreferrer"><Globe2/> IndiaMART Profile</a></div>

    </div>

  </section>

}




function Testimonials() {
  const reviews = [
    {
      name: "Vinay",
      location: "Sirsi, Karnataka",
      date: "08 May 2026",
      product: "Drop Down Door Seal",
      rating: 5,
      review:
        "The product quality is excellent. The finish and performance met our expectations, and the overall experience was smooth.",
    },
    {
      name: "Debasish Chatterjee",
      location: "Kolkata, West Bengal",
      date: "18 February 2026",
      product: "Box Hinges",
      rating: 4,
      review:
        "Good product quality and reliable service. The product was as expected and suitable for our requirements.",
    },
  ];

  const StarRating = ({ rating = 5 }) => (
    <div className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= rating ? "filled" : ""}>
          ★
        </span>
      ))}
    </div>
  );

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="section-heading testimonial-heading">
          <div>
            <p className="eyebrow">CUSTOMER EXPERIENCES</p>
            <h2>
              Built on quality.
              <br />
              <em>Backed by trust.</em>
            </h2>
          </div>

          <p>
            We believe lasting business relationships begin with quality
            products, dependable service and customer satisfaction.
          </p>
        </div>

        <div className="testimonial-layout">
          {/* Featured review */}
          <article className="testimonial-featured">
            <div className="testimonial-card-top">
              <span className="testimonial-label">CUSTOMER FEEDBACK</span>
              <StarRating rating={reviews[0].rating} />
            </div>

            <span className="testimonial-quote-mark">“</span>

            <blockquote>{reviews[0].review}</blockquote>

            <div className="testimonial-product">
              <span>PRODUCT</span>
              <strong>{reviews[0].product}</strong>
            </div>

            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {reviews[0].name.charAt(0)}
              </div>
              <div>
                <strong>{reviews[0].name}</strong>
                <span>{reviews[0].location}</span>
              </div>
              <time>{reviews[0].date}</time>
            </div>
          </article>

          {/* Right side */}
          <div className="testimonial-side">
            <article className="testimonial-rating-card">
              <p className="eyebrow">OUR CUSTOMER RATING</p>

              <div className="rating-main">
                <strong>4.6</strong>
                <div>
                  <StarRating rating={5} />
                  <span>Based on 9 buyer ratings</span>
                </div>
              </div>

              <div className="rating-bars">
                {[
                  { stars: 5, percentage: 67 },
                  { stars: 4, percentage: 22 },
                  { stars: 3, percentage: 11 },
                  { stars: 2, percentage: 0 },
                  { stars: 1, percentage: 0 },
                ].map((item) => (
                  <div className="rating-row" key={item.stars}>
                    <span>{item.stars} ★</span>
                    <div className="rating-track">
                      <div style={{ width: `${item.percentage}%` }} />
                    </div>
                    <small>{item.percentage}%</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="testimonial-secondary">
              <div className="testimonial-card-top">
                <StarRating rating={reviews[1].rating} />
                <time>{reviews[1].date}</time>
              </div>

              <blockquote>{reviews[1].review}</blockquote>

              <div className="testimonial-secondary-author">
                <div className="testimonial-avatar">
                  {reviews[1].name.charAt(0)}
                </div>
                <div>
                  <strong>{reviews[1].name}</strong>
                  <span>{reviews[1].location}</span>
                </div>
              </div>

              <div className="testimonial-product">
                <span>PRODUCT</span>
                <strong>{reviews[1].product}</strong>
              </div>
            </article>
          </div>
        </div>

        <div className="testimonial-bottom">
          <span>QUALITY IN EVERY DETAIL. TRUST IN EVERY RELATIONSHIP.</span>
          <a href="#contact">
            Have a requirement? <span>Let's talk →</span>
          </a>
        </div>
      </div>
    </section>
  );
}




// function Footer() {

//   return (

//     <footer>

//       <div className="container footer-grid">

//         <div>

//           <a href="#top" className="brand">

//             <div className="brand-mark">

//               <img

//                 src="/logo.png"

//                 alt="Yakshita Engineering"

//               />

//             </div>

//             <div>

//               <strong>YAKSHITA</strong>

//               <span>ENGINEERING</span>

//             </div>

//           </a>

//           <p>

//             Industrial components and stainless-steel hardware

//             for cleanroom and engineering applications.

//           </p>

//         </div>

//         <div>

//           <h4>Quick links</h4>

//           <a href="#products">Products</a>

//           <a href="#about">About</a>

//           <a href="#contact">Contact</a>

//         </div>

//         <div>

//           <h4>Supplier</h4>

//           <a

//             href={`https://wa.me/${WHATSAPP_NUMBER}`}

//             target="_blank"

//             rel="noreferrer"

//           >

//             WhatsApp

//           </a>

//           <a

//             href={INDIA_MART_URL}

//             target="_blank"

//             rel="noreferrer"

//           >

//             IndiaMART

//           </a>

//         </div>

//       </div>

//       <div className="container copyright">

//         © {new Date().getFullYear()} Yakshita Engineering.

//         Catalogue enquiry website — no online payment.

//       </div>

//     </footer>

//   );

// }


function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="container footer-contact-grid">
        <section className="footer-contact-info">
          <h2>Contact Info</h2>

          <div className="footer-contact-item">
            <Factory size={32} />
            <div>
              <h3>Address</h3>
              <p>
                Gala No. 20, Rajvishnu Industrial Estate,
                Opp. Visava Hotel, Chinchpada, Agarwal Naka,
                Vasai East, Vasai-Virar, Palghar,
                Maharashtra - 401202
              </p>
            </div>
          </div>

          <div className="footer-contact-item">
            <MessageCircle size={30} />
            <div>
              <h3>Mobile No</h3>
              <a href="tel:+918087993179">
                +91 80879 93179
              </a>
              
            </div>
          </div>

          <div className="footer-contact-item">
            <MessageCircle size={30} />
            <div>
              <h3>WhatsApp Enquiry</h3>
              <a
                href="https://wa.me/918087993179"
                target="_blank"
                rel="noreferrer"
              >
                Chat with us
              </a>
            </div>
          </div>

          <div className="footer-contact-item">
            <Globe2 size={30} />
            <div>
              <h3>Web-Site</h3>
              <a
                href="https://www.yakshitaengineering.co.in/"
                target="_blank"
                rel="noreferrer"
              >
                www.yakshitaengineering.co.in
              </a>
            </div>
          </div>

          <div className="footer-contact-item">
            <ShieldCheck size={30} />
            <div>
              <h3>GST Number</h3>
              <p>27APAPB1785Q1ZK</p>
            </div>
          </div>
        </section>

        <section className="footer-map-section">
          <h2>Location Map</h2>

          <div className="footer-map">
            <iframe
              title="Yakshita Engineering Location"
              // src="https://www.google.com/maps?q=Rajvishnu%20Industrial%20Estate%2C%20Opposite%20Visava%20Hotel%2C%20Chinchpada%2C%20Vasai%20East%2C%20Palghar%2C%20Maharashtra&output=embed"
              src="https://www.google.com/maps?q=19.4070563,72.8566975&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <a
            className="footer-map-link"
            href="https://www.google.com/maps/search/?api=1&query=Rajvishnu+Industrial+Estate+Vasai+East+Palghar+Maharashtra"
            target="_blank"
            rel="noreferrer"
          >
            Get Directions <ArrowRight size={16} />
          </a>
        </section>
      </div>

      
<div className="container footer-bottom">
  <a href="#top" className="brand">
    <div className="brand-mark">
      <img src="/logo.png" alt="Yakshita Engineering" />
    </div>
    <div>
      <strong>YAKSHITA</strong>
      <span>ENGINEERING</span>
    </div>
  </a>

  <p>
    © {new Date().getFullYear()} Yakshita Engineering.
    All rights reserved.
  </p>

  <div className="footer-quick-links">
    <a href="#products">Products</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </div>
</div>

<div className="container footer-credit">
  <p>
    <div>Designed & Developed by <strong>Ashish Dhadekar</strong></div>
    
    <div> <span className="footer-developer-contact"> <MessageCircle size={15} />
      <a href="tel:+918485051501">+91 84850 51501</a>
    </span>
    </div>
  </p>
</div>
      

    </footer>
  );
}

function App() {

  const [products,setProducts]=useState(getProducts);

  const [buy,setBuy]=useState(null);

  const [detail,setDetail]=useState(null);

  const [menu,setMenu]=useState(false);

  useEffect(()=>saveProducts(products),[products]);

  const scrollProducts=()=>document.getElementById("products")?.scrollIntoView({behavior:"smooth"});

  return <>

    <Header menuOpen={menu} onMenu={() => setMenu(open => !open)} onNavigate={() => setMenu(false)} />

    {/* <main><Hero onBrowse={scrollProducts}/><Products products={products} onBuy={setBuy} onView={setDetail}/><About/><Capabilities/><Contact/></main> */}
    <main>
  <Hero onBrowse={scrollProducts}/>
  <Products products={products} onBuy={setBuy} onView={setDetail}/>
  <About/>
  <Capabilities/>
  <Contact/>
  <Testimonials/>
   <Analytics />
</main>

    <Footer/>

    {buy&&<BuyOptions product={buy} onClose={()=>setBuy(null)}/>}

    {detail&&<ProductDetail product={detail} onClose={()=>setDetail(null)} onBuy={setBuy}/>}

  </>

}

createRoot(document.getElementById("root")).render(<App />);
