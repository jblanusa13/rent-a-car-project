Vue.component("customerShoppingCart", {
  data: function () {
    return {
		userId:null,
		user:null,
    }
  },
  template: `
    <div>
		<h2>Shopping cart</h2>
		<form>
			<div>
				<table>
					<tr>
						<td>Cars in cart:</td>
            			<td v-if="user.shoppingCart.cars">
							<ul data-role="listview" data-view="list" v-for="c in user.shoppingCart.cars">
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
		<button type="submit" v-on:click="goBack">Give up from the order</button>
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
  },
  methods: {
	goBack: function () {
      event.preventDefault();
      router.push(`/loggedInCustomer/${this.userId}`);
    }
  }
  
});
