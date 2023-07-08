Vue.component("allUsersForAdmin", {
  data: function () {
    return {
      users: null,
      userId:null,
	  name:null,
	  surname:null,
	  username:null,
	  userRole:null,
	  customerType:null,
	  selectedSortOption:null
    };
  },
  template: `
    <div>
      <h1 style="text-align: center;"> List of all users in the system </h1>
	<div>	
		<form>
			<table>
				<tr>
					<td>
						Name:<br>
						<input type="text" v-model="name" id="name" name="name" >
					</td>
					<td>
						Surname:<br>
						<input type="text" v-model="surname" id="surname" name="surname" >
					</td>
					<td>
						Username:<br>
						<input type="text" v-model="username" id="username" name="username" >
					</td>
					<td>
						<br>
						<button type="button" v-on:click="searchUsers">Search</button>
					</td>
				</tr>
			</table>
		</form><br>
	</div>
	<div>
		<form>
			<table>
				<tr>
				<td for="userRoleFilter">User role:<br>
			 	<select id="userRoleFilter" v-model="userRole">
					<option value="Customer">Customer</option>
					<option value="Manager">Manager</option>
					<option value="Administrator">Administrator</option>
				</select>	
				</td>   	
		    	
		  		<td for="customerTypeFilter" v-if="userRole === 'Customer'">Customer type:<br>
			 	<select id="customerTypeFilter" v-model="customerType" v-if="userRole === 'Customer'">
					<option value="Golden">Golden</option>
					<option value="Silver">Silver</option>
					<option value="Bronze">Bronze</option>
				</select>
				</td>
				<td>
				<br><br>
				<button type="submit" v-on:click="filterUsers">Filter</button><br><br>
				</td>
				</tr>
		  	</table>
		</form>
	</div>
	<div>
		<form>
			<table>
			<tr>
			<td>
		    <label for="sortOption">Sort by:</label><br>
		    <select id="sortOption" v-model="selectedSortOption">
		        <option value="nameAscending">Name (Ascending)</option>
		        <option value="nameDescending">Name (Descending)</option>
		        <option value="surnameAscending">Surname (Ascending)</option>
		        <option value="surnameDescending">Surname (Descending)</option>
		        <option value="usernameAscending">Username (Ascending)</option>
		    	<option value="usernameDescending">Username (Descending)</option>
				<option value="pointsAscending">Collected points (Ascending)</option>
		    	<option value="pointsDescending">Collected points (Descending)</option>
		    </select>
			</td>
			<td><br><br>
				<button type="button" v-on:click="sortUsers">Sort</button><br><br>
			</td>
			</tr>
			<tr>
				<td><button type="submit" v-on:click="searchUsersUndo">Undo search</button></td>
			</tr>
			</table>
		</form>
	</div>
      <table border='1' style="margin: 0 auto; width: 85%;">
        <tr>
		  <th>Username</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Gender</th>
          <th>Date of birth</th>
          <th>Role</th>
		  <th>Collected point</th>
          <th>User account status</th>
        </tr>
        <tr v-for="user in users" :key="user.id">
		  <td>{{ user.username }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>          
          <td>{{ user.gender }}</td>
          <td>{{ user.birthDate }}</td>
          <td>{{ user.role }}</td>
		  <td>{{ user.collectedPoints }}</td>
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
	},
	sortUsers: function() {
		event.preventDefault();
		
	    if (this.selectedSortOption === 'nameAscending') {
	      axios
		      .put("rest/user/usersNameSortingAscending/", this.users)
		      .then((response) => {
		        this.users = response.data;
		      })
		      .catch((error) => console.log(error));
	      
	    } else if (this.selectedSortOption === 'nameDescending') {
	      axios
		      .put("rest/user/usersNameSortingDescending/", this.users)
		      .then((response) => {
		        this.users = response.data;
		      })
		      .catch((error) => console.log(error));
	    } else if (this.selectedSortOption === 'surnameAscending') {
	      axios
		      .put("rest/user/usersSurnameSortingAscending/", this.users)
		      .then((response) => {
		        this.users = response.data;
		      })
		      .catch((error) => console.log(error));
	    } else if (this.selectedSortOption === 'surnameDescending') {
	      axios
		      .put("rest/user/usersSurnameSortingDescending/", this.users)
		      .then((response) => {
		        this.users = response.data;
		      })
		      .catch((error) => console.log(error));
	    }else if (this.selectedSortOption === 'usernameAscending') {
			axios
		      .put("rest/user/usersUsernameSortingAscending/", this.users)
		      .then((response) => {
		        this.users = response.data;
		      })
		      .catch((error) => console.log(error));
			
		}else if (this.selectedSortOption === 'usernameDescending') {
			axios
		      .put("rest/user/usersUsernameSortingDescending/", this.users)
		      .then((response) => {
		        this.users = response.data;
		      })
		      .catch((error) => console.log(error));
			
		}
		else if (this.selectedSortOption === 'pointsAscending') {
			axios
		      .put("rest/user/usersPointsSortingAscending/", this.users)
		      .then((response) => {
		        this.users = response.data;
		      })
		      .catch((error) => console.log(error));
			
		}else if (this.selectedSortOption === 'pointsDescending') {
			axios
		      .put("rest/user/usersPointsSortingDescending/", this.users)
		      .then((response) => {
		        this.users = response.data;
		      })
		      .catch((error) => console.log(error));
			
		}
	},
	searchUsersUndo: function () {
		event.preventDefault();
		
		this.name=null;
		this.surname=null;
		this.username=null;
		this.selectedSortOption=null;
		this.userRole=null;
		this.customerType=null;
		
		axios
	      .get("rest/user/allUsers")
	      .then((response) => {
	        this.users = response.data;
	      })
	      .catch((error) => console.log(error));
    },
	filterUsers: function(){
		event.preventDefault();
		console.log(this.userRole);
		console.log(this.customerType);
		
		axios
	      .put("rest/user/filterUsers/"+this.userRole+"/"+this.customerType+"/", this.users)
	      .then((response) => {
	        this.users = response.data;
			console.log("zavrsio filter");
	      })
	      .catch((error) => console.log(error));
	},
	searchUsers: function(){
		console.log(this.name);
		console.log(this.surname);
		console.log(this.username);
		
		if(!this.name){
			this.name = null;
		}
		else if(!this.surname){
			this.surname = null;
		}
		else if(!this.username){
			this.username = null;
		}
		
		axios
	      .put("rest/user/searchUsers/"+this.name+"/"+this.surname+"/"+this.username, this.users)
	      .then((response) => {
	        this.users = response.data;
			console.log("zavrsio pretragu");
	      })
	      .catch((error) => console.log(error));
	}
  }
});
