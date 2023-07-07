Vue.component("objectForManager", {
  data: function () {
    return {
      objectId: null,
      object: null,
      objectStatus: null,
      objectName: null,
      image: null,
      comments: null,
      userId:null,
	  manager:null,
	  hisObject:false,
      commentsChange: null
    };
  },
  template: `
    <div>
      <h1 style="display: flex; flex-direction: column; align-items: center;">{{ objectName }}</h1>
      <div style="display: flex; justify-content: center; align-items: center;">
        <img :src="image" style="width: 75%; height: auto;">
      </div>
      <div>
        <br><br>     
        <label style="margin-left: 50px;"> <strong>Working time: {{object.openingTime}} - {{object.closingTime}}</strong></label><br><br>
        <label style="margin-left: 50px;"><strong>Status: {{ objectStatus }}</strong></label><br><br>          
        <label style="margin-left: 50px;"><strong> Location:</strong></label>
        <table>
          <tr>          
            <table style="margin-left: 60px;">
              <tr>
                <td>Longitude: </td>
                <td>{{object.location.longitude}}</td>
              </tr>
              <tr>
                <td>Latitude: </td>
                <td>{{object.location.latitude}}</td>
              </tr>
              <tr>
                <td>Address: </td>
                <td>{{object.location.address}}</td>
              </tr>
            </table>
          </tr>
        </table>
        <br><br>
      </div>

      <div >
        <h2>Available vehicles</h2>
        <table border='1' class="center-tables">
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
			<td v-if="this.hisObject"><button type="submit" v-on:click="editVehicle(v.id)">Edit</button></td>
			<td v-if="this.hisObject"><button type="submit" v-on:click="deleteVehicle(v.id)">Delete</button></td>
          </tr>
        </table>
      </div>
	
	  <div v-if="this.hisObject">
			<button type="submit" v-on:click="addVehicle()">Add new vehicle</button>
	  </div>
      
      <div style="display: flex; justify-content: center; align-items: center; margin-top: 40px;">
        <br><h2> Comments of the renting object </h2><br>
      </div>
      <div v-for="c in comments" class="rectangle" style="margin-bottom: 20px;">
       <table class="comments-tables">
		  <tr>
		    <td style="padding-left: 20px;">
		      <div style="display: inline-block; vertical-align: middle;">
		        <div>
		          <br>Customer: {{c.customer.name}}<br>
		        </div>
		        <div>
		          Grade: {{c.grade}}
		        </div>
		        <div>
		          Comment: <br>{{c.comment}}<br><br>
		        </div>
		        <div>
		          Status: {{c.status}}<br><br>
		        </div>
		        <br>
		      </div>
		    </td>
		    <td style="position: absolute; bottom: 15px; right: 15px;" v-if="c.status === 'Pending' && commentsChange==='True'">
		      <div>
		        <button v-on:click="approve(c)">Approve</button>
		        <button style="margin-left: 20px;" v-on:click="reject(c)">Reject</button>
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
    console.log(userId,objectId)
    // Finding the renting object
    axios
      .get("rest/objects/" + this.objectId)
      .then((response) => {
        this.object = response.data;
        this.objectName = this.object.name;
        this.image = this.object.imageURL;

        
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
        
        this.allCars = this.object.availableCars;
        
        axios.get("rest/user/profile/"+this.userId)
		.then(response=>{
			this.manager = response.data;
			if(this.manager.rentACar.id == this.object.id){
				this.hisObject = true;
				this.commentsChange='True';
				console.log("Menadzerov objekat");
			}
			else{
				this.hisObject = false;
				this.commentsChange='';
				console.log("Nije menadzerov objekat");
			}
		})
		.catch(error => console.log(error))
      })
      .catch((error) => console.log(error));

    axios
      .get("rest/comments/allCommentsInRental/" + this.objectId)
      .then((response) => {
        this.comments = response.data;
      })
      .catch((error) => console.log(error));

  },
  methods: {
    ShowAll: function () {
      event.preventDefault();
      router.push(`/loggedInManager/${this.userId}`);
    },
    approve: function (c) {
      event.preventDefault();
      axios
      .get("rest/comments/approveComment/" + c.id)
      .then((response) => {
        var b = response.data;
        if(b){
			console.log("Comment approved");
			c.status="Approved";
		}
      })
      .catch((error) => console.log(error));
    },
    reject: function (c) {
      event.preventDefault();
      axios
      .get("rest/comments/rejectComment/" + c.id)
      .then((response) => {
        var b = response.data;
        if(b){
			console.log("Comment rejected");
			c.status="Rejected";
		}
      })
      .catch((error) => console.log(error));
    },
	editVehicle: function(id){
		event.preventDefault();
	},
	deleteVehicle: function(id){
		event.preventDefault();
	},
	addVehicle: function(){
		event.preventDefault();
		router.push(`/addNewVehicle/${this.userId}`);
	}
  }
});
