import React from 'react';
import './index.css';

function RobotList(props) {
    const arr = props.data;
    console.log("arr: ", arr);
    const listItems = arr.map((val, index) =>
        <li key={index}>{val.name}  {val.bio}</li>
     );
     console.log("listItems: ", listItems);
     return <ul className="centerright">{listItems}</ul>;
}


export default RobotList;