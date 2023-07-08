Vue.component("logInAdmin", {
  data: function () {
    return {
		objects:null,
		userId:null,
		selectedSortOption: null,
		stickType:"notSelected",
		fuelType:"notSelected",
		openObjects:false,
		name:null,
		vehicleType:null,
		city:null,
		averageRate:null
    }
  },
  template: `
    <div>
    <div class="right-position">
		<button class="top-right" type="submit" v-on:click="logOut">Log out</button>
	</div>
	<h3>Rent a car objects</h3>
	<div class="standard-left-margin">
		<form>
			<table>
				<tr>
					<td>
						Name:<br>
						<input type="text" v-model="name" id="name" name="name" >
					</td>
					<td>
						Vehicle type:<br>
						<input type="text" v-model="vehicleType" id="type" name="type" >
					</td>
					<td>
						City:<br>
						<input type="text" v-model="city" id="city" name="city" >
					</td>
					<td>
						Average rate:<br>
						<input type="text" v-model="averageRate" id="averageRate" name="averageRate" >
					</td>
					<td>
						<br>
						<button type="button" v-on:click="searchObjects">Search</button>
					</td>
				</tr>
			</table>
		</form><br>
	</div>
	<div class="standard-left-margin">
		<form>
			<table>
				<tr>
				<td for="vehicleTypeFilter">Stick type:<br>
			 	<select id="vehicleTypeFilter" v-model="stickType">
					<option value="Manual">Manual</option>
					<option value="Automatic">Automatic</option>
				</select>	
				</td>   	
		    	
		  		<td for="fuelTypeFilter">Fuel type:</label><br>
			 	<select id="fuelTypeFilter" v-model="fuelType">
					<option value="Diesel">Diesel</option>
					<option value="Gasoline">Gasoline</option>
					<option value="Hybrid">Hybrid</option>
					<option value="Electric">Electric</option>
				</select>
				</td>
				
				<td><br>
					<input type="checkbox" id="openObjects" name="openObjects" v-model="openObjects">
					<label for="openObjects">Open objects</label>
				</td>
				<td>
				<br><br>
				<button type="submit" v-on:click="filterObjects">Filter</button><br><br>
				</td>
				</tr>
		  	</table>
		</form>
	</div>
	<div class="standard-left-margin">
		<form>
			<table>
			<tr>
			<td>
		    <label for="sortOption">Sort by:</label><br>
		    <select id="sortOption" v-model="selectedSortOption">
		        <option value="rateAscending">Average rate (Ascending)</option>
		        <option value="rateDescending">Average rate (Descending)</option>
		        <option value="locationAscending">City (Ascending)</option>
		        <option value="locationDescending">City (Descending)</option>
		        <option value="nameAscending">Name of object (Ascending)</option>
		    	<option value="nameDescending">Name of object (Descending)</option>
		    </select>
			</td>
			<td><br><br>
				<button type="button" v-on:click="sortObjects">Sort</button><br><br>
			</td>
			</tr>
			<tr>
				<td><button type="submit" v-on:click="searchObjectsUndo">Undo search</button></td>
			</tr>
			</table>
		</form>
	</div><br>
	<table border='1' class="rental-object-table">
		<tr>
			<th></th>
			<th>Name</th>
			<th>Latitude</th>
			<th>Longitude</th>
			<th>Address</th>
			<th>Average rate</th>
		</tr>
		<tr v-for="o in objects">
			<td><img :src="o.imageURL" alt="Logo" style="width: 25%; height: auto;"></td>
			<td>{{o.name}}</td>
			<td>{{o.location.latitude}}</td>
			<td>{{o.location.longitude}}</td>
			<td>{{o.location.address}}</td>
			<td>{{o.rate}}</td>
			<td><button type="submit" v-on:click="showObject(o.id)">Show</button></td>
		</tr>
	</table><br><br>
	
	<div class="center-position">
		<button class="top-right" type="submit" v-on:click="profile">Profile</button>
		<button class="top-right" type="submit" v-on:click="addNew">Add new object</button>
		<button class="top-right" type="submit" v-on:click="allUsers">Show all users</button>
	</div>
</div>
  `,
  mounted() {
	this.userId =this.$route.params.id
	console.log("id usera:"+this.userId)
	
	axios.get('rest/objects/')
		.then(response => {
			this.objects = response.data
		})
		.catch(error => console.log(error))
  },
  methods: {
	profile: function () {
      	event.preventDefault();
		router.push(`/adminProfile/${this.userId}`);
    },
	addNew: function () {
      	event.preventDefault();
		router.push(`/addNew/${this.userId}`);
    },
	showObject: function (id) {
		event.preventDefault();
		const combinedParam = id+"_"+this.userId;
	    router.push(`/rentalObjectForAdmin/${combinedParam}`);
    },
	logOut: function () {
      	event.preventDefault();
		router.push(`/`);
    },
	sortObjects: function() {
		event.preventDefault();
		
		
	    if (this.selectedSortOption === 'rateAscending') {
	      axios
		      .put("rest/objects/objectsRateSortingAscending/", this.objects)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	      
	    } else if (this.selectedSortOption === 'rateDescending') {
		for(o of this.objects){
			console.log(o.id);
		}
	      axios
		      .put("rest/objects/objectsRateSortingDescending/", this.objects)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    } else if (this.selectedSortOption === 'locationAscending') {
	      axios
		      .put("rest/objects/objectsLocationSortingAscending/", this.objects)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    } else if (this.selectedSortOption === 'locationDescending') {
	      axios
		      .put("rest/objects/objectsLocationSortingDescending/", this.objects)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    }else if (this.selectedSortOption === 'nameAscending') {
			axios
		      .put("rest/objects/objectsNameSortingAscending/", this.objects)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
			
		}else if (this.selectedSortOption === 'nameDescending') {
			axios
		      .put("rest/objects/objectsNameSortingDescending/", this.objects)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
			
		}
	},
	searchObjectsUndo: function () {
		event.preventDefault();
		
		this.stickType="notSelected";
		this.fuelType="notSelected";
		this.openObjects=false;
		this.selectedSortOption=null;
		this.name=null;
		this.vehicleType=null;
		this.city=null;
		this.averageRate=null;
		
		axios
	      .get("rest/objects/")
	      .then((response) => {
	        this.objects = response.data;
	      })
	      .catch((error) => console.log(error));
    },
	filterObjects: function(){
		event.preventDefault();
		console.log(this.vehicleType);
		console.log(this.fuelType);
		console.log(this.openObjects);
		
		axios
	      .put("rest/objects/filterObjects/"+this.stickType+"/"+this.fuelType+"/"+this.openObjects, this.objects)
	      .then((response) => {
	        this.objects = response.data;
			console.log("zavrsio filter");
	      })
	      .catch((error) => console.log(error));
	},
	searchObjects: function(){
		console.log(this.name);
		console.log(this.vehicleType);
		console.log(this.city);
		console.log(this.averageRate);
		
		if(!this.name){
			this.name = null;
		}
		else if(!this.vehicleType){
			this.vehicleType = null;
		}
		else if(!this.city){
			this.city = null;
		}
		else if(!this.averageRate){
			this.averageRate = null;
		}
		
		axios
	      .put("rest/objects/searchObjects/"+this.name+"/"+this.vehicleType+"/"+this.city+"/"+this.averageRate, this.objects)
	      .then((response) => {
	        this.objects = response.data;
			console.log("zavrsio pretragu");
	      })
	      .catch((error) => console.log(error));
	},
    allUsers: function () {
      	event.preventDefault();
	    router.push(`/allUsersForAdmin/${this.userId}`);
    }
  }
});