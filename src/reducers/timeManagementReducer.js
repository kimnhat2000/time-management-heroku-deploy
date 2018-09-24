
const defaultState={
    works:[], 
    finishedWorks:[]
}

const timeManagementReducer =(state=defaultState, action)=>{
    switch (action.type) {
        case 'ADD_WORK':
            return{
                ...state,
                works:[...state.works, action.work]
            };
        case 'ADD_WORKS':
            return{
                ...state,
                works:action.works
            }
        case 'DELETE_WORK':
            return{
                ...state,
                works:state.works.filter(w=>w.id !== action.work.id)
            }
        case 'EDIT_WORK':
            const works=state.works.map(w=>w.id === action.work.id ? w=action.work : w) 
            return{
                ...state,
                works
            }
        case 'FINISH_WORK':
            return{
                ...state,
                works:state.works.filter(w=>w.completed!==true),
                finishedWorks:[...state.finishedWorks, action.finishedWork]
            }  
        case 'ADD_FINISED_WORKS':
            return{
                ...state,
                finishedWorks:action.finishedWorks
            }
        case 'DELETE_FINISH_WORK':
            return{
                ...state,
                finishedWorks:state.finishedWorks.filter(w => w.finishedWorkId !== action.finishedWorkId)
            }      
        default:
            return state;
    }
}

export default timeManagementReducer