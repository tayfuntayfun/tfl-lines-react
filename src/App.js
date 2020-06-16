import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState('');
  const [lines, setLines] = useState([])

  useEffect (()=> {
     fetch('https://api.tfl.gov.uk/Line/Meta/Modes')
    .then(results => results.json())
    .then(data => setModes(data))
  }, []);

  useEffect (()=> {
    fetch(`https://api.tfl.gov.uk/Line/Mode/${selectedMode}`)
   .then(results => results.json())
   .then(data => {setLines(data)
          console.log(data)})
 }, [selectedMode]);

  const handleSelectChange = (event) => {
    if (event.target.id === 'modes') {setSelectedMode(event.target.value)
    } 
  }
  
  const renderSelect = (defaultOption, options, id) => {
    return (
      <select className={'select-bar'}
              onChange={handleSelectChange} 
              id={id}>
      <option selected={true}
              value={defaultOption}>
                {defaultOption}
              </option>
      {options.map((option, index) => {
        return (
          id === 'modes' ? <option key={index + option.modeName}
                  value={option.modeName}
                  >
            {option.modeName}
          </option> :
          <option key={index + option.modeName}
          value={option.name}
          >
            {option.name}
          </option>
        )
    })}
    </select>
    )
  }
  return (
    <div className="App">
      {renderSelect('Choose a Mode of Transport...', modes, 'modes')}
      {lines.length > 0 ? renderSelect('Choose a Line...', lines, 'lines') : null}
    <p style={{ textAlign:'left',
                marginLeft: '10px'}}><b>You selected Transport Mode: <span style={{color:'purple'}}>{selectedMode}</span></b></p>
    {/* <p style={{ textAlign:'left',
                marginLeft: '10px'}}><b>You selected line: <span style={{color:'purple'}}>{lines}</span></b></p>     */}
    </div>
  );
}

export default App;
