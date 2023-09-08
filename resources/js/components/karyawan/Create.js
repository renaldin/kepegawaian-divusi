import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

class CreateKaryawan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_karyawan: "",
            id_fungsional: "",
            id_struktural: "",
            alert: null,
            errors: []
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateKaryawan = this.handleCreateKaryawan.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCreateKaryawan(event) {
        event.preventDefault();

        const karyawan = {
            nama_karyawan: this.state.nama_karyawan,
            id_fungsional: this.state.id_fungsional,
            id_struktural: this.state.id_struktural
        };

        console.log(karyawan);

        axios.post("/api/karyawan/store", karyawan).then(response => {
            console.log("masuk");
            var msg = response.data.success;
            if (msg == true) {
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
                Karyawan Berhasil Ditambahkan
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
        this.props.history.push("/");
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
                            <div className="card-header">Tambah Karyawan</div>
                            <div className="card-body">
                                <form onSubmit={this.handleCreateKaryawan}>
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
                                            placeholder="Masukkan Nama Karyawan"
                                            required
                                        />
                                        {this.renderError("nama_karyawan")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="id_fungsional">
                                            Fungsional
                                        </label>
                                        <select
                                            id="id_fungsional"
                                            className={`form-control ${
                                                this.hasError("id_fungsional")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="id_fungsional"
                                            value={this.state.id_fungsional}
                                            onChange={this.handleFieldChange}
                                            required
                                        >
                                            <option value="DEFAULT">
                                                Pilih Fungsional
                                            </option>
                                            <option value="1">Engineer</option>
                                            <option value="2">
                                                Administrasi
                                            </option>
                                            <option value="3">Support</option>
                                        </select>
                                        {this.renderError("id_fungsional")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="id_struktural">
                                            Struktural
                                        </label>
                                        <select
                                            id="id_struktural"
                                            className={`form-control ${
                                                this.hasError("id_struktural")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="id_struktural"
                                            value={this.state.id_struktural}
                                            onChange={this.handleFieldChange}
                                            required
                                        >
                                            <option value="DEFAULT">
                                                Pilih Struktural
                                            </option>
                                            <option value="1">Manager</option>
                                            <option value="2">
                                                Team Leader
                                            </option>
                                            <option value="3">Staff</option>
                                        </select>
                                        {this.renderError("id_struktural")}
                                    </div>
                                    <Link
                                        className="btn btn-secondary"
                                        to={`/`}
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
export default CreateKaryawan;
