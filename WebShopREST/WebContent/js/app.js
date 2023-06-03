const Template = { template: '<ime></ime>' }

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