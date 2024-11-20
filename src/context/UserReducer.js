function UserReducer(state, action) {

    switch (action.type) {
        case 'LOGIN':
            console.log("sdbdsbdsbsdb", action);
            return { isLogin: action.isLogin, user: action.user }

        case 'LOGOUT':
            console.log("sdbdsbdsbsdb", action);
            return { isLogin: action.isLogin, user: action.user }

        default:

            return state;
    }
}

export default UserReducer  