import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ uid, ...rest }) => (
    <Route {...rest} component={rest.component}/>
)

const mapStateToProps = (state) => ({
    uid:!!state.auth.uuid
})

export default connect(mapStateToProps)(PrivateRoute)