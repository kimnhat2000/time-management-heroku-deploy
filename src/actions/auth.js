import React from 'react';
import { firebase, goolgeProvider } from '../fireBase/fireBase';

export const login = (uid) => ({
    type:'LOGIN',
    uid
})

export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(goolgeProvider)
    }
}

export const logout = () => ({
    type:'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}