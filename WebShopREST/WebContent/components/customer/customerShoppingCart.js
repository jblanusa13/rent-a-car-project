Vue.component("customerShoppingCart", {
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
		rentingOrderInfo:{startDate:null,endDate:null, object:null, cars:null,customer:null,price:null,time:null},
		errortextTime:'',
		object:null,
		user:null
		
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
			<button type="submit" v-on:click="makeReservation"><strong>Make Reservation</strong></button>
		</div>
		<div style="display: flex; justify-content: center; align-items: center;">
		<br><br><br><br>
			<button type="submit" v-on:click="goBack">Give up from the order</button>
		</div>				
	</div>
  `,
  mounted() {
	const combinedParam = this.$route.params.id;
    console.log(combinedParam); 
    const [objectId, userId,startDate,endDate] = combinedParam.split('_');
    this.objectId = objectId;
    this.userId = userId;
    this.startDate=startDate;
    this.endDate=endDate;
    console.log(this.objectId); 
    console.log(this.userId);
    console.log(this.startDate); 
    console.log(this.endDate);
	console.log("id usera u profilu je:"+this.userId)
	this.errortext='';
	this.errortextTime='';
	//getting object
	axios
	  .get("rest/objects/" + this.objectId)
	  .then((response) => {
	    this.object = response.data;
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
    makeReservation: function(){
		if(!this.time){
			this.errortextTime='The vehicle pick-up time must be entered!';
			return;
		}
		var openingTime = this.object.openingTime; // Example opening time
		var closingTime = this.object.closingTime; // Example closing time
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
		  this.errortextTime='';

		} else {
		  console.log("The current time is outside the opening hours.");
		  this.errortextTime='This time is outside the opening hours. The opening hours for this object are: '+this.object.openingTime+"-"+this.object.closingTime;
		  return;
		}

		this.rentingOrderInfo.startDate=this.startDate;
		this.rentingOrderInfo.endDate=this.endDate;
		this.rentingOrderInfo.price=this.shoppingCart.price;
		this.rentingOrderInfo.time=this.time;
		this.rentingOrderInfo.customer=this.user;
		this.rentingOrderInfo.object=this.object;
		axios.get('rest/shoppingCarts/getShoppingCartVehicles/'+ this.shoppingCart.id)
		  		.then(response => {
				    this.rentingOrderInfo.cars = response.data;	   
				    console.log('Start Date:', this.rentingOrderInfo.startDate);
					console.log('End Date:', this.rentingOrderInfo.endDate);
					console.log('Renting Order Cars:', this.rentingOrderInfo.cars);
					console.log('Renting Order user:', this.rentingOrderInfo.customer);
					console.log('Renting Order object:', this.rentingOrderInfo.object);
					console.log('Renting Order price:', this.rentingOrderInfo.price);
					console.log('Renting Order time:', this.rentingOrderInfo.time); 
					axios
				      .post("rest/rentingOrders/createOrder", this.rentingOrderInfo)
				      .then((response) => {
						  var b=null;
				          b = response.data;
				          if(b){
							  console.log('WE MADE IT:', b); 
						  }
						  else{
							  console.log('didnt make it:', b); 
						  }
				      })
				      .catch((error) => console.log(error)); 
		});
		
		
		
	}
  }
  
});
