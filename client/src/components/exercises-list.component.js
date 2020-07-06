import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import axios from 'axios';
import Exercise from './Exercise';


function ExerciseList() {
    const [exercises,setExercises] = useState([]);

  useEffect(()=> {
    
    const abortController = new AbortController()
    const signal = abortController.signal
   // { signal: signal }
    axios.get('/exercises/', { signal: signal })
      .then(response => {
        setExercises( response.data )
      })
      .catch((error) => {
        console.log(error);
      })
    return function cleanup() {
      abortController.abort()
    }
  },[]);

   function deleteExercise(id) {
        axios.delete('/exercises/'+id)
        .then(response => { console.log(response.data)});
        setExercises(exercises.filter((exerciseItem) => exerciseItem._id !== id));
  }

  function exerciseList() {
    return (exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/>;
    })
    );}

        return (
            <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exerciseList()}
          </tbody>
        </table>
      </div>
        )
}
export default ExerciseList;