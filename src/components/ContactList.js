import { useAuthValue } from "../context";
import './ContactList.css';
import deleteImg from '../image/delete.png';
import updateImg from '../image/update.png';



const ContactList = () => {
   // Get the values from the context
  const {contacts, submitHandler,userName,userEmail,userPhone,handleDelete,handleUpdate,
    isVisible,setIsVisible,updatedUserEmail,updatedUserId,updatedUserName,updatedUserPhone} = useAuthValue();

    // Handler to set the update form's visibility
  const handleUpdateVisisble=()=>{
 setIsVisible(true);
  }

  // JSX to render the contact list
  return (  
    <>

    <div className="main-container">
    <h1 className="heading"> Add Contact</h1>
            <form className="addForm">
              
                <input type="text" ref={userName} placeholder="Enter Your Name" />
                <input  type="email" ref={userEmail} placeholder="Enter Your Email"/>
                <input type ="number" ref={userPhone} placeholder="Enter your Phone Number"/>
                <button onClick={submitHandler}>Submit</button>
                {/* <button  onClick={handleUpdate} >Update</button> */}
        
            </form>
            
        
        {/* If the update button is clicked then show the update form */}
        {isVisible && 
        
            <form className="updateForm">
                <input  type="text" ref={updatedUserId} placeholder='enter id ' required/>
                <input type="text" ref={updatedUserName} placeholder="Enter Your Name" required/>
                <input  type="email" ref={updatedUserEmail} placeholder="Enter Your Email" required/>
                <input type ="number" ref={updatedUserPhone} placeholder="Enter your Phone Number" required/>
                <button onClick={handleUpdate}>Update</button>
                {/* <button  onClick={handleUpdate} >Update</button> */}
        
            </form>
            
         }

    <div className="contact-list">
      <h1 className="heading">Contact List</h1> 
      {/* create table for show contacts */}
      <table className="table">
        <th>Unique Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Delete and Update</th>
        <tbody>
         
         {/* mapping over array */}
        {contacts.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
          <td> {user.name} </td>
          <td>{user.email}</td>
          <td> {user.phone}</td> 
          <td>
          <button onClick={()=>handleDelete(user.id)}>  
          <img src={deleteImg} alt="delete"/> </button>
          <button onClick={handleUpdateVisisble}>
            <img src={updateImg} alt="update"/></button> 
          </td>
          </tr>
          
        ))}
       
        </tbody>
     </table>
    </div>
    </div>
    </>
  );
};

export default ContactList;

