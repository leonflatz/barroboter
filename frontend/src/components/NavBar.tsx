// src/components/NavBar.tsx
import type { JSX } from "react";
import { Link } from "react-router-dom";

function NavBar(): JSX.Element {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/configure">BarBot</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/configure">Configure</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/order">Order</a> {/* placeholder */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
