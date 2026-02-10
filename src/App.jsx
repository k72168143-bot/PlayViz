import React, { useState } from 'react';
import PlaySearch from './components/PlaySearch';
import Visualization3D from './components/Visualization3D';
import SketchTool from './components/SketchTool';
import './App.css';

function App() {
    const [selectedPlay, setSelectedPlay] = useState(null);
    const [showSketch, setShowSketch] = useState(false);

    return (
        <div className="App">
            <header className="app-header">
                <h1>PlayViz - NFL Play Visualization</h1>
            </header>
            <div className="app-container">
                <aside className="sidebar">
                    <PlaySearch onPlaySelect={setSelectedPlay} />
                    <button onClick={() => setShowSketch(!showSketch)} className="sketch-toggle">
                        {showSketch ? 'Hide Sketch Tool' : 'Show Sketch Tool'}
                    </button>
                </aside>
                <main className="main-content">
                    {showSketch ? (
                        <SketchTool />
                    ) : selectedPlay ? (
                        <Visualization3D play={selectedPlay} />
                    ) : (
                        <div className="placeholder">
                            <p>Select a play to visualize or use the sketch tool to create custom plays</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;