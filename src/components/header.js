import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import '../styles/header.css';

const Header = ({ startLogout }) => (
    <header>
        <h3>project time management</h3>
        <NavLink to='/' activeClassName='is-active' exact={true}><button onClick={startLogout}>Logout</button></NavLink>
        <NavLink to='/main' activeClassName='is-active'>task list</NavLink>
    </header>
)

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(null, mapDispatchToProps)(Header);