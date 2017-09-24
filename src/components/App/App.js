import React from 'react';
import logo from './logo.svg';
import './App.css';
import searchResults from '../SearchResutls/SearchResults';
import PlayList from '../PlayList/PlayList';
import SearchBar from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotigy';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           searchResults : [],
            playListName : 'New PlayList',
            playListTrack: []
            
        }
        this.search = this.search.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
    }
    
    search(term) {
        
      Spotify.search(term).then(searhResults => {
          this.setState({searchResults: searchResults});
      });
        
    }
     addTrack(track) {
    let tracks = this.state.playListTrack;
        if(!tracks.includes(track)){
            tracks.push(track);
            this.setState({playListTrack: tracks});
        }
        
    }
    
    removeTrack(track) {
       let tracks = this.state.playListTrack; 
        
        tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
        this.setState({playListTrack : tracks});
        
    }
    
    updatePlaylistName(name) {
        
       this.setState({playListName: name}); 
    }
    
    savePlaylist() {
        
      const trackURIs = this.state.playListTrack.map(track => track.uri);
        
        Spotify.savePlaylist(this.state.playListName, trackURIs).then(()=>{
            this.setState(
            {
                
                playListName : 'New Playlist',
                playListTrack: []
            }
            
            );
        });
        
    }
    
   
  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    < SearchBar onSearch={this.search} /> 
    <div className="App-playlist">
      < SearchResults searchResults ={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName}
        playlistTracks={this.state.playlistTracks}
        onRemove={this.removeTrack}
        onNameChange={this.updatePlaylistName}
        onSave={this.savePlaylist}
        />
    </div>
  </div>
</div>
    );
  }
}

export default App;




