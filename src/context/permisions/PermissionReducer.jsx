function PermissionReducer(state, action) {

    switch (action.type) {
        case 'SET_PERMISSIONS':
            console.log("sdbdsbdsbsdb", action);
            return { permissions: action.permissions }

        default:

            return state;
    }
}

export default PermissionReducer  