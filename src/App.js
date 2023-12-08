import React, { useState } from 'react';
import './App.css';
import Slider from './Slider'
import SidebarItem from './SidebarItem'

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  },
  {
  name: 'Color Inversion',
    property: 'invert',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Transparency',
      property: 'opacity',
      value: 100,
      range: {
        min: 0,
        max: 100
      },
      unit: '%'
    }
  
]

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [history, setHistory] = useState([DEFAULT_OPTIONS]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const selectedOption = options[selectedOptionIndex];

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  function handleSliderChange({ target }) {
    const newOptions = options.map((option, index) =>
      index !== selectedOptionIndex ? option : { ...option, value: target.value }
    );

    setOptions(newOptions);
    setHistory((prevHistory) => [...prevHistory.slice(0, historyIndex + 1), newOptions]);
    setHistoryIndex((prevIndex) => prevIndex + 1);
  }

  function handleUndo() {
    if (canUndo) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setOptions(history[historyIndex - 1]);
    }
  }

  function handleRedo() {
    if (canRedo) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setOptions(history[historyIndex + 1]);
    }
  }

  function handleReset() {
    setHistory([DEFAULT_OPTIONS]);
    setHistoryIndex(0);
    setOptions(DEFAULT_OPTIONS);
  }

  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }

  console.log(getImageStyle())

  return (
    <div className="container">
      <div className="main-image" style={getImageStyle()} />
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => setSelectedOptionIndex(index)}
            />
          )
        })}
        <button onClick={handleUndo} disabled={!canUndo}>
          Undo
        </button>
        <button onClick={handleRedo} disabled={!canRedo}>
          Redo
        </button>
        <button onClick={handleReset} disabled={historyIndex === 0}>
          Reset
        </button>
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
    </div>
  )
}

export default App;