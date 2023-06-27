Vue.component("addNewObject", {
  data: function () {
    return {
		managerRegistration:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
		manager:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
		managers:null,
		name:null,
		longitude:null,
		latitude:null,
		address:null,
		openingTime:null,
		closingTime:null,
		confirmPassword:null,
		logoURL:null,
		logo:null
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
            		<td><input type="file" name="logo" @change="onFilePicked"></td>
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
							<option v-for="m in managers">{{m.name}} {{m.surname}}</option>
						</select></td>
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
				this.managers = response.data;				
		})
		.catch(error => console.log(error))
  },
  methods: {
	confirm: function(){
		event.preventDefault();
	},
	registerManager: function(){
		event.preventDefault();
		axios.post('rest/user/register/m/', this.managerRegistration)
  		.then(response => {
		    this.manager = response.data;
		    console.log(`Manager id: ${this.manager.id}`)
		    if(this.manager.id==null){
				this.errortext = 'This username is already in use. Try another one.';
		        document.getElementsByName("username")[0].style.background = "red";
				console.log(' user not found')
				return;
			}
			else
			{
				console.log('user found ')
				return;
			}
  			})
		}
	},
	onPickFile : function() {
		event.preventDefault();
  		this.$refs.fileInput.click()
	},
	onFilePicked : function(event) {
		event.preventDefault();
  		const files = event.target.files
  		let filename = files[0].name
  		const fileReader = new FileReader()
  		fileReader.addEventListener('load', () => {
    		this.logoURL = fileReader.result;
			console.log(this.logoURL);
  		})
  		fileReader.readAsDataURL(files[0])
  		this.logo = files[0]
	}
});