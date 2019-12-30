const INITIAL_STATE = {
  listOfSurfers: []
}

const surferReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SURFERS':
      const surfers = action.payload
      const newState = {
        listOfSurfers: surfers
      }
      return newState;
    default:
      return state
  }
}

export default surferReducer