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
		nameValid:true,
		longitudeValid:true,
		latitudeValid:true,
		addressValid:true,
		openingValid:true,
		closingValid:true,
		logoValid:true,
		usernameValid:true,
		passwordValid:true,
		confirmValid:true,
		firstNameValid:true,
		lastNameValid:true,
		genderValid:true,
		birthValid:true,
		errortextRegistration:'',
		errortext:'',
		errortextobject:''
    }
  },
  template: `
	<div>
		<h1 class="center-position">Add new rent a car object</h1>
		<div class="center-position">
		<form class="formStyle">
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
			<div class="center-position-newManager">
			<form class="formStyle" style="margin-right: 115px">
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
          				</div><br><br>
						<button type="submit" v-on:click="registerManager">Register</button>
					</tr>
					<p>{{ errortextRegistration }}</p>
					<p>{{ errortext }}</p>
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
			</form></div>
			<div><br><br>
			<button type="submit" v-on:click="confirm">Confirm</button>
			<p> {{ errortextobject }}</p>
			</div>
			</fieldset><br><br><br><br>
			<div class="center-position">      
          		<button type="submit" v-on:click="ShowAll">Go back</button>
      		</div>
		</form>
		</div>
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
	ShowAll: function () {
      event.preventDefault();
      router.push(`/loggedInAdmin/${this.userId}`);
    },
	confirm: function(){
		event.preventDefault();
		if(!this.rentACarObject.name){
			this.nameValid=false;
			this.errortextobject='All fields are required';
		}
		else{
			this.nameValid=true;
			this.errortextobject='';
		}
		if(!this.rentACarObject.location.longitude){
			this.longitudeValid=false;
			this.errortextobject='All fields are required';
		}
		else{
			this.longitudeValid=true;
			this.errortextobject='';
		}
		if(!this.rentACarObject.location.latitude){
			this.latitudeValid=false;
			this.errortextobject='All fields are required';
		}
		else{
			this.latitudeValid=true;
			this.errortextobject='';
		}
		if(!this.rentACarObject.location.address){
			this.addressValid=false;
			this.errortextobject='All fields are required';
		}
		else{
			this.addressValid=true;
			this.errortextobject='';
		}
		
		if(!this.rentACarObject.openingTime){
			this.openingValid=false;
			this.errortextobject='All fields are required';
		}
		else{
			this.openingValid=true;
			this.errortextobject='';
		}
		if(!this.rentACarObject.closingTime){
			this.closingValid=false;
			this.errortextobject='All fields are required';
		}
		else{
			this.closingValid=true;
			this.errortextobject='';
		}
		if(!this.rentACarObject.imageURL){
			this.logoValid=false;
			this.errortextobject='All fields are required';
		}
		else{
			this.logoValid=true;
			this.errortextobject='';
		}
		if(!this.manager){
			this.errortextobject='All fields are required';
		}
		else{
			this.errortextobject='';
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
		&& this.rentACarObject.imageURL && this.manager.id){
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
			this.errortext='All fields are required';
		}
		else{
			this.usernameValid=true;
			this.errortext='';
		}
		if(!this.managerRegistration.password){
			this.passwordValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.passwordValid=true;
			this.errortext='';
		}
		if(!this.confirmPassword){
			this.confirmValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.confirmValid=true;
			this.errortext='';
		}
		if(this.managerRegistration.password !== this.confirmPassword){
			this.confirmValid=false;
			this.errortextRegistration = 'Passwords do not match';
			this.errortext='All fields are required';
		}
		else{
			this.confirmValid=true;
			this.errortextRegistration = '';
			this.errortext='';
		}
		if(!this.managerRegistration.name){
			this.firstNameValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.firstNameValid=true;
			this.errortext='';
		}
		
		if(!this.managerRegistration.surname){
			this.lastNameValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.lastNameValid=true;
			this.errortext='';
		}
		if(!this.managerRegistration.gender){
			this.genderValid=false;
			this.errortext='All fields are required';
		}
		else{
			this.genderValid=true;
			this.errortext='';
		}
		if(!this.managerRegistration.birthDate){
			this.birthValid=false;
			this.errortext='All fields are required';
		}
		else{
			var today = new Date();
	  		var selectedDate = new Date(this.managerRegistration.birthDate);
	  
	  		if (selectedDate >= today) {
	    		this.birthValid=false;
	    		this.errortextRegistration = 'Birth date must be in the past';
				this.errortext='';
	    		return;
	  		} else {
	   			this.birthValid=true;
	    		this.errortextRegistration = '';
				this.errortext='';
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
		},
		
	moveMarker: function (lonLatCoordinates) {
    const markerSource = this.markerObject.getSource();
    markerSource.clear();

    const mapMarker = new ol.Feature({
      geometry: new ol.geom.Point(lonLatCoordinates)
    });

    markerSource.addFeature(mapMarker);
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
			  
			  this.rentACarObject.location.address = String(street + " " + number + "," + livingPlace + "," + cityPostal);
			  
			  let boundingbox = json.boundingbox;
			  let geoLength = Math.abs(parseFloat(boundingbox[3]) - parseFloat(boundingbox[1]));
		   	  let geoWidth = Math.abs(parseFloat(boundingbox[2]) - parseFloat(boundingbox[0]));
				
			  this.rentACarObject.location.longitude = Number(geoLength.toFixed(3));
      		  this.rentACarObject.location.latitude = Number(geoWidth.toFixed(3));
		  	})
	}	
	},
  
});