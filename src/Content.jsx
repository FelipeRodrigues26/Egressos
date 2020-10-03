import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Routes from './Routes'

export default class Content extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <Routes/>       
            </div>

        )
    }
}
