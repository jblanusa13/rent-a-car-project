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
      errortext:''
      
    };
  },
  template: `
		<div>
		  <h3>All reservations</h3>
		  
		  <div>
		    <button type="submit" v-on:click="goBack">Return to home page</button><br><br>
		  </div>
		  <div>
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
		      <button type="button" v-on:click="sortOrders">Sort</button>
		      <br><br>
		    </form>
		  </div>
		  <div>
        <form>
		  <div >
		    <label for="startdate">Start date:</label>
		    <input type="date" v-model="startDate" id="startdate" name="startdate" >
		  
		    <label for="enddate">End date:</label>
		    <input type="date" v-model="endDate" id="enddate" name="enddate" ><br><br>
		  
		    <label for="minprice">Minimal price:</label>
		    <input type="number" v-model="minPrice" id="minprice" name="minprice" >
		  
		    <label for="maxprice">Maximal price:</label>
		    <input type="number" v-model="maxPrice" id="maxprice" name="maxprice" >
		    
		    <label for="objectName">Rent a car object name:</label>
		    <input type="text" v-model="objectName" id="objectname" name="objectname" >
		  </div>
		
		  <div>
		  	<br>
		    <button type="submit" v-on:click="filterOrdersClick">Filter</button>
		    <button type="submit" v-on:click="filterOrdersUndo">Undo filtering</button><br><br>
		  </div>
		</form>
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
		            <div v-if="order.orderStatus === 'Rejected'">
		          		<br><label>Reason for order rejection: {{order.managerComment}}</label><br><br>
		          	</div>
		            Order rent a car object: {{ order.rentingObject.name }}<br>
		            Date and time of rental: {{ order.date }} {{ order.time }}<br>
		            Duration: {{ order.duration }} days<br>
		            Customer: {{ order.customer.name }} {{ order.customer.surname }}<br><br>
		            <strong>Price: {{ order.price }}</strong><br><br>
		            <div v-if="order.orderStatus === 'Processing'">
		              <button v-on:click="cancelOrder(order)">Cancel order</button>
		            </div>
		            <div v-if="order.orderStatus === 'Cancelled'">
		              <label>This order has been cancelled</label><br>
		            </div>
		          </td>
		          <td>
			    	<div v-if="order.orderStatus === 'Returned' && !order.customerComment">
			        	<label>{{errortext}}</label><br>
			        	<label>Please feel free to grade this renting object: </label><br>
			        	<label>Insert grade: </label><br><br>
			        	<input type="number" min="1" max="5" v-model="objectGrade"><br><br>
			        	<label>Insert comment: </label><br>
			        	<textarea v-model="comment" style="width: 300px; height: 45px;"></textarea><br><br>
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
      router.push(`/loggedInCustomer/${this.userId}`);
    },
    submitComment: function (order){
		//moram prvo da popunim komentar u orderu
		//zatim da kreiram komentar
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
				        this.createdComment = response.data;
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
