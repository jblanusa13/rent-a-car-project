Vue.component("customer-profile", {
  data: function () {
    return {
		userId:null,
		user:null,
		userDate:null
    }
  },
  template: `
    <div>
		<h2>Profile</h2>
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
			<div>
				<table>
					<tr>
	            		<td>Collected points:</td>
	            		<td><input type="text" name="points" v-model="user.collectedPoints" disabled></td>
	          		</tr>
					<tr>
						<td>Customer type:</td>
           				<td><input type="text" name="type" v-model="user.customerType.typeName" disabled></td>
					</tr>
					<tr>
						<td>Discount:</td>
            			<td><input type="text" name="discount" v-model="user.customerType.discount" disabled></td>
					</tr>
					<tr>
						<td>Required points:</td>
           				<td><input type="text" name="points" v-model="user.customerType.requiredPoints" disabled></td>
					</tr>
				</table>
			</div>
		</form>
		<br>
		<button id="deactivateBtn" type="submit" v-on:click="deactivateAccount">Deactivate Account</button>
		<label id="statusLabel" style="display: none;"></label>
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
  },
  methods: {
    editUser: function () {
      event.preventDefault();
      router.push(`/userProfileUpdate/${this.userId}`);
    },
	goBack: function () {
      event.preventDefault();
      router.push(`/loggedInCustomer/${this.userId}`);
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
