import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

class UpdateStruktural extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nama_struktural: "",
            alert: null,
            message: "",
            errors: []
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleUpdateStruktural = this.handleUpdateStruktural.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    componentDidMount() {
        const strukturalId = this.props.match.params.id_struktural;

        axios.get(`/api/struktural/edit/${strukturalId}`).then(response => {
            this.setState({
                nama_struktural: response.data[0].nama_struktural
            });
        });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleUpdateStruktural(event) {
        event.preventDefault();

        const struktural = {
            nama_struktural: this.state.nama_struktural
        };

        const strukturalId = this.props.match.params.id_struktural;

        axios
            .put(`/api/struktural/${strukturalId}`, struktural)
            .then(response => {
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
        this.props.history.push("/struktural/index");
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
                                Edit Struktural
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleUpdateStruktural}>
                                    <div className="form-group">
                                        <label htmlFor="nama_struktural">
                                            Nama Struktural
                                        </label>
                                        <input
                                            id="nama_struktural"
                                            type="text"
                                            className={`form-control ${
                                                this.hasError("nama_struktural")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="nama_struktural"
                                            value={this.state.nama_struktural}
                                            onChange={this.handleFieldChange}
                                            placeholder="Masukkan Nama Struktural"
                                            required
                                        />
                                        {this.renderError("nama_struktural")}
                                    </div>

                                    <Link
                                        className="btn btn-secondary"
                                        to={`/struktural/index`}
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
export default UpdateStruktural;
