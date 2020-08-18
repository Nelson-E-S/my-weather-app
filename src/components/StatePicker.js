import React from 'react';

const StatePicker = props =>(
    <select value={props.value} id={props.id}>
        {props.options.map((item,index)=><option value={item.value} key={index}>{item.label}</option>)}
    </select>
)

export default StatePicker