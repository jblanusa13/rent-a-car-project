Vue.component("allVehiclesForRenting", {
  data: function () {
    return {
      userId:null,
      user:null,
      searched: null,
      startDate: null,
      endDate: null,
      errorText: "",
      errorTextsc: "",
      cars:null,
      allCars:null,
      orders:null,
      vehicle:null,
      shoppingCart:null,
      empty:"yes",
      addingCar:null,
      userShoppingCart:null,
    };
  },
  template: `
    <div>
      <h1>Vehicles renting </h1>
      
          <div class="center-position">
			  <form style="display: flex; flex-direction: row; align-items: center;">
			    <label for="startdate">Start date: </label>
			    <input style="margin-left: 5px;" type="date" id="startdate" v-model="startDate" name="startdate">
			
			    <label for="enddate" style="margin-left: 20px;">End date:</label>
			    <input style="margin-left: 5px;" type="date" id="enddate" v-model="endDate" name="enddate">
			  </form>
	      </div>
		  <br>
		  <div class="center-position">
		    <button type="submit" v-on:click.prevent="searchVehicles">Search</button>
		  </div>
		  <br>
	      <div class="center-position">
			  <label v-if="searched !== 'yes'" style="color: red;">{{ errorText }}</label>
		  </div>	
      <div v-if="searched === 'yes'">
        <div v-if="empty === 'yes'">
        	<br><label class="standard-left-margin">The shopping cart is empty. Add the vehicles you wish to order.</label><br>
        </div>
        
        <h4 class="standard-left-margin">Available vehicles</h4>
        <table border='1' class="shopping-cart-table">
          <tr>
            <th>Picture</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Vehicle type</th>
            <th>Stick type</th>
            <th>Fuel type</th>
            <th>Consumption</th>
            <th>Door number</th>
            <th>People number</th>
            <th>Description</th>
            <th>Vehicle status</th>
          </tr>
          <tr v-for="v in allCars" :key="v.id">
            <td><img :src="v.imageURL" alt="Vehicle Image" style="width: 100%; height: auto;"></td>
            <td>{{ v.brand }}</td>
            <td>{{ v.model }}</td>
            <td>{{ v.price }}</td>
            <td>{{ v.type }}</td>
            <td>{{ v.stickType }}</td>
            <td>{{ v.fuelType }}</td>
            <td>{{ v.consumption }}</td>
            <td>{{ v.doorNumber }}</td>
            <td>{{ v.peopleNumber }}</td>
            <td>{{ v.description }}</td>
            <td>{{ v.carStatus }}</td>
            <td>
              <button type="submit" v-on:click="AddToCart(v)" v-if="v.carStatus === 'Available'">Add to cart</button>
              <button type="submit"  v-if="v.carStatus !== 'Available'" disabled>Add to cart</button>
            </td>
          </tr>
        </table>
        <br><br>
        <div class="center-position">        
         <label v-if="empty === 'yes'" style="color: red;">{{ errorTextsc }}</label><br><br>
        </div>
        <div class="center-position">        
          <button  v-on:click="ShowShoppingCart"><strong>Show shoppig cart and make reservation</strong></button><br><br>
        </div>
        <div class="center-position">        
          <br><br>
          <button type="submit" v-on:click="lastPage">Return to previous page</button>
        </div>
      </div>
    </div>
  `,
  mounted() {
    this.userId = this.$route.params.id;
    console.log(this.userId);
    //finding the customer
    axios
      .get("rest/user/profile/" + this.userId)
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
        console.log("Making new shoppingCart");

		axios.post('rest/shoppingCarts/newCart', this.user)
	  		.then(response => {
			    this.shoppingCart = response.data;
			    console.log(`Shopping cart id: ${this.shoppingCart.id}`)
			    if(this.shoppingCart===null){
					console.log('Shopping cart making failed');
					return;
				}
				else{
					console.log('New shopping cart created'+ this.shoppingCart.id );
				}		     
	    });
      })
      .catch((error) => console.log(error));
    //finding all cars
    axios
	   .get("rest/vehicles/allVehicles")
	   .then((response) => {
	 	   this.allCars = response.data;
	    })
	    .catch((error) => console.log(error));
	    
	
	//finding all orders
	axios
	   .get("rest/rentingOrders/allOrders")
	   .then((response) => {
	 	   this.orders = response.data;
	    })
	    .catch((error) => console.log(error));
	    
	
      this.textForCustomer= 'The shopping cart is empty. Add the vehicles you wish to order.';
      console.log(this.textForCustomer);
	
	      
  },
  methods: {
    lastPage: function () {
		 router.push({ path: `/loggedInCustomer/${this.userId}` });
	},
    AddToCart: function (v) {
		//treba da UPDEJTIJEM USERA da mu je ovo korpa DA ali to tek kad odem na pregled korpe jel?
		this.empty='no';
		
      	this.textForCustomer= '';
      	console.log(this.textForCustomer);
		console.log("OVDE JE BITAN SHOPPINGCART"+this.shoppingCart.id);
		var param=v.id
		console.log(v)
		axios
		   .get("rest/vehicles/findVehicle/"+param)
		   .then((response) => {
		 	   this.addingCar = response.data;
		 	   console.log(this.shoppingCart.id);
		 	   this.addingCar.shoppingCartId =  this.shoppingCart.id;
		 	   console.log(this.addingCar);
		
				var b=null;
				axios.post('rest/shoppingCarts/addVehicle', this.addingCar)
			  		.then(response => {
						  b=response.data;
						  console.log(b)
						  if(b){
							  console.log(`Added to the cart`)
						  }	     
			    });
			    v.carStatus = 'Added to the cart';
		 	   
		 	   
		    })
		    .catch((error) => console.log(error));
		
		
	},
    searchVehicles: function () {

      if (!this.startDate || !this.endDate) {
        this.errorText = "Both fields must be filled in order to search for vehicles";
        return;
      }

	    const today = new Date();

		const selectedStartDate = new Date(this.startDate);
		const selectedEndDate = new Date(this.endDate);
		
		today.setHours(0, 0, 0, 0);
		
		if (selectedStartDate < today || selectedEndDate < today) {
		  this.errorText = "Selected dates cannot be before today";
		  return;
		}
		
		if (selectedEndDate < selectedStartDate) {
		  this.errorText = "End date cannot be before start date";
		  return;
		}
		
      this.searched = "yes";
      //in orders to have only those who are in that time period 
      console.log("Searching for orders in that timespan");
      axios
	   .get("rest/rentingOrders/allOrders")
	   .then((response) => {
	 	    this.orders = response.data;
	 	    let temp = [];
	        temp = this.orders;
			this.orders = [];
			let count = 0;
				for (const _ in temp) {
					count++;
				}
			for (let i = 0; i < count; i++) {
				  let item = temp[i];
				  console.log("ORDER:"+item+ "startDate"+ item.date);
				  const orderStartDate = new Date(item.date);
				  const orderEndDate = new Date(item.date);
				  orderEndDate.setDate(orderEndDate.getDate() + item.duration);
				  let isFiltered = true;
				
				  // Iterate through each day in the startDate and endDate range
				  let currentDate = new Date(this.startDate);
				  const endDate = new Date(this.endDate);
				  console.log(this.startDate+"pocetni, krajnji datum"+this.endDate)
					  for (
					    currentDate;
					    currentDate <= endDate;
					    currentDate.setDate(currentDate.getDate() + 1)
					  ) {
						    // Iterate through each day of the order
						    let orderCurrentDate = new Date(orderStartDate);
						    for (
						      orderCurrentDate;
						      orderCurrentDate <= orderEndDate;
						      orderCurrentDate.setDate(orderCurrentDate.getDate() + 1)
						    ) {
						      // Check if the current days match
						      if (currentDate.toDateString() === orderCurrentDate.toDateString()) {
						        isFiltered = false;
						        break;
						      }
						    }
						
						    if (!isFiltered) {
						      break;
						    }
					  }
				
				  if (!isFiltered) {
				    this.orders.push(item);
				  }
			}
	      
	        let vehiclesNotInOrders = [];
	        vehiclesNotInOrders = this.allCars;
			this.allCars = [];
			let countC = 0;
			let countO = 0;
			for (const _ in vehiclesNotInOrders) {
				countC++;
			}
			for (const _ in this.orders) {
				countO++;
			}
			for (let i = 0; i < countC; i++) {
			  this.vehicle = vehiclesNotInOrders[i];
			  let isFoundInOrders = false;
			
			  for (let j = 0; j < countO; j++) {
			    let order = this.orders[j];
			    let countCO = 0;
				for (const _ in order.vehicles) {
					countCO++;
				}
			    for (let k = 0; k < countCO; k++) {
			      let orderVehicle = order.vehicles[k];
			      
			      if (orderVehicle.id === this.vehicle.id) {
			        isFoundInOrders = true;
			        break;
			      }
			    }
			    
			    if (isFoundInOrders) {
			      break;
			    }
			  }
			
			  if (isFoundInOrders) {
				  this.vehicle.carStatus='Rented';	    			
			  }
			  else{
				  this.vehicle.carStatus='Available';
			  }
			  this.addingCar=this.vehicle;
			  this.allCars.push(this.vehicle);
			}
		
	    })
	    .catch((error) => console.log(error));
	    
        
           
    },
    ShowShoppingCart:function () {
		console.log("Provera da li treba prikazati labelu "+ this.empty);
		if(this.empty!=='no')
		{
			this.errorTextsc="At least one vehicle must be in the cart."
			return;
		}
		
		console.log("Looking for cart with id:"+this.shoppingCart.id)
		axios.get('rest/shoppingCarts/getCustomerShoppingCart/'+ this.shoppingCart.id)
	  		.then(response => {
			    this.userShoppingCart = response.data;
			    if(this.shoppingCart===null){
					console.log('Shopping cart making fetching failed');
					return;
				}
				else{
					console.log('User shopping cart found'+ this.userShoppingCart.id );
					axios
			        	.post(`rest/user/addShoppingCart/${this.userId}`, this.userShoppingCart)
			    		.then(response => {
			     		 console.log("User updated successfully. Added cart");
			     		 const combinedParam = this.userId+"_"+this.startDate+"_"+this.endDate;
			     		 console.log("OTVARA SE NOVA STRANICA SHOPPINGCART");
			     		 router.push({ path: `/customerAllRentalsShoppingCart/${combinedParam}` });
			     		 
			    	})
			    	.catch(error => {
			     		 this.errortext = "An error occurred while updating user data";
						 console.log(error);
			    	});
					
				}		     
	    });
    }
  }
});
