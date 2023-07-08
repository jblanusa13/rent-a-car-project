Vue.component("editVehicle", {
  data: function () {
    return {
		vehicle:null,
		updatedVehicle:null,
		creation:{brand:'', model:'', price:null, type:null, objectId:null, stickType:null, fuelType:null, consumption:null, doorNumber:null, peopleNumber:null, description:'', imageURL:''},
		object:null,
		vehicleId:null,
		managerId:null,
		image:null,
		brandValid:true,
		modelValid:true,
		priceValid:true,
		typeValid:true,
		stickTypeValid:true,
		fuelTypeValid:true,
		consumptionValid:true,
		doorNumberValid:true,
		peopleNumberValid:true,
		imageValid:true,
		errorText:''
    }
  },
  template: `
    <div>
		<h1>Edit vehicle</h1>
		<div class="right-position">
		<form class="formStyle">
		<fieldset>
				<div>
            		<label>Brand:</label><br>
            		<input type="text" v-model="vehicle.brand" name="brand" v-bind:class="{invalid: brandValid === false}" class="formInputs">
          		</div>
          		<div>
            		<label>Model:</label><br>
            		<input type="text" v-model="vehicle.model" name="model" v-bind:class="{invalid: modelValid === false}" class="formInputs">
          		</div>
          		<div>
            		<label>Price:</label><br>
            		<input type="text" v-model="vehicle.price" name="price" v-bind:class="{invalid: priceValid === false}" class="formInputs">
          		</div>
          		<div>
            		<label>Vehicle type:</label><br>
						<select name="vehicleType" v-model="vehicle.type" v-bind:class="{invalid: typeValid === false}" class="formInputs">
                			<option value="Car">Car</option>
                			<option value="Van">Van</option>
							<option value="MobileHome">Mobile home</option>
              			</select>
          		</div>
          		<div>
           			<label>Stick type:</label><br>
            			<select name="stickType" v-model="vehicle.stickType" v-bind:class="{invalid: stickTypeValid === false}" class="formInputs">
                			<option value="Manual">Manual</option>
                			<option value="Automatic">Automatic</option>
              			</select>
          		</div>
				<div>
           			<label>Fuel type:</label><br>
            			<select name="fuelType" v-model="vehicle.fuelType" v-bind:class="{invalid: fuelTypeValid === false}" class="formInputs">
                			<option value="Diesel">Diesel</option>
                			<option value="Gasoline">Gasoline</option>
							<option value="Hybrid">Hybrid</option>
							<option value="Electric">Electric</option>
              			</select>
          		</div>
          		<div>
            		<label>Consumption:</label><br>
            		<input type="text" v-model="vehicle.consumption" name="consumption" v-bind:class="{invalid: consumptionValid === false}" class="formInputs">
         	 	</div>
          		<div>
            		<label>Door number:</label><br>
            		<input type="number" v-model="vehicle.doorNumber" name="doorNumber" v-bind:class="{invalid: doorNumberValid === false}" class="formInputs">
          		</div>
				<div>
            		<label>People number:</label><br>
            		<input type="number" v-model="vehicle.peopleNumber" name="peopleNumber" v-bind:class="{invalid: peopleNumberValid === false}" class="formInputs">
          		</div>
				<div>
            		<label>Vehicle image:</label><br>
            		<input type="file" id="file" ref="file" v-bind:class="{invalid: imageValid === false}"/>
          		</div>
				<div>
            		<label>Description (optional):</label><br>
            		<input type="text" v-model="vehicle.description" name="description" class="formInputs">
          		</div>
		<div>
			<button type="submit" v-on:click="editVehicle">Confirm</button>
		</div>
		<p style="color:red;">{{ errorText }}</p>
		</fieldset>
		</form>
		</div>
	</div>
  `,
  mounted() {
	const combinedParam = this.$route.params.id;
    console.log(combinedParam); 
    const [vehicleId, userId] = combinedParam.split('_');
	this.vehicleId = vehicleId;
	console.log("Vehicle id: "+this.vehicleId);
	this.managerId = userId;
	axios.get('rest/vehicles/findVehicle/'+this.vehicleId)
		.then(response=>{
			this.vehicle = response.data;
			console.log("Ucitao je vehicle");
			console.log(this.vehicle);
		})
		.catch(error=>console.log(error))
  },
  methods: {
	editVehicle: function(){
		this.image = this.$refs.file.files[0]
		event.preventDefault();
		console.log(this.vehicle);
		
		if(!this.vehicle.brand){
			this.brandValid=false;
			this.errortext = 'Required fields must be filled correctly';
		}
		else{
			this.brandValid=true;
			this.errortext = '';
		}
		if(!this.vehicle.model){
			this.modelValid=false;
			this.errortext = 'Required fields must be filled correctly';
		}
		else{
			this.modelValid=true;
			this.errortext = '';
		}
		if(!this.vehicle.price){
			this.priceValid=false;
			this.errortext = 'Required fields must be filled correctly';
		}
		else{
			this.priceValid=true;
			this.errortext = '';
		}
		if(!this.vehicle.type){
			this.typeValid=false;
			this.errortext = 'Required fields must be filled correctly';
		}
		else{
			this.typeValid=true;
			this.errortext = '';
		}
		if(!this.vehicle.stickType){
			this.stickTypeValid=false;
			this.errortext = 'Required fields must be filled correctly';
		}
		else{
			this.stickTypeValid=true;
			this.errortext = '';
		}
		if(!this.vehicle.fuelType){
			this.fuelTypeValid=false;
			this.errortext = 'Required fields must be filled correctly';
		}
		else{
			this.fuelTypeValid=true;
			this.errortext = '';
		}
		if(!this.vehicle.consumption){
			this.consumptionValid=false;
			this.errortext = 'Required fields must be filled correctly';
		}
		else{
			this.consumptionValid=true;
			this.errortext = '';
		}
		if(!this.vehicle.doorNumber){
			this.doorNumberValid=false;
			this.errortext = 'Required fields must be filled correctly';
		}
		else{
			this.doorNumberValid=true;
			this.errortext = '';
		}
		if(!this.vehicle.peopleNumber){
			this.peopleNumberValid=false;
			this.errortext = 'Required fields must be filled correctly';
		}
		else{
			this.peopleNumberValid=true;
			this.errortext = '';
		}
		if(!this.image){
			this.creation.imageURL = this.vehicle.imageURL;
		}
		else{
			this.creation.imageURL="images/vehicles/"+this.image.name;
		}
		
		
		if(this.vehicle.brand && this.vehicle.model && this.vehicle.price && this.vehicle.type && this.vehicle.stickType &&
			this.vehicle.fuelType && this.vehicle.consumption && this.vehicle.doorNumber && this.vehicle.peopleNumber){
			this.creation.brand=this.vehicle.brand;
			this.creation.model=this.vehicle.model;
			this.creation.price=this.vehicle.price;
			this.creation.type=this.vehicle.type;
			this.creation.stickType=this.vehicle.stickType;
			this.creation.fuelType=this.vehicle.fuelType;
			this.creation.consumption=this.vehicle.consumption;
			this.creation.doorNumber=this.vehicle.doorNumber;
			this.creation.peopleNumber=this.vehicle.peopleNumber;
			this.creation.description=this.vehicle.description;
		
		
			axios.put('rest/vehicles/update/'+this.vehicleId, this.creation)
				.then(response=>{
					this.updatedVehicle = response.data;
					console.log("Apdejtovan vehicle: "+this.updatedVehicle);
				
					axios.put('rest/objects/updateVehicle/'+this.updatedVehicle.objectId, this.updatedVehicle)
						.then(response=>{
							this.object = response.data;
							console.log("Apdejtovan vehicle u objektu: "+this.object);
						})
						.catch(error=>console.log(error))
						
					const combinedParam = this.updatedVehicle.objectId+"_"+this.managerId;
					router.push(`/rentalObjectForManager/${combinedParam}`);
				})
				.catch(error=>console.log(error))
		}
	}
}
});