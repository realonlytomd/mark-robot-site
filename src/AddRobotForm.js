import React, { useState } from 'react';
import './index.css';

function AddRobotForm(props) {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
  
    function handleChangeName(e) {
      setName(e.target.value);
    }
  
    function handleChangeBio(e) {
      setBio(e.target.value);
    }
    
    function handleSubmit(e) {
      if(name !== '') {
        props.handleSubmit(name, bio); // this changes the variable, robots, in the function RobotManager in index.js
        setName('');
        setBio('');
      }
      e.preventDefault();
    }
  
    return (
      <form className="centerright" onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Add new robot name"
          onChange={handleChangeName}
          value={name} />
        <input
          type="text"
          placeholder="Add their bio"
          onChange={handleChangeBio}
          value={bio} />
        <button type="submit">Submit</button>
      </form>
    );
  }

  export default AddRobotForm;