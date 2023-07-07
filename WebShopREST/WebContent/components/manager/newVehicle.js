Vue.component("newVehicle", {
  data: function () {
    return {
		vehicle:{brand:'', model:'', price:null, type:null, objectId:null, stickType:null, fuelType:null, consumption:null, doorNumber:null, peopleNumber:null, description:'', imageURL:''},
		vehicleId:null,
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
		imageValid:true
    }
  },
  template: `
    <div>
		<h1>New vehicle</h1>
		<form class="formStyle">
			<table>
				<tr>
            		<td>Brand:</td>
            		<td><input type="text" v-model="vbrand" name="brand" v-bind:class="{invalid: brandValid === false}" class="formInputs"></td>
          		</tr>
          		<tr>
            		<td>Model:</td>
            		<td><input type="text" v-model="vmodel" name="model" v-bind:class="{invalid: modelValid === false}" class="formInputs"></td>
          		</tr>
          		<tr>
            		<td>Price:</td>
            		<td><input type="text" v-model="vprice" name="price" v-bind:class="{invalid: priceValid === false}" class="formInputs"></td>
          		</tr>
          		<tr>
            		<td>Vehicle type:</td>
            		<td>
						<select name="vehicleType" v-model="vtype" v-bind:class="{invalid: typeValid === false}" class="formInputs">
                			<option value="Car">Car</option>
                			<option value="Van">Van</option>
							<option value="MobileHome">Mobile home</option>
              			</select>
					</td>
          		</tr>
          		<tr>
           			<td>Stick type:</td>
            			<select name="stickType" v-model="vstick" v-bind:class="{invalid: stickTypeValid === false}" class="formInputs">
                			<option value="Manual">Manual</option>
                			<option value="Automatic">Automatic</option>
              			</select>
					</td>
          		</tr>
				<tr>
           			<td>Fuel type:</td>
            			<select name="fuelType" v-model="vfuel" v-bind:class="{invalid: fuelTypeValid === false}" class="formInputs">
                			<option value="Diesel">Diesel</option>
                			<option value="Gasoline">Gasoline</option>
							<option value="Hybrid">Hybrid</option>
							<option value="Electric">Electric</option>
              			</select>
					</td>
          		</tr>
          		<tr>
            		<td>Consumption:</td>
            		<td><input type="text" v-model="vconsumption" name="consumption" v-bind:class="{invalid: consumptionValid === false}" class="formInputs"></td>
         	 	</tr>
          		<tr>
            		<td>Door number:</td>
            		<td><input type="number" v-model="vdoor" name="doorNumber" v-bind:class="{invalid: doorNumberValid === false}" class="formInputs"></td>
          		</tr>
				<tr>
            		<td>People number:</td>
            		<td><input type="number" v-model="vpeople" name="peopleNumber" v-bind:class="{invalid: peopleNumberValid === false}" class="formInputs"></td>
          		</tr>
				<tr>
            		<td>Vehicle image:</td>
            		<td><input type="file" id="file" ref="file" v-bind:class="{invalid: imageValid === false}"/></td>
          		</tr>
				<tr>
            		<td>Description (optional):</td>
            		<td><input type="text" v-model="vdesc" name="description" class="formInputs"></td>
          		</tr>
			</table>
		<button type="submit" v-on:click="createVehicle">Confirm</button>
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
		
		if(!this.vbrand){
			this.brandValid=false;
		}
		if(!this.vmodel){
			this.modelValid=false;
		}
		if(!this.vprice){
			this.priceValid=false;
		}
		if(!this.vtype){
			this.typeValid=false;
		}
		
		if(!this.vstick){
			this.stickTypeValid=false;
		}
		if(!this.vfuel){
			this.fuelTypeValid=false;
		}
		if(!this.vconsumption){
			this.consumptionValid=false;
		}
		if(!this.vdoor){
			this.doorNumberValid=false;
		}
		
		if(!this.vpeople){
			this.peopleNumberValid=false;
		}
		
		this.image = this.$refs.file.files[0];
		this.vehicle.imageURL = "images/vehicles/"+this.image.name;
		
		
		if(this.vbrand && this.vmodel && this.vprice
			&& this.vtype && this.vstick && this.vfuel
			&& this.vconsumption && this.vdoor && this.vpeople )
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
					this.vehicleId = response.data;
				})
				.catch((error)=>console.log(error))
				
				const combinedParam = this.vehicle.objectId+"_"+this.managerId;
				router.push(`/rentalObjectForManager/${combinedParam}`);
				
		}
		else{
			alert("Required fields must be filled");
		}
	}
  }
});