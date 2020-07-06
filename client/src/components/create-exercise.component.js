import React, { useState,useEffect,useRef} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


function CreateExercise(){
    const [username,setUsername]= useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const time=new Date();
    const [date, setDate] = useState(time);
    const [users,setUsers]=useState([]);
    const refContainer = useRef("userInput");

    useEffect(() => {
      //const abortController = new AbortController()
      // const signal = abortController.signal
//{ signal: signal }
      axios.get('/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsername(response.data[0].username);
            setUsers(response.data.map(user => user.username));
        }
      })
        .catch((error) => {
          console.log(error);
        })
      // return function cleanup() {
      //   abortController.abort()
      // }
    },[]
    );
    function handleChangeUsername(event){
        setUsername(event.target.value);
    }
    function handleChangeDescription(event) {
        setDescription(event.target.value);
    }
    function handleChangeDuration(event) {
        setDuration(event.target.value);
    }
    function handleChangeDate(date) {
        setDate(date);
    }
     function handleSubmit(event){
        event.preventDefault();

        const exercise= {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        console.log(exercise);

         axios.post("/exercises/add", exercise)
           .then((res) => console.log(res.data));
        window.location= "/";
     }
     
return (
  <div>
    <h3><strong>Create New Exercise Log</strong></h3>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label><strong>Username: </strong></label>
        <select
          ref={refContainer}
          required
          className="form-control"
          value={username}
          onChange={handleChangeUsername}
        >{users.map((user) => {
            return (
                <option key={user} value={user}>
                  {user}
                </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label><strong>Description: </strong></label>
        <input
          type="text"
          required
          className="form-control"
          value={description}
          onChange={handleChangeDescription}
        />
      </div>
      <div className="form-group">
        <label><strong>Duration (in minutes): </strong></label>
        <input
          type="text"
          className="form-control"
          value={duration}
          onChange={handleChangeDuration}
        />
      </div>
      <div className="form-group">
        <label><strong>Date: </strong></label>
        <div>
          <DatePicker selected={date} value={date} onChange={handleChangeDate} />
        </div>
      </div>

      <div className="form-group">
        <input
          type="submit"
          value="Create Exercise Log"
          className="btn btn-primary"
        />
      </div>
    </form>
  </div>
);
}

export default CreateExercise;

