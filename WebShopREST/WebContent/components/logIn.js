Vue.component("logIn", {
  data: function() {
    return {
	  user:{id:' ',username:null, password: null, name: null, surname:null, gender: null, birthDate:null,
			role: null,shoppingCart:null, rentACar:null, collectedPoints:null, customerType:null},
      userCredentials: {
        username: null,
        password: null
      },
      isUsernameValid:null,
      isPasswordValid: null,
      errortext:''
    };
  },
  template: `
  <div class="center-position">
    <form class="formStyle" style="margin-top:5%;">
	<fieldset>
		<legend>Log in</legend>
		<div>
            <label for="username" class="formInputs">Username</label><br>
            <input type="text" v-model="userCredentials.username" name="username" id="username" class="formInputs">
        </div>
        <div>
            <label for="password" class="formInputs">Password</label><br>
            <input type="password" v-model="userCredentials.password" name="password" id="password" class="formInputs">
        </div><br>
        <div>
            <input type="submit" v-on:click="loginUser" value="Login" class="formInputs">
        </div>
      <p>{{errortext}}</p>
	</fieldset><br>
	<div>
    	<input type="submit" v-on:click="registerUser" value="Register" class="formInputs">
    </div><br>
    <div>
    	<input type="submit" v-on:click="goBack" value="Return" class="formInputs">
    </div>
    </form>
    </div>
  `,
  mounted() {},
  methods: {
    loginUser: function() {
      event.preventDefault();
      if(!this.userCredentials.username)
      {
		  document.getElementsByName("username")[0].style.background = "red";
		  this.isUsernameValid=false;
		  this.errortext='All fields are required'
	  }
	  else
	  {
		  document.getElementsByName("username")[0].style.background = "white";
		  this.isUsernameValid=true;
		  this.errortext=''
	  }
	  if(!this.userCredentials.password)
      {
		  document.getElementsByName("password")[0].style.background = "red";
		  this.isPasswordValid=false;
		  this.errortext='All fields are required'
	  }
	  else
	  {
		  document.getElementsByName("password")[0].style.background = "white";
		  this.isPasswordValid=true;
		  this.errortext=''
	  }
	  if(this.isUsernameValid&&this.isPasswordValid)
	  {
		 axios.post('rest/user/login/', this.userCredentials)
    .then(response => {
        this.user = response.data; 
        if(this.user.userStatus==='Deactivated'){
			this.errortext='Your account has been deactivated.'
			return;
		}
        console.log('Uloga korisnika:')
        console.log("Uloga korisnika:"+this.user.role)
        if (this.user.role === 'Administrator') {
          router.push({ path: `/loggedInAdmin/${this.user.id}` });
        } else if (this.user.role === 'Customer') {
          router.push({ path: `/loggedInCustomer/${this.user.id}` });
        } else if (this.user.role === 'Manager') {
          router.push({ path: `/loggedInManager/${this.user.id}` });
        } else {
          this.errortext = 'Invalid user role';
        }
        
    })
    .catch(error => {
        console.error('An error occurred:', error);
        this.errortext = 'User does not exist';
    });
		
	  }
    },
    registerUser: function() {
      event.preventDefault();
      router.push(`/register`);
    },
    goBack: function () {
      	event.preventDefault();
		router.push(`/`);
    }
  }
});
