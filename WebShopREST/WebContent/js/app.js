const LogIn = { template: '<logIn></logIn>' }
const Register = { template: '<register></register>' }
const UserProfile = { template: '<user-profile></user-profile>' }
const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: LogIn},
		{ path: '/register', component: Register},
		{ path: '/userProfile', component: UserProfile},
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});