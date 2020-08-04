import React from 'react';
import './fpltable.css';



class fTable extends React.Component {
constructor(props) {
	super(props);
	this.state = {	
    search: '',
    country: '',
    start: '',
    end: '',
    data: [],
    land: [],
    sort: {
    column: null,
    direction: {
      id:'',
      name_1: '',
      countryname: '',
      p2018: '',
      calc: '',
      calc2: '',
      highest: '',
      lowest: ''
    },
    currentpage: '',
    playersperpage: ''
  }
	};
  this.onSort = this.onSort.bind(this)
  this.updateEnd = this.updateEnd.bind(this)
  this.updateStart = this.updateStart.bind(this)

}

componentDidMount() {
  //this.setState({data: this.props.data})
  this.setState({country: 0})
  this.setState({land: this.props.land})
  this.setState({direction: {
    id: 'dsc',
    name_1: 'dsc',
    countryname: 'dsc',
    p2018: 'dsc',
    calc: 'asc',
    calc2: 'asc',
    highest: 'asc',
    lowest: 'asc'
  }})
  this.setState({start: 0})
  this.setState({end: 0})
  this.setState({currentpage: 1, playersperpage: 100})

  this.setState({data: this.updateData(this.props.data)})




}

updateData(data) {

      var first = data
      first.map((row) => {
      this.calculatingHighest(row)
      this.calculatingLowest(row)
      row.calc = row.p2019_this_gameweek
      row.calc2 = row.p2019_this_gameweekpoints
      return row
      })
      return first
}


updateSearch(event) {
	this.setState({search: event.target.value})

}

async updateCountry(event) {
  await this.setState({country: event.target.value})

    let countryFiltered;
    console.log(this.state.country)

    if(this.state.country === '-1' ) {
      countryFiltered = this.props.data
      console.log("helloooo")
    }
    else {
    countryFiltered = this.props.data.filter(players => players.country === this.state.country)
    }
    await this.setState({data: countryFiltered})

}

async updateStart(event) {
  await this.setState({start: Number(event.target.value)})
    let updateAverages = this.state.data
  updateAverages.map((row) => {
      this.calculatingAverages(row)
      return row
  })
  await this.setState({data: updateAverages})
}

async updateEnd(event) {
  await this.setState({end: Number(event.target.value)})

  let updateAverages = this.state.data
  updateAverages.map((row) => {
      this.calculatingAverages(row)
      return row
  })

  await this.setState({data: updateAverages})

}

updateRows(event) {
  this.setState({playersperpage: Number(event.target.value)})
}



calculatingAverages(row) {


  var start = this.state.start  
  var end = this.state.end

  const roll = ['p2019_this_gameweek', 'p2018', 'p2017','p2016','p2015','p2014','p2013','p2012','p2011','p2010', 'p2009', 'p2008', 'p2007', 'p2006'];
  const roll2 = ['p2019_this_gameweekpoints', 'p2018_tot','p2017_tot','p2016_tot','p2015_tot','p2014_tot','p2013_tot','p2012_tot','p2011_tot','p2010_tot','p2009_tot','p2008_tot','p2007_tot','p2006_tot']
  let calcs = 0;
  let calcs2 = 0;
  let diff = 0;


  for (var k = start; k >= end; k--) {
    calcs += Number(row[roll[k]]) 
    diff++
  }
  row.calc = Math.round(calcs/diff)

  diff = 0;

  for (var i = start; i >= end; i--) {
    calcs2 += Number(row[roll2[i]]) 
    diff++
  }
  row.calc2 = Math.round(calcs2/diff)

  return row
}

calculatingHighest(data) {
    var seasons = [];
    seasons.length = 14;
    const roll = ['p2019_this_gameweek', 'p2018', 'p2017','p2016','p2015','p2014','p2013','p2012','p2011','p2010', 'p2009', 'p2008', 'p2007', 'p2006'];
    for (var i = 0; i < seasons.length; i++) {
      if (data[roll[i]] === "NULL") {}
      else {
      seasons[i] = Number(data[roll[i]])
    }}
    var max = seasons.reduce(function(a,b) {
      return Math.min(a,b)
    })
    data.highest = max
    return data
}

calculatingLowest(data) {

  var seasons = []
  seasons.length = 14
  const roll = ['p2019_this_gameweek', 'p2018', 'p2017','p2016','p2015','p2014','p2013','p2012','p2011','p2010', 'p2009', 'p2008', 'p2007', 'p2006'];
  for (var i = 0; i < seasons.length; i++) {
    if (data[roll[i]] === "NULL") {
    }
    else {
    seasons[i] = Number(data[roll[i]])
    }
  }
  var max = seasons.reduce(function(a,b) {
    return Math.max(a,b)
  })
  data.lowest = max
  return data
}


onSort(event, sortKey){
    const data = this.state.data;
    const dir = this.state.direction[sortKey]
    if (dir === 'dsc') 
    {
      if (sortKey === 'name_1' || sortKey === 'countryname') {
        data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
      } else {
        
        data.sort(function(a,b) {

          if (isNaN(a[sortKey])) {
            return 1;
          }
          else if (isNaN(b[sortKey])) {
            return -1;
          }

          return (Number(a[sortKey]) - Number(b[sortKey]))
        })
      }
      this.setState({data})
      this.setState(prevState => ({
          direction: {                   // object that we want to update
              ...prevState.direction,    // keep all other key-value pairs
              [sortKey]: 'asc'       // update the value of specific key
          }
      }))
    }

    else if (dir === 'asc') 
    {
      if (sortKey === 'name_1' || sortKey === 'countryname') {
        data.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
      }
      else {
        
        data.sort(function(a,b) {

          if (isNaN(b[sortKey])) {
            return 1;
          }
          else if (isNaN(a[sortKey])) {
            return -1;
          }

          return (Number(b[sortKey]) - Number(a[sortKey]))
        })
      }
      this.setState({data: data})   
      this.setState(prevState => ({
          direction: {                   // object that we want to update
              ...prevState.direction,    // keep all other key-value pairs
              [sortKey]: 'dsc'       // update the value of specific key
          }
      }))
    }

    const obj = this.state.direction
    Object.keys(obj).forEach(key => {
     if (key !== sortKey) 
      {obj[key] = 'dsc'} 
      });
}


render(){

 // let updateAverages = this.state.data
 // updateAverages.map((row) => {
 //     this.calculatingAverages(row)
 // })


  let searchFiltered = this.state.data.filter(
    (players) => {
      return players.name_1.indexOf(this.state.search) !== -1 || players.id.indexOf(this.state.search) !== -1;
    })
// let countryFiltered = searchFiltered.filter(
//   (players) => {
//    if (this.state.country === 0) {
//        return players.country
//    }
//    else  {
//       return players.country === this.state.country
//         }
//   })

  //const indexOfLastPlayer = this.state.currentpage * this.state.playersperpage;
  // const indexOfFirstPlayer = indexOfLastPlayer - this.state.playersperpage;
  // const currentPlayers = this.state.data.slice(indexOfFirstPlayer, indexOfLastPlayer);

return (
  <div>	

      <div className="introbox">
    <p className = 'intro'>FANTASY PREMIER LEAGUE ALL TIME LADDER</p>    

    <div className="infobox">
    This datatable is based on data collection from the Fantasy Premier Leauge official unofficial API. The goal of this table is to identify fun statistics using historical data dating back to the start of FPL. Currently, the database only consists of the top 170k from 19/20-season. Improvements coming soon!
    </div>
    </div>        



            <div className="searchinput">
        <label>Search</label>
  <input className = 'searchs' 
  type='text' 
  placeholder='Name or id...'
  value = {this.state.search}
  onChange = {this.updateSearch.bind(this)}
  />
        </div>

      <div className="firstinput">
      <label>View</label>
      <div className="country">
        <select 
        className="selects"
        value = {this.state.country}
        onChange = {this.updateCountry.bind(this)}>    
        <option value='-1'>All players</option>
  {

    this.state.land.map((row, index) => (

  <option key={index} value={row.country}>
   {row.countryname}

  </option>


      ))
}

        </select>
      </div>
    </div>


    <div className="firstinput">
      <label className ="big">Period</label><br/>
      <label>From</label>
      <div className="country">      
              
        <select 
        className="selects2"
        value = {this.state.start}
        onChange = {this.updateStart}
        >
          <option value="0">19/20</option>
          <option value="1">18/19</option>
          <option value="2">17/18</option>
          <option value="3">16/17</option>
          <option value="4">15/16</option>
          <option value="5">14/15</option>
          <option value="6">13/14</option>
          <option value="7">12/13</option>
          <option value="8">11/12</option>
          <option value="9">10/11</option>
          <option value="10">09/10</option>
          <option value="11">08/09</option>
          <option value="12">07/08</option>
          <option value="13">06/07</option>

        </select>
      </div>        
        <label>To</label>
  <div className="country">
        <select 
          className="selects2"
          value = {this.state.end}
          onChange = {this.updateEnd}
          >
          <option value="0">19/20</option>
          <option value="1">18/19</option>
          <option value="2">17/18</option>
          <option value="3">16/17</option>
          <option value="4">15/16</option>
          <option value="5">14/15</option>
          <option value="6">13/14</option>
          <option value="7">12/13</option>
          <option value="8">11/12</option>
          <option value="9">10/11</option>
          <option value="10">09/10</option>
          <option value="11">08/09</option>
          <option value="12">07/08</option>
          <option value="13">06/07</option>

        </select>
      </div>  
  </div>





    <div className="alertbox">
    Players will get "NaN" if they have missing seasons in the selected period.
    </div>
<table>
  <thead>
    <tr>
<th>#</th>     
<th onClick={e => this.onSort(e, 'id')}>ID</th>
<th onClick={e => this.onSort(e, 'name_1')}>Full Name</th>
<th onClick={e => this.onSort(e, 'countryname')}>Country</th>
<th onClick={e => this.onSort(e, 'highest')}>All time best rank</th>
<th onClick={e => this.onSort(e, 'lowest')}>All time worst rank</th>
<th onClick={e => this.onSort(e, 'calc')}>Average Rank</th>
<th onClick={e => this.onSort(e, 'calc2')}>Average Score</th>


    </tr>
  </thead>
  <tbody>
  {
  	searchFiltered.map((row, index) => (

  <tr key={index} data-item={row}>
    <td className="number">{index+1}</td>
  	<td className ="idcss"><a target="_blank" rel="noopener noreferrer" href={'https://fantasy.premierleague.com/entry/'+ row.id+ '/history'}>{row.id}</a></td>
  	<td className="name">{row.name_1}</td>
  	<td className="name">{row.countryname}</td>
    <td className="extra">{row.highest}</td>
    <td className="extra">{row.lowest}</td>    
    <td className="avg">{row.calc}</td>  
    <td className="avg">{row.calc2}</td>


  </tr>


  		))
}
  </tbody>

</table>

        <select 
        className="selects"
        value = {this.state.playersperpage}
        onChange = {this.updateRows.bind(this)}
        >
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="250">250</option>
          <option value="500">500</option>
          <option value="3000">1000</option>
        </select>

  </div>

	);
}
}

export default fTable;