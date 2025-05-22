import { act } from "react";

export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    contactList: [],
    hiddenMessage:"hidden"
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'INIT_CONTACTS':
      return {...store, contactList: action.payload};
    case "HIDDEN_MESSAGE":
      return {...store, hiddenMessage: action.payload}
    default:
      throw Error('Unknown action.');
  }    
}
