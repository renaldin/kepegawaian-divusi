import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

class CreateFungsional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_fungsional: "",
            alert: null,
            errors: []
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateFungsional = this.handleCreateFungsional.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCreateFungsional(event) {
        event.preventDefault();

        const fungsional = {
            nama_fungsional: this.state.nama_fungsional
        };

        axios.post("/api/fungsional/store", fungsional).then(response => {
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
                Fungsional Berhasil Ditambahkan
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
        this.props.history.push("/fungsional/index");
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
                            <div className="card-header">Tambah Fungsional</div>
                            <div className="card-body">
                                <form onSubmit={this.handleCreateFungsional}>
                                    <div className="form-group">
                                        <label htmlFor="nama_fungsional">
                                            Nama Fungsional
                                        </label>
                                        <input
                                            id="nama_fungsional"
                                            type="text"
                                            className={`form-control ${
                                                this.hasError("nama_fungsional")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="nama_fungsional"
                                            value={this.state.nama_fungsional}
                                            onChange={this.handleFieldChange}
                                            placeholder="Masukkan Nama Fungsional"
                                            required
                                        />
                                        {this.renderError("nama_fungsional")}
                                    </div>

                                    <Link
                                        className="btn btn-secondary"
                                        to={`/fungsional/index`}
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
export default CreateFungsional;
