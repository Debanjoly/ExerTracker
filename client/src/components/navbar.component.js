import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand"><strong>ExcerTracker</strong></Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link"><strong>Exercises</strong></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link"><strong>Create Exercise Log</strong></Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link"><strong>Create User</strong></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}