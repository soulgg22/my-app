const defaultState = {
    selectFilm : []
}

export const selectedFilm = (state = defaultState, action) => {
    switch (action.type) {
        case 'SELECT':
            return {...state, selectFilm: action.payload}
        default:
            return state
    }
}