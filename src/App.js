import './App.css';
import Navbar from './components/Navbar';
import Newsapp from './components/Newsapp';
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar />
          <Routes>
            <Route exact path="/" element={<Newsapp key="general" pageSize={6} country="in" category="general" />} />
            <Route exact path="/health" element={<Newsapp key="health" pageSize={6} country="in" category="health" />} />

            <Route exact path="/business" element={
              <Newsapp pageSize={6} key="business" country="in" category="business" />} />

               <Route exact path="/entertainment" element={
                 <Newsapp pageSize={6} key="entertainment" country="in" category="entertainment" />}/>

                  <Route exact path="/science" element={
                    <Newsapp pageSize={6} key="science" country="in" category="science" />} />

                    <Route exact path="/sports" element={
                      <Newsapp pageSize={6} key="sports" country="in" category="sports" />} />

                      <Route exact path="/technology" element={
                        <Newsapp pageSize={6} key="technology" country="in" category="technology" />} />
          </Routes>
        </Router>

      </div>
    )
  }
}



