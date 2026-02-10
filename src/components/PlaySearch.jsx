import React, { useState } from 'react';
import { searchNFLPlays } from '../services/nflDataService';
import './PlaySearch.css';

function PlaySearch({ onPlaySelect }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [team, setTeam] = useState('');
    const [season, setSeason] = useState('');
    const [playType, setPlayType] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const plays = await searchNFLPlays({ query: searchQuery, team, season, playType });
            setResults(plays);
        } catch (error) {
            console.error('Search error:', error);
            alert('Error searching plays');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="play-search">
            <h2>Search NFL Plays</h2>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search plays..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <select value={team} onChange={(e) => setTeam(e.target.value)}>
                    <option value="">All Teams</option>
                    <option value="KC">Kansas City Chiefs</option>
                    <option value="TB">Tampa Bay Buccaneers</option>
                    <option value="NE">New England Patriots</option>
                    <option value="SF">San Francisco 49ers</option>
                </select>
                <select value={season} onChange={(e) => setSeason(e.target.value)}>
                    <option value="">All Seasons</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>
                <select value={playType} onChange={(e) => setPlayType(e.target.value)}>
                    <option value="">All Play Types</option>
                    <option value="pass">Pass Play</option>
                    <option value="run">Run Play</option>
                    <option value="defense">Defensive Play</option>
                </select>
                <button type="submit" disabled={loading}> {loading ? 'Searching...' : 'Search'} </button>
            </form>
            <div className="results">
                {results.map((play, index) => (
                    <div key={index} className="play-item" onClick={() => onPlaySelect(play)}>
                        <h3>{play.title}</h3>
                        <p>{play.description}</p>
                        <small>{play.team} - {play.season}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlaySearch;