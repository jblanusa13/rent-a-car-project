Vue.component("rentACarObject", {
  data: function () {
    return {
		objectId:null,
		object:null
    }
  },
  template: `
<div>
	<h3>{{object.name}}</h3>
	<img src="{{object.imageURL}}" alt="Object Image" style="width: 100%; height: auto;">
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
	<h4>Available vehicles</h4>
	<table border="1">
		<tr>
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
		<tr v-for="v in object.availableCars" >
			<td><img src="${v.imageURL}" alt="Vehicle Image" style="width: 100%; height: auto;"></td>
			<td>{{v.brand}}</td>
			<td>{{v.model}}</td>
			<td>{{v.price}}</td>
			<td>{{v.type}}</td>
			<td>{{v.stickType}}</td>
			<td>{{v.fuelType}}</td>
			<td>{{v.consumption}}</td>
			<td>{{v.doorNumber}}</td>
			<td>{{v.peopleNumber}}</td>
			<td>{{v.description}}</td>
			<td>{{v.carStatus}}</td>
			<td><button type="submit" v-on:click="AddToCart(v.id)" v-if="v.carStatus == 'Available'">Add to cart</button></td>
		</tr>
	</table><br><br>
	
	<div>
		<button type="submit" v-on:click="ShowAll">Show all objects</button>
	</div>
	</div>
</div>
  `,
  mounted() {
	this.objectId =this.$route.params.id;
	axios.get('rest/objects/'+this.objectId)
		.then(response => {
			this.object = response.data
		})
		.catch(error => console.log(error))
  },
  methods: {
	ShowAll: function(){
		
	},
	AddToCart: function(id){
		
	}
  }
});