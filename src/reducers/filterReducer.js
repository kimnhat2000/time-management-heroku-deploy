const defaultState ={
    text:'',
    sortBy:'',
}
const filterReducer = (state=defaultState, action)=>{
    switch (action.type) {
        case 'TEXT_FILTER':
            return {
                ...state,
                text:action.text
            }    
        case 'TIME_FILTER':
            return {
                ...state,
                sortBy:'time'
            }   
        case 'NAME_FILTER':
            return {
                ...state,
                sortBy:'name'
            }  
        case 'NO_FILTER':
            return {
                ...state,
                sortby:'default'
            }       
        default:
            return state
    }
}

export default filterReducer