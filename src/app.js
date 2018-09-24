import React from 'react';
import ReactDom from 'react-dom';
import AppRouter, { history } from './routers/appRouter';
import { Provider } from 'react-redux';
import reduxStore from './reduxStore/reduxStore'; 
import { firebase } from './fireBase/fireBase';
import { login, logout } from './actions/auth';
import './styles/globalStyle.css';

import { addWorksFromFirebase, addFinishedWorksFromFirebase } from './actions/timeManagementActions';

const store = reduxStore()

const Jsx =()=>(
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

const renderApp = () => {
    ReactDom.render(<Jsx />, document.getElementById('app'))
}

ReactDom.render(<p>Loading...</p>, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(login(user.uid))
        store.dispatch(addFinishedWorksFromFirebase())
        store.dispatch(addWorksFromFirebase()).then(() => {
            renderApp();
            history.push('/main')         
        });

    }else {
        store.dispatch(logout())
        renderApp();
        history.push('/');
    }
})
