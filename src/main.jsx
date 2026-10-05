import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, BadgeCheck, ChevronRight, CircleUserRound, Edit3, Factory,
  FileText, Filter, Gauge, Globe2, HardHat, LayoutDashboard, LogOut,
  Menu, MessageCircle, Package, Pencil, Plus, Search, Settings2, ShieldCheck,
  ShoppingBag, Trash2, X
} from "lucide-react";
import "./styles.css";

const INDIA_MART_URL = "https://www.indiamart.com/yakshita-engineering/profile.html";
const WHATSAPP_NUMBER = "918087993179";
const STORAGE_KEY = "yakshita_products_v1";
const ADMIN_KEY = "yakshita_admin_v1";

const seedProducts = [
  { id:"p1", name:"SS 304 Big Air Shower Nozzle", category:"Air & Cleanroom", material:"SS 304", description:"Movable stainless-steel air shower nozzle for controlled air-flow applications.", image:"/products/air-shower-big.svg", featured:true },
  { id:"p2", name:"DOP Port Nozzle SS 304", category:"Nozzles", material:"SS 304", description:"Compact SS 304 DOP port nozzle designed for cleanroom and process installations.", image:"/products/dop-nozzle.svg", featured:true },
  { id:"p3", name:"Single Door Drop Down Seal YE 01", category:"Door Hardware", material:"Stainless Steel", description:"Drop-down sealing profile for single-door applications.", image:"/products/drop-seal-single.svg", featured:true },
  { id:"p4", name:"Double Door Drop Down Seal YE 02", category:"Door Hardware", material:"Stainless Steel", description:"Heavy-duty drop-down sealing profile for double-door installations.", image:"/products/drop-seal-double.svg", featured:false },
  { id:"p5", name:"HEPA Filter Clamp SS 304", category:"Cleanroom Hardware", material:"SS 304", description:"Stainless-steel clamp for secure HEPA filter installation.", image:"/products/hepa-clamp.svg", featured:true },
  { id:"p6", name:'Pipe Handler 1x10" & 1x12" Long', category:"Hardware", material:"Stainless Steel", description:"Durable stainless pipe handling component for industrial applications.", image:"/products/pipe-handler.jpg", featured:false },
  { id:"p7", name:"SS 304 Rod Handle", category:"Door Hardware", material:"SS 304", description:"U-shaped stainless rod handle for industrial doors and enclosures.", image:"/products/rod-handle.svg", featured:true },
  { id:"p8", name:"Pass Box Hinge SS 304 25x12x50 mm", category:"Pass Box Hardware", material:"SS 304", description:"Compact pass box hinge for controlled-environment equipment.", image:"/products/hinge-25.svg", featured:false },
  { id:"p9", name:"Pass Box Hinge SS 304 30x12x50 mm", category:"Pass Box Hardware", material:"SS 304", description:"Stainless-steel pass box hinge with a 30x12x50 mm specification.", image:"/products/hinge-30.svg", featured:false },
  { id:"p10", name:"Pass Box Hinge SS 304 Left-Right 30x10x50 mm", category:"Pass Box Hardware", material:"SS 304", description:"Left-right pass box hinge for precision enclosure assemblies.", image:"/products/hinge-left-right.svg", featured:false },
  { id:"p11", name:"Pass Box Hinge Bolt With Stud SS 304 40x12x50 mm", category:"Pass Box Hardware", material:"SS 304", description:"Bolt-and-stud pass box hinge assembly for industrial installations.", image:"/products/hinge-bolt-stud.svg", featured:false },
  { id:"p12", name:"Pass Box Hinge SS 304 19x19x65 mm", category:"Pass Box Hardware", material:"SS 304", description:"Compact 19x19x65 mm stainless pass box hinge.", image:"/products/hinge-19.svg", featured:false },
  { id:"p13", name:"Levelling Pad SS 304", category:"Industrial Hardware", material:"SS 304", description:"Adjustable stainless levelling pad for equipment and cleanroom installations.", image:"/products/levelling-pad.svg", featured:true },
  { id:"p14", name:"SS 304 Welded Bush", category:"Fittings", material:"SS 304", description:"Weldable stainless-steel bush for fabrication and piping assemblies.", image:"/products/welded-bush.svg", featured:false },
  { id:"p15", name:"Atmosphere Nozzle", category:"Nozzles", material:"Stainless Steel", description:"Precision nozzle component for controlled-atmosphere applications.", image:"/products/atmosphere-nozzle.svg", featured:false },
  { id:"p16", name:"SS 304 Welded Stud", category:"Fittings", material:"SS 304", description:"Stainless welded stud for fabrication and equipment assemblies.", image:"/products/welded-stud.svg", featured:false },
  { id:"p17", name:"SS 304 Gas Cock Nozzle Movable", category:"Valves & Controls", material:"SS 304", description:"Movable gas cock nozzle assembly for industrial control applications.", image:"/products/gas-cock.svg", featured:false },
  { id:"p18", name:"SS 304 Small Air Shower Nozzle Movable", category:"Air & Cleanroom", material:"SS 304", description:"Movable compact air shower nozzle for cleanroom systems.", image:"/products/air-shower-small.svg", featured:true },
  { id:"p19", name:"Door Pressure", category:"Door Hardware", material:"Industrial", description:"Door pressure component for controlled sealing and closure.", image:"/products/door-pressure.svg", featured:false },
  { id:"p20", name:"Magnet 30x6 mm", category:"Door Hardware", material:"Magnetic", description:"30x6 mm magnetic component for door and enclosure hardware.", image:"/products/magnet.svg", featured:false },
  { id:"p21", name:"Silicon Foam Gasket", category:"Sealing", material:"Silicone Foam", description:"Flexible silicone foam sealing strip for industrial enclosure applications.", image:"/products/silicon-gasket.svg", featured:true },
  { id:"p22", name:"CAT 1 Single Drop Down Door Seal YE03", category:"Door Hardware", material:"Industrial", description:"CAT 1 single drop-down door sealing profile for industrial doors.", image:"/products/cat1-seal.svg", featured:false },
  { id:"p23", name:"Air Atomizing Spray Nozzle", category:"Nozzles", material:"Stainless Steel", description:"Atomizing spray nozzle for controlled industrial spray applications.", image:"/products/atomizing-nozzle.svg", featured:false },
  { id:"p24", name:"CAD 3 Drop Down Door Seal", category:"Door Hardware", material:"Industrial", description:"Drop-down door seal profile for industrial door assemblies.", image:"/products/cad3-seal.svg", featured:false },
  { id:"p25", name:"Glows Port", category:"Cleanroom Hardware", material:"Industrial", description:"Port component for cleanroom and process equipment assemblies.", image:"/products/glows-port.svg", featured:false }
];

