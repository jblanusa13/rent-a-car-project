Vue.component("objectForAdmin", {
  data: function () {
    return {
      objectId: null,
      object: null,
      objectStatus: null,
      objectName: null,
      image: null,
      comments: null,
      userId:null,
	  deleted:false,
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
      <div>
        <br><br>     
        <label class="center-position"> <strong>Working time: {{object.openingTime}} - {{object.closingTime}}</strong></label><br><br>
        <label class="center-position"><strong>Status: {{ objectStatus }}</strong></label><br><br>          
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
        <br><br>
        <div class="center-position">
		<button type="submit" v-on:click="deleteObject">Delete object</button>
		</div>
      </div>

      <div >
        <h2>Available vehicles</h2>
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
      <br><br>
      <div class="center-position">
        <br><h2> Comments of the renting object </h2><br>
      </div>
      <div v-for="c in comments" class="rectangle">
       <table class="table-shopping-cart">
		  <tr>
		    <td style="padding-left: 20px;">
		      <div class="comment-showing">
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
		this.street = this.object.location.address.split(',')[0];
		this.city = this.object.location.address.split(',')[1];
		this.postalNumber = this.object.location.address.split(',')[2];
	
		console.log("Adresa: "+this.object.location.address);
		console.log("Ulica: "+this.street);
		console.log("Grad: "+this.city);
		console.log("Post br: "+this.postalNumber);
      })
      .catch((error) => console.log(error));
      
    // Fetching all approved comments for this object
    axios
      .get("rest/comments/allCommentsInRental/" + this.objectId)
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
      router.push(`/loggedInAdmin/${this.userId}`);
    },
	deleteObject: function(){
		event.preventDefault();
		axios.put('rest/objects/delete/'+this.objectId)
			.then(response=>{
				this.deleted = response.data;
				alert("Object deleted succesfully");
				router.push(`/loggedInAdmin/${this.userId}`);
			})
			.catch(error=>console.log(error))
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
