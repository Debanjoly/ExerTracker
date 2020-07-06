import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


function CreateExercise(props) {
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const time = new Date();
    const [date, setDate] = useState(time);
    const [users, setUsers] = useState([]);
    const refContainer = useRef("userInput");

    useEffect(() => {
        // const abortController= new AbortController()
        // const signal=abortController.signal
        // { signal: signal }
        axios.get('/exercises/'+props.match.params.id)
            .then(response => {
                setUsername(response.data.username);
                setDescription(response.data.description);
                setDuration(response.data.duration);
                setDate(new Date(response.data.date)) ;  
                })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsername({ username: response.data[0].username });
                    setUsers(response.data.map(user => user.username));
                }
            })
           .catch((error) => {
              console.log(error);
      })
    //  return function cleanup(){
    //      abortController.abort()
    //  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    function handleChangeUsername(event) {
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
    function handleSubmit(event) {
        event.preventDefault();

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        console.log(exercise);

        axios.post('/exercises/update/'+props.match.params.id, exercise)
            .then((res) => {
                console.log(res.data)
                 setUsername(res.data.username);
                 setDescription(res.data.description);
                setDuration(res.data.duration);
                setDate(new Date(res.data.date)) 
            })
          .catch ((error) => {
             console.log(error);
         })   
        
        window.location = "/";
    }
    return (
        <div>
            <h3><strong>Edit Exercise Log</strong></h3>
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
                        <DatePicker dateFormat="yyyy-MM-dd" selected={date}  onChange={handleChangeDate} />
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Edit Exercise Log"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateExercise;

