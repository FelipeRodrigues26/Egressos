import React, { Component } from 'react'

export default class ListaOportunidades extends Component {
    render() {
        return (
            <div>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">

                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Oportunidades</li>
                                </ol>
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </section>

                <div className="card card-primary">

                    <div className="card-header">
                        <h4>Empregos e Estágios</h4>
                    </div>
                    {/* /.card-header */}
                    <div className="media">
                        <div>
                            <img src="dist/img/logo.jpg" className="mr-3" alt="..." />
                            <div className="media-body">
                                <h5 className="mt-0">Media heading</h5>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}
