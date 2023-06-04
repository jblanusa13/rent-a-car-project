Vue.component("user-profile", {
  data: function () {
    return {
		userId:null,
		user:null,
		userDate:null

    }
  },
  template: `
    <div>
      <p>You're logged in! :)</p>
      <form>
        <button type="submit" v-on:click="editUser">Update user info</button>
        <button type="submit" v-on:click="goToLoginPage">log off</button>
      </form>
    </div>
  `,
  mounted() {
	  this.userId =this.$route.params.id
	  console.log(this.userId)
	  
	  
	  	axios.get(`rest/logIn/profile/${this.userId}`)
		.then(response => {
			this.user = response.data
		})
		.catch(error => console.log(error))
		
		axios.get(`rest/logIn/birthDate/${this.userId}`)
		.then(response => {
			this.userDate = response.data
		})
		.catch(error => console.log(error))

	  
  },
  methods: {
    editUser: function () {
      event.preventDefault();
      router.push({ path: `/userProfileUpdate/${this.userId}` });
    },
    goToLoginPage: function () {
      router.push('/');
    }
  }
  
});
