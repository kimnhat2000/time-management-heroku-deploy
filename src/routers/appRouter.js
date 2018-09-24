import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/header';
import MainPage from '../components/mainPage';
import Working from '../components/working';
import NotFoundPage from '../components/notFoundPage';
import LoginPage from '../components/loginPage';
import PublicRoute from '../components/publicRoute'

export const history = createHistory()

const AppRouter =({ uid })=>{
    console.log(uid)
    return (
    <Router history={history}>
    <div>
        { uid && <Header/> }
        <Switch>
            <Route path='/' component={LoginPage} exact={true}/>
            <Route path='/main' component={MainPage}/>
            <Route path='/:id' component={Working}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </div>
    </Router>
)}

const mapStateToProps = (state) => ({
    uid: !!state.auth.uid
})

export default connect(mapStateToProps)(AppRouter)