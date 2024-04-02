export const SET_AUTH = 'SET_AUTH'
export const REMOVE_AUTH = 'REMOVE_AUTH'

export const setAuth = (roleType, roleData) => {
    return {
        type: SET_AUTH,
        payload: {
            roleType, roleData
        }
    }
}

export const removeAuth = () => {
    return {
        type: REMOVE_AUTH,
    }
}