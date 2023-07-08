Vue.component("managerRentalObjects", {
  data: function () {
    return {
      objects: null,
      filteredObjects:null,
      user:{id:' ',username:null, password: null, name: null, surname:null, gender: null, birthDate:null,
			role: null,orders:null,shoppingCart:null, rentACar:null, collectedPoints:null, customerType:null},
      userId: null,
      managerObjectId:null,
      orderReservationDate:null,
      selectedSortOption: null,
      startDate:null,
      endDate:null,
      minPrice:null,
      maxPrice:null
    };
  },
  template: `
    <div>
      <div class="right-position">
		  <button type="submit" v-on:click="goBack">Return to profile page</button><br><br>
	  </div>
      <h2>All reservations in your object</h2>    
      <div class="standard-left-margin">
      	<form>
		  <label for="sortOption">Sort by:</label>
		  <select id="sortOption" v-model="selectedSortOption">
		    <option value="priceAscending">Price (Ascending)</option>
		    <option value="priceDescending">Price (Descending)</option>
		    <option value="dateAscending">Date (Ascending)</option>
		    <option value="dateDescending">Date (Descending)</option>
		  </select>
		  <br><br>
		  <button type="submit" v-on:click="sortOrders">Sort</button>
		  <br><br>
		</form>
      </div>
	  <div>
        <form>
		  <div>
		    <div class="standard-left-margin-input-closer">
		      <div class="input-group">
			      <label for="startdate">Start date:</label>
			      <input type="date" v-model="startDate" id="startdate" name="startdate">
			    </div>
			    <div class="input-group">
			      <label for="enddate">End date:</label>
			      <input type="date" v-model="endDate" id="enddate" name="enddate">
			    </div>
		    </div>
		    <div class="standard-left-margin-input">
		  	    <div class="input-group">
			    <label for="minprice">Minimal price:</label>
			    <input type="number" v-model="minPrice" id="minprice" name="minprice" >
			    </div>
			  	<div class="input-group">
			    <label for="maxprice">Maximal price:</label>
			    <input type="number" v-model="maxPrice" id="maxprice" name="maxprice" >
			    </div>
			    <div class="input-group">
			    <label for="objectName">Rent a car object name:</label>
			    <input type="text" v-model="objectName" id="objectname" name="objectname" >
			    </div>
			</div>
		  </div>		
		  <div class="standard-left-margin">
		  	<br>
		    <button type="submit" v-on:click="filterOrdersClick">Filter</button>
		    <button type="submit" v-on:click="filterOrdersUndo">Undo filtering</button><br><br>
		  </div>
		</form>
      </div>
      <div>
		  <div v-for="order in objects" class="rectangle">
		    <table class="table-renting-orders">
			  <tr>
			    <td class="table-renting-orders-td">
			    <div class="table-renting-orders-first-column">
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
			      <label v-if="order.orderStatus === 'Rejected'">Rejected order.</label>
			      <label v-if="order.orderStatus === 'Returned'">Passed order, vehicle is returned.</label>
			    </div>
			    </td>
			    <td class="table-renting-orders-td">
			    	<div v-if="order.orderStatus === 'Processing rejection' || order.orderStatus === 'Processing rejection...'">
			        	<label>Reason for rejection: </label><br>
			        	<textarea v-model="order.managerComment" style="width: 300px; height: 45px;"></textarea><br><br>
			        	<button type="submit" v-on:click="submitCancellation(order)">Submit</button><br><br>
			        </div>
			    	<div v-if="order.orderStatus === 'Processing rejection...' && !order.managerComment">
			    		<br>
			        	<label style="color: red;">Reason for rejection must be stated!</label>
			        </div>
			        <div v-if="order.orderStatus === 'Error state'">
				        <br><br>
				        <label style="color: red;">You can change the status of the order to TAKEN only on the day of the beginning of the reservation until the end date of reservation. The period is {{ order.date }} after {{ order.time }}, for {{order.duration}} day(s).</label>
				        <br><br>
				        <button v-on:click="okAceppt(order)">OK</button>
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
    axios
      .get("rest/user/profile/" + this.userId)
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
      })
      .catch((error) => console.log(error));
    axios
      .get("rest/user/managerObject/" + this.userId)
      .then((response) => {
        this.managerObjectId = response.data;
        console.log("ID OBJEKTA: "+this.managerObjectId);
	        axios
		      .get("rest/rentingOrders/managerOrders/"+ this.managerObjectId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    
  },
  methods: {
    goBack: function () {
      event.preventDefault();
      router.push(`/loggedInManager/${this.userId}`);
    },
    confirmOrder: function (order) {
      order.orderStatus='Approved';
      console.log("Order status is: "+ order.orderStatus)
      console.log("Order id is: "+ order.id)
      axios
      .put("rest/rentingOrders/managerOrderConfirmation/"+ order.id)
		      .then((response) => {
				console.log("Status updated to approved successfully.");
		      })
		      .catch((error) => console.log(error));
      
    },
    cancelOrder: function (order) {
      order.orderStatus='Processing rejection';
    },
    submitCancellation: function (order) {
      if(!order.managerComment){
		  order.orderStatus='Processing rejection...';
		  return;
	  }
	  order.orderStatus='Rejected';
	  axios
      .put("rest/rentingOrders/managerOrderRejection/"+ order.id,order.managerComment)
		      .then((response) => {
		        console.log("Successfuly canceled order.");
		      })
		      .catch((error) => console.log(error));
      return;
    },
    orderTaken: function (order) {
		axios
		.get("rest/rentingOrders/managerOrderStatusChangeTaken/"+ order.id)
			.then((response) => {
				const b = response.data;
				console.log("Can change to taken"+b);
				if (!b) {
			      order.orderStatus = 'Error state';
			      return;
			    } else {
			      for (const vehicle of order.vehicles) {
				      console.log("I'm here:", vehicle);
				      var help=this.managerObjectId+"_"+vehicle.id;
					  var h=vehicle.id.toString();
				      axios
				      .get("rest/objects/carRented/"+ help)
						      .then((response) => {
						       console.log("vehicles in rentacar changed");
						       // u vozilima			
							      axios
							      .get("rest/vehicles/changeStatusToRented/"+ h)
									      .then((response) => {
											var b=response.data;
											if(b){
									        	console.log("Changed to rented in vehicles");												
											}
									      })
								  .catch((error) => console.log(error));
						      })
					  .catch((error) => console.log(error));
				  }
				  // porudzbina	       
			      
			      axios
			      .put("rest/rentingOrders/managerOrderTaken/"+ order.id)
					      .then((response) => {
					        console.log("Changed to taken. Vheiacles updated too.");
					        order.orderStatus = 'Taken';
					      })
				  .catch((error) => console.log(error));
			    }
			})
			.catch((error) => console.log(error));
		
      
    },
    orderReturned: function (order) {
		  
	      axios
	      .put("rest/rentingOrders/managerOrderReturn/"+ order.id)
			      .then((response) => {
			        console.log("Successfuly returned order.Vehiacles updated.");
			        order.orderStatus = 'Returned';
			        for (const vehicle of order.vehicles) {
				          console.log("I'm here:", vehicle);
					      var help=this.managerObjectId+"_"+vehicle.id;
						  var h=vehicle.id.toString();
					      axios
					      .get("rest/objects/carAvailable/"+ help)
							      .then((response) => {
							       console.log("vehicles in rentacar changed");
							       // u vozilima			
								      axios
								      .get("rest/vehicles/changeStatusToAvailable/"+ h)
										      .then((response) => {
												var b=response.data;
												if(b){
										        	console.log("Changed to rented in vehicles");												
												}
										      })
									  .catch((error) => console.log(error));
							      })
						  .catch((error) => console.log(error));
				    }
			      })
			      .catch((error) => console.log(error));
	      return;
    },
    okAceppt: function (order) {
      order.orderStatus = 'Approved';
    },
    filterOrdersUndo: function () {
		axios
	      .get("rest/rentingOrders/managerOrders/"+ this.managerObjectId)
	      .then((response) => {
	        this.objects = response.data;
	      })
	      .catch((error) => console.log(error));
    },
    filterOrdersClick: function () {
		event.preventDefault();
		console.log("Gathering filter orders");
		let temp = [];
		temp = this.objects;
		this.objects= [];
		let count = 0;
		for (const _ in temp) {
			count++;
		}
		for (let i = 0; i < count; i++){
		    let item = temp[i];
		    const orderStartDate = new Date(item.date);
		    const orderEndDate = new Date(item.date);
			orderEndDate.setDate(orderEndDate.getDate() + item.duration);
			console.log("GLEDAJ OVO MORA BITI DEFINISANO orderStartDate:", orderStartDate);
			console.log("GLEDAJ OVO MORA BITI DEFINISANOorderEndDate:", orderEndDate);
		    
		    let isFiltered = true;
		
		    // Filter by start date
		    if (this.startDate) {
				const startDateFilter = new Date(this.startDate);				
				console.log("startDateFilter:", startDateFilter);
				if(orderStartDate < startDateFilter){					
			      isFiltered = false;
			      console.log("Ovde proverava pocetni datum");
				}
		    }
		
		    // Filter by end date
		    if (this.endDate) {
				const endDateFilter = new Date(this.endDate);
				console.log("endDateFilter:", endDateFilter);
				if(orderEndDate > endDateFilter){
			      isFiltered = false;
			      console.log("Ovde proverava krajnji datum");					
				}
		    }
		
		    // Filter by min price
		    if (this.minPrice && item.price < this.minPrice) {
		      isFiltered = false;
		    }
		
		    // Filter by max price
		    if (this.maxPrice && item.price > this.maxPrice) {
		      isFiltered = false;
		    }
		
		    if (isFiltered) {
				console.log("item added. id:"+item.id);
		      this.objects.push(item);
		    }
		  }
    },
    sortOrders: function() {
	    if (this.selectedSortOption === 'priceAscending') {
	      axios
		      .get("rest/rentingOrders/managerOrdersPriceSortingAscending/"+ this.managerObjectId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    } else if (this.selectedSortOption === 'priceDescending') {
	      axios
		      .get("rest/rentingOrders/managerOrdersPriceSortingDescending/"+ this.managerObjectId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    } else if (this.selectedSortOption === 'dateAscending') {
	      axios
		      .get("rest/rentingOrders/managerOrdersDateSortingAscending/"+ this.managerObjectId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    } else if (this.selectedSortOption === 'dateDescending') {
	      axios
		      .get("rest/rentingOrders/managerOrdersDateSortingDescending/"+ this.managerObjectId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    }
  }
    
  },
});
