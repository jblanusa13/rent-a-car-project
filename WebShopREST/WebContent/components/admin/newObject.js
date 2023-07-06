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
		.catch(error => console.log(error))
  },
  methods: {
	confirm: function(){
		event.preventDefault();
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
					})
					.catch(error=>console.log(error))
			})
			.catch(error=> console.log(error))

		router.push(`/loggedInAdmin/${this.userId}`);
	},
	registerManager: function(){
		event.preventDefault();
		axios.post('rest/user/register/m/', this.managerRegistration)
  		.then(response => {
		    this.manager = response.data;
		    console.log(`Manager id: ${this.manager.id}`)
  			})
		}
	}
});