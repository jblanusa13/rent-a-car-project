Vue.component("objectForCustomer", {
  data: function () {
    return {
      objectId: null,
      userId:null,
      user:null,
      object: null,
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
      objectStatus: null,
      objectName:null,
      image:null,
      comments:null,
		street:null,
	  city:null,
	  postalNumber:null
    };
  },
  template: `
    <div>
      <h1>{{ objectName }}</h1>
      <div class="center-position">
		  <img :src="image" class="rental_img">
	  </div>
	  <div><br><br>     
        <label class="center-position"> <strong>Working time: {{object.openingTime}} - {{object.closingTime}}</strong></label><br><br>
        <label class="center-position"><strong>Status: {{objectStatus}}</strong></label><br><br>          
  		<label class="center-position"><strong> Location:</strong></label>
     <table class="center-position location-view standard-left-margin standard-right-margin">
              <tr>
                <td>
					<div id="map"></div>
				</td>
   				<td>
					<b>{{street}}</b><br>
					{{city}} {{postalNumber}}<br>
					{{object.location.longitude}}, {{object.location.latitude}}
				</td>
				</tr>
            </table>
      </div>
      <br><br>
      <div>
		  <form  class="center-position">
		    <label for="startdate">Start date: </label>
		    <input style="margin-left: 5px;" type="date" id="startdate" v-model="startDate" name="startdate">
		
		    <label for="enddate" style="margin-left: 20px;">End date:</label>
		    <input style="margin-left: 5px;" type="date" id="enddate" v-model="endDate" name="enddate">
		  </form>
		
		  <br>
		
		  <div  class="center-position">
		    <button type="submit" v-on:click.prevent="searchVehicles">Search</button>
		  </div>
		
		  <br>
		
		  <label v-if="searched !== 'yes'" style="color: red;">{{ errorText }}</label>
		</div>
	  <div v-if="searched !== 'yes'">
	  	<h4 class="standard-left-margin">Available vehicles</h4>
        <table border='1' class="rental-object-table">
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
            <th>Official current vehicle status</th>
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
          </tr>
        </table>
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
            <td><img :src="v.imageURL" alt="Vehicle Image" style="width: 25%; height: auto;"></td>
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
          <button  v-on:click="ShowShoppingCart">Show shoppig cart and make reservation</button>
        </div>
      </div>
      <br><br>
      <div class="center-position">
      <br><h2> Comments of the renting object: </h2><br>
      </div>
      <div v-for="c in comments" class="rectangle">
		      <table class="table-shopping-cart">
		        <tr>
		          <td>
				      <div class="comment-showing">
		                <div>
		                  Customer: {{c.customer.name}}<br><br>
		                </div>
		                <div>
		                  Grade: {{c.grade}}<br><br>
		                </div>
		                <div>
		                  Comment: <br><br>{{c.comment}}<br><br>
		                </div>
		              </div>
				   </td>
		        </tr>
		      </table>
	  </div>
	  <div class="center-position">        
          <br><br>
          <button type="submit" v-on:click="ShowAll">Go back</button>
      </div>
    </div>
  `,
  mounted() {
    const combinedParam = this.$route.params.id;
    console.log(combinedParam); 
    const [objectId, userId] = combinedParam.split('_');
    this.objectId = objectId;
    this.userId = userId;
    console.log(this.objectId); 
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
    //finding the renting object
	axios
	  .get("rest/objects/" + this.objectId)
	  .then((response) => {
	    this.object = response.data;
	    this.objectName=this.object.name;
	    this.image= this.object.imageURL;
	    
	        var openingTime = this.object.openingTime; // Example opening time
			var closingTime = this.object.closingTime; // Example closing time
			
			var currentDateTime = new Date(); // Current date and time
			
			var hours = currentDateTime.getHours(); // Get the current hour (0-23)
			var minutes = currentDateTime.getMinutes(); // Get the current minute (0-59)
			var seconds = currentDateTime.getSeconds(); // Get the current second (0-59)
			
			console.log("Opening Time: " + openingTime);
			console.log("Closing Time: " + closingTime);
			console.log("Current Time: " + hours + ":" + minutes + ":" + seconds);
			
			var openingDateTime = new Date();
			var closingDateTime = new Date();
			
			// Set the opening and closing times
			openingDateTime.setHours(parseInt(openingTime.split(":")[0]), parseInt(openingTime.split(":")[1]), 0);
			closingDateTime.setHours(parseInt(closingTime.split(":")[0]), parseInt(closingTime.split(":")[1]), 0);
			
			// Compare the timestamps
			if (currentDateTime.getTime() >= openingDateTime.getTime() && currentDateTime.getTime() <= closingDateTime.getTime()) {
			  console.log("The current time is within the opening hours.");
			  this.objectStatus = 'Opened';
			} else {
			  console.log("The current time is outside the opening hours.");
			  this.objectStatus = 'Closed';
			}

	    
	    this.allCars= this.object.availableCars;
		this.street = this.object.location.address.split(',')[0];
		this.city = this.object.location.address.split(',')[1];
		this.postalNumber = this.object.location.address.split(',')[2];
	
		console.log("Adresa: "+this.object.location.address);
		console.log("Ulica: "+this.street);
		console.log("Grad: "+this.city);
		console.log("Post br: "+this.postalNumber);
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
	//treba da dobavim sve komentare za ovaj objekat koji su potvrdeni
	axios
	   .get("rest/comments/allApprovedComments/"+ objectId)
	   .then((response) => {
	 	   this.comments = response.data;
	    })
	    .catch((error) => console.log(error));

//adding Map	
	const map = new ol.Map({
		  target: 'map',
		  layers: [
		    new ol.layer.Tile({
		      source: new ol.source.OSM(),
		    })
		  ],
		  view: new ol.View({
		    center: ol.proj.fromLonLat([0, 0]),
		    zoom: 2,
		  })
		});
		
		const marker = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(
							ol.proj.fromLonLat([0, 0])
						)
					})
				]
			}),
			style: new ol.style.Style({
				image: new ol.style.Icon({
					src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
					anchor: [0.5,1]
				})
			})
		})
		
		map.addLayer(marker);
  		
  		this.mapObject = map;
  		this.markerObject = marker;
  		
  		const vec = new ol.layer.Vector({
		  source: new ol.source.Vector(),
		});
		  		
  		map.on('click', (event) => {
			  var cor = ol.proj.toLonLat(event.coordinate);
			  this.convertToMyCoordinates(cor);
			  vec.getSource().clear();
			  
			  var mapMarker = new ol.Feature({
				  geometry: new ol.geom.Point(event.coordinate),
			  });
			  
			  vec.getSource().addFeature(mapMarker);
			  
			  this.moveMarker(event.coordinate);
		  });
	      
  },
  methods: {
    ShowAll: function () {
		event.preventDefault();
        router.push(`/loggedInCustomer/${this.userId}`);
		
	},
    AddToCart: function (v) {
		//treba da UPDEJTIJEM USERA da mu je ovo korpa DA ali to tek kad odem na pregled korpe jel?
		this.empty='no';
		
      	this.textForCustomer= '';
      	console.log(this.textForCustomer);
		console.log("OVDE JE BITAN SHOPPINGCART"+this.shoppingCart.id);
		var param=v.id+"_"+this.objectId
		console.log(v)
		axios
		   .get("rest/objects/findCar/"+param)
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
		//treba da mi se postavi korpa kao korpa usera i da otvorim novu stranicu 
		
		//treba da dobavim taj shoppingCart i da ga prosledim
		
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
			     		 const combinedParam = this.objectId+"_"+this.userId+"_"+this.startDate+"_"+this.endDate;
			     		 router.push({ path: `/customerShoppingCart/${combinedParam}` });
			    	})
			    	.catch(error => {
			     		 this.errortext = "An error occurred while updating user data";
						 console.log(error);
			    	});
					
				}		     
	    })
    },
moveMarker: function (lonLatCoordinates) {
    const markerSource = this.markerObject.getSource();
    markerSource.clear();

    const mapMarker = new ol.Feature({
      geometry: new ol.geom.Point(lonLatCoordinates)
    });

    markerSource.addFeature(mapMarker);
  },

  convertToMyCoordinates : function(lonLatCoordinates){
		fetch(
			"http://nominatim.openstreetmap.org/reverse?format=json&lon=" + lonLatCoordinates[0] + "&lat=" + lonLatCoordinates[1]
	  		).then(response => { return response.json(); }).then(json => 
		  	{
				let address = json.address;
			  this.livingPlace = address.town || address.village || address.city;
				console.log("Grad kad se klikne na mapu: "+this.livingPlace);
		  	})
	}	
  }
});
