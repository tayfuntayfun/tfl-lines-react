import React, { useState, useEffect } from 'react';
import './App.css';
import Route from './Route'

function App() {
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState('');
  const [lines, setLines] = useState([])
  const [selectedLine, setSelectedLine] = useState('')

  useEffect (()=> {
    const fetchData = async () => {
    const result = await fetch('https://api.tfl.gov.uk/Line/Meta/Modes')
      .then(response => response.json())
      setModes(result)
    }
  fetchData();
  }, []);

  useEffect (()=> {
    fetch(`https://api.tfl.gov.uk/Line/Mode/${selectedMode}`)
   .then(results => results.json())
   .then(data => setLines(data))
 }, [selectedMode]);

  const handleSelectChange = (event) => {
    if (event.target.id === 'modes') {setSelectedMode(event.target.value)
    }
    if (event.target.id === 'lines') {setSelectedLine(event.target.value)
    }
  }
  
  const renderSelect = (defaultOption, options, id) => {
    return (
      <select className={'select-bar'}
              onChange={handleSelectChange} 
              id={id}>
      <option style={{marginTop:'5px'}}
              selected={true}
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
  
    <p style={{ textAlign:'left',
                marginLeft: '10px'}}><b>You selected Transport Mode: <span style={{color:'purple'}}>{selectedMode}</span></b></p>
    {lines.length > 0 ? renderSelect('Choose a Line...', lines, 'lines') : null}
    
    <Route selectedLine={selectedLine}
           selectedMode={selectedMode} />
    </div>
  );
}

export default App;
