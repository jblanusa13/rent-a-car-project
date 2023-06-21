Vue.component("managerRentalObjects", {
  data: function () {
    return {
      objects: null,
      user:{id:' ',username:null, password: null, name: null, surname:null, gender: null, birthDate:null,
			role: null,orders:null,shoppingCart:null, rentACar:null, collectedPoints:null, customerType:null},
      userId: null,
      managerObjectId:null,
    };
  },
  template: `
    <div>
      <h3>All reservations in your object</h3>
      
      <div>
        <button type="submit" v-on:click="goBack">Return to home page</button><br><br>
      </div>

      <div>
		  <div v-for="order in objects" class="rectangle" style="margin-bottom: 20px;">
		    <table class="order-table" style="border: 1px solid black;">
		      <colgroup>
		        <col style="width: 33.33%;">
		        <col style="width: 33.33%;">
		        <col style="width: 33.33%;">
		      </colgroup>
		      <tr>
		        <td>
		          Identificator: {{ order.identificator }}<br>
		          Vehicles: <br>
			          <ul>
	                  <li v-for="vehicle in order.vehicles">
	                     {{ vehicle.model }}, {{ vehicle.brand }}
	                  </li>
	                  </ul>
	              Order status: {{ order.orderStatus }}<br>
		          Date and time of rental: {{ order.date }} {{ order.time }}<br>
		          Duration: {{ order.duration }} days<br>
		          Customer: {{ order.customer.name }} {{ order.customer.surname }}<br>
		          Price: {{ order.price }}<br><br>
		          <button :disabled="order.orderStatus !== 'Processing'" v-on:click="confirmOrder(order)">Approve order</button>
		          <button :disabled="order.orderStatus !== 'Processing'" v-on:click="cancelOrder(order)">Reject order</button><br><br>
		          <button v-if="order.orderStatus === 'Approved'" v-on:click="orderTaken(order)">Set order status to TAKEN</button>
		          <button v-if="order.orderStatus === 'Taken' && order.orderStatus !== 'Returned'" v-on:click="orderReturned(order)">Set order status to RETURNED</button>
		          <label v-if="order.orderStatus === 'Returned'">Passed order, vehicle is retuned.</label>
		          <div v-if="order.orderStatus === 'Rejected'">
		          	<label>Reason for rejection is mandatory.</label><br>
		            <textarea v-model="order.managerComment" style="width: 300px; height: 45px;"></textarea><br><br>
		            <button type="submit" v-on:click="submitCancellation(order)">Submit</button><br><br>
		          </div>
		        </td>
		      </tr>
		    </table>
		  </div>
		</div>
    </div>
  `,
  mounted() {
    this.userId = this.$route.params.id;
    console.log("id usera:" + this.userId);
	console.log("K1");
    axios
      .get("rest/user/profile/" + this.userId)
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
      })
      .catch((error) => console.log(error));
      console.log("K2");
    axios
      .get("rest/user/managerObject/" + this.userId)
      .then((response) => {
		  console.log("K3 odg od user servera");
        this.managerObjectId = response.data;
        console.log("ID OBJEKTA: "+this.managerObjectId);
	        axios
		      .get("rest/rentingOrders/managerOrders/"+ this.managerObjectId)
		      .then((response) => {
				  console.log("K4 odg od order servera");
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
      console.log("K3.1");
      console.log("Provera ID OBJEKTA: "+ this.managerObjectId);
    
  },
  methods: {
    goBack: function () {
      event.preventDefault();
      router.push(`/loggedInManager/${this.userId}`);
    },
    confirmOrder: function (order) {
      //this.isConfirmed = true;
      //this.isCancelled = false;
    },
    cancelOrder: function (order) {
      //this.isCancelled = true;
      //this.isConfirmed = false;
    },
    submitCancellation: function (order) {
      // Handle cancellation submission
      
      //MUST HAVE A MANAGER COMMENT
    },
    orderTaken: function (order) {
      
    },
    orderReturned: function (order) {
      // Handle order returned action
    },
    
  },
});
