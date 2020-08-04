import React from 'react';
import './App.css';
import FTable from './components/table/fpltable.js';
import data from './components/dat10.json';
import land from './components/land.json';
import About from './components/about.js'
import Performance from './components/performance.js'
import SocialFollow from './components/SocialsFollow.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: data,
      land: land,
      route: 'alltime',
    }
  }

onRouteChange(page) {

this.setState({route: page})


}

font_style(id) {
  var style;
  id === this.state.route
  ? style = {'fontWeight': 'bold'}
  : style = {'fontWeight': 'normal'}
  return style
}

	render() {


    var json = this.state.land
json.sort(function(a, b){
    return (a['countryname']).localeCompare(b['countryname']);
});

  return (
    <div className="App">


        <div className= "Header">
          <div className = 'top'>
          <div className = 'middle'>
          <div className = 'logo'><a href='/#'>FPLAYER</a></div>
          <div className = 'nav'>
              <a href='/#' style={this.font_style('alltime')} onClick={e => this.onRouteChange('alltime')}>All time ladder</a>
              <a href='/#' style={this.font_style('performance')} onClick={e => this.onRouteChange('performance')}>Performance profile</a>
              <a href='/#' style={this.font_style('about')} onClick={e => this.onRouteChange('about')} >About</a>
            </div> 
          </div>


          </div>  
        </div>
        {
        this.state.route === 'alltime' 
        ? <FTable data = {this.state.data} land = {this.state.land}/>
        : this.state.route === 'about'
          ? <About />
          : <Performance />
        
        
        }

  <SocialFollow />
     

    </div>
  );
}
	}
export default App;
