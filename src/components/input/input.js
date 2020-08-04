import React from 'react';
import './input.css';

const Input = () => {
	
return (
	<div>
		<div class="searchinput">
		<label>Search</label>
  		<input class = "searchs" type="text" placeholder="Search.."/>
  		</div>
		<div class="firstinput">
			<label>View</label>
			<div class="country">
			  <select class="selects">
			    <option selected value="0">All players</option>
			    <option value="1">USA</option>
			    <option value="2">Norway</option>
			    <option value="2">France</option>
			  </select>
			</div>
		</div>
		<div class="firstinput">
			<label>Find</label>
			<div class="country">
			  <select class="selects">
			    <option selected value="0">Average</option>
			    <option value="1">Best Season</option>
			    <option value="2">Worst Season</option>
			    <option value="3">Median</option>
			  </select>
			</div>
		</div>
		<div class="firstinput">
			<label class ="big">Period</label><br/>
			<label>From</label>
			<div class="country">			 
			  			
			  <select class="selects2">

			    <option selected value="0">18/19</option>
			    <option value="1">Norway</option>
			    <option value="2">Belguim</option>
			    <option value="3">Finland</option>
			  </select>
			  </div>			  
			  <label>To</label>
			  <div class="country">

			  	<select class="selects2">
			    <option selected value="0">19/20</option>
			    <option value="1">Norway</option>
			    <option value="2">Belguim</option>
			    <option value="3">Finland</option>
			  </select>
			  </div>

			
		</div>
		<div class="alertbox">
		Players with missing seasons will not get added when calculating over multiple seasons
		</div>

	</div>
	);
}

export default Input;