# EV Insights — Electric Vehicle Market Intelligence Website

A modern, responsive, high-performance web application that integrates interactive **Tableau Public Dashboards** and **Tableau Stories** into a dark automotive interface inspired by electric vehicle technology and clean energy analytics.

---

## ⚡ Live Features

- **Futuristic Automotive Aesthetics**: Deep black (`#080808`), charcoal (`#141414`, `#1B1B1B`), electric amber accents (`#FFB000`), and subtle electric green indicators (`#7CFC90`).
- **Interactive Tableau Public Dashboard Integration**: Embedded via Tableau VizQL engine with full filter interactivity, dynamic tooltips, custom loading spinner, reload controls, and direct fallback links.
- **Tableau Public Story Integration**: Dedicated sequential story narrative section allowing users to step through market findings chapter by chapter.
- **Dynamic Hero Section**: Features an aerodynamic electric supercar visual with ambient amber lighting, animated cycling headline phrases, and a floating telemetry badge.
- **Key Market Metrics**: Live summary cards highlighting EV catalog scope, automaker competition benchmarks, sales volume tracking, and driver sentiment.
- **Full Responsive Design**: Fluid grid and flex layouts optimized across desktops, tablets, and mobile smartphones with a slide-out hamburger navigation menu.
- **Production-Ready Backend**: Built with Python and Flask, pre-configured for instant deployment on cloud platforms like Render via Gunicorn.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3, Flask |
| **WSGI Server** | Gunicorn (Production deployment) |
| **Data Visualizations** | Tableau Public (Interactive Dashboard & Story) |
| **Markup & Semantics** | HTML5 (SEO-optimized, OpenGraph tags, ARIA accessible) |
| **Styling & Layout** | Modern CSS3 (Variables, Flexbox, Grid, Glassmorphism, Amber Glow Effects) |
| **Client Interaction** | Vanilla JavaScript ES6+ (Typewriter animations, Intersection Observer, Load manager) |
| **Typography & Icons** | Outfit, Inter, JetBrains Mono, Font Awesome 6 |

---

## 📁 Project Structure

```text
EV_Web/
├── app.py                  # Flask application entry point & routing
├── requirements.txt        # Production dependencies (Flask, Gunicorn)
├── Procfile                # Render / Heroku process declaration
├── README.md               # Documentation & deployment guide
├── templates/
│   └── index.html          # Semantic HTML5 single-page application
└── static/
    ├── css/
    │   └── style.css       # Master design system & responsive styling
    ├── js/
    │   └── script.js       # UI controllers, typewriter, loader & scroll logic
    └── images/
        ├── ev_hero.jpg     # High-resolution futuristic EV hero visual
        ├── ev_tech.jpg     # EV powertrain battery architecture asset
        └── .gitkeep
```

---

## 🚀 Local Installation & Execution

### 1. Prerequisites
Ensure you have **Python 3.9+** installed:
```bash
python --version
```

### 2. Install Dependencies
In your project directory, install the required packages:
```bash
pip install -r requirements.txt
```

### 3. Run the Flask Development Server
```bash
python app.py
```

Open your browser and navigate to:
**[http://127.0.0.1:5000](http://127.0.0.1:5000)**

---

## 🌐 Deployment to Render

This application is ready for deployment on **Render**:

1. Push your repository to **GitHub** or **GitLab**.
2. Log in to [Render](https://render.com/) and click **New > Web Service**.
3. Connect your repository.
4. Configure the Web Service settings:
   - **Name**: `ev-insights`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
5. Click **Create Web Service**. Render will automatically detect the port via the `PORT` environment variable handled in `app.py`.

---

## 📊 Tableau Visualizations

- **Interactive Dashboard**:
  - Direct Link: [Tableau Public Dashboard](https://public.tableau.com/views/Tablue_dataanalyticsproject_17928369455050/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link)
  - Embed Source: `https://public.tableau.com/views/Tablue_dataanalyticsproject_17928369455050/Dashboard1?:showVizHome=no&:embed=true`

- **Interactive Story**:
  - Direct Link: [Tableau Public Story](https://public.tableau.com/shared/CSP85ZC3H?:display_count=n&:origin=viz_share_link)
  - Embed Source: `https://public.tableau.com/shared/CSP85ZC3H?:showVizHome=no&:embed=true`

---

## 📝 License & Attribution
Designed & developed for Electric Vehicle Market Intelligence and Data Analytics.
All Tableau Public visualizations are linked directly to their original public sources.
