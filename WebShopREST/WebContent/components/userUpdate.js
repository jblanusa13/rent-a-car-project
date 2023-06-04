Vue.component("user-update", {
  data() {
    return {
      user:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
      updatedUser:{username:null, password: null, name: null, surname:null, gender: null, birthDate:null},
      userId:null,
      errortext: ""
    };
  },
  template: `
    <div>
      <h2>Update User Info</h2>
      <form v-if="user">
        <table>
          <tr>
            <td>Username:</td>
            <td><input type="text" v-model="updatedUser.username" name="username" ></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input type="password" v-model="updatedUser.password" name="password" ></td>
          </tr>
          <tr>
            <td>Name:</td>
            <td><input type="text" v-model="updatedUser.name" name="name" ></td>
          </tr>
          <tr>
            <td>Surname:</td>
            <td><input type="text" v-model="updatedUser.surname" name="surname" ></td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td>
              <select v-model="updatedUser.gender" name="gender">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Birth Date:</td>
            <td><input type="date" v-model="updatedUser.birthDate" name="birthDate" ></td>
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
    axios.get(`rest/logIn/${this.$route.params.id}`)
  .then(response => {
    this.user = response.data;
    if(this.user!=null){
		this.errortext = 'Unesite sva polja';
		console.log('found user')
	}
     
  });

  },
  methods: {
    updateUser() {
		console.log("User updating");

		if (!this.updatedUser.username) {
		  document.getElementsByName("username")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  document.getElementsByName("username")[0].style.background = "white";
		  this.errortext = '';
		}
		
		if (!this.updatedUser.password) {
		  document.getElementsByName("password")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  document.getElementsByName("password")[0].style.background = "white";
		  this.errortext = '';
		}
		
		if (!this.updatedUser.name) {
		  document.getElementsByName("name")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  document.getElementsByName("name")[0].style.background = "white";
		  this.errortext = '';
		}
		
		if (!this.updatedUser.surname) {
		  document.getElementsByName("surname")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  document.getElementsByName("surname")[0].style.background = "white";
		  this.errortext = '';
		}
		
		if (!this.updatedUser.gender) {
		  document.getElementsByName("gender")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  document.getElementsByName("gender")[0].style.background = "white";
		  this.errortext = '';
		}
		
		if (!this.updatedUser.birthDate) {
		  document.getElementsByName("birthDate")[0].style.background = "red";
		  this.errortext = 'All fields are required';
		  return;
		} else {
		  document.getElementsByName("birthDate")[0].style.background = "white";
		  this.errortext = '';
		}

		console.log("User updating");
		  axios.put(`rest/logIn/update/${this.userId}`, this.updatedUser)
		    .then(response => {
		      router.push(`/userProfile/${this.userId}`);
		    });
		},
	    goToUserProfile() {
	      router.push(`/userProfile/${this.user.id}`);
	    }
  }
});
