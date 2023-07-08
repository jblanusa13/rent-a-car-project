Vue.component("allUsersForManager", {
  data: function () {
    return {
      users: null,
      userId:null
    };
  },
  template: `
    <div>
      <h1> List of all customers of this renting object </h1>
      <table border='1' class="rental-object-table">
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Gender</th>
          <th>Date of birth</th>
          <th>Role</th>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>          
          <td>{{ user.gender }}</td>
          <td>{{ user.birthDate }}</td>
          <td>{{ user.role }}</td>
        </tr>
      </table>
      <br><br>
      <div class="center-position">
        <button type="submit" v-on:click="goBack">Go back</button>
      </div>
    </div>
  `,
  mounted() {
    // Fetch all users from the server
    this.userId = this.$route.params.id;
    axios
      .get("rest/user/profile/" + this.userId)
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
        axios
	      .get("rest/rentingOrders/customersThatOrdered/"+this.user.rentACar.id)
	      .then((response) => {
	        this.users = response.data;
	        console.log(this.users);
	      })
	      .catch((error) => console.log(error));
        
        
      })
      .catch((error) => console.log(error));
    
  },
  methods: {
    goBack: function () {
      event.preventDefault();
      router.push(`/loggedInManager/${this.userId}`);
    }
  }
});
