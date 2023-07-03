Vue.component("customerAllRentalsShoppingCart", {
  data: function () {
    return {
		userId:null,
		shoppingCart:null,
		vehicles:null,
		price:null,
		carCounter:null,
		errortext:'',
		startDate: null,
		endDate:null,
		rentACarObjectId:null,
		time:null,
		rentingOrderInfo:{startDate:null,endDate:null, objects:null, cars:null,customer:null,price:null,time:null},
		errortextTime:'',
		user:null,
		points:null,
		confirmationText:null,
		orderTaken:'no',
		orders:null,
		vehicle:null,
		allRentACarObjects: null,
		
    }
  },
  template: `
    <div>
		<h2 style="display: flex; justify-content: center; align-items: center;">Shopping cart</h2>
		<h3 style="display: flex; justify-content: center; align-items: center;">Vehicles:</h3>
		<div style="display: flex; justify-content: center; align-items: center;">        
         <label style="color: red;">{{ errortext }}</label><br><br>
        </div>
		<div v-for="c in vehicles" class="rectangle" style="margin-bottom: 20px;">
		      <table style="border: 1px solid black; margin: 0 auto; width: 75%;">
		        <colgroup>
		          <col style="width: 20%;">
		          <col style="width: 15%;">
		          <col style="width: 15%;">
		        </colgroup>
		        <tr>
		          <td style="padding: 20px;">
		          	  <img :src="c.imageURL" alt="Vehicle Image" style="width: 100%; height: auto;">
		          </td>
		          <td>
				      <div style="display: inline-block; vertical-align: middle;">
				        <div>
				          Brand: {{c.brand}}
				        </div>
				        <div>
				          Model: {{c.model}}
				        </div>
				        <br>
				        <div>
				          Price: {{c.price}}
				        </div>
				      </div>
				   </td>
		          <td style="position: relative;">
				      <div style="position: absolute; bottom: 0; right: 0; margin: 15px;">
				       	<button type="submit" v-on:click="removeCar(c)">Remove</button>
				      </div>
			      </td>
		        </tr>
		      </table>
		</div>
		<div style="display: flex; justify-content: center; align-items: center;"><h3>Total price: {{price}}</h3></div><br>
		
		<div style="display: flex; justify-content: center; align-items: center;">        
         <label style="color: red;">{{ errortextTime }}</label><br><br>
        </div>
		<div style="display: flex; justify-content: center; align-items: center;">
			<label for="timeInput">Enter the vehicle pick-up time:</label>
			<input style="margin-left: 10px;" type="time" id="timeInput" name="timeInput" v-model="time">
		</div><br><br><br>
		<div style="display: flex; justify-content: center; align-items: center;">        
         <label >{{ confirmationText }}</label><br><br>
        </div>
		<div v-if="orderTaken === 'no'" style="display: flex; justify-content: center; align-items: center;">
			<button type="submit" v-on:click="makeReservation"><strong>Make Reservation</strong></button>
		</div>
		<div style="display: flex; justify-content: center; align-items: center;">
		<br><br><br><br>
			<button type="submit" v-on:click="goBack">Return to start page</button>
		</div>				
	</div>
  `,
  mounted() {
	const combinedParam = this.$route.params.id;
    console.log(combinedParam); 
    const [userId,startDate,endDate] = combinedParam.split('_');
    this.userId = userId;
    this.startDate=startDate;
    this.endDate=endDate;
    console.log(this.userId);
    console.log(this.startDate); 
    console.log(this.endDate);
	console.log("id usera u profilu je:"+this.userId)
	this.errortext='';
	this.errortextTime='';
	this.confirmationText='';
	this.orderTaken='no'
	//getting all rentacars
	axios
	  .get("rest/objects/")
	  .then((response) => {
	    this.allRentACarObjects = response.data;
	  })
	  .catch((error) => console.log(error));
	//getting user
	axios
      .get("rest/user/profile/" + this.userId)
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
        console.log("Making new shoppingCart");
      })
      .catch((error) => console.log(error));
	//gating shopping cart
	axios.get('rest/user/getShoppingCart/'+ this.userId)
  		.then(response => {
		    this.shoppingCart = response.data;	
		    console.log("Id korpe:"+ this.shoppingCart.id);	
		    axios.get('rest/shoppingCarts/getShoppingCartVehicles/'+ this.shoppingCart.id)
		  		.then(response => {
				    this.vehicles = response.data;	
				    console.log("Vozila:"+ this.vehicles);	
				    axios.get('rest/shoppingCarts/getShoppingCartPrice/'+ this.shoppingCart.id)
				  		.then(response => {
						    this.price = response.data;	
						    console.log("Cena:"+ this.price);	
						    this.carCounter = this.vehicles.length;	
						    console.log("Broj vozila:"+ this.carCounter);		         
					});    
			});    
	 });
  },
  methods: {
	goBack: function () {
      event.preventDefault();
      router.push(`/loggedInCustomer/${this.userId}`);
    },
    removeCar: function (c) {
      event.preventDefault();
      console.log("Car Counter:", this.carCounter);
	  if (this.carCounter <= 1) {
	    this.errortext = 'Order must consist of at least one vehicle.';
	    return; // Exit the function without further execution
	  }
      var helpstr=c.id+"_"+this.shoppingCart.id
      console.log("Helpstr:"+ helpstr);
      axios
      	.get('rest/shoppingCarts/removeVehicleFromShoppingCart/'+ helpstr)
	  	.then(response => {
			 this.shoppingCart = response.data;	
			 this.vehicles = this.shoppingCart.cars;
			 this.price = this.shoppingCart.price;
			 this.carCounter-=1;
			 console.log("Shopping Cart:", this.shoppingCart);
			 console.log("Vehicles:", this.vehicles);
			 console.log("Price:", this.price);
			 console.log("Car Counter:", this.carCounter);
			 axios
	        	.post(`rest/user/addShoppingCart/${this.userId}`, this.shoppingCart)
	    		.then(response => {
	     		 console.log("User updated successfully. Changed cart");
	    	})
	    	.catch(error => {
	     		 this.errortext = "An error occurred while updating user data";
				 console.log(error);
	    	});				         
	  }); 
      
    },
    makeReservation: function() {
	  axios.get("rest/rentingOrders/allOrders")
	    .then((response) => {
	      this.orders = response.data;
	      console.log('All Orders:', this.orders);
	      let temp = [...this.orders];
	      this.orders = [];
	      let count = temp.length;
	      for (let i = 0; i < count; i++) {
	        let item = temp[i];
	        const orderStartDate = new Date(item.date);
	        const orderEndDate = new Date(item.date);
	        orderEndDate.setDate(orderEndDate.getDate() + item.duration);
	        let isFiltered = true;
	
	        // Iterate through each day in the startDate and endDate range
	        let currentDate = new Date(this.startDate);
	        const endDate = new Date(this.endDate);
	        for (currentDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
	          // Check if the current day matches any order date
	          let orderCurrentDate = new Date(orderStartDate);
	          while (orderCurrentDate <= orderEndDate) {
	            // Check if the current days match
	            if (currentDate.toDateString() === orderCurrentDate.toDateString()) {
	              isFiltered = false;
	              break;
	            }
	            orderCurrentDate.setDate(orderCurrentDate.getDate() + 1);
	          }
	
	          if (!isFiltered) {
	            break;
	          }
	        }
	
	        if (!isFiltered) {
	          this.orders.push(item);
	        }
	      }
	
	      console.log('Orders:', this.orders);
	      console.log('Cars', this.allCars);
	
	      let vehiclesNotInOrders = [...this.vehicles];
	      let countC = vehiclesNotInOrders.length;
	      let countO = this.orders.length;
	      for (let i = 0; i < countC; i++) {
	        this.vehicle = vehiclesNotInOrders[i];
	        console.log('Current car', this.vehicle);
	        let isFoundInOrders = false;
	
	        for (let j = 0; j < countO; j++) {
	          let order = this.orders[j];
	          let countCO = order.vehicles.length;
	          for (let k = 0; k < countCO; k++) {
	            let orderVehicle = order.vehicles[k];
	            console.log('Current car id in both ' + this.vehicle.id + "drugi" + orderVehicle.id);
	            if (orderVehicle.id === this.vehicle.id) {
	              isFoundInOrders = true;
	              console.log('OVDE SMO');
	              break;
	            }
	          }
	
	          if (isFoundInOrders) {
	            break;
	          }
	        }
	
	        if (isFoundInOrders) {
	          this.vehicle.carStatus = 'Rented';
	          this.confirmationText = 'Order has already been made!';
	          this.orderTaken = 'yes';
	        } else {
	          this.vehicle.carStatus = 'Available';
	        }
	
	        if (this.orderTaken === 'yes') {
	          return;
	        }
	      }
	
	      this.checkTimeAvailability();
	    })
	    .catch((error) => console.log(error));
	},

	
	checkTimeAvailability: function() {
	  if (!this.time) {
	    this.errortextTime = 'The vehicles pick-up time must be entered!';
	    return;
	  }
	
	  var openingTime = "09:00"; // Example opening time
      var closingTime = "18:00"; // Example closing time
	  var currentTime = this.time; // Current time from HTML
	
	  var openingDateTime = new Date();
	  var closingDateTime = new Date();
	  var currentDateTime = new Date();
	
	  // Set the opening and closing times
	  openingDateTime.setHours(parseInt(openingTime.split(":")[0]), parseInt(openingTime.split(":")[1]), 0);
	  closingDateTime.setHours(parseInt(closingTime.split(":")[0]), parseInt(closingTime.split(":")[1]), 0);
	  currentDateTime.setHours(parseInt(currentTime.split(":")[0]), parseInt(currentTime.split(":")[1]), 0);
	
	  // Compare the timestamps
	  if (currentDateTime.getTime() >= openingDateTime.getTime() && currentDateTime.getTime() <= closingDateTime.getTime()) {
	    console.log("The current time is within the opening hours.");
	    this.errortextTime = '';
	    //napravi se order za svaki rentacar
	    //svaki rentacar dobijem tako sto nabavim sve rentacarove i vidim da li su vozila u tom rentacaru ako jesu dodajem ga u listu. nakon toga za svaki rentacar pravim poruzbinu i cena je suma cena vozila u tom rentacaru koji se nalazi u ovoj poruzdbini
	    	this.relevantCars=[];
	        let temp = [];
	        temp = this.allRentACarObjects;
			this.allRentACarObjects = [];
			let count = 0;
				for (const _ in temp) {
					count++;
				}
			for (let i = 0; i < count; i++) {
				  let item = temp[i];
				  console.log("Object:"+item);
				  let isFiltered = false;
				  for (let j = 0; j < item.availableCars.length; j++) {
					    let availableCar = item.availableCars[j];
					
					    for (let k = 0; k < this.vehicles.length; k++) {
					      let car = this.vehicles[k];
					
					      if (availableCar.id === car.id) {
					        isFiltered = true;
					        this.relevantCars.push(car);
					        break;
					      }
					    }
				  }    
				  
				  if (isFiltered) {
				    this.allRentACarObjects.push(item);				    				    
				  }
			}
	    
	     this.createRentingOrder();
	    
	  } else {
	    console.log("The current time is outside the order picking up hours.");
	    this.errortextTime = 'This time is outside the opening hours.';
	    return;
	  }
	},
	
	createRentingOrder: function() {
	  this.rentingOrderInfo.startDate = this.startDate;
	  this.rentingOrderInfo.endDate = this.endDate;
	  this.rentingOrderInfo.price = this.shoppingCart.price;
	  this.points = parseInt((this.shoppingCart.price / 1000) * 133);
	  var requestString = this.userId + "_" + this.points.toString();
	  console.log("Request" + requestString);
	  this.rentingOrderInfo.time = this.time;
	  this.rentingOrderInfo.objects = this.allRentACarObjects;
	
	  axios.post("rest/user/customerPointsGain/" + requestString)
	    .then((response) => {
	      this.rentingOrderInfo.customer = response.data;
	      axios.get('rest/shoppingCarts/getShoppingCartVehicles/' + this.shoppingCart.id)
	        .then(response => {
	          this.rentingOrderInfo.cars = response.data;
	          console.log('Start Date:', this.rentingOrderInfo.startDate);
	          console.log('End Date:', this.rentingOrderInfo.endDate);
	          console.log('Renting Order Cars:', this.rentingOrderInfo.cars);
	          console.log('Renting Order user:', this.rentingOrderInfo.customer);
	          console.log('Renting Order objects:', this.rentingOrderInfo.objects);
	          console.log('Renting Order price:', this.rentingOrderInfo.price);
	          console.log('Renting Order time:', this.rentingOrderInfo.time);
	          axios.post("rest/rentingOrders/createComplexOrder", this.rentingOrderInfo)
	            .then((response) => {
	              var b = null;
	              b = response.data;
	              if (b) {
	                console.log('WE MADE IT:', b);
	                this.confirmationText = 'Order successfully made! ' + this.points + ' points has been gained!';
	                this.orderTaken = 'yes';
	              } else {
	                console.log('didnt make it:', b);
	              }
	            })
	            .catch((error) => console.log(error));
	        });
	    })
	    .catch((error) => console.log(error));
	}

  }
  
});
