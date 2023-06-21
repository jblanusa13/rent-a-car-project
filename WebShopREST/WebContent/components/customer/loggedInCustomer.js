Vue.component("logInCustomer", {
  data: function () {
    return {
		objects:null,
		userId:null
    }
  },
  template: `
    <div>
	<h3>Rent a car objects</h3>
	<table border="1">
		<tr>
			<th>Name</th>
			<th>Latitude</th>
			<th>Longitude</th>
			<th>Address</th>
			<th>Average rate</th>
		</tr>
		<tr v-for="o in objects">
			<td>{{o.name}}</td>
			<td>{{o.location.latitude}}</td>
			<td>{{o.location.longitude}}</td>
			<td>{{o.location.address}}</td>
			<td>{{o.rate}}</td>
			<td><button type="submit" v-on:click="showObject(o.id)">Show</button></td>
		</tr>
	</table><br><br>

	<div>
		<button type="submit" v-on:click="profile">Profile</button>
		<button type="submit" v-on:click="logOut">Log out</button>
	</div>
	
</div>
  `,
  mounted() {
	this.userId =this.$route.params.id
	console.log("id usera:"+this.userId)
	
	axios.get('rest/objects/')
		.then(response => {
			this.objects = response.data
		})
		.catch(error => console.log(error))
  },
  methods: {
	profile: function () {
      	event.preventDefault();
		router.push(`/customerProfile/${this.userId}`);
    },
	logOut: function () {
      	event.preventDefault();
		router.push(`/`);
    },
	showObject: function (id) {
      	event.preventDefault();
		router.push(`/object/`+id);
    }
  }
});