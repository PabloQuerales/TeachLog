// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(storeReducer, initialStore())

    async function getContactList() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/PabloQuerales/contacts/", requestOptions);
            const result = await response.json();
            if(response.status === 200){
                dispatch ({ type: "INIT_CONTACTS", payload: result.contacts })
            }
        } catch (error) {
            console.error(error);
        };
    }

    async function createUser() {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/PabloQuerales", requestOptions);
        } catch (error) {
            console.error(error);
        }
    }

    async function postContact(inputValue) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "name": `${inputValue.name}`,
            "phone": `${inputValue.phone}`,
            "email": `${inputValue.email}`,
            "address": `${inputValue.address}`
        });
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        try {
            const response = await fetch("https://playground.4geeks.com/contact/agendas/PabloQuerales/contacts", requestOptions);
            if(response.status === 201){
                dispatch ({ type: "HIDDEN_MESSAGE", payload: "" })
            } else{
                dispatch ({ type: "HIDDEN_MESSAGE", payload: "hidden" })
            }
        } catch (error) {
            console.error(error);
        };
    }

    async function deleteContact(id) {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/PabloQuerales/contacts/${id}`, requestOptions)
        } catch (error) {
            console.error(error);
        };
    }
    async function editContact(id, inputValue) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "name": `${inputValue.name}`,
            "phone": `${inputValue.phone}`,
            "email": `${inputValue.email}`,
            "address": `${inputValue.address}`
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/PabloQuerales/contacts/${id}`, requestOptions);
            if(response.status === 200){
                dispatch ({ type: "HIDDEN_MESSAGE", payload: "" })
            } else{
                dispatch ({ type: "HIDDEN_MESSAGE", payload: "hidden" })
            }
        } catch (error) {
            console.error(error);
        }
    }
    // Provide the store and dispatch method to all child components.
    return <StoreContext.Provider value={{ store, dispatch, getContactList, createUser, postContact, deleteContact, editContact }}>
        {children}
    </StoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store, getContactList, createUser, postContact, deleteContact, editContact } = useContext(StoreContext)
    return { dispatch, store, getContactList, createUser, postContact, deleteContact, editContact };
}