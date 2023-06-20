/**
 * 
 */
Vue.component("managerRentalObjects", {
  data: function () {
    return {
		//objects:null,
		userId:null
    }
  },
  template: `
    <div>
	<h3>All renting orders</h3>

	<div>
		<button type="submit" v-on:click="goBack">Return</button>
	</div>
</div>
  `,
  mounted() {
	this.userId =this.$route.params.id
	console.log("id usera:"+this.userId)
/**
 * axios.get('rest/rentingOrders/',this.userId)
		.then(response => {
			this.objects = response.data
		})
		.catch(error => console.log(error))
 */	
	
  },
  methods: {
	goBack: function () {
      	event.preventDefault();
		router.push(`/loggedInManager/${this.userId}`);
    },
  }
});