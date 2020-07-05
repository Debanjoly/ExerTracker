import React, {useState,useEffect} from 'react';
import axios from 'axios';

function CreateUser() {
    const [username, setUsername] = useState("");

     useEffect(()=>{
        setUsername("");
     },[]);

    function handleChangeUsername(event) {
        setUsername(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const user = {
            username: username,
        }
        console.log(user);
        setUsername("");

        axios.post("http://localhost:5000/users/add",user)
         .then(res =>console.log(res.data));
    }
   return(
    <div>
           <h3><strong>Create New User</strong></h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                   <label><strong>Username: </strong></label>
                <input
                    type="text"
                    required
                    className="form-control"
                    value={username}
                    onChange={handleChangeUsername}
                >
                </input>
            </div>
            <div className="form-group">
                <input
                    type="submit"
                    value="Create User"
                       className="btn btn-primary "
                />
            </div>
        </form>
    </div>
   );
}
export default CreateUser;