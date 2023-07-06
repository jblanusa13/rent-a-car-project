Vue.component("manager-profile", {
  data: function () {
    return {
		userId:null,
		user:null,
		userDate:null,
		object:{id:null, name:null, availableCars:null, openingTime:null, closingTime:null, status:null, location:{longitude:null, latitude:null, address:null}, imageURL:'', rate:0.0},
    }
  },
  template: `
    <div>
		<h2>Profile ({{user.role}})</h2>
		<form>
			<table>
				<tr>
            		<td>Username:</td>
            		<td><input type="text" name="username" v-model="user.username" disabled></td>
          		</tr>
          		<tr>
            		<td>Password:</td>
            		<td><input type="password" name="password" v-model="user.password" disabled></td>
          		</tr>
          		<tr>
            		<td>First Name:</td>
           		 	<td><input type="text" name="firstName" v-model="user.name" disabled></td>
          		</tr>
          		<tr>
            		<td>Last Name:</td>
            		<td><input type="text" name="lastName" v-model="user.surname" disabled></td>
          		</tr>
          		<tr>
            		<td>Gender:</td>
            		<td><input type="text" name="gender" v-model="user.gender" disabled></td>
          		</tr>
          		<tr>
            		<td>Date of birth:</td>
            		<td><input type="text" name="date" v-model="userDate" disabled></td>
          		</tr>
			</table>
			<br>
			<button type="submit" v-on:click="editUser">Update user info</button>
		</form>
		
		<br><br>
		
		<form>
			<table>
				<colgroup>
		          <col style="width: 10%;">
		          <col style="width: 15%;">
		        </colgroup>
				<tr>
					<td style="padding: 20px;">
		          	  <img :src="object.imageURL" alt="Logo" style="width: 100%; height: auto;">
		          	</td>
           			<td>
						<div style="display: inline-block; vertical-align: middle;">
							<div>
								Rent a car object: {{object.name}}
							</div>
							<div>
								Address: {{object.location.address}}
							</div>
							<div>
								Rate: {{object.rate}}
							</div>
						</div>
					</td>
       			</tr>
			</table>
		</form>

		<button type="submit" v-on:click="goBack">Home page</button>
    </div>
  `,
  mounted() {
	this.userId =this.$route.params.id
	console.log("id usera u profilu je:"+this.userId)
	
	axios.get('rest/user/profile/'+this.userId)
		.then(response => {
			this.user = response.data
		})
		.catch(error => console.log(error))
		
	axios.get('rest/user/birthDate/'+this.userId)
		.then(response => {
			this.userDate = response.data
		})
		.catch(error => console.log(error))
		
	this.object = this.user.rentACar;
  },
  methods: {
    editUser: function () {
      event.preventDefault();
      router.push(`/userProfileUpdate/${this.userId}`);
    },
	goBack: function () {
      event.preventDefault();
      router.push(`/loggedInManager/${this.userId}`);
    }
  }
  
});
