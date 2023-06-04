const LogIn = { template: '<logIn></logIn>' }
const Register = { template: '<register></register>' }
const UserProfile = { template: '<user-profile></user-profile>' }
const UserProfileUpdate = { template: '<user-update></user-update>' }
const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: LogIn},
		{ path: '/register', component: Register},
		{ path: '/userProfile/:id', component: UserProfile},
		{ path: '/userProfileUpdate/:id', component: UserProfileUpdate},
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});