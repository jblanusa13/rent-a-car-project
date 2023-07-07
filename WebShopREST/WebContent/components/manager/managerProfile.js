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
		<form class="formStyle">
		<fieldset>
				<div>
            		<label class="formInputs">Username:</label><br>
            		<input type="text" name="username" v-model="user.username" disabled class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Password:</label><br>
            		<input type="password" name="password" v-model="user.password" disabled class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">First Name:</label><br>
           		 	<input type="text" name="firstName" v-model="user.name" disabled class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Last Name:</label><br>
            		<input type="text" name="lastName" v-model="user.surname" disabled class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Gender:</label><br>
            		<input type="text" name="gender" v-model="user.gender" disabled class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Date of birth:</label><br>
            		<input type="text" name="date" v-model="userDate" disabled class="formInputs">
          		</div>
			<br>
			<button type="submit" v-on:click="editUser">Update user info</button>
		
		<br><br>
			<table>
				<colgroup>
		          <col style="width: 15%;">
		          <col style="width: 10%;">
		        </colgroup>
				<td>
		        	<img :src="object.imageURL" alt="Logo" style="width: 50%; height: auto;">
		        </td>
				<td>
					<h4 style="margin-right:20%;">Rent a car object</h4>
				</td>
			</table>
				<div>
            		<label class="formInputs">Name:</label><br>
            		<input type="text" name="lastName" v-model="object.name" disabled class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Address:</label><br>
            		<input type="text" name="gender" v-model="object.location.address" disabled class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Rate:</label><br>
            		<input type="text" name="date" v-model="object.rate" disabled class="formInputs">
          		</div><br>
		<button id="deactivateBtn" type="submit" v-on:click="deactivateAccount">Deactivate Account</button><br>
		<label id="statusLabel" style="display: none;"></label><br>
		</fieldset><br>
		<button type="submit" v-on:click="goBack">Home page</button>
		</form>
    </div>
  `,
  mounted() {
	this.userId =this.$route.params.id
	console.log("id usera u profilu je:"+this.userId)
	
	axios.get('rest/user/profile/'+this.userId)
		.then(response => {
			this.user = response.data
			this.object = this.user.rentACar;
			console.log(this.object);
		})
		.catch(error => console.log(error))
		
	axios.get('rest/user/birthDate/'+this.userId)
		.then(response => {
			this.userDate = response.data
		})
		.catch(error => console.log(error))
		
  },
  methods: {
    editUser: function () {
      event.preventDefault();
      router.push(`/userProfileUpdate/${this.userId}`);
    },
	goBack: function () {
      event.preventDefault();
      router.push(`/loggedInManager/${this.userId}`);
    },
    deactivateAccount: function() {
	  event.preventDefault();
	  
	  var confirmation = confirm("Are you sure that you want to deactivate the account?");
	  if (confirmation) {
	    console.log("Account is deactivated");
	    axios
	      .post("rest/user/userDeactivated/"+this.userId)
	      .then((response) => {
	        console.log("Deactivation of user account");
	        router.push(`/`);
	        return;
	      })
	      .catch((error) => console.log(error));
	  } else {
	    var statusLabel = document.createElement("label");
	    statusLabel.textContent = "Account is still active";
	    document.body.appendChild(statusLabel);
	  }
	}
  }
  
});
