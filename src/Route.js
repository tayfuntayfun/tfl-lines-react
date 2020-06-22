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
        <p style={{fontWeight:'bolder'}}> {props.selectedMode.toUpperCase()} : {props.selectedLine.toUpperCase()}</p>
        <div className='route-show'>
            <div className='route-Start-End'>
              <p className='route-start'>START OF LINE</p>
              <p className='route-start-station'>{route.routeSections[0].originationName}</p>
            </div>
            <p style={{width:'30px',  fontSize:'30px', alignSelf:'center'}}>→</p> 
            <div className='route-Start-End'>
              <p className='route-end'>END OF LINE</p>
              <p className='route-end-station'>{route.routeSections[0].destinationName}</p>
            </div>
        </div>
    </div> 
    : '';
} 

export default Route;