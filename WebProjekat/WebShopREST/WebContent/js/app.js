const Template = { template: '<template></template>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Template},
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});