import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                {/* Main Footer */}
                <footer className="main-footer">
                    <strong>Copyright © 2020 <a href="/">Sistema de Egresssos UFPA</a>.
                    </strong> All rights reserved.
                        <div className="float-right d-none d-sm-inline-block">
                        <b>Version</b> 1.0.0
                        
                        </div>
                </footer>

            </div>
        )
    }
}
