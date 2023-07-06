Vue.component("addNewObject", {
  data: function () {
    return {
		rentACarObject:{id:null, name:null, availableCars:null, openingTime:null, closingTime:null, status:null, location:{longitude:null, latitude:null, address:null}, imageURL:'', rate:0.0},
		managerRegistration:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
		manager:{id:null, username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
		managerId:null,
		managers:null,
		confirmPassword:null,
		logo:null,
		userId:null
    }
  },
  template: `
	<div>
		<h2>Add new rent a car object</h2>
		<form>
			<table>
				<tr>
            		<td>Name:</td>
            		<td><input type="text" name="name" v-model="rentACarObject.name"></td>
          		</tr>
          		<tr>
            		<td>Location:</td>
            		<div id="map"></div>
            		<td>
						<table>
							<tr>
								<td>Longitude: </td>
								<td><input type="text" name="longitude" v-model="rentACarObject.location.longitude"></td>
							</tr>
							<tr>
								<td>Latitude: </td>
								<td><input type="text" name="latitude" v-model="rentACarObject.location.latitude"></td>
							</tr>
							<tr>
								<td>Address: </td>
								<td><input type="text" name="address" v-model="rentACarObject.location.address"></td>
							</tr>
						</table>
					</td>
          		</tr>
          		<tr>
            		<td>Opening time:</td>
           		 	<td><input type="time" name="opening" v-model="rentACarObject.openingTime" ></td>
          		</tr>
          		<tr>
            		<td>Closing time:</td>
            		<td><input type="time" name="closingTime" v-model="rentACarObject.closingTime" ></td>
          		</tr>
          		<tr>
            		<td>Logo:</td>
            		<td><input type="file" id="file" ref="file"/></td>
          		</tr>
			</table>
			<br>
			
			<form>
				<table v-if="!managers">
					<tr>
						<td>Add new manager for object: </td>
						<table>
						<tr>
            				<td>Username:</td>
            				<td><input type="text" v-model="managerRegistration.username" name="username"></td>
          				</tr>
          				<tr>
            				<td>Password:</td>
            				<td><input type="password" v-model="managerRegistration.password" name="password"></td>
          				</tr>
          				<tr>
            				<td>Confirm Password:</td>
            				<td><input type="password" v-model="confirmPassword" name="confirmPassword"></td>
          				</tr>
          				<tr>
            				<td>First Name:</td>
            				<td><input type="text" v-model="managerRegistration.name" name="firstName"></td>
          				</tr>
          				<tr>
           					<td>Last Name:</td>
            				<td><input type="text" v-model="managerRegistration.surname" name="lastName"></td>
          				</tr>
          				<tr>
            				<td>Gender:</td>
            				<td>
              				<select name="managerGender" v-model="managerRegistration.gender">
                				<option value="">Select</option>
                				<option value="Male">Male</option>
                				<option value="Female">Female</option>
              				</select>
            				</td>
         	 			</tr>
          				<tr>
            				<td>Date of Birth:</td>
            				<td><input type="date" v-model="managerRegistration.birthDate" name="dateOfBirth"></td>
          				</tr>
						</table>
						<button type="submit" v-on:click="registerManager">Register</button>
					</tr>
				</table>
				<table v-else>
					<tr>
						<td>Choose manager for object: </td>
						<td><select name="managers" v-model="manager">
							<option v-for="m in managers" :value="m">{{m.name}} {{m.surname}}</option>
						</select></td>
					</tr>
				</table>
			</form>
			
			<button type="submit" v-on:click="confirm">Confirm</button>
		</form>
	</div>
  `,
  mounted() {
	this.userId =this.$route.params.id;
	axios.get('rest/user/managers/')
		.then(response =>{
				this.managers = response.data;				
		})
		.catch(error => console.log(error));
		
	//adding Map	
	const map = new ol.Map({
	  target: 'map',
	  layers: [
	    new ol.layer.Tile({
	      source: new ol.source.OSM(),
	    })
	  ],
	  view: new ol.View({
	    center: ol.proj.fromLonLat([0, 0]),
	    zoom: 2,
	  })
	});
	
	const marker = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [
				new ol.Feature({
					geometry: new ol.geom.Point(
						ol.proj.fromLonLat([0, 0])
					)
				})
			]
		}),
		style: new ol.style.Style({
			image: new ol.style.Icon({
				src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
				anchor: [0.5,1]
			})
		})
	})
	
	map.addLayer(marker);
	
	this.mapObject = map;
	this.markerObject = marker;
	
	const vec = new ol.layer.Vector({
	  source: new ol.source.Vector(),
	});
	  		
	map.on('click', (event) => {
	  var cor = ol.proj.toLonLat(event.coordinate);
	  this.convertToMyCoordinates(cor);
	  vec.getSource().clear();
	  
	  var mapMarker = new ol.Feature({
		  geometry: new ol.geom.Point(event.coordinate),
	  });
	  
	  vec.getSource().addFeature(mapMarker);
	  
	  this.moveMarker(event.coordinate);
   });
   
  },
  methods: {
  confirm(event) {
    event.preventDefault();
    this.logo = this.$refs.file.files[0];
    console.log(this.logo);
    console.log(this.rentACarObject.name);
    console.log(this.rentACarObject.location.latitude);
    console.log(this.rentACarObject.location.longitude);
    console.log(this.rentACarObject.location.address);
    console.log(this.rentACarObject.openingTime);
    console.log(this.rentACarObject.closingTime);

    this.rentACarObject.imageURL = "images/objects/" + this.logo.name;
    console.log(this.rentACarObject.imageURL);

    axios
      .post('rest/objects/registerObject/', this.rentACarObject)
      .then(response => {
        console.log("Successfully registered object");
        this.rentACarObject = response.data;
        console.log(this.rentACarObject);
      })
      .catch(error => console.log(error));

    console.log(this.manager.id);
    console.log(this.manager.name);
    console.log(this.manager.surname);
    axios
      .post('rest/user/setManagerObject/' + this.manager.id, this.rentACarObject)
      .then(response => {
        console.log("Added object to the manager");
        this.managerId = response.data;
      })
      .catch(error => console.log(error));

    router.push(`/loggedInAdmin/${this.userId}`);
  },

  registerManager(event) {
    event.preventDefault();
    axios
      .post('rest/user/register/m/', this.managerRegistration)
      .then(response => {
        this.manager = response.data;
        console.log(`Manager id: ${this.manager.id}`);
      })
      .catch(error => console.log(error));
  },

  moveMarker: function (lonLatCoordinates) {
    const marker = this.markerObject.getSource();
    marker.clear();

    const mapMarker = new ol.Feature({
      geometry: new ol.geom.Point(lonLatCoordinates)
    });

    marker.addFeature(mapMarker);
  },

  convertToMyCoordinates : function(lonLatCoordinates){
		fetch(
			"http://nominatim.openstreetmap.org/reverse?format=json&lon=" + lonLatCoordinates[0] + "&lat=" + lonLatCoordinates[1]
	  		).then(response => { return response.json(); }).then(json => 
		  	{
			  let address = json.address;
			  let street = address.road;
			  let number = address.house_number;
			  let livingPlace = address.town || address.village || address.city;
			  let cityPostal = address.postcode;
			  
			  this.rentACarObject.location.address = String(street + " " + number + " " + livingPlace + " " + cityPostal);
			  
			  let boundingbox = json.boundingbox;
			  let geoLength = Math.abs(parseFloat(boundingbox[3]) - parseFloat(boundingbox[1]));
		   	  let geoWidth = Math.abs(parseFloat(boundingbox[2]) - parseFloat(boundingbox[0]));
				
			  this.rentACarObject.location.longitude = Number(geoLength.toFixed(3));
      		  this.rentACarObject.location.latitude = Number(geoWidth.toFixed(3));
		  	})
	},
  
  
  
  
}

});