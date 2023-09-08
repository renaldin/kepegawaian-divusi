import React, { Component } from "react";
import {
    AiFillDelete,
    AiFillEdit,
    AiFillEye,
    AiOutlinePlus
} from "react-icons/ai";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios";

class Fungsional extends Component {
    constructor() {
        super();
        this.state = {
            fungsional: [],
            msg: null,
            type: null,
            flash: false,
            alert: null
        };
    }

    componentDidMount() {
        axios.get("/api/fungsional").then(response => {
            this.setState({
                fungsional: response.data
            });
        });
    }

    deleteFungsional(id) {
        axios.delete(`/api/fungsional/delete/${id}`).then(response => {
            var msg = response.data.success;
            if (msg == true) {
                this.doneAlert();
                this.successAlert();
            }
        });
    }

    confirmationDeleteAlert(id) {
        const getAlert = () => {
            return (
                <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Hapus"
                    cancelBtnText="Batal"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Hapus Data"
                    onConfirm={() => this.deleteFungsional(id)}
                    onCancel={() => this.doneAlert()}
                    focusCancelBtn
                >
                    Apakah Anda yakin akan hapus data ini?
                </SweetAlert>
            );
        };
        this.setState({
            alert: getAlert()
        });
    }

    successAlert() {
        const getAlert = () => {
            return (
                <SweetAlert
                    success
                    title="Berhasil!"
                    onConfirm={() => this.onSuccess()}
                    onCancel={this.doneAlert()}
                    confirmBtnText="Ya"
                >
                    Fungsional Berhasil Dihapus!
                </SweetAlert>
            );
        };
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
        this.componentDidMount();
        this.doneAlert();
    }

    render() {
        const { fungsional } = this.state;
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">Data Fungsional</div>
                            <div className="card-body">
                                <Link
                                    className="btn btn-primary mb-3"
                                    to="/fungsional/create"
                                >
                                    <AiOutlinePlus size={20} />
                                    Tambah
                                </Link>
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
                                                <th>Nama Fungsional</th>
                                                <th
                                                    width="200px"
                                                    className="text-center"
                                                >
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fungsional.map((item, index) => (
                                                <tr key={index}>
                                                    <td
                                                        width="30px"
                                                        className="text-center"
                                                    >
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {item.nama_fungsional}
                                                    </td>
                                                    <td
                                                        width="250px"
                                                        className="text-center"
                                                    >
                                                        <div className="btn-group">
                                                            <Link
                                                                className="btn btn-primary mx-1"
                                                                to={`/fungsional/${item.id_fungsional}`}
                                                            >
                                                                <AiFillEye
                                                                    size={20}
                                                                />
                                                            </Link>
                                                            <Link
                                                                className="btn btn-success mx-1"
                                                                to={`/fungsional/edit/${item.id_fungsional}`}
                                                            >
                                                                <AiFillEdit
                                                                    size={20}
                                                                />
                                                            </Link>
                                                            <button
                                                                className="btn btn-danger mx-1"
                                                                onClick={() =>
                                                                    this.confirmationDeleteAlert(
                                                                        item.id_fungsional
                                                                    )
                                                                }
                                                            >
                                                                <AiFillDelete
                                                                    size={20}
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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

export default Fungsional;
