import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class DetailStruktural extends Component {
    constructor(props) {
        super(props);
        this.state = {
            struktural: {}
        };
    }

    componentDidMount() {
        const strukturalId = this.props.match.params.id_struktural;

        axios.get(`/api/struktural/${strukturalId}`).then(response => {
            this.setState({
                struktural: response.data[0]
            });
        });
    }

    render() {
        const { struktural } = this.state;

        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Detail Struktural</div>
                            <div className="card-body">
                                <table>
                                    <tr>
                                        <th>Nama Struktural</th>
                                        <td>:</td>
                                        <td>{struktural.nama_struktural}</td>
                                    </tr>
                                </table>

                                <Link
                                    className="btn btn-secondary mt-4 float-right"
                                    to={`/struktural/index`}
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

export default DetailStruktural;
