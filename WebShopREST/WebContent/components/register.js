Vue.component("register", {
  data: function () {
    return {
	  userRegistration:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      errortext:'',
      user:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
      
    }
  },
  template: `
<div>
      <h2>Register Customer</h2>
      <div class="center-position">
      <form class="formStyle" style="margin-top:5%;">
		<fieldset>
          <div>
            <label class="formInputs">Username:</label><br>
            <input type="text" v-model="userRegistration.username" name="username" class="formInputs">
          </div>
          <div>
            <label class="formInputs">Password:</label><br>
            <input type="password" v-model="userRegistration.password" name="password" class="formInputs">
          </div>
          <div>
            <label class="formInputs">Confirm Password:</label><br>
            <input type="password" v-model="confirmPassword" name="confirmPassword" class="formInputs">
          </div>
          <div>
            <label class="formInputs">First Name:</label><br>
            <input type="text" v-model="userRegistration.name" name="firstName" class="formInputs">
          </div>
          <div>
            <label class="formInputs">Last Name:</label><br>
            <input type="text" v-model="userRegistration.surname" name="lastName" class="formInputs">
          </div>
          <div>
            <label class="formInputs">Gender:</label><br>
              <select v-model="userRegistration.gender" name="gender" class="formInputs">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
          </div>
          <div>
            <label class="formInputs">Date of Birth:</label><br>
            <input type="date" v-model="userRegistration.birthDate" name="dateOfBirth" class="formInputs">
          </div><br>
		<div>
        <button type="submit" v-on:click="registerCustomer"  class="formInputs">Register</button>
		</div><br>
		<div>
        <button v-on:click="goToLoginPage" class="formInputs">Go to Login</button>
		</div><br>
		</fieldset>
      </form>
      <p>{{ errortext }}</p>
      </div>
    </div>
  `,
  mounted () {
	   
    },
  methods: {
  registerCustomer: function () {
    event.preventDefault();

    // Validation checks
    if (!this.userRegistration.username) {
      document.getElementsByName("username")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("username")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.userRegistration.password) {
      document.getElementsByName("password")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("password")[0].style.background = "white";
      this.errortext=''
    }

    if (this.userRegistration.password !== this.confirmPassword) {
      document.getElementsByName("confirmPassword")[0].style.background = "red";
      this.errortext = 'Passwords do not match';
      return;
    } else {
      document.getElementsByName("confirmPassword")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.userRegistration.name) {
      document.getElementsByName("firstName")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("firstName")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.userRegistration.surname) {
      document.getElementsByName("lastName")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("lastName")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.userRegistration.gender) {
      document.getElementsByName("gender")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("gender")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.userRegistration.birthDate) {
      document.getElementsByName("dateOfBirth")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      var today = new Date();
	  var selectedDate = new Date(this.userRegistration.birthDate);
	  
	  if (selectedDate >= today) {
	    document.getElementsByName("dateOfBirth")[0].style.background = "red";
	    this.errortext = 'Birth date must be in the past';
	    return;
	  } else {
	    document.getElementsByName("dateOfBirth")[0].style.background = "white";
	    this.errortext = '';
	  }
    }

      axios.post('rest/user/register/c/', this.userRegistration)
  		.then(response => {
		    this.user = response.data;
		    console.log(`User id: ${this.user.id}`)
		    if(this.user.id==null){
				this.errortext = 'This username is already in use. Try another one.';
		        document.getElementsByName("username")[0].style.background = "red";
				console.log(' user not found')
				return;
			}
			else{
				console.log('user found ')
				router.push(`/logIn`);
				return;
			}
     
  } );
      
  },
 	goToLoginPage: function () {
	  event.preventDefault();
      router.push(`/logIn`);
    }
}

});