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

class Struktural extends Component {
    constructor() {
        super();
        this.state = {
            struktural: [],
            msg: null,
            type: null,
            flash: false,
            alert: null
        };
    }

    componentDidMount() {
        axios.get("/api/struktural").then(response => {
            this.setState({
                struktural: response.data
            });
        });
    }

    deleteStruktural(id) {
        axios.delete(`/api/struktural/delete/${id}`).then(response => {
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
                    onConfirm={() => this.deleteStruktural(id)}
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
                    Struktural Berhasil Dihapus!
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
        const { struktural } = this.state;
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header">Data Struktural</div>
                            <div className="card-body">
                                <Link
                                    className="btn btn-primary mb-3"
                                    to="/struktural/create"
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
                                                <th>Nama Struktural</th>
                                                <th
                                                    width="200px"
                                                    className="text-center"
                                                >
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {struktural.map((item, index) => (
                                                <tr key={index}>
                                                    <td
                                                        width="30px"
                                                        className="text-center"
                                                    >
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        {item.nama_struktural}
                                                    </td>
                                                    <td
                                                        width="250px"
                                                        className="text-center"
                                                    >
                                                        <div className="btn-group">
                                                            <Link
                                                                className="btn btn-primary mx-1"
                                                                to={`/struktural/${item.id_struktural}`}
                                                            >
                                                                <AiFillEye
                                                                    size={20}
                                                                />
                                                            </Link>
                                                            <Link
                                                                className="btn btn-success mx-1"
                                                                to={`/struktural/edit/${item.id_struktural}`}
                                                            >
                                                                <AiFillEdit
                                                                    size={20}
                                                                />
                                                            </Link>
                                                            <button
                                                                className="btn btn-danger mx-1"
                                                                onClick={() =>
                                                                    this.confirmationDeleteAlert(
                                                                        item.id_struktural
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

export default Struktural;
