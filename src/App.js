import React, { Component } from 'react'
import './App.css'
import Menu from './Menu'
import Footer from './Footer'
import Header from './Header'
import Content from './Content'
import Routes from './Routes'
import { BrowserRouter, Router,useHistory } from 'react-router-dom'
import { history } from './history'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Header/>
          <Content/>
          <Menu/>
          <Footer/>
        </Router>
      </div>
    )
  }
}
