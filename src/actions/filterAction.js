export const textFilter = (text) => ({
    type:'TEXT_FILTER',
    text
})

export const timeFilter = () => ({
    type: 'TIME_FILTER',
})

export const nameFilter = () => ({
    type: 'NAME_FILTER'
})

export const noFilter = () => ({
    type: 'NO_FILTER'
})