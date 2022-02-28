const initstate = {
    userdata:null,
    country:null,
    user_id:null,
}
export default function Reducer(state = initstate, action) {
    switch (action.type) {
        case 'Login':
            return { ...state, userdata: action.payload }
        case 'userdata':
            return { ...state, userdata: action.payload }
        case 'country':
            return {...state, country: action.payload}
        case 'user_id':
            return {...state, user_id: action.payload}
        default:
            return state
    }
}