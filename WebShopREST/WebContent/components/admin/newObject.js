Vue.component("addNewObject", {
  data: function () {
    return {
		name:null,
		longitude:null,
		latitude:null,
		address:null,
		openingTime:null,
		closingTime:null,
		managers:null,
		managerName:null,
		managerLastName:null,
		managerUsername:null,
		managerPassword:null,
		confirmPassword:null,
		managerGender:null,
		managerDateOfBirth:null
    }
  },
  template: `
	<div>
		<h2>Add new rent a car object</h2>
		<form>
			<table>
				<tr>
            		<td>Name:</td>
            		<td><input type="text" name="name" v-model="name"></td>
          		</tr>
          		<tr>
            		<td>Location:</td>
            		<td>
						<table>
							<tr>
								<td>Longitude: </td>
								<td><input type="text" name="longitude" v-model="longitude"></td>
							</tr>
							<tr>
								<td>Latitude: </td>
								<td><input type="text" name="latitude" v-model="latitude"></td>
							</tr>
							<tr>
								<td>Address: </td>
								<td><input type="text" name="address" v-model="address"></td>
							</tr>
						</table>
					</td>
          		</tr>
          		<tr>
            		<td>Opening time:</td>
           		 	<td><input type="time" name="opening" v-model="openingTime" ></td>
          		</tr>
          		<tr>
            		<td>Closing time:</td>
            		<td><input type="time" name="closingTime" v-model="closingTime" ></td>
          		</tr>
          		<tr>
            		<td>Logo:</td>
            		<td><input type="file" name="logo" v-model="logoURL" ></td>
          		</tr>
			</table>
			<br>
			
			<form>
				<table v-if="managers != null">
					<tr>
						<td>Choose manager for object: </td>
						<td><select name="managers" v-for="m in managers">
							<option>{{m.name}} + {{m.surname}}</option>
						</select></td>
					</tr>
				</table>
				<table v-else>
					<tr>
						<td>Add new manager for object: </td>
						<table>
						<tr>
            				<td>Username:</td>
            				<td><input type="text" v-model="managerUsername" name="username"></td>
          				</tr>
          				<tr>
            				<td>Password:</td>
            				<td><input type="password" v-model="managerPassword" name="password"></td>
          				</tr>
          				<tr>
            				<td>Confirm Password:</td>
            				<td><input type="password" v-model="confirmPassword" name="confirmPassword"></td>
          				</tr>
          				<tr>
            				<td>First Name:</td>
            				<td><input type="text" v-model="managerName" name="firstName"></td>
          				</tr>
          				<tr>
           					<td>Last Name:</td>
            				<td><input type="text" v-model="managerLastName" name="lastName"></td>
          				</tr>
          				<tr>
            				<td>Gender:</td>
            				<td>
              				<select v-model="managerGender" name="gender">
                				<option value="">Select</option>
                				<option value="Male">Male</option>
                				<option value="Female">Female</option>
              				</select>
            				</td>
         	 			</tr>
          				<tr>
            				<td>Date of Birth:</td>
            				<td><input type="date" v-model="userRegistration.birthDate" name="dateOfBirth"></td>
          				</tr>
						</table>
						<button type="submit" v-on:click="registerManager">Register</button>
					</tr>
				</table>
			</form>
			
			<button type="submit" v-on:click="confirm">Confirm</button>
		</form>
	</div>
  `,
  mounted() {
	axios.get('rest/user/managers/')
		.then(response =>{
			if(!this.response){
				this.managers = this.response;	
			}		
		})
		.catch(error => console.log(error))
  },
  methods: {
	confirm: function(){
		
	},
	registerManager: function(){
		
	}
  }
});