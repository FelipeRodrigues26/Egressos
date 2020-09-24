import React, { Component } from 'react'
import './App.css'
import Menu from './Menu'
import Footer from './Footer'
import Header from './Header'
import Content from './Content'
import Routes from './Routes'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Routes/>
        <Menu/>
        <Footer/>
        
      </div>
    )
  }
}
