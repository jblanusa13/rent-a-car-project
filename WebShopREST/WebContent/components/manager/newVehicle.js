Vue.component("newVehicle", {
  data: function () {
    return {
		vehicle:{id:null, brand:null, model:null, price:null, type:null, objectId:null, stickType:null, 
			fuelType:null, consumption:null, doorNumber:null, peopleNumber:null, description:null, imageURL:null,
			carStatus:null, shoppingCartId:null},
		managerId:null,
		image:null
    }
  },
  template: `
    <div>
		<h1>New vehicle</h1>
		<table>
			<tr>
				<td>Add new manager for object: </td>
				<table>
					<tr>
            			<td>Brand:</td>
            			<td><input type="text" v-model="vehicle.brand" name="brand"></td>
          			</tr>
          			<tr>
            			<td>Model:</td>
            			<td><input type="text" v-model="vehicle.model" name="model"></td>
          			</tr>
          			<tr>
            			<td>Price:</td>
            			<td><input type="text" v-model="vehicle.price" name="price"></td>
          			</tr>
          			<tr>
            			<td>Vehicle type:</td>
            			<td>
							<select name="vehicleType" v-model="vehicle.type">
                				<option value="Car">Car</option>
                				<option value="Van">Van</option>
								<option value="MobileHome">Mobile home</option>
              				</select>
						</td>
          			</tr>
          			<tr>
           				<td>Stick type:</td>
            				<select name="stickType" v-model="vehicle.stickType">
                				<option value="Manual">Manual</option>
                				<option value="Automatic">Automatic</option>
              				</select>
						</td>
          			</tr>
					<tr>
           				<td>Fuel type:</td>
            				<select name="fuelType" v-model="vehicle.fuelType">
                				<option value="Diesel">Diesel</option>
                				<option value="Gasoline">Gasoline</option>
								<option value="Hybrid">Hybrid</option>
								<option value="Electric">Electric</option>
              				</select>
						</td>
          			</tr>
          			<tr>
            			<td>Consumption:</td>
            			<td><input type="text" v-model="vehicle.consumption" name="consumption"></td>
         	 		</tr>
          			<tr>
            			<td>Door number:</td>
            			<td><input type="number" v-model="vehicle.doorNumber" name="doorNumber"></td>
          			</tr>
					<tr>
            			<td>People number:</td>
            			<td><input type="number" v-model="vehicle.peopleNumber" name="peopleNumber"></td>
          			</tr>
					<tr>
            			<td>Vehicle image:</td>
            			<td><input type="file" id="file" ref="file"/></td>
          			</tr>
					<tr>
            			<td>Description (optional):</td>
            			<td><input type="text" v-model="vehicle.description" name="description"></td>
          			</tr>
				</table>
				<button type="submit" v-on:click="createVehicle">Confirm</button>
			</tr>
		</table>
	</div>
  `,
  mounted() {
	this.managerId =this.$route.params.id;
  },
  methods: {
	createVehicle: function(){
		event.preventDefault();
		this.image = this.$refs.file.files[0];
		console.log(this.image);
		console.log(this.vehicle.brand);
		
		this.vehicle.imageURL = "images/vehicles/"+this.image.name;
		console.log(this.vehicle.imageURL);
	}
  }
});