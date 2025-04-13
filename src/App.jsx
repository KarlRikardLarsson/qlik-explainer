import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.css";

function Home() {
  return (
    <main className="home-page">
      <section className="hero-section" style={{ paddingTop: "8rem" }}>
        <div className="hero-inner">
          <h1 className="hero-headline">Vi skapar IT-lösningar som funkar tillsammans</h1>
          <p className="hero-subtext">
            Visualisera din verksamhet med insiktsfulla dashboards – direkt i molnet
          </p>

          <section className="features">
  <Link to="/sales" className="feature">
    <h3>Försäljningsrapporter</h3>
    <p>Visualisera trender, prognoser och nyckeltal i realtid.</p>
  </Link>
  <Link to="/inventory" className="feature">
    <h3>Smart Lagerhantering</h3>
    <p>Följ upp lagerflöden och optimera återköp och lagernivåer.</p>
  </Link>
  <Link to="/customers" className="feature">
    <h3>Kundbeteenden & Churn</h3>
    <p>Segmentera kunder, följ lojalitet och identifiera churn-risker.</p>
  </Link>
  <Link to="/spend" className="feature">
    <h3>Transparent Inköpsanalys</h3>
    <p>Följ budgetar, leverantörer och kostnadstrender.</p>
  </Link>
</section>


<h2 className="section-heading">Utforska insikterna</h2>

          <div className="visma-info">
            <p>
              Detta är ett färdigt QlikStart-paket för <strong>Visma Business & Business NXT</strong>.<br />
              Installera på bara några minuter och börja ta datadrivna beslut.
            </p>
            <img src="/sales-preview.png" alt="Sales dashboard preview" className="visma-preview" />
          </div>
        </div>
      </section>
    </main>
  );
}


function PreviewPage({ title, description, image, link }) {
  return (
    <main className="preview-page">
      <div className="preview-content">
        <h2>{title} Dashboard</h2>
        <p>{description}</p>
        <img src={image} alt={`${title} preview`} className="preview-image" />
        <Link to={link} className="btn-primary" style={{ marginTop: "2rem" }}>
          View Live Dashboard
        </Link>
      </div>
    </main>
  );
}

function SalesPage() {
  return (
    <main className="sales-page">
      <section className="sales-section">
        <h2 className="sales-main-heading">Försäljningsinsikter</h2>
        <p className="sales-subheading">Här hittar du tre centrala perspektiv på försäljningen just nu</p>
        <img src="/sales-preview.png" alt="Öppna fakturor" className="sales-image" />
      </section>

      <section className="sales-section">
        <h3 className="sales-heading">Öppna fakturor</h3>
        <p className="sales-description">Analysera utestående fordringar och betalningsstatus.</p>
        <img src="/OpenInvoices.png" alt="Öppna fakturor" className="sales-image" />
      </section>

      <section className="sales-section">
        <h3 className="sales-heading">Prognos</h3>
        <p className="sales-description">Visualisera kommande intäkter med hjälp av försäljningsprognoser.</p>
        <img src="/Forecast.png" alt="Försäljningsprognos" className="sales-image" />
      </section>

      <section className="sales-section">
        <h3 className="sales-heading">Kortsiktig försäljning</h3>
        <p className="sales-description">Få koll på utvecklingen just nu – dag-för-dag.</p>
        <img src="/ShortTerm.png" alt="Kortsiktig försäljning" className="sales-image" />
      </section>

      <div className="embed-btn-wrapper">
        <Link to="/sales/embedded" className="btn-primary">
          Gå till Dashboard
        </Link>
      </div>
    </main>
  );
}


function EmbedPage({ url }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="embed-page">
      {loading && <div className="loading">Loading dashboard...</div>}
      <iframe
        src={url}
        title="Qlik Dashboard"
        className="qlik-frame"
        onLoad={() => setLoading(false)}
        allowFullScreen
      ></iframe>
    </main>
  );


}

export default function App() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".site-header");
      if (window.scrollY > 10) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <header className="site-header">
        <div className="nav-logo">
          <img src="/exsitec-menu.png" alt="QlikShow Logo" />
        </div>
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/spend">Spend</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/sales/embedded" element={<EmbedPage url="https://your-qlik-url/sales" />} />
        <Route
          path="/inventory"
          element={
            <PreviewPage
              title="Inventory"
              description="Monitor inventory levels, warehouse turnover, and supply efficiency."
              image="/inventory-preview.png"
              link="/inventory/embedded"
            />
          }
        />
        <Route path="/inventory/embedded" element={<EmbedPage url="https://your-qlik-url/inventory" />} />
        <Route
          path="/customers"
          element={
            <PreviewPage
              title="Customers"
              description="Analyze customer trends, engagement, loyalty, and satisfaction."
              image="/customers-preview.png"
              link="/customers/embedded"
            />
          }
        />
        <Route path="/customers/embedded" element={<EmbedPage url="https://your-qlik-url/customers" />} />
        <Route
          path="/spend"
          element={
            <PreviewPage
              title="Spend"
              description="Visualize spend categories, suppliers, and budget vs actuals."
              image="/spend-preview.png"
              link="/spend/embedded"
            />
          }
        />
        <Route path="/spend/embedded" element={<EmbedPage url="https://your-qlik-url/spend" />} />
      </Routes>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} QlikShow · Built by Karl Rikard Larsson</p>
      </footer>
    </Router>
  );
}