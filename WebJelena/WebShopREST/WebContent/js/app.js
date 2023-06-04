const LogIn = { template: '<logIn></logIn>' }
const Register = { template: '<register></register>' }
const UserProfile = { template: '<user-profile></user-profile>' }
const UserProfileUpdate = { template: '<user-update></user-update>' }
const RentACar = { template: '<rentACar></rentACar>' }
const RentACarLoggedIn = { template: '<rentACarloggedIn></rentACarloggedIn>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: RentACar},
		{ path: '/logIn', name: 'home1', component: LogIn},
		{ path: '/register', name: 'home2', component: Register},
		{ path: '/userProfile/:id', name: 'home3', component: UserProfile},
		{ path: '/userProfileUpdate/:id', name: 'home4', component: UserProfileUpdate},
		{ path: '/loggedIn/:id', name: 'home5', component: RentACarLoggedIn}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});