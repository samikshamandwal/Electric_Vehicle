"""
EV Insights - Electric Vehicle Market Intelligence Web Application
------------------------------------------------------------------
A full-stack Flask application integrating Tableau Public interactive
dashboards and data stories within a dark automotive UI.

Author: Samiksha Mandwal
"""

import os
from datetime import datetime, timezone
from flask import Flask, render_template, jsonify

# Initialize Flask application
app = Flask(__name__)

# Application Configuration
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "ev-insights-secret-key-2026")


@app.context_processor
def inject_globals():
    """
    Context processor to inject dynamic variables such as the current year
    into all Jinja2 templates for the footer and metadata.
    """
    return {
        "current_year": datetime.now().year,
        "app_name": "EV Insights",
        "app_tagline": "Powering the Future of Electric Mobility",
    }


@app.route("/")
def index():
    """
    Renders the primary landing page containing the hero section,
    market statistics, features, interactive Tableau Public Dashboard,
    Tableau Public Story, and project information.
    """
    # Direct Tableau Public visualization links
    tableau_dashboard_url = (
        "https://public.tableau.com/views/Tablue_dataanalyticsproject_17928369455050/Dashboard1"
        "?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link"
    )
    tableau_dashboard_embed = (
        "https://public.tableau.com/views/Tablue_dataanalyticsproject_17928369455050/Dashboard1"
        "?:showVizHome=no&:embed=true"
    )
    tableau_story_url = (
        "https://public.tableau.com/shared/CSP85ZC3H?:display_count=n&:origin=viz_share_link"
    )
    tableau_story_embed = (
        "https://public.tableau.com/shared/CSP85ZC3H?:showVizHome=no&:embed=true"
    )

    return render_template(
        "index.html",
        dashboard_url=tableau_dashboard_url,
        dashboard_embed=tableau_dashboard_embed,
        story_url=tableau_story_url,
        story_embed=tableau_story_embed,
    )


@app.route("/health")
def health_check():
    """
    Health check endpoint for Render/cloud deployment monitoring.
    Returns HTTP 200 with JSON payload.
    """
    return jsonify({
        "status": "healthy",
        "service": "EV Insights",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }), 200


@app.errorhandler(404)
def page_not_found(e):
    """Custom handler for 404 Not Found errors."""
    return render_template("index.html", error_message="Page Not Found"), 404


@app.errorhandler(500)
def server_error(e):
    """Custom handler for 500 Internal Server errors."""
    return render_template("index.html", error_message="Internal Server Error"), 500


if __name__ == "__main__":
    # Fetch port dynamically from environment for Render/Heroku compatibility
    port = int(os.environ.get("PORT", 5000))
    # Listen on all available network interfaces
    debug_mode = os.environ.get("FLASK_DEBUG", "True").lower() in ("true", "1", "yes")
    app.run(host="0.0.0.0", port=port, debug=debug_mode)
