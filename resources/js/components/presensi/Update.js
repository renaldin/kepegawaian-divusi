import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class UpdatePresensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_karyawan: "",
            keterangan: "",
            pilih_keterangan: [
                { value: "Hadir", label: "Hadir" },
                { value: "Alpa", label: "Alpa" },
                { value: "Izin", label: "Izin" },
                { value: "Sakit", label: "Sakit" }
            ],
            catatan: "",
            tanggal: new Date(),
            errors: [],
            alert: null,
            message: ""
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleUpdatePresensi = this.handleUpdatePresensi.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    componentDidMount() {
        const presensiId = this.props.match.params.id_presensi;

        axios.get(`/api/presensi/edit/${presensiId}`).then(response => {
            this.setState({
                nama_karyawan: response.data[0].nama_karyawan,
                keterangan: response.data[0].keterangan,
                catatan: response.data[0].catatan ?? null,
                tanggal: new Date(response.data[0].tanggal)
            });
        });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleFieldKeterangan(e) {
        this.setState({ keterangan: e.value });
    }

    handleFormatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    handleUpdatePresensi(event) {
        event.preventDefault();

        const presensi = {
            keterangan: this.state.keterangan,
            catatan: this.state.catatan,
            tanggal: this.handleFormatDate(this.state.tanggal)
        };

        console.log(presensi);

        const presensiId = this.props.match.params.id_presensi;

        axios.put(`/api/presensi/${presensiId}`, presensi).then(response => {
            var msg = response.data.success;
            if (msg == true) {
                this.setState({
                    message: response.data.message
                });
                return this.successAlert();
            }
        });
    }

    successAlert() {
        const getAlert = () => (
            <SweetAlert
                success
                title="Berhasil!"
                onConfirm={() => this.onSuccess()}
                onCancel={this.doneAlert()}
                confirmBtnText="Ya"
            >
                {this.state.message}
            </SweetAlert>
        );

        this.setState({
            alert: getAlert()
        });
    }

    doneAlert() {
        this.setState({
            alert: null
        });
    }

    onSuccess() {
        this.props.history.push("/presensi/index");
    }

    hasError(field) {
        return !!this.state.errors[field];
    }

    renderError(field) {
        if (this.hasError(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    render() {
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                Edit Karyawan
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleUpdatePresensi}>
                                    <div className="form-group">
                                        <label htmlFor="tanggal">Tanggal</label>
                                        <br />
                                        <DatePicker
                                            id="tanggal"
                                            name="tanggal"
                                            selected={this.state.tanggal}
                                            onChange={date =>
                                                this.setState({
                                                    tanggal: date
                                                })
                                            }
                                        />

                                        {this.renderError("tanggal")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nama_karyawan">
                                            Nama Karyawan
                                        </label>
                                        <input
                                            id="nama_karyawan"
                                            type="text"
                                            className={`form-control ${
                                                this.hasError("nama_karyawan")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="nama_karyawan"
                                            value={this.state.nama_karyawan}
                                            onChange={this.handleFieldChange}
                                            readOnly
                                        />
                                        {this.renderError("nama_karyawan")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="keterangan">
                                            Keterangan
                                        </label>
                                        <Select
                                            name="keterangan"
                                            value={this.state.pilih_keterangan.filter(
                                                option =>
                                                    option.value ===
                                                    this.state.keterangan
                                            )}
                                            onChange={this.handleFieldKeterangan.bind(
                                                this
                                            )}
                                            options={
                                                this.state.pilih_keterangan
                                            }
                                        />
                                        {this.renderError("keterangan")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="catatan">Catatan</label>
                                        <textarea
                                            id="catatan"
                                            className={`form-control ${
                                                this.hasError("catatan")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="catatan"
                                            value={this.state.catatan}
                                            onChange={this.handleFieldChange}
                                        ></textarea>
                                        {this.renderError("catatan")}
                                    </div>

                                    <Link
                                        className="btn btn-secondary"
                                        to={`/presensi/index`}
                                    >
                                        Kembali
                                    </Link>
                                    <button className="btn btn-primary float-right">
                                        Simpan
                                    </button>
                                    {this.state.alert}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UpdatePresensi;