const categories = ["All", ...Array.from(new Set(seedProducts.map(p => p.category)))];

function getProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : seedProducts;
  } catch { return seedProducts; }
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
      <a className="action secondary wide" href={INDIA_MART_URL} target="_blank" rel="noreferrer">
        <Globe2 size={18}/> Open IndiaMART Profile
      </a>
      <p className="tiny">Your enquiry is sent directly to the supplier. Prices and availability are confirmed by the supplier.</p>
    </div>
  </div>
}

// function Header({isAdmin, onAdmin, onMenu}) {
//   return <header className="site-header">
//     <div className="container nav">
//       <a href="#top" className="brand">
//         <div className="brand-mark">YE</div>
//         <div><strong>YAKSHITA</strong><span>ENGINEERING</span></div>
//       </a>
//       <nav className="desktop-nav">
//         <a href="#products">Products</a><a href="#about">About</a><a href="#capabilities">Capabilities</a><a href="#contact">Contact</a>
//         {isAdmin && <a href="#admin">Admin</a>}
//       </nav>
//       <div className="nav-actions">
//         <a className="header-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>
//         <button className="icon-btn mobile-menu" onClick={onMenu}><Menu/></button>
//         <button className="admin-trigger" onClick={onAdmin}><CircleUserRound size={17}/>{isAdmin ? "Admin" : "Admin Login"}</button>
//       </div>
//     </div>
//   </header>
// }

