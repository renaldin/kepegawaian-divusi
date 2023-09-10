import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class CreatePresensi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            karyawan: [],
            id_karyawan: "",
            pilih_karyawan: [],
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
            isDisabled: true,
            alert: null
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreatePresensi = this.handleCreatePresensi.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    async componentDidMount() {
        await axios.get("/api/karyawan").then(response => {
            this.setState({
                karyawan: response.data
            });
        });

        await this.state.karyawan.map((v, i) => {
            this.state.pilih_karyawan.push({
                value: v.id_karyawan,
                label: v.nip + " - " + v.nama_karyawan
            });
        });

        this.setState({
            isDisabled: false
        });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleFieldChangeKaryawan(e) {
        this.setState({ id_karyawan: e.value });
    }

    handleFieldChangeKeterangan(e) {
        this.setState({ keterangan: e.value });
    }

    handleFieldChangeTanggal(e, date) {
        this.setState({ tanggal: date });
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

    handleCreatePresensi(event) {
        event.preventDefault();

        const presensi = {
            id_karyawan: this.state.id_karyawan,
            keterangan: this.state.keterangan,
            catatan: this.state.catatan,
            tanggal: this.handleFormatDate(this.state.tanggal)
        };

        console.log(presensi);

        axios.post("/api/presensi/store", presensi).then(response => {
            var msg = response.data.success;
            if (msg == true) {
                return this.successAlert();
            } else {
                return this.failedAlert();
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
                Presensi Berhasil Ditambahkan!
            </SweetAlert>
        );

        this.setState({
            alert: getAlert()
        });
    }

    failedAlert() {
        const getAlert = () => (
            <SweetAlert
                error
                title="Gagal!"
                onConfirm={() => this.onFailed()}
                onCancel={this.doneAlert()}
                confirmBtnText="Ya"
            >
                Presensi gagal ditambahkan! Pada tanggal tersebut karyawan sudah
                melakukan presensi.
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

    onFailed() {
        this.props.history.push("/presensi/create");
        this.doneAlert();
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
                                Tambah Presensi
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleCreatePresensi}>
                                    <div className="form-group">
                                        <label htmlFor="tanggal">Tanggal</label>
                                        <br />
                                        <DatePicker
                                            id="tanggal"
                                            name="tanggal"
                                            className="form-control"
                                            selected={this.state.tanggal}
                                            onChange={date =>
                                                this.setState({
                                                    tanggal: date
                                                })
                                            }
                                            required
                                        />
                                        {this.renderError("tanggal")}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="id_karyawan">
                                            Nama Karyawan
                                        </label>
                                        <Select
                                            name="id_karyawan"
                                            isDisabled={this.state.isDisabled}
                                            onChange={this.handleFieldChangeKaryawan.bind(
                                                this
                                            )}
                                            options={this.state.pilih_karyawan}
                                            required
                                        />
                                        {this.renderError("id_karyawan")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="keterangan">
                                            Keterangan
                                        </label>
                                        <Select
                                            name="keterangan"
                                            onChange={this.handleFieldChangeKeterangan.bind(
                                                this
                                            )}
                                            options={
                                                this.state.pilih_keterangan
                                            }
                                            required
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
                                            required
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
export default CreatePresensi;
