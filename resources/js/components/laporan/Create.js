import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import MonthYearPicker from "react-month-year-picker";
import axios from "axios";

class CreateLaporan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            alert: null,
            errors: []
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateLaporan = this.handleCreateLaporan.bind(this);
        this.hasError = this.hasError.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
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
                Laporan Berhasil Dibuat!
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
        this.props.history.push(
            `/laporan/cek/${this.state.year}/${this.state.month}`
        );
    }

    handleFormatDate(date) {
        var d = new Date(date),
            day = "" + d.getDate(),
            month = "" + (d.getMonth() + 1),
            year = d.getFullYear();

        if (day.length < 2) day = "0" + day;
        if (month.length < 2) month = "0" + month;

        return [year, month, day].join("-");
    }

    handleCreateLaporan(event, year, month) {
        event.preventDefault();

        axios.get(`/api/laporan/${year}/${month}`).then(response => {
            var msg = response.data.success;
            if (msg == true) {
                return this.successAlert();
            }
        });
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
                            <div className="card-header">Buat Laporan</div>
                            <div className="card-body">
                                <form
                                    onSubmit={event =>
                                        this.handleCreateLaporan(
                                            event,
                                            this.state.year,
                                            this.state.month
                                        )
                                    }
                                >
                                    <div className="form-group">
                                        <label htmlFor="tanggal">Tanggal</label>
                                        <MonthYearPicker
                                            selectedMonth={this.state.month}
                                            selectedYear={this.state.year}
                                            minYear={2000}
                                            maxYear={2030}
                                            onChangeYear={year =>
                                                this.setState({ year: year })
                                            }
                                            onChangeMonth={month =>
                                                this.setState({ month: month })
                                            }
                                        />

                                        {this.renderError("tanggal")}
                                    </div>
                                    <button className="btn btn-primary float-right">
                                        Buat
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
export default CreateLaporan;
