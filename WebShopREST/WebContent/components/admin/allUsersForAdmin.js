Vue.component("allUsersForAdmin", {
  data: function () {
    return {
      users: null,
      userId:null
    };
  },
  template: `
    <div>
      <h1 style="text-align: center;"> List of all users in the system </h1>
      <table border='1' style="margin: 0 auto; width: 85%;">
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Gender</th>
          <th>Date of birth</th>
          <th>Role</th>
          <th>User account status</th>
        </tr>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>          
          <td>{{ user.gender }}</td>
          <td>{{ user.birthDate }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.userStatus }}</td>
          <td>
	          <div v-if="user.userStatus === 'Active' && user.role !== 'Administrator'">
	          	<button type="submit" v-on:click="deactivate(user)">Deactivate</button>
	          </div>
	          <div v-if="user.userStatus === 'Deactivated' || user.role === 'Administrator'">
	          	<button type="submit" v-on:click="deactivate(user)" disabled>Deactivate</button>
	          </div>
          </td>
        </tr>
      </table>
      <div style="text-align: center; margin-top: 20px;">
        <button type="submit" v-on:click="goBack">Go back</button>
      </div>
    </div>
  `,
  mounted() {
    // Fetch all users from the server
    this.userId = this.$route.params.id;
    axios
      .get("rest/user/allUsers")
      .then((response) => {
        this.users = response.data;
        console.log(this.users);
      })
      .catch((error) => console.log(error));
  },
  methods: {
    goBack: function () {
      event.preventDefault();
      router.push(`/loggedInAdmin/${this.userId}`);
    },
    deactivate: function (user){
		console.log("Deactivation of user account");
		axios
      .post("rest/user/userDeactivated/"+user.id)
      .then((response) => {
        console.log("Deactivation of user account");
        user.userStatus="Deactivated"
      })
      .catch((error) => console.log(error));
	}
  }
});
