import React, { useState, useEffect } from 'react';

const Route  = (props) => {

  const [route, SetRoute] = useState('');

  useEffect (()=> {
    const fetchData = async () => {
    const result = await fetch(`https://api.tfl.gov.uk/Line/${props.selectedLine}/Route`)
      .then(response => response.json())
      SetRoute(result)
        }
  fetchData();
  }, [props.selectedLine]);

  return route.routeSections ? 
    <div className='route-plan'>
        <p> {props.selectedMode.charAt(0).toUpperCase() + props.selectedMode.slice(1)} : {props.selectedLine}</p>
        <div className='route-show'>
            <p className='route-Start-End'>Start : {route.routeSections[0].originationName}</p>
            <p style={{width:'10px', fontWeight:'bolder'}}>→</p> 
            <p className='route-Start-End'>End : {route.routeSections[0].destinationName}</p>
        </div>
    </div> 
    : '';
} 

export default Route;