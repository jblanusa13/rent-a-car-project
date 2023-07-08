Vue.component("user-update", {
  data() {
    return {
      user:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
      updatedUser:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
      userId:null,
      confirmPassword: '',
      errortext: "",
      userId:null,
	  userDate:null,
	  dateString: null,
    };
  },
  template: `
    <div>
      <h2>Update User Info</h2>
      <div class="center-position">
      <form v-if="user" class="formStyle">
		<fieldset>
				<div>
            		<label class="formInputs">Username:</label><br>
            		<input type="text" name="username" v-model="user.username" class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Password:</label><br>
            		<input type="password" name="password" v-model="user.password" class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Confirm password:</label><br>
            		<input type="password" name="confirmPassword" v-model="confirmPassword" class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">First Name:</label><br>
           		 	<input type="text" name="name" v-model="user.name" class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Last Name:</label><br>
            		<input type="text" name="surname" v-model="user.surname" class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Gender:</label><br>
            		<input type="text" name="gender" v-model="user.gender" class="formInputs">
          		</div>
          		<div>
            		<label class="formInputs">Date of birth:</label><br>
            		<input type="text" name="birthDate" v-model="userDate" class="formInputs">
          		</div>
			<br>
			<button type="submit" v-on:click="updateUser">Save</button><br>
		</fieldset>
		<br><br>
        <button v-on:click="goToUserProfile">Cancel</button><br>
      </form>
      </div>
      <div class="center-position">
      <p v-if="errortext">{{ errortext }}</p>
      </div>
    </div>
  `,
  mounted() {
    this.userId = this.$route.params.id;
    console.log('finding user')
    console.log(this.$route.params.id)
    
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
    updateUser: function() {
		event.preventDefault();
		console.log("User updating");

		if (!this.user.username) {
		  document.getElementsByName("username")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  this.updatedUser.username=this.user.username;
		  document.getElementsByName("username")[0].style.background = "white";
		  this.errortext = '';
		}
		
		if (!this.user.password) {
		  document.getElementsByName("password")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  this.updatedUser.password=this.user.password;
		  document.getElementsByName("password")[0].style.background = "white";
		  this.errortext = '';
		}
		if (this.updatedUser.password != this.confirmPassword) {
	      document.getElementsByName("confirmPassword")[0].style.background = "red";
	      this.errortext = 'Passwords do not match';
	      return;
	    } else {
	      document.getElementsByName("confirmPassword")[0].style.background = "white";
	      this.errortext=''
	    }
		if (!this.user.name) {
		  document.getElementsByName("name")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  this.updatedUser.name=this.user.name;
		  document.getElementsByName("name")[0].style.background = "white";
		  this.errortext = '';
		}
		
		if (!this.user.surname) {
		  document.getElementsByName("surname")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  this.updatedUser.surname=this.user.surname;
		  document.getElementsByName("surname")[0].style.background = "white";
		  this.errortext = '';
		}
		
		if (!this.user.gender) {
		  document.getElementsByName("gender")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  this.updatedUser.gender=this.user.gender;
		  document.getElementsByName("gender")[0].style.background = "white";
		  this.errortext = '';
		}
		
		if (!this.userDate) {
		  document.getElementsByName("birthDate")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  this.updatedUser.birthDate = document.getElementsByName("birthDate")[0].value;
		  console.log(`Birthday should be ${this.userDate}`);
		  console.log(`Birthday is actually ${this.updatedUser.birthDate}`);
		  document.getElementsByName("birthDate")[0].style.background = "white";
		  this.errortext = '';
		}

		console.log(`Username ${this.updatedUser.username}`);
		console.log(`Password ${this.updatedUser.password}`);
		console.log(`Name ${this.updatedUser.name}`);
		console.log(`Surname ${this.updatedUser.surname}`);
		console.log(`Gender ${this.updatedUser.gender}`);
		console.log(`Birthday ${this.updatedUser.birthDate}`);
		console.log("User updating");
		
  		axios.put(`rest/user/update/${this.userId}`, this.updatedUser)
    		.then(response => {
     		 console.log("User updated successfully");
      		console.log("Uloga korisnika:"+this.user.role)
	        if (this.user.role === 'Administrator') {
	          router.push({ path: `/adminProfile/${this.user.id}` });
	        } else if (this.user.role === 'Customer') {
	          router.push({ path: `/customerProfile/${this.user.id}` });
	        } else if (this.user.role === 'Manager') {
	          router.push({ path: `/managerProfile/${this.user.id}` });
	        } else {
	          this.errortext = 'Invalid user role';
	        }
    	})
    	.catch(error => {
     		 this.errortext = "An error occurred while updating user data";
				console.log(error);
    		});
	},
    goToUserProfile() {
		console.log("Uloga korisnika:"+this.user.role)
        if (this.user.role === 'Administrator') {
          router.push({ path: `/adminProfile/${this.user.id}` });
        } else if (this.user.role === 'Customer') {
          router.push({ path: `/customerProfile/${this.user.id}` });
        } else if (this.user.role === 'Manager') {
          router.push({ path: `/managerProfile/${this.user.id}` });
        } else {
          this.errortext = 'Invalid user role';
        }
    }
  }
});