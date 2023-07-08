Vue.component("customerRentalObjects", {
  data: function () {
    return {
      objects: null,
      user:null,
      userId: null,
      orderReservationDate:null,
      selectedSortOption: null,
      startDate:null,
      endDate:null,
      minPrice:null,
      maxPrice:null,
      objectName:null,
      objectGrade:null,
      comment:null,
      commentCreation:{customer:null, object:null, grade:null, comment:null},
      createdComment:null,
      errortext:'',
      avgGrade:''
      
    };
  },
  template: `
		<div>
		  <div class="right-position">
		    <button type="submit" v-on:click="goBack">Return to profile page</button><br><br>
		  </div>
		  <h2>All reservations</h2><br>
		  <div class="standard-left-margin">
		    <form>
		      <label for="sortOption">Sort by:</label>
		      <select id="sortOption" v-model="selectedSortOption">
		        <option value="priceAscending">Price (Ascending)</option>
		        <option value="priceDescending">Price (Descending)</option>
		        <option value="dateAscending">Date (Ascending)</option>
		        <option value="dateDescending">Date (Descending)</option>
		        <option value="nameAscending">Name of rental (Ascending)</option>
		        <option value="nameDescending">Name of rental (Descending)</option>
		      </select>
		      <br><br>
				<div>
			      <button type="button" v-on:click="sortOrders">Sort</button>
			    </div>
		      <br>
		    </form>
		  </div>
		 <div >
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
			    <button type="submit" v-on:click="filterOrdersClick" >Filter</button>
 				<button type="submit" v-on:click="filterOrdersUndo" >Undo filtering</button><br><br>
			  </div>
			</form>
          </div><br>
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
				        <div v-if="order.orderStatus === 'Rejected'" class="order-rejection">
				          <br><label>Reason for order rejection: {{order.managerComment}}</label><br><br>
				        </div>
				        Order rent a car object: {{ order.rentingObject.name }}<br>
				        Date and time of rental: {{ order.date }} {{ order.time }}<br>
				        Duration: {{ order.duration }} days<br>
				        Customer: {{ order.customer.name }} {{ order.customer.surname }}<br><br>
				        <strong>Price: {{ order.price }}</strong><br><br>
				        <div  v-if="order.orderStatus === 'Processing'" class="cancel-button">
				          <button v-on:click="cancelOrder(order)">Cancel order</button>
				        </div>
				        <div v-if="order.orderStatus === 'Cancelled'" class="order-cancelled">
				          <label>This order has been cancelled</label><br>
				        </div>
				      </div>
				    </td>
				    <td class="table-renting-orders-td">
				      <div v-if="order.orderStatus === 'Returned' && !order.customerComment" class="comment-section">
				        <label>{{errortext}}</label><br>
				        <label>Please feel free to grade this renting object: </label><br>
				        <label>Insert grade: </label><br><br>
				        <input type="number" min="1" max="5" v-model="objectGrade"><br><br>
				        <label>Insert comment: </label><br>
				        <textarea v-model="comment"></textarea><br><br>
				        <button type="submit" v-on:click="submitComment(order)">Submit</button><br><br>
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
    this.errortext=''
    //dobavim usera
    axios
      .get("rest/user/profile/" + this.userId)
      .then((response) => {
        this.user = response.data;
        console.log(this.user);
      })
      .catch((error) => console.log(error));
      //dobavim naruzbinu
     axios
      .get("rest/rentingOrders/customerOrders/"+ this.userId)
      .then((response) => {
        this.objects = response.data;
      })
      .catch((error) => console.log(error)); 
    
  },
  methods: {
    goBack: function () {
        event.preventDefault();
		router.push(`/customerProfile/${this.userId}`);
    },
    submitComment: function (order){
		if (!this.comment) {
	      this.errortext = 'Enter the comment before submitting.';
	      return;
	    }
	    if (!this.objectGrade) {
	      this.errortext = 'Enter the grade before between 1-5 submitting.';
	      return;
	    }
		var help=order.id+"_"+this.comment;
		 axios
	      .put("rest/rentingOrders/customerComment/"+ help)
	      .then((response) => {
	         order.customerComment=this.comment;
			  axios
				  .get("rest/objects/" + order.rentingObject.id)
				  .then((response) => {
				    this.commentCreation.object = response.data;
				    this.commentCreation.customer=this.user;
				    this.commentCreation.grade=this.objectGrade;
				    this.commentCreation.comment=this.comment;
					    console.log("Object:", this.commentCreation.object);
						console.log("Customer:", this.commentCreation.customer);
						console.log("Grade:", this.commentCreation.grade);
						console.log("Comment:", this.commentCreation.comment);
					//ovde sad treba da pozovem komentar da mi se kreira
					axios
				      .post("rest/comments/newComment",this.commentCreation)
				      .then((response) => {
						  //kad mi se kreira komentar da se preracuna prosecna ocena objekta i da se updejtuje
				        this.avgGrade = response.data;
				        helpSent=order.rentingObject.id+"_"+this.avgGrade;
				        axios
						  .put("rest/objects/changeRate/" + helpSent)
						  .then((response) => {
						    console.log("Rate changed succesfully");
						  })
						  .catch((error) => console.log(error));
				      })
				      .catch((error) => console.log(error)); 					
		
			  })
			  .catch((error) => console.log(error));
	      })
	      .catch((error) => console.log(error));
		 
	},
    cancelOrder: function (order) {
		  order.orderStatus = 'Cancelled';
	      axios
	      .put("rest/rentingOrders/customerOrderCancellation/"+ order.id)
			      .then((response) => {
			          console.log("Successfuly cancelled order.");
			        //treba sad ovde jos jedan axios metod za usere da mu se oduzmu bodovi
					  var currentPrice = order.price;
					  var pointsLoss = parseInt((currentPrice / 1000) * 133 * 4);
					  var requestString = this.userId + "_" + pointsLoss.toString();
					  console.log("Request" + requestString);
					  
					  // Use the calculated value as needed
					  console.log(pointsLoss);
					  
					  axios
					      .post("rest/user/customerPointsLoss/" + requestString)
					      .then((response) => {
							  this.user=response.data;
					        console.log("Updejtovani poeni usera");
					      })
					      .catch((error) => console.log(error));
			      })
			      .catch((error) => console.log(error));
			      
	      return;
    },
    filterOrdersClick: function () {
		event.preventDefault();
		console.log("Gathering filter orders.RESTART");
		let temp = [];
		temp = this.objects;
		this.objects= [];
		let count = 0;
		for (const _ in temp) {
			count++;
		}
		for (let i = 0; i < count; i++){
		    let item = temp[i];
		    console.log(item)
		    const orderStartDate = new Date(item.date);
		    const orderEndDate = new Date(item.date);
			orderEndDate.setDate(orderEndDate.getDate() + item.duration);
		    
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
		    // Filter by rent-a-car object name
		    if (this.objectName && item.rentingObject.name.toLowerCase().indexOf(this.objectName.toLowerCase()) === -1) {
		      isFiltered = false;
		    }
		
		    if (isFiltered) {
				console.log("item added. id:"+item.id);
		        this.objects.push(item);
		    }
		  }
    },
    filterOrdersUndo: function () {
		axios
	      .get("rest/rentingOrders/customerOrders/"+ this.userId)
	      .then((response) => {
	        this.objects = response.data;
	      })
	      .catch((error) => console.log(error));
    },

    sortOrders: function() {
	    if (this.selectedSortOption === 'priceAscending') {
	      axios
		      .get("rest/rentingOrders/customerOrdersPriceSortingAscending/"+ this.userId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	      
	    } else if (this.selectedSortOption === 'priceDescending') {
	      axios
		      .get("rest/rentingOrders/customerOrdersPriceSortingDescending/"+ this.userId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    } else if (this.selectedSortOption === 'dateAscending') {
	      axios
		      .get("rest/rentingOrders/customerOrdersDateSortingAscending/"+ this.userId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    } else if (this.selectedSortOption === 'dateDescending') {
	      axios
		      .get("rest/rentingOrders/customerOrdersDateSortingDescending/"+ this.userId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
	    }else if (this.selectedSortOption === 'nameAscending') {
			axios
		      .get("rest/rentingOrders/customerOrdersObjectNameSortingAscending/"+ this.userId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
			
		}else if (this.selectedSortOption === 'nameDescending') {
			axios
		      .get("rest/rentingOrders/customerOrdersObjectNameSortingDescending/"+ this.userId)
		      .then((response) => {
		        this.objects = response.data;
		      })
		      .catch((error) => console.log(error));
			
		}
  }
    
  },
});
