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

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
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
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
