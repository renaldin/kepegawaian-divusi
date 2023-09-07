import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom/cjs/react-router-dom.min";
import Header from "./layout/Header";
import Karyawan from "./karyawan/Index";
import DetailKaryawan from "./karyawan/Detail";
import CreateKaryawan from "./karyawan/Create";
import UpdateKaryawan from "./karyawan/Update";
import Presensi from "./presensi/Index";
import CreatePresensi from "./presensi/Create";
import DetailPresensi from "./presensi/Detail";
import UpdatePresensi from "./presensi/Update";
import Laporan from "./laporan/Index";
import CreateLaporan from "./laporan/Create";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        {/* karyawab */}
                        <Route exact path="/" component={Karyawan} />
                        <Route
                            path="/karyawan/create"
                            component={CreateKaryawan}
                        />
                        <Route
                            path="/karyawan/edit/:id_karyawan"
                            component={UpdateKaryawan}
                        />
                        <Route
                            path="/karyawan/:id_karyawan"
                            component={DetailKaryawan}
                        />
                        {/* presensi */}
                        <Route path="/presensi/index" component={Presensi} />
                        <Route
                            path="/presensi/create"
                            component={CreatePresensi}
                        />
                        <Route
                            path="/presensi/edit/:id_presensi"
                            component={UpdatePresensi}
                        />
                        <Route
                            path="/presensi/:id_presensi"
                            component={DetailPresensi}
                        />
                        {/* Laporan */}
                        <Route
                            path="/laporan/create"
                            component={CreateLaporan}
                        />
                        <Route
                            path="/laporan/show/:year/:month"
                            component={Laporan}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
