Vue.component("newVehicle", {
  data: function () {
    return {
		vehicle:{brand:'', model:'', price:null, type:null, objectId:null, stickType:null, fuelType:null, consumption:null, doorNumber:null, peopleNumber:null, description:'', imageURL:''},
		addedVehicle:null,
		vehicleId:null,
		object:null,
		vbrand:null,
		vmodel:null,
		vprice:null,
		vtype:null,
		vstick:null,
		vfuel:null,
		vconsumption:null,
		vdoor:null,
		vpeople:null,
		vdesc:null,
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
		<h1>New vehicle</h1>
		<form class="formStyle">
		<fieldset>
				<div>
            		<label>Brand:</label><br>
            		<input type="text" v-model="vbrand" name="brand" v-bind:class="{invalid: brandValid === false}" class="formInputs">
          		</div>
          		<div>
            		<label>Model:</label><br>
            		<input type="text" v-model="vmodel" name="model" v-bind:class="{invalid: modelValid === false}" class="formInputs">
          		</div>
          		<div>
            		<label>Price:</label><br>
            		<input type="text" v-model="vprice" name="price" v-bind:class="{invalid: priceValid === false}" class="formInputs">
          		</div>
          		<div>
            		<label>Vehicle type:</label><br>
						<select name="vehicleType" v-model="vtype" v-bind:class="{invalid: typeValid === false}" class="formInputs">
                			<option value="Car">Car</option>
                			<option value="Van">Van</option>
							<option value="MobileHome">Mobile home</option>
              			</select>
          		</div>
          		<div>
           			<label>Stick type:</label><br>
            			<select name="stickType" v-model="vstick" v-bind:class="{invalid: stickTypeValid === false}" class="formInputs">
                			<option value="Manual">Manual</option>
                			<option value="Automatic">Automatic</option>
              			</select>
          		</div>
				<div>
           			<label>Fuel type:</label><br>
            			<select name="fuelType" v-model="vfuel" v-bind:class="{invalid: fuelTypeValid === false}" class="formInputs">
                			<option value="Diesel">Diesel</option>
                			<option value="Gasoline">Gasoline</option>
							<option value="Hybrid">Hybrid</option>
							<option value="Electric">Electric</option>
              			</select>
          		</div>
          		<div>
            		<label>Consumption:</label><br>
            		<input type="text" v-model="vconsumption" name="consumption" v-bind:class="{invalid: consumptionValid === false}" class="formInputs">
         	 	</div>
          		<div>
            		<label>Door number:</label><br>
            		<input type="number" v-model="vdoor" name="doorNumber" v-bind:class="{invalid: doorNumberValid === false}" class="formInputs">
          		</div>
				<div>
            		<label>People number:</label><br>
            		<input type="number" v-model="vpeople" name="peopleNumber" v-bind:class="{invalid: peopleNumberValid === false}" class="formInputs">
          		</div>
				<div>
            		<label>Vehicle image:</label><br>
            		<input type="file" id="file" ref="file" v-bind:class="{invalid: imageValid === false}"/>
          		</div>
				<div>
            		<label>Description (optional):</label><br>
            		<input type="text" v-model="vdesc" name="description" class="formInputs">
          		</div>
		<div>
			<button type="submit" v-on:click="createVehicle">Confirm</button>
		</div>
		<p style="color:red;">{{ errorText }}</p>
		</fieldset>
		</form>
	</div>
  `,
  mounted() {
	this.managerId =this.$route.params.id;
	axios.get("rest/user/managerObject/"+this.managerId)
		.then(response=>{
			this.vehicle.objectId = response.data;
			console.log("Objekat od menadzera je: "+this.vehicle.objectId);
		})
		.catch(error=>console.log(error))
  },
  methods: {
	createVehicle: function(){
		event.preventDefault();
		this.image = this.$refs.file.files[0];
		
		if(!this.vbrand){
			this.brandValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.brandValid=true;
			this.errorText='';
		}
		if(!this.vmodel){
			this.modelValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.modelValid=true;
			this.errorText='';
		}
		if(!this.vprice){
			this.priceValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.priceValid=true;
			this.errorText='';
		}
		if(!this.vtype){
			this.typeValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.typeValid=true;
			this.errorText='';
		}
		
		if(!this.vstick){
			this.stickTypeValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.stickTypeValid=true;
			this.errorText='';
		}
		if(!this.vfuel){
			this.fuelTypeValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.fuelTypeValid=true;
			this.errorText='';
		}
		if(!this.vconsumption){
			this.consumptionValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.consumptionValid=true;
			this.errorText='';
		}
		if(!this.vdoor){
			this.doorNumberValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.doorNumberValid=true;
			this.errorText='';
		}
		
		if(!this.vpeople){
			this.peopleNumberValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.peopleValid=true;
			this.errorText='';
		}
		
		if(!this.image){
			this.imageValid=false;
			this.errorText='Required fields must be filled';
		}
		else{
			this.imageValid=true;
			this.errorText='';
			
			this.vehicle.imageURL = "images/vehicles/"+this.image.name;
		}
		
		
		if(this.vbrand && this.vmodel && this.vprice
			&& this.vtype && this.vstick && this.vfuel
			&& this.vconsumption && this.vdoor && this.vpeople && this.vehicle.imageURL)
		{
			
			this.vehicle.brand = this.vbrand;
			this.vehicle.model = this.vmodel;
			this.vehicle.price = this.vprice;
			this.vehicle.type = this.vtype;
			this.vehicle.stickType = this.vstick;
			this.vehicle.fuelType = this.vfuel;
			this.vehicle.consumption = this.vconsumption;
			this.vehicle.doorNumber = this.vdoor;
			this.vehicle.peopleNumber = this.vpeople;
			this.vehicle.description= this.vdesc;
			console.log(this.vehicle);
			
			axios.post('rest/vehicles/addVehicle/', this.vehicle)
				.then((response)=>{
					this.addedVehicle = response.data;
					console.log("Dodat vehicle");
					
					axios.put('rest/objects/addVehicle/'+this.addedVehicle.objectId, this.addedVehicle)
						.then(response=>{
							this.object = response.data;
							alert("Vehicle succesfully added");
						})					
				})
				.catch((error)=>console.log(error))
				
			const combinedParam = this.vehicle.objectId+"_"+this.managerId;
			router.push(`/rentalObjectForManager/${combinedParam}`);
				
		}
	}
  }
});