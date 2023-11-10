export const AppStateReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state, listTodo: [
          ...state.listTodo,
          action.payload,
        ]
      };
    case "delete":
      const listRemove = state.listTodo.filter(item => item.id !== action.payload.id)
      return { ...state, listTodo: listRemove }
    case "getItemEdit":
      return { ...state, getEditItem: action.payload }
    case "Edit":
      let getList = [...state.listTodo]
      const index = getList.findIndex((item) => item.id === action.payload.id);
      getList.splice(index, 1, action.payload);
      return { ...state, listTodo: getList }

    default:
      return state;
  }
};