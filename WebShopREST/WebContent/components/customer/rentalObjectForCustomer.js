Vue.component("objectForCustomer", {
  data: function () {
    return {
      objectId: null,
      object: null,
      searched: null,
      startDate: null,
      endDate: null,
      errorText: "",
      cars:null,
      allCars:null,
      orders:null,
      vehicle:null,
      counter:0,
      shoppingCart:null
    };
  },
  template: `
    <div>
      <h3>{{ object.name }}</h3>
      <img :src="object.imageURL" alt="Object Image" style="width: 100%; height: auto;">
      <table>
        <tr>
          <td>Working time:</td>
          <td></td>
        </tr>
        <tr>
          <td>Status: </td>
          <td></td>
        </tr>
      </table><br>
  
      <table>
        <tr>
          <td>Location: </td>
          <table>
            <tr>
              <td>Longitude: </td>
              <td><input type="text" name="longitude" v-model="object.location.longitude" disabled></td>
            </tr>
            <tr>
              <td>Latitude: </td>
              <td><input type="text" name="latitude" v-model="object.location.latitude" disabled></td>
            </tr>
            <tr>
              <td>Address: </td>
              <td><input type="text" name="address" v-model="object.location.address" disabled></td>
            </tr>
          </table>
        </tr>
      </table><br><br>
      <div>
        <form>
          <label for="startdate">Start date:</label>
          <input type="date" id="startdate" v-model="startDate" name="startdate">
  
          <label for="enddate">End date:</label>
          <input type="date" id="enddate" v-model="endDate" name="enddate"><br><br>
  
          <button type="submit" v-on:click.prevent="searchVehicles">Search</button>
        </form><br><br>
        <label v-if="searched !== 'yes'" style="color: red;">{{ errorText }}</label>
      </div>
      <div v-if="searched === 'yes'">
        <h4>Available vehicles</h4>
        <table border="1">
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
            <th>Status</th>
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
        <div>
          <button type="submit" v-on:click="ShowAll">Show all objects</button>
        </div>
      </div>
    </div>
  `,
  mounted() {
    this.objectId = this.$route.params.id;
	axios
	  .get("rest/objects/" + this.objectId)
	  .then((response) => {
	    this.object = response.data;
	    this.allCars= this.object.availableCars;
	  })
	  .catch((error) => console.log(error));
	axios
	   .get("rest/rentingOrders/allOrders")
	   .then((response) => {
	 	   this.orders = response.data;
	    })
	    .catch((error) => console.log(error));
	      
  },
  methods: {
    ShowAll: function () {
		
	},
    AddToCart: function (v) {
		console.log("Adding to the cart.")
		if(counter===0){
			counter++;
			console.log("Making new shoppingCart");
			//zove se shoppingCartServis da se napravi nova korpa
		}
		v.carStatus = 'Added to the cart';
		//zove se shopingcart koji kao parametar prima vozilo
		
	},
    searchVehicles: function () {

      if (!this.startDate || !this.endDate) {
        this.errorText = "Both fields must be filled in order to search for vehicles";
        return;
      }

	  const today = new Date();
	
	  const selectedStartDate = new Date(this.startDate);
	  const selectedEndDate = new Date(this.endDate);
	
	  if (selectedStartDate < today || selectedEndDate < today) {
	    this.errorText = "Selected dates cannot be before today";
	    return;
	  }
      this.searched = "yes";
      
      //in orders to have only those who are in that time period 
      console.log("Searching for orders in that timespan");
      axios
	   .get("rest/rentingOrders/allOrders")
	   .then((response) => {
	 	   this.orders = response.data;
	    })
	    .catch((error) => console.log(error));
	    
        let temp = [];
        temp = this.orders;
		this.orders = [];
		let count = 0;
		for (const _ in temp) {
			count++;
		}
		for (let i = 0; i < count; i++) {
		  let item = temp[i];
		  const orderStartDate = new Date(item.date);
		  const orderEndDate = new Date(item.date);
		  orderEndDate.setDate(orderEndDate.getDate() + item.duration);
		  let isFiltered = true;
		
		  // Iterate through each day in the startDate and endDate range
		  let currentDate = new Date(this.startDate);
		  const endDate = new Date(this.endDate);
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
		  this.allCars.push(this.vehicle);
		}
           
    }
  }
});
