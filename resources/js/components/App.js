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
import Fungsional from "./fungsional/Index";
import CreateFungsional from "./fungsional/Create";
import UpdateFungsional from "./fungsional/Update";
import Struktural from "./struktural/Index";
import CreateStruktural from "./struktural/Create";
import UpdateStruktural from "./struktural/Update";
import DetailStruktural from "./struktural/Detail";
import DetailFungsional from "./fungsional/Detail";

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

                        {/* fungsional */}
                        <Route
                            path="/fungsional/index"
                            component={Fungsional}
                        />
                        <Route
                            path="/fungsional/create"
                            component={CreateFungsional}
                        />
                        <Route
                            path="/fungsional/edit/:id_fungsional"
                            component={UpdateFungsional}
                        />
                        <Route
                            path="/fungsional/:id_fungsional"
                            component={DetailFungsional}
                        />

                        {/* struktural */}
                        <Route
                            path="/struktural/index"
                            component={Struktural}
                        />
                        <Route
                            path="/struktural/create"
                            component={CreateStruktural}
                        />
                        <Route
                            path="/struktural/edit/:id_struktural"
                            component={UpdateStruktural}
                        />
                        <Route
                            path="/struktural/:id_struktural"
                            component={DetailStruktural}
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
