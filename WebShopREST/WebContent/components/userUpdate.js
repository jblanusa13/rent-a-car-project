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
      <form v-if="user">
        <table>
          <tr>
            <td>Username:</td>
            <td><input type="text" v-model="user.username" name="username" ></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input type="password" v-model="user.password" name="password" ></td>
          </tr>
          <tr>
            <td>Confirm password:</td>
            <td><input type="password" v-model="confirmPassword" name="confirmPassword" ></td>
          </tr>
          <tr>
            <td>Name:</td>
            <td><input type="text" v-model="user.name" name="name" ></td>
          </tr>
          <tr>
            <td>Surname:</td>
            <td><input type="text" v-model="user.surname" name="surname" ></td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>
              <select v-model="user.gender" name="gender">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Birth Date:</td>
            <td><input type="date" v-model="userDate" name="birthDate" ></td>
          </tr>
        </table>
        <button type="submit" v-on:click="updateUser">Save</button>
        <button v-on:click="goToUserProfile">Cancel</button>
      </form>
      <p v-if="errortext">{{ errortext }}</p>
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
      		router.push(`/userProfile/${this.userId}`);
    	})
    	.catch(error => {
     		 this.errortext = "An error occurred while updating user data";
				console.log(error);
    		});
	},
    goToUserProfile() {
      router.push(`/userProfile/${this.userId}`);
    }
  }
});