function Header({isAdmin, onAdmin, onMenu}) {
  return (
    <header className="site-header">
      <div className="container nav">
        <a href="#top" className="brand">
          <div className="brand-mark">
            <img
              src="/logo.webp"
              alt="Yakshita Engineering"
            />
          </div>

          <div>
            <strong>YAKSHITA</strong>
            <span>ENGINEERING</span>
          </div>
        </a>

        <nav className="desktop-nav">
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#contact">Contact</a>
          {isAdmin && <a href="#admin">Admin</a>}
        </nav>

        <div className="nav-actions">
          <a
            className="header-whatsapp"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16}/> WhatsApp
          </a>

          <button
            className="icon-btn mobile-menu"
            onClick={onMenu}
          >
            <Menu/>
          </button>

          <button
            className="admin-trigger"
            onClick={onAdmin}
          >
            <CircleUserRound size={17}/>
            {isAdmin ? "Admin" : "Admin Login"}
          </button>
        </div>
      </div>
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
          <div className="showcase-image"><ProductImage product={seedProducts[0]} large/></div>
          <div className="showcase-caption"><span>SS 304</span><strong>Big Air Shower Nozzle</strong><small>Movable • Industrial cleanroom use</small></div>
        </div>
        <div className="floating-card"><Gauge size={19}/><div><b>Built for industry</b><span>Specification-led enquiries</span></div></div>
      </div>
    </div>
  </section>
}

function ProductCard({product, onBuy, onView}) {
  return <article className="product-card">
    <div className="product-img"><ProductImage product={product}/><span className="material-tag">{product.material}</span></div>
    <div className="product-body">
      <p className="category-label">{product.category}</p>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="card-bottom">
        <button className="text-link" onClick={()=>onView(product)}>View details <ChevronRight size={15}/></button>
        <button className="buy-btn" onClick={()=>onBuy(product)}>Enquire <ArrowRight size={15}/></button>
      </div>
    </div>
  </article>
}

function ProductDetail({product,onClose,onBuy}) {
  return <div className="modal-backdrop" onClick={onClose}>
    <div className="detail-modal" onClick={e=>e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}><X size={19}/></button>
      <div className="detail-image"><ProductImage product={product} large/></div>
      <div className="detail-copy">
        <p className="eyebrow">{product.category}</p>
        <h2>{product.name}</h2>
        <div className="spec-row"><span>Material</span><b>{product.material}</b></div>
        <p>{product.description}</p>
        <div className="detail-note"><ShieldCheck size={18}/><span>Quote, MOQ and delivery are confirmed directly with Yakshita Engineering.</span></div>
        <button className="action primary wide" onClick={()=>{onClose();onBuy(product)}}><MessageCircle size={18}/> Request this product</button>
      </div>
    </div>
  </div>
}

function Products({products,onBuy,onView}) {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All");
  const filtered = useMemo(()=>products.filter(p => (category==="All" || p.category===category) && `${p.name} ${p.material} ${p.category}`.toLowerCase().includes(query.toLowerCase())),[products,query,category]);
  return <section className="products-section" id="products">
    <div className="container">
      <div className="section-heading">
        <div><p className="eyebrow">PRODUCT CATALOGUE</p><h2>Industrial components, <em>one enquiry away.</em></h2></div>
        <p>Browse the catalogue and send a product-specific enquiry directly to the supplier.</p>
      </div>
      <div className="catalog-toolbar">
        <div className="search-box"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products, material, category..." /></div>
        <div className="category-scroll"><Filter size={16}/>{categories.map(c=><button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div>
      </div>
      <div className="product-grid">
        {filtered.map(p=><ProductCard key={p.id} product={p} onBuy={onBuy} onView={onView}/>)}
      </div>
      {!filtered.length && <div className="empty-state"><Package/><h3>No products found</h3><p>Try another search or category.</p></div>}
    </div>
  </section>
}

function About() {
  return <section className="about-section" id="about">
    <div className="container about-grid">
      <div className="about-panel">
        <p className="eyebrow">ABOUT YAKSHITA</p>
        <h2>Engineering hardware with a <em>practical, specification-first</em> approach.</h2>
        <p>The supplied company material describes Yakshita Engineering as a manufacturer with additional wholesaler and trader activities. The brochure states an establishment year of 2019 and highlights stainless-steel components for doors, pass boxes, cleanroom systems and industrial applications.</p>
        <div className="stats"><div><b>2019</b><span>Established</span></div><div><b>7–8</b><span>Employees in brochure</span></div><div><b>SS 304</b><span>Core material range</span></div></div>
      </div>
      <div className="about-cards">
        <div><div className="round-icon"><Factory/></div><h3>Manufacturing</h3><p>Product-focused manufacturing and supply for industrial and controlled-environment applications.</p></div>
        <div><div className="round-icon"><Settings2/></div><h3>Customization</h3><p>Share your dimensions or application requirements and discuss the appropriate specification with the supplier.</p></div>
        <div><div className="round-icon"><HardHat/></div><h3>Industrial use</h3><p>Door seals, pass box hinges, handles, nozzles, clamps, pads and related components.</p></div>
        <div><div className="round-icon"><ShieldCheck/></div><h3>Direct enquiry</h3><p>No payment gateway. Enquiries go to WhatsApp or the supplier's IndiaMART profile.</p></div>
      </div>
    </div>
  </section>
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
      <div className="contact-actions"><a className="action primary" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp +91 80879 93179</a><a className="action secondary" href={INDIA_MART_URL} target="_blank" rel="noreferrer"><Globe2/> IndiaMART Profile</a></div>
    </div>
  </section>
}

// function Footer() {
//   return <footer><div className="container footer-grid"><div><a href="#top" className="brand"><div className="brand-mark">YE</div><div><strong>YAKSHITA</strong><span>ENGINEERING</span></div></a><p>Industrial components and stainless-steel hardware for cleanroom and engineering applications.</p></div><div><h4>Quick links</h4><a href="#products">Products</a><a href="#about">About</a><a href="#contact">Contact</a></div><div><h4>Supplier</h4><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a><a href={INDIA_MART_URL} target="_blank" rel="noreferrer">IndiaMART</a></div></div><div className="container copyright">© {new Date().getFullYear()} Yakshita Engineering. Catalogue enquiry website — no online payment.</div></footer>
// }

function Footer() {
  return (
    <footer>
      <div className="container footer-grid">

        <div>
          <a href="#top" className="brand">
            <div className="brand-mark">
              <img
                src="/logo.webp"
                alt="Yakshita Engineering"
              />
            </div>

            <div>
              <strong>YAKSHITA</strong>
              <span>ENGINEERING</span>
            </div>
          </a>

          <p>
            Industrial components and stainless-steel hardware
            for cleanroom and engineering applications.
          </p>
        </div>

        <div>
          <h4>Quick links</h4>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div>
          <h4>Supplier</h4>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <a
            href={INDIA_MART_URL}
            target="_blank"
            rel="noreferrer"
          >
            IndiaMART
          </a>
        </div>

      </div>

      <div className="container copyright">
        © {new Date().getFullYear()} Yakshita Engineering.
        Catalogue enquiry website — no online payment.
      </div>
    </footer>
  );
}

function AdminLogin({onClose,onLogin}) {
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  function submit(e){e.preventDefault(); if(password==="admin123"){localStorage.setItem(ADMIN_KEY,"true"); onLogin(); onClose()} else setError("Incorrect admin password.");}
  return <div className="modal-backdrop" onClick={onClose}><form className="login-modal" onClick={e=>e.stopPropagation()} onSubmit={submit}><button type="button" className="modal-close" onClick={onClose}><X/></button><div className="mini-icon"><ShieldCheck/></div><p className="eyebrow">ADMIN ACCESS</p><h2>Manage catalogue</h2><p className="muted">Product CRUD is stored in this browser using localStorage.</p><label>Password<input type="password" autoFocus value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter admin password"/></label>{error&&<p className="form-error">{error}</p>}<button className="action primary wide" type="submit"><LogOut size={17}/> Sign in</button><p className="tiny">Demo password: <b>admin123</b>. Change this before production.</p></form></div>
}

function ProductForm({initial,onSave,onCancel}) {
  const [form,setForm]=useState(initial || {name:"",category:"Cleanroom Hardware",material:"SS 304",description:"",image:"",featured:false});
  const set=(key,value)=>setForm(f=>({...f,[key]:value}));
  return <form className="admin-form" onSubmit={e=>{e.preventDefault(); if(form.name.trim()) onSave({...form,name:form.name.trim(),id:form.id||`p-${Date.now()}`})}}>
    <div className="form-grid">
      <label>Product name<input required value={form.name} onChange={e=>set("name",e.target.value)} /></label>
      <label>Category<input value={form.category} onChange={e=>set("category",e.target.value)} /></label>
      <label>Material<input value={form.material} onChange={e=>set("material",e.target.value)} /></label>
      <label>Image URL / path<input value={form.image} onChange={e=>set("image",e.target.value)} placeholder="/products/example.jpg" /></label>
      <label className="full">Description<textarea rows="4" value={form.description} onChange={e=>set("description",e.target.value)} /></label>
      <label className="checkbox"><input type="checkbox" checked={!!form.featured} onChange={e=>set("featured",e.target.checked)} /> Featured product</label>
    </div>
    <div className="form-actions"><button type="button" className="action ghost-dark" onClick={onCancel}>Cancel</button><button className="action primary" type="submit"><Plus size={17}/> Save product</button></div>
  </form>
}

function Admin({products,setProducts,onLogout}) {
  const [editing,setEditing]=useState(null);
  const [adding,setAdding]=useState(false);
  function save(product){const exists=products.some(p=>p.id===product.id); const next=exists?products.map(p=>p.id===product.id?product:p):[product,...products]; setProducts(next); saveProducts(next); setEditing(null); setAdding(false)}
  function remove(id){if(confirm("Delete this product from the catalogue?")){const next=products.filter(p=>p.id!==id);setProducts(next);saveProducts(next)}}
  return <section className="admin-section" id="admin"><div className="container">
    <div className="admin-head"><div><p className="eyebrow">PRIVATE CATALOGUE CONTROL</p><h2>Product administration</h2><p className="muted">Add, edit or delete products. Changes are stored in this browser.</p></div><div className="admin-head-actions"><button className="action primary" onClick={()=>{setAdding(true);setEditing(null)}}><Plus size={17}/> Add product</button><button className="action ghost-dark" onClick={onLogout}><LogOut size={17}/> Logout</button></div></div>
    {(adding||editing) && <ProductForm initial={editing} onSave={save} onCancel={()=>{setAdding(false);setEditing(null)}}/>}
    <div className="admin-table-wrap"><table><thead><tr><th>Product</th><th>Category</th><th>Material</th><th>Featured</th><th>Actions</th></tr></thead><tbody>{products.map(p=><tr key={p.id}><td><div className="table-product"><div className="table-thumb"><ProductImage product={p}/></div><span>{p.name}</span></div></td><td>{p.category}</td><td>{p.material}</td><td>{p.featured?"Yes":"—"}</td><td><div className="row-actions"><button title="Edit" onClick={()=>{setEditing(p);setAdding(false)}}><Pencil size={16}/></button><button title="Delete" onClick={()=>remove(p.id)}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>
  </div></section>
}

function App() {
  const [products,setProducts]=useState(getProducts);
  const [admin,setAdmin]=useState(()=>localStorage.getItem(ADMIN_KEY)==="true");
  const [login,setLogin]=useState(false);
  const [buy,setBuy]=useState(null);
  const [detail,setDetail]=useState(null);
  const [menu,setMenu]=useState(false);

  useEffect(()=>saveProducts(products),[products]);

  const scrollProducts=()=>document.getElementById("products")?.scrollIntoView({behavior:"smooth"});
  const logout=()=>{localStorage.removeItem(ADMIN_KEY);setAdmin(false);location.hash="top";};

  return <>
    <Header isAdmin={admin} onAdmin={()=>admin?document.getElementById("admin")?.scrollIntoView({behavior:"smooth"}):setLogin(true)} onMenu={()=>setMenu(!menu)}/>
    {menu&&<div className="mobile-nav"><a href="#products" onClick={()=>setMenu(false)}>Products</a><a href="#about" onClick={()=>setMenu(false)}>About</a><a href="#capabilities" onClick={()=>setMenu(false)}>Capabilities</a><a href="#contact" onClick={()=>setMenu(false)}>Contact</a>{admin&&<a href="#admin" onClick={()=>setMenu(false)}>Admin</a>}</div>}
    <main><Hero onBrowse={scrollProducts}/><Products products={products} onBuy={setBuy} onView={setDetail}/><About/><Capabilities/><Contact/>{admin&&<Admin products={products} setProducts={setProducts} onLogout={logout}/>}</main>
    <Footer/>
    {buy&&<BuyOptions product={buy} onClose={()=>setBuy(null)}/>}
    {detail&&<ProductDetail product={detail} onClose={()=>setDetail(null)} onBuy={setBuy}/>}
    {login&&<AdminLogin onClose={()=>setLogin(false)} onLogin={()=>setAdmin(true)}/>}
  </>
}

createRoot(document.getElementById("root")).render(<App />);
