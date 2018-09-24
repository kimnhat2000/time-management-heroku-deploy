import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({...props}) => (
    <Route {...props} component={ props.uid ? <Redirect to='/main'/> : props.component}/>
)

const mapStateToProps = (state) => ({
    uid:!!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)

