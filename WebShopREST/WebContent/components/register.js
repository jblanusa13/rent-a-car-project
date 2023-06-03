Vue.component("register", {
  data: function () {
    return {
	  user:{id:' ',username:null, password: null, name: null, surname:null, gender: null, birthDate:null,
			UserRole: null, rentACar:null, collectedPoints:null, customerType:null},
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
            <td><input type="text" v-model="username" name="username"></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input type="password" v-model="password" name="password"></td>
          </tr>
          <tr>
            <td>Confirm Password:</td>
            <td><input type="password" v-model="confirmPassword" name="confirmPassword"></td>
          </tr>
          <tr>
            <td>First Name:</td>
            <td><input type="text" v-model="firstName" name="firstName"></td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td><input type="text" v-model="lastName" name="lastName"></td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>
              <select v-model="gender" name="gender">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Date of Birth:</td>
            <td><input type="date" v-model="dateOfBirth" name="dateOfBirth"></td>
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
    if (!this.username) {
      document.getElementsByName("username")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("username")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.password) {
      document.getElementsByName("password")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("password")[0].style.background = "white";
      this.errortext=''
    }

    if (this.password !== this.confirmPassword) {
      document.getElementsByName("confirmPassword")[0].style.background = "red";
      this.errortext = 'Passwords do not match';
      return;
    } else {
      document.getElementsByName("confirmPassword")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.firstName) {
      document.getElementsByName("firstName")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("firstName")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.lastName) {
      document.getElementsByName("lastName")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("lastName")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.gender) {
      document.getElementsByName("gender")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("gender")[0].style.background = "white";
      this.errortext=''
    }

    if (!this.dateOfBirth) {
      document.getElementsByName("dateOfBirth")[0].style.background = "red";
      this.errortext = 'All fields are required';
      return;
    } else {
      document.getElementsByName("dateOfBirth")[0].style.background = "white";
      this.errortext=''
    }
    
    if (
      this.username &&
      this.password &&
      this.confirmPassword &&
      this.firstName &&
      this.lastName &&
      this.gender &&
      this.dateOfBirth
    ) {
      console.log("Yay! All fields are filled!");
    } else {
      this.errortext=''
    }


    // Perform registration logic
    // ...
    console.log("Customer Registered!");
    // Clear form fields
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.firstName = '';
    this.lastName = '';
    this.gender = '';
    this.dateOfBirth = '';
    this.errortext = '';
  },
 	goToLoginPage: function () {
      router.push('/');
    }
}

});
