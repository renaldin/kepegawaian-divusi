import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class DetailKaryawan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            karyawan: {}
        };
    }

    componentDidMount() {
        const karyawanId = this.props.match.params.id_karyawan;

        axios.get(`/api/karyawan/${karyawanId}`).then(response => {
            this.setState({
                karyawan: response.data[0]
            });
        });
    }

    render() {
        const { karyawan } = this.state;

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                Detail Karyawan
                            </div>
                            <div className="card-body">
                                <table>
                                    <tr>
                                        <th>NIP</th>
                                        <td>:</td>
                                        <td>{karyawan.nip}</td>
                                    </tr>
                                    <tr>
                                        <th>Nama Karyawan</th>
                                        <td>:</td>
                                        <td>{karyawan.nama_karyawan}</td>
                                    </tr>
                                    <tr>
                                        <th>Fungsional</th>
                                        <td>:</td>
                                        <td>{karyawan.nama_fungsional}</td>
                                    </tr>
                                    <tr>
                                        <th>Struktural</th>
                                        <td>:</td>
                                        <td>{karyawan.nama_struktural}</td>
                                    </tr>
                                </table>

                                <Link
                                    className="btn btn-secondary mt-4 float-right"
                                    to={`/`}
                                >
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailKaryawan;
