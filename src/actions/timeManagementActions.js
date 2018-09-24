import uuid from 'uuid';
import database from '../fireBase/fireBase';

export const addWork =(work)=>({
    type: 'ADD_WORK',
    work
})

export const addWorkWithFireBase = (workData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        const { name='', hour=0, minute=0, completed=false } = workData
        let work = { name, hour, minute, completed }
        return database.ref('works').push(work).then((snapshot) => {
            work = { id:snapshot.key,...work }
            dispatch(addWork({
                ...work
            }))
        })
    }
}

export const addWorks = (works) => ({
    type: 'ADD_WORKS',
    works
})

export const addWorksFromFirebase = () => {
    return (dispatch) => {
        return database.ref('works').once('value').then((snapshot) => {
            let works = []
            snapshot.forEach(w => {
                works.push({
                    id:w.key,
                    ...w.val()
                })
            })
            dispatch(addWorks(works))
        })
    }
}

export const deleteWork =(work)=>({
    type: 'DELETE_WORK',
    work
})

export const deleteWorkWithFirebase = (work) => {
    return (dispatch) => {
        return database.ref(`works/${work.id}`).remove().then(() => {
            dispatch(deleteWork(work))
        })
    }
}

export const editWork =(work)=>({
    type: 'EDIT_WORK',
    work
})

export const editWorkWithFirebase = (work) => {
    return (dispatch) => {
        return database.ref(`works/${work.id}`).update(work).then(() => {
            dispatch(editWork(work))
        })
    }
}

export const finishedWorks =(finishedWork)=>({
    type: 'FINISH_WORK',
    finishedWork
})

export const finishedWorkWithFirebase = (finishedWork) => {
    return (dispatch) => {
        return database.ref('finishedWorks').push(finishedWork).then((w) => {
            database.ref(`works/${finishedWork.id}`).remove()
            const work = {finishedWorkId:w.key,...finishedWork}
            dispatch(finishedWorks(work))          
        })
    }
}

export const addFinishedWorks = (finishedWorks) => ({
    type: 'ADD_FINISED_WORKS',
    finishedWorks
})

export const addFinishedWorksFromFirebase = (finishedWorks) => {
    return (dispatch) => {
        return database.ref('finishedWorks').once('value').then((snapshot) => {
            let allFinishedWorks = [];
            snapshot.forEach(fw => {
                allFinishedWorks.push({finishedWorkId:fw.key,...fw.val()})
            })
            dispatch(addFinishedWorks(allFinishedWorks))
        })
    }
}

export const deleteFinishedWork = (finishedWorkId) => ({
    type: 'DELETE_FINISH_WORK',
    finishedWorkId
})

export const deleteFinishedWorkWithFirebase = (finishedWorkId) => {
    return (dispatch) => {
        return database.ref(`finishedWorks/${finishedWorkId}`).remove().then(() => {
            dispatch(deleteFinishedWork(finishedWorkId))
        })
    }
}