import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Sistem Informasi Kepegawaian
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Data Master
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <Link className="dropdown-item" to="/">
                                    Data Karyawan
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/fungsional/index"
                                >
                                    Data Fungsional
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    to="/struktural/index"
                                >
                                    Data Struktural
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/presensi/index">
                                Data Presensi
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/laporan/create">
                                Laporan
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
