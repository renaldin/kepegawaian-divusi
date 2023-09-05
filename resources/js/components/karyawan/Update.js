import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class UpdateKaryawan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_karyawan: "",
            alert: null,
            message: "",
            errors: []
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleUpdateKaryawan = this.handleUpdateKaryawan.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    componentDidMount() {
        const karyawanId = this.props.match.params.id_karyawan;

        axios.get(`/api/karyawan/edit/${karyawanId}`).then(response => {
            this.setState({
                nama_karyawan: response.data[0].nama_karyawan
            });
        });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUpdateKaryawan(event) {
        event.preventDefault();

        const karyawan = {
            nama_karyawan: this.state.nama_karyawan
        };

        const karyawanId = this.props.match.params.id_karyawan;

        axios.put(`/api/karyawan/${karyawanId}`, karyawan).then(response => {
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
                            <div className="card-header">Edit Karyawan</div>
                            <div className="card-body">
                                <form onSubmit={this.handleUpdateKaryawan}>
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
                                        />
                                        {this.renderError("nama_karyawan")}
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
export default UpdateKaryawan;
