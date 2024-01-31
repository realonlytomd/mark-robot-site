// import React from 'react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Landing from './Landing';
import Pictures from './Pictures';
import Profiles from './Profiles';
import AddRobotForm from './AddRobotForm';
import RobotList from './RobotList';
import reportWebVitals from './reportWebVitals';

function RobotManager(props) {
  const [robots, setRobots] = useState(props.data);
  
  function addRobot(name, bio) {
    console.log("robot name in function addRobot: ", name);
    console.log("bio in function addRobot: ", bio);
    setRobots([...robots, {name:name, bio:bio}]); // this will be where we write new data to mongodb
  }
  
  return (
    <div> 
      <AddRobotForm handleSubmit={addRobot} />
      <RobotList data={robots} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
const robots = [{name:"megatron",
                    bio: "born at home"}, 
                    {name: "godzilla",
                    bio: "born next door"}];
const el = (
  <div>
    <App />
    <Landing />
    <RobotManager data={robots} />
    <Pictures />
    <Profiles />
  </div>
)
root.render(
  <React.StrictMode>
    {el}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
