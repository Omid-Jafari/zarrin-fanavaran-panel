function AddProductReducer(state, action) {

    switch (action.type) {
        case 'STEP':
            console.log("sdbdsbdsbsdb", action);
            return { ...state,step: action.step }
        case 'ADD':
            const {productData}=action
            console.log("sdbdsbdsbsdb", state.productData);
            return { ...state,productData: {...state.productData,...productData} }
        default:

            return state;
    }
}

export default AddProductReducer  