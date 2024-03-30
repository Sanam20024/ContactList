import { createContext, useContext } from "react";
import { useEffect,useRef } from "react";
import { useState } from "react";

//Create Context
const AuthContext=createContext();

// Custom hook to access the context

export function useAuthValue(){
    const value=useContext(AuthContext);
    
    if(!value) throw new Error("Use AuthProvider before using the context");

    return value;
}

// Provider component to provide context values to children

export const AuthProvider=({children})=>{
    // State for list of contacts
    const [contacts, setContacts] = useState([]);
    const[isVisible,setIsVisible]=useState(false);

    // fetching contacts from the API
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((data) => setContacts(data));
      }, []);
    
      // State variables for user input
      const userName=useRef();
      const userEmail=useRef();
      const userPhone=useRef();
      const userId=useRef();
       const updatedUserEmail=useRef();
       const updatedUserId=useRef();
       const updatedUserName=useRef();
       const updatedUserPhone=useRef();

      // Handler for form submission
     const submitHandler = (e)=>{
      e.preventDefault();
    
      //getting the value of the input field
      const info={
       name:userName.current.value,
       email:userEmail.current.value, 
       phone:userPhone.current.value
      }
    
      //post method to adding data 
      fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    //adding data  in state after submitting the form
      .then((response) => response.json())
      .then((data) => {
        setContacts(preContact =>[data ,...preContact]);
      })
      .catch(error =>console.log("Error contacting contact" , error));
    
      //emptying out the fields once submitted
      userName.current.value="";
      userEmail.current.value="";
      userPhone.current.value="";
     };

     //Handle the delete funtion
     function handleDelete(id){
         console.warn(`You are deleting ${id}`);
         fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:'DELETE'
         })
         .then(response=>{
            if(!response.ok){
                throw new Error('Failed to delete contact');
            }
            const updateResult=contacts.filter(item=> item.id !== id);
         setContacts(updateResult);
         })
         .catch(error=>console.log("Error deleting contact",error));
         

     };
     
     //handle the update function

     function handleUpdate(e) {
        e.preventDefault();
        
        const id = updatedUserId.current.value;
        const name = updatedUserName.current.value;
        const email = updatedUserEmail.current.value;
        const phone = updatedUserPhone.current.value;
      
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            id: id,
            name: name,
            email: email,
            phone: phone
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update the user");
          }
          return response.json(); // Parse response body as JSON
        })
        .then((updatedData) => {
          const updatedContacts = contacts.map(contact => {
            if (contact.id === parseInt(id)) { // Ensure id comparison is done correctly
              return {
                ...contact,
                name: updatedData.name,
                email: updatedData.email,
                phone: updatedData.phone
              };
            }
            return contact;
          });
          setContacts(updatedContacts);
          alert("The Contact has been Updated");
          setIsVisible(false); // Hide the update form after successful update
        })
        .catch(error => console.error("Error for Updating", error));
      }
            // Returning the context values

    return(
        <AuthContext.Provider  value={{
            contacts,
            setContacts,
            submitHandler,
            userName,
            userEmail,
            userPhone,
            userId,
            handleDelete,
            handleUpdate,
            isVisible,
            setIsVisible,
            updatedUserEmail,
            updatedUserId,
            updatedUserName,
            updatedUserPhone
        }}>
            {children}
        </AuthContext.Provider>
    )
}