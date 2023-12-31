import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Laporan extends Component {
    constructor() {
        super();
        this.state = {
            month: null,
            year: null,
            karyawan: [],
            msg: null,
            type: null,
            flash: false,
            alert: null
        };

        this.handleMonth = this.handleMonth.bind(this);
    }

    componentDidMount() {
        const month = this.props.match.params.month;
        const year = this.props.match.params.year;
        axios.get(`/api/laporan/${year}/${month}`).then(response => {
            this.setState({
                karyawan: response.data.hasil,
                month: this.props.match.params.month,
                year: this.props.match.params.year
            });
        });
    }

    handleMonth(month) {
        const listMonth = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember"
        ];

        if (month >= 1 && month <= 12) {
            return listMonth[month - 1];
        }
    }

    render() {
        const { karyawan, month, year, isLoading } = this.state;

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                Laporan <br />
                                Presensi pada bulan {this.handleMonth(
                                    month
                                )}{" "}
                                {year}
                            </div>
                            <div className="card-body">
                                <a
                                    href={`/printPDF/${year}/${month}`}
                                    disabled={isLoading}
                                    className="btn btn-primary my-2"
                                >
                                    {isLoading
                                        ? "Menghasilkan PDF..."
                                        : "Cetak PDF"}
                                </a>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th
                                                    width="30px"
                                                    className="text-center"
                                                >
                                                    No
                                                </th>
                                                <th>NIP</th>
                                                <th>Nama Karyawan</th>
                                                <th>Fungsional</th>
                                                <th>Struktural</th>
                                                <th>Hadir</th>
                                                <th>Sakit</th>
                                                <th>Izin</th>
                                                <th>Alpa</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {karyawan.map((p, i) => (
                                                <tr key={i}>
                                                    <td
                                                        width="30px"
                                                        className="text-center"
                                                    >
                                                        {i + 1}
                                                    </td>
                                                    <td>{p.nip}</td>
                                                    <td>{p.nama_karyawan}</td>
                                                    <td>{p.nama_fungsional}</td>
                                                    <td>{p.nama_struktural}</td>
                                                    <td>{p.hadir}</td>
                                                    <td>{p.sakit}</td>
                                                    <td>{p.izin}</td>
                                                    <td>{p.alpa}</td>
                                                    <td>{p.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <Link
                                        className="btn btn-secondary"
                                        to={`/laporan/create`}
                                    >
                                        Kembali
                                    </Link>
                                    {this.state.alert}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Laporan;
