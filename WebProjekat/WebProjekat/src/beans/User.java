package beans;

import java.util.Date;

import enums.UserRole;

public class User {
	private String id;
	private String username;
	private String password;
	private String name;
	private String surname;
	private String gender;
	private Date birthDate;
	private UserRole role;
	//sva iznajmljivanja
	//korpa
	private RentACarObject rentACarObject;
	private int points;
	//tip kupca
	
	public User() {}
	
	public User(String id, String username, String password, String name, String surname, String gender, Date birthDate,
			UserRole role, RentACarObject rentACarObject, int points) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.birthDate = birthDate;
		this.role = role;
		this.rentACarObject = rentACarObject;
		this.points = points;
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

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public UserRole getRole() {
		return role;
	}

	public void setRole(UserRole role) {
		this.role = role;
	}

	public RentACarObject getRentACarObject() {
		return rentACarObject;
	}

	public void setRentACarObject(RentACarObject rentACarObject) {
		this.rentACarObject = rentACarObject;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}
	
	
	

}
