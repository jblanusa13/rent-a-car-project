Vue.component("addNewObject", {
  data: function () {
    return {
		rentACarObject:{id:null, name:null, availableCars:null, openingTime:null, closingTime:null, status:null, location:{longitude:null, latitude:null, address:null}, imageURL:'', rate:0.0},
		object:null,
		managerRegistration:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
		manager:{id:null, username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
		managerId:null,
		managers:null,
		confirmPassword:null,
		logo:null,
		userId:null,
		managerRegistered:false,
		nameValid:false,
		longitudeValid:false,
		latitudeValid:false,
		addressValid:false,
		openingValid:false,
		closingValid:false,
		logoValid:false,
		usernameValid:false,
		passwordValid:false,
		confirmValid:false,
		firstNameValid:false,
		lastNameValid:false,
		genderValid:false,
		birthValid:false,
		errortextRegistration:''
    }
  },
  template: `
	<div>
		<h1 style="margin-left:30%;">Add new rent a car object</h1>
		<form class="formStyle" style="margin-left:30%;">
			<fieldset>
				<div>
            		<label class="formInputs">Name:</label><br>
            		<input type="text" name="name" v-model="rentACarObject.name" class="formInputs" v-bind:class="{invalid: nameValid === false}">
          		</div><br>
          		<div>
            		<fieldset>
					<div id="map"></div>
					<legend>Location</legend>
						<div>
							<label class="formInputs">Longitude: </label><br>
							<input type="text" name="longitude" v-model="rentACarObject.location.longitude" class="formInputs" v-bind:class="{invalid: longitudeValid === false}">
						</div>
						<div>
							<label class="formInputs">Latitude: </label><br>
							<input type="text" name="latitude" v-model="rentACarObject.location.latitude" class="formInputs" v-bind:class="{invalid: latitudeValid === false}">
						</div>
						<div>
							<label class="formInputs">Address: </label><br>
							<input type="text" name="address" v-model="rentACarObject.location.address" class="formInputs" v-bind:class="{invalid: addressValid === false}">
						</div>
					</fieldset>
          		</div><br>
          		<div>
            		<label class="formInputs">Opening time:</label><br>
           		 	<input type="time" name="opening" v-model="rentACarObject.openingTime" class="formInputs" v-bind:class="{invalid: openingValid === false}">
          		</div>
          		<div>
            		<label class="formInputs">Closing time:</label><br>
            		<input type="time" name="closingTime" v-model="rentACarObject.closingTime" class="formInputs" v-bind:class="{invalid: closingValid === false}">
          		</div>
          		<div>
            		<label class="formInputs">Logo:</label><br>
            		<input type="file" id="file" ref="file" v-bind:class="{invalid: logoValid === false}"/>
          		</div><br>
			
			<form class="formStyle" style="margin-left:-10%;">
				<fieldset>
				<legend>Add manager for object</legend>
				<div v-if="!managers">
					<div v-if="!managerRegistered">
						<div>
            				<label class="formInputs">Username:</label><br>
							<input type="text" v-model="managerRegistration.username" name="username" class="formInputs" v-bind:class="{invalid: usernameValid === false}">
          				</div>
          				<div>
            				<label class="formInputs">Password:</label><br>
            				<input type="password" v-model="managerRegistration.password" name="password" class="formInputs" v-bind:class="{invalid: passwordValid === false}">
          				</div>
          				<div>
            				<label class="formInputs">Confirm Password:</label><br>
            				<input type="password" v-model="confirmPassword" name="confirmPassword" class="formInputs" v-bind:class="{invalid: confirmValid === false}">
          				</div>
          				<div>
            				<label class="formInputs">First Name:</label><br>
            				<input type="text" v-model="managerRegistration.name" name="firstName" class="formInputs" v-bind:class="{invalid: firstNameValid === false}">
          				</div>
          				<div>
           					<label class="formInputs">Last Name:</label><br>
            				<input type="text" v-model="managerRegistration.surname" name="lastName" class="formInputs" v-bind:class="{invalid: lastNameValid === false}">
          				</div>
          				<div>
            				<label class="formInputs">Gender:</label><br>
              				<select name="managerGender" v-model="managerRegistration.gender" class="formInputs" v-bind:class="{invalid: genderValid === false}">
                				<option value="">Select</option>
                				<option value="Male">Male</option>
                				<option value="Female">Female</option>
              				</select>
         	 			</div>
          				<div>
            				<label class="formInputs">Date of Birth:</label><br>
            				<input type="date" v-model="managerRegistration.birthDate" name="dateOfBirth" class="formInputs" v-bind:class="{invalid: birthValid === false}">
          				</div>
						<button type="submit" v-on:click="registerManager">Register</button>
					</tr>
					<p>{{ errortextRegistration }}</p>
					</div>
					<div v-else>
						<p><b>Manager succesfully added</b></p>
					</div>
				</div>
				
				<div v-else>
					<select name="managers" v-model="manager" class="formInputs">
							<option v-for="m in managers" :value="m">{{m.name}} {{m.surname}}</option>
					</select>
				</div>
				</fieldset>
			</form><br>
			<div>
			<button type="submit" v-on:click="confirm">Confirm</button>
			</div>
			</fieldset>
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
	confirm: function(){
		event.preventDefault();
		if(!this.rentACarObject.name){
			this.nameValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.nameValid=true;
			this.errortext='';
		}
		if(!this.rentACarObject.location.longitude){
			this.longitudeValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.longitudeValid=true;
			this.errortext='';
		}
		if(!this.rentACarObject.location.latitude){
			this.latitudeValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.latitudeValid=true;
			this.errortext='';
		}
		if(!this.rentACarObject.location.address){
			this.addressValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.addressValid=true;
			this.errortext='';
		}
		
		if(!this.rentACarObject.openingTime){
			this.openingValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.openingValid=true;
			this.errortext='';
		}
		if(!this.rentACarObject.closingTime){
			this.closingValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.closingValid=true;
			this.errortext='';
		}
		if(!this.rentACarObject.imageURL){
			this.logoValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.logoValid=true;
			this.errortext='';
		}
		if(!this.manager){
			this.errortext='All fields are required';
		}
		else{
			this.errortext='';
		}
		//logo
		this.logo = this.$refs.file.files[0];
		console.log(this.logo);
		console.log(this.rentACarObject.name);
		console.log(this.rentACarObject.location.latitude);
		console.log(this.rentACarObject.location.longitude);
		console.log(this.rentACarObject.location.address);
		console.log(this.rentACarObject.openingTime);
		console.log(this.rentACarObject.closingTime);
		
		this.rentACarObject.imageURL = "images/objects/"+this.logo.name;
		console.log(this.rentACarObject.imageURL);
		
		if(this.rentACarObject.name && this.rentACarObject.location.longitude && this.rentACarObject.location.latitude
		&& this.rentACarObject.location.address && this.rentACarObject.openingTime && this.rentACarObject.closingTime
		&& this.rentACarObject.imageURL && this.manager){
			axios.post('rest/objects/registerObject/', this.rentACarObject)
				.then(response=>{
					console.log("Uspesno registrovan objekat");
					this.object = response.data;
					console.log(this.object.id);
					console.log(this.object);
				
					axios.put('rest/user/setManagerObject/'+this.manager.id, this.object)
						.then(response=>{
								console.log("Dodat objekat menadzeru");
								this.managerId = response.data;
								alert('Object succesfully created');
						})
						.catch(error=>console.log(error))
				})
				.catch(error=> console.log(error))

			router.push(`/loggedInAdmin/${this.userId}`);
		}
	},
	registerManager: function(){
		event.preventDefault();
		if(!this.managerRegistration.username){
			this.usernameValid=false;
		}
		else{
			this.usernameValid=true;
		}
		if(!this.managerRegistration.password){
			this.passwordValid=false;
		}
		else{
			this.passwordValid=true;
		}
		if(!this.confirmPassword){
			this.confirmValid=false;
		}
		else{
			this.confirmValid=true;
		}
		if(this.managerRegistration.password !== this.confirmPassword){
			this.confirmValid=false;
			this.errortextRegistration = 'Passwords do not match';
		}
		else{
			this.confirmValid=true;
			this.errortextRegistration = '';
		}
		if(!this.managerRegistration.name){
			this.firstNameValid=false;
		}
		else{
			this.firstNameValid=true;
		}
		
		if(!this.managerRegistration.surname){
			this.lastNameValid=false;
		}
		else{
			this.lastNameValid=true;
		}
		if(!this.managerRegistration.gender){
			this.genderValid=false;
		}
		else{
			this.genderValid=true;
		}
		if(!this.managerRegistration.birthDate){
			this.birthValid=false;
		}
		else{
			var today = new Date();
	  		var selectedDate = new Date(this.managerRegistration.birthDate);
	  
	  		if (selectedDate >= today) {
	    		this.birthValid=false;
	    		this.errortextRegistration = 'Birth date must be in the past';
	    		return;
	  		} else {
	   			this.birthValid=true;
	    		this.errortextRegistration = '';
	  		}
		}
		
		if(this.managerRegistration.username && this.managerRegistration.password && this.confirmPassword &&
			this.managerRegistration.name && this.managerRegistration.surname && this.managerRegistration.gender &&
			this.managerRegistration.birthDate){
			axios.post('rest/user/register/m/', this.managerRegistration)
  			.then(response => {
		    	this.manager = response.data;
		    	console.log(`Manager id: ${this.manager.id}`)
				this.managerRegistered = true;
  				})
			}
		}
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
	}
});