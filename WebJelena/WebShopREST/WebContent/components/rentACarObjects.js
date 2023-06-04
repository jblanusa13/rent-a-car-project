Vue.component("rentACar", {
  data: function () {
    return {
		objects:null
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
		</tr>
	</table><br><br>
	
	<div>
		<button type="submit" v-on:click="logIn">Log in (Register)</button>
	</div>
</div>
  `,
  mounted() {
	axios.get('rest/objects/')
		.then(response => {
			this.objects = response.data
		})
		.catch(error => console.log(error))
  },
  methods: {
    logIn: function () {
      	event.preventDefault();
		router.push(`/logIn`);
    }
  }
});