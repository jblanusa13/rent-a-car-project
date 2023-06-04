package beans;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import enums.UserRole;

import java.util.Date;
import java.util.List;

public class User {
	private String id;
    private String username;
    private String password;
    private String name;
    private String surname;
    private String gender;
    private LocalDate birthDate;
    private UserRole role;
    //private List<Rental> rentals;
    private ShoppingCart shoppingCart;
    private RentACarObject rentACar;
    private int collectedPoints;
    private CustomerType customerType;
    
	public User() {
		super();
	}
	
	public User(String id, String username, String password, String name, String surname, String gender,
			LocalDate birthDate, UserRole role, ShoppingCart shoppingCart, RentACarObject rentACar, int collectedPoints,
			CustomerType customerType) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthDate = birthDate;
		this.role = role;
		this.shoppingCart = shoppingCart;
		this.rentACar = rentACar;
		this.collectedPoints = collectedPoints;
		this.customerType = customerType;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public LocalDate getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}
	public UserRole getRole() {
		return role;
	}
	public void setRole(UserRole role) {
		this.role = role;
	}
	public RentACarObject getRentACar() {
		return rentACar;
	}
	public void setRentACar(RentACarObject rentACar) {
		this.rentACar = rentACar;
	}
	public int getCollectedPoints() {
		return collectedPoints;
	}
	public void setCollectedPoints(int collectedPoints) {
		this.collectedPoints = collectedPoints;
	}
	public CustomerType getCustomerType() {
		return customerType;
	}
	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}

	public ShoppingCart getShoppingCart() {
		return shoppingCart;
	}

	public void setShoppingCart(ShoppingCart shoppingCart) {
		this.shoppingCart = shoppingCart;
	}
}

