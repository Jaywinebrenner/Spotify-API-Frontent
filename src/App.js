import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import PersonList from './components/PersonList'
import PersonInput from './components/PersonInput';
import Home from "./components/Home";
import queryString from 'query-string'

let defaultTextColor = "#C83616";
let defaultStyle = {
  color: defaultTextColor
}

let fakeServerData = {
  user: {
    name: "Ruprect",
    playlists: [
      {
        name: "Killer List",
        songs: [
          {name: "Beat it", duration: 1234},
          {name: "Kentucky fried friend", duration: 45255},
          {name:"Neighborhood Rat", duration: 1234}, 
          {name:"Dingos for lunch", duration: 1234},
          {name:"Powerful Ninja", duration: 1234},
          {name:"Too young to cook", duration: 1234},
        ],
      }
    ],
  },
};

const PlaylistCounter = (props) => {
  return(
    <div style={{...defaultStyle, width:'40%', display: 'inline-block'}}>
      <h2>{props.playlists && props.playlists.length} playlists</h2>
    </div>
  )
}

const HoursCounter = (props) => {
  console.log("PLAYLISTS ON HOURS COUNER", props.playlists);
    let allSongs = props.playlists.reduce((songs, eachPlaylist)=> {
    return songs.concat(eachPlaylist.songs)
  }, [])
  let totalDuration = allSongs.reduce((sum, eachSong) => {
    return sum +eachSong.duration
  }, 0)
  return (
    <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
      <h2>{Math.round(totalDuration/60)} hours</h2>
    </div>
  );
};

const Filter = (props) => {
  return(
    <div style={defaultStyle}>
      <img src=''/>
      <input onKeyUp={ e => props.onTextChange(e.target.value) } type='text' style={{width: '400px', height: '60px'}}/>
    </div>
  )
}

const Playlist = (props) => {
  return (
    <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
      <img src="" />
      <h3>{props.playlist.name}</h3>
      <ul>
        {props.playlist.songs.map(song => 
          <li>{song.name}</li>
          )}
      </ul>
    </div>
  );
}

function App() {
  const [serverData, setServerData] = useState({})
  const [filterString, setFilterString] = useState('')


  useEffect(() => {

    //Gets access token from URL
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;


    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((res) => res.json())
      .then((data) =>
        setServerData({
          user: {
            name: data.display_name,
          },
        }),
      );

    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: "Bearer " + accessToken },
    })
      .then((response) => response.json())
      .then((data) =>
        setServerData({
          playlists: data.items.map((item) => {
            console.log(data.items);
            return {
              name: item.name,
              songs: [],
            };
          }),
        }),
      );

  }, []);


  let playlistToRender = 
    serverData.user && 
    serverData.user.playlists 
    ? serverData.user.playlists
        .filter(playlist =>
        playlist.name.toLowerCase()
        .includes(filterString.toLowerCase())
  ) : []
            

  return (
    <div
      className="App"
      style={{ color: defaultTextColor, "font-size": "30px" }}
    >
      {serverData.user ? (
        <div>
          <h1>This is a Heroku Test</h1>
          <h1>{serverData.user.name}'s playlist</h1>
          <PlaylistCounter playlists={playlistToRender} />
          {/* <HoursCounter playlists={playlistToRender} /> */}
          <Filter
            onTextChange={(text) => {
              setFilterString(text);
            }} />

          {playlistToRender.map(playlist =>
            <Playlist playlist={playlist} />
          )}

          {/* {serverData.user.playlists
            .filter((playlist) =>
              playlist.name.toLowerCase().includes(filterString.toLowerCase()),
            )
            .map((playlist) => (
              <Playlist playlist={playlist} />
            ))} */}
        </div>
      ) : (
        <button 
        style={{marginTop: '50px', borderRadius: 5, padding: '20px', fontSize: '30' }}
        onClick={()=> window.location = 'http://localhost:8888/login'}
        >Sign In With Spotify</button>
      )}
    </div>
  );
}

export default App;
