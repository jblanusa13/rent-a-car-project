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
      errortext:''
    }
  },
  template: `
<div>
      <h2>Register Customer</h2>
      <form>
        <table>
          <tr>
            <td>Username:</td>
            <td><input type="text" v-model="userRegistration.username" name="username"></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input type="password" v-model="userRegistration.password" name="password"></td>
          </tr>
          <tr>
            <td>Confirm Password:</td>
            <td><input type="password" v-model="confirmPassword" name="confirmPassword"></td>
          </tr>
          <tr>
            <td>First Name:</td>
            <td><input type="text" v-model="userRegistration.name" name="firstName"></td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td><input type="text" v-model="userRegistration.surname" name="lastName"></td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>
              <select v-model="userRegistration.gender" name="gender">
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
        <button type="submit" v-on:click="registerCustomer">Register</button>
        <button v-on:click="goToLoginPage">Go to Login</button>
      </form>
      <p>{{ errortext }}</p>
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
      document.getElementsByName("dateOfBirth")[0].style.background = "white";
      this.errortext=''
    }
    
      console.log("Yay! All fields are filled!");
      console.log(this.userRegistration)
     axios.post('rest/logIn/register', this.userRegistration)
  		.then(response => {
   		router.push(`/`);
  		}).catch(error => {
        this.errortext = 'User with this data already exist';
    });
      
  },
 	goToLoginPage: function () {
      router.push('/');
    }
}

});
