Vue.component("logIn", {
  data: function() {
    return {
	  user:{id:' ',username:null, password: null, name: null, surname:null, gender: null, birthDate:null,
			UserRole: null, rentACar:null, collectedPoints:null, customerType:null},
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
    <form>
      <table>
        <tr>
          <td>
            <label for="username">Username</label>
          </td>
          <td>
            <input type="text" v-model="userCredentials.username" name="username" id="username">
          </td>
        </tr>
        <tr>
          <td>
            <label for="password">Password</label>
          </td>
          <td>
            <input type="password" v-model="userCredentials.password" name="password" id="password">
          </td>
        </tr>
        <tr>
          <td></td>
          <td align="center">
            <input type="submit" v-on:click="loginUser" value="Login">
          </td>
        </tr>
        <tr>
          <td></td>
          <td align="center">
            <input type="submit" v-on:click="registerUser" value="Register">
          </td>
        </tr>
      </table>
      <p>{{errortext}}</p>
    </form>
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
        router.push({ path: `/userProfile/${this.user.id}` });
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
  }
});
