const LogIn = { template: '<logIn></logIn>' }
const LoggedInAdmin = { template: '<logInAdmin></logInAdmin>' }
const LoggedInManager = { template: '<logInManager></logInManager>' }
const LoggedInCustomer = { template: '<logInCustomer></logInCustomer>' }
const Register = { template: '<register></register>' }
const UserProfile = { template: '<user-profile></user-profile>' }
const AdminProfile = { template: '<admin-profile></admin-profile>' }
const ManagerProfile = { template: '<manager-profile></manager-profile>' }
const CustomerProfile = { template: '<customer-profile></customer-profile>' }
const UserProfileUpdate = { template: '<user-update></user-update>' }
const RentACar = { template: '<rentACarr></rentACarr>' }
const RentACarLoggedIn = { template: '<rentACarloggedIn></rentACarloggedIn>' }
const ManagerRentalObjects={ template: '<managerRentalObjects></managerRentalObjects>' }
const CustomerRentalObjects={ template: '<customerRentalObjects></customerRentalObjects>' }
const AddNewRentACar={ template: '<addNewObject></addNewObject>' }
const RentalObjectForCustomer={ template: '<objectForCustomer></objectForCustomer>' }
const CustomerShoppingCart = { template: '<customerShoppingCart></customerShoppingCart>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: RentACar},
		{ path: '/logIn', name: 'home1', component: LogIn},
		{ path: '/register', name: 'home2', component: Register},
		{ path: '/adminProfile/:id', name: 'home3a', component: AdminProfile},
		{ path: '/customerProfile/:id', name: 'home3b', component: CustomerProfile},
		{ path: '/managerProfile/:id', name: 'home3c', component: ManagerProfile},
		{ path: '/userProfileUpdate/:id', name: 'home4', component: UserProfileUpdate},
		{ path: '/loggedInAdmin/:id', name: 'home5a', component: LoggedInAdmin},
		{ path: '/loggedInManager/:id', name: 'home5b', component: LoggedInManager},
		{ path: '/loggedInCustomer/:id', name: 'home5c', component: LoggedInCustomer},
		{ path: '/managerRentalObjects/:id', name: 'home6', component: ManagerRentalObjects},
		{ path: '/addNew/:id', name: 'home8', component: AddNewRentACar},
		{ path: '/customerRentalObjects/:id', name: 'home9', component: CustomerRentalObjects},
		{ path: '/customerShoppingCart/:id', name: 'home11', component: CustomerShoppingCart},
		{ path: '/rentalObjectForCustomer/:id', name: 'home10', component: RentalObjectForCustomer}
	  ]
});

var app = new Vue({
	router,
	el: '#element'
});