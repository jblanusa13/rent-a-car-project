Vue.component("user-profile", {
  data: function () {
    return {
		userId:null,
		user:null
    }
  },
  template: `
    <div>
		<h2>Profile</h2>
		<form>
			<table>
				<tr>
            		<td>Username:</td>
            		<td><input type="text" name="username"></td>
          		</tr>
          		<tr>
            		<td>Password:</td>
            		<td><input type="password" name="password"></td>
          		</tr>
          		<tr>
            		<td>First Name:</td>
           		 	<td><input type="text" name="firstName"></td>
          		</tr>
          		<tr>
            		<td>Last Name:</td>
            		<td><input type="text" name="lastName"></td>
          		</tr>
          		<tr>
            		<td>Gender:</td>
            		<td><input type="text" name="gender"></td>
          		</tr>
          		<tr>
            		<td>Date of birth:</td>
            		<td><input type="text" name="date"></td>
          		</tr>
          		<tr>
            		<td>Collected points:</td>
            		<td><input type="text" name="points"></td>
          		</tr>
          		<tr>
            		<td>Customer type:</td>
            		<td><input type="text" name="type"></td>
          		</tr>
          		<tr>
            		<td>Rent a car object:</td>
            		<td><input type="text" name="carObject"></td>
          		</tr>
			</table>
			<button type="submit" v-on:click="editUser">Update user info</button>
		</form>
    </div>
  `,
  mounted() {
	  this.userId =this.$route.params.id
	  console.log(this.userId)
  },
  methods: {
    editUser: function () {
      event.preventDefault();
      router.push({ path: `/userProfileUpdate/${this.userId}` });
    }
  }
  
});
