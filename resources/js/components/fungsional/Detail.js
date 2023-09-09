import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class DetailFungsional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fungsional: {}
        };
    }

    componentDidMount() {
        const fungsionalId = this.props.match.params.id_fungsional;

        axios.get(`/api/fungsional/${fungsionalId}`).then(response => {
            this.setState({
                fungsional: response.data[0]
            });
        });
    }

    render() {
        const { fungsional } = this.state;

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                Detail Fungsional
                            </div>
                            <div className="card-body">
                                <table>
                                    <tr>
                                        <th>Nama Fungsional</th>
                                        <td>:</td>
                                        <td>{fungsional.nama_fungsional}</td>
                                    </tr>
                                </table>

                                <Link
                                    className="btn btn-secondary mt-4 float-right"
                                    to={`/fungsional/index`}
                                >
                                    Kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailFungsional;
