import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class DetailPresensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presensi: {}
        };
    }

    componentDidMount() {
        const presensiId = this.props.match.params.id_presensi;

        axios.get(`/api/presensi/${presensiId}`).then(response => {
            this.setState({
                presensi: response.data[0]
            });
        });
    }

    render() {
        const { presensi } = this.state;

        console.log(presensi);
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Detail Presensi</div>
                            <div className="card-body">
                                <table>
                                    <tr>
                                        <th>Tanggal</th>
                                        <td>:</td>
                                        <td>{presensi.tanggal}</td>
                                    </tr>
                                    <tr>
                                        <th>NIP</th>
                                        <td>:</td>
                                        <td>{presensi.nip}</td>
                                    </tr>
                                    <tr>
                                        <th>Nama Karyawan</th>
                                        <td>:</td>
                                        <td>{presensi.nama_karyawan}</td>
                                    </tr>
                                    <tr>
                                        <th>Keterangan</th>
                                        <td>:</td>
                                        <td>{presensi.keterangan}</td>
                                    </tr>
                                    <tr>
                                        <th>Catatan</th>
                                        <td>:</td>
                                        <td>
                                            {presensi.catatan
                                                ? presensi.catatan
                                                : "-"}
                                        </td>
                                    </tr>
                                </table>

                                <Link
                                    className="btn btn-secondary mt-4 float-right"
                                    to={`/presensi/index`}
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

export default DetailPresensi;
