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
		<h2>Profile ({{user.role}})</h2>
		<form>
			<table>
				<tr>
            		<td>Username:</td>
            		<td><input type="text" name="username" v-model="user.username" disabled></td>
          		</tr>
          		<tr>
            		<td>Password:</td>
            		<td><input type="password" name="password" v-model="user.password" disabled></td>
          		</tr>
          		<tr>
            		<td>First Name:</td>
           		 	<td><input type="text" name="firstName" v-model="user.name" disabled></td>
          		</tr>
          		<tr>
            		<td>Last Name:</td>
            		<td><input type="text" name="lastName" v-model="user.surname" disabled></td>
          		</tr>
          		<tr>
            		<td>Gender:</td>
            		<td><input type="text" name="gender" v-model="user.gender" disabled></td>
          		</tr>
          		<tr>
            		<td>Date of birth:</td>
            		<td><input type="text" name="date" v-model="userDate" disabled></td>
          		</tr>
			</table>
			<br>
			<button type="submit" v-on:click="editUser">Update user info</button>
		</form>
		
		<br><br>
		
		<form>
			<table>
				<tr v-if="user.role == 'Manager'">
           			<td>Rent a car object:</td>
           			<td><input type="text" name="carObject" disabled></td>
       			</tr>
				<tr v-else-if="user.role == 'Customer'">
            			<td>Collected points:</td>
            			<td><input type="text" name="points" v-model="user.collectedPoints" disabled></td>
          		</tr>
			</table>
		</form>
		
		<form>
			<div v-if="user.role == 'Customer'">
				<table>
					<tr>
						<td>Customer type:</td>
           				<td><input type="text" name="type" v-model="user.customerType.typeName" disabled></td>
					</tr>
					<tr>
						<td>Discount:</td>
            			<td><input type="text" name="discount" v-model="user.customerType.discount" disabled></td>
					</tr>
					<tr>
						<td>Required points:</td>
           				<td><input type="text" name="points" v-model="user.customerType.requiredPoints" disabled></td>
					</tr>
				</table>
			</div>
			<div v-if="user.role == 'Customer'">
				<h3>Shopping cart</h3>
				<table>
					<tr>
						<td>Cars in cart:</td>
            			<td v-if="user.shoppingCart.cars">
							<ul data-role"listview" data-view="list" v-for="c in user.shoppingCart.cars">
								<li>{{c}}</li>
							</ul>
						</td>
						<td v-else>
							Shopping cart is empty!
						</td>
					</tr>
					<tr>
						<td>Price:</td>
            			<td><input type="text" name="price" v-model="user.shoppingCart.price" disabled></td>
					</tr>
				</table>
			</div>
		</form>
    </div>
  `,
  mounted() {
	this.userId =this.$route.params.id
	console.log("id usera u profilu je:"+this.userId)
	
	axios.get('rest/user/profile/'+this.userId)
		.then(response => {
			this.user = response.data
		})
		.catch(error => console.log(error))
		
	axios.get('rest/user/birthDate/'+this.userId)
		.then(response => {
			this.userDate = response.data
		})
		.catch(error => console.log(error))
  },
  methods: {
    editUser: function () {
      event.preventDefault();
      router.push({ path: `/userProfileUpdate/${this.userId}` });
    }
  }
  
});
