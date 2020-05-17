import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import PersonList from './components/PersonList'
import PersonInput from './components/PersonInput';
import Home from "./components/Home";

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
      },
      {
        name: "Magical List",
        songs: [
          {name:"Turkey", duration: 134},
          {name:"Chickn", duration: 14},
          {name:"Upstairs Rat", duration: 164},
          {name:"Dingo Drippings", duration: 24},
          {name:"Ken", duration: 14},
          {name:"Legs", duration: 34},
        ],
      },
      {
        name: "Pillow List",
        songs: [
          {name:"Soft", duration: 124},
          {name:"Ball", duration: 1},
          {name:"Too old to cook", duration: 934},
          {name:"Dingos at Bingos", duration: 934},
          {name:"Net Ninja", duration: 767},
          {name:"Flippin burgers", duration: 14},
        ],
      },
      {
        name: "Bad List",
        songs: [
          {name:"Eat cake", duration: 14},
          {name:"Clam shells", duration: 34},
          {name:"Neighborhood Bat",duration: 34},
          {name:"Ringo Starr for lunch", duration: 34},
          {name:"Unhinged Rap Metal", duration: 14},
          {name:"Too young to Flip", duration: 14},
        ],
      },
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

function App(props) {
  const [serverData, setServerData] = useState({})
  const [filterString, setFilterString] = useState('')


  useEffect(() => {
    setTimeout(()=> {
    setServerData(fakeServerData)
    }, 1500)
  }, []);





  let playlistToRender = serverData.user ? serverData.user.playlists
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
          <h1>{serverData.user.name}'s playlist</h1>
          <PlaylistCounter playlists={playlistToRender} />
          <HoursCounter playlists={playlistToRender} />
          <Filter
            onTextChange={(text) => {
              setFilterString(text);
            }}
          />

          {serverData.user.playlists
            .filter((playlist) =>
              playlist.name.toLowerCase().includes(filterString.toLowerCase()),
            )
            .map((playlist) => (
              <Playlist playlist={playlist} />
            ))}
        </div>
      ) : (
        <h1 style={{ ...defaultStyle }}>'Loading...'</h1>
      )}
    </div>
  );
}

export default App;
