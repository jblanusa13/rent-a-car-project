package beans;

import java.util.ArrayList;

public class ComplexRentingOrderCreation {

	String startDate;
	String endDate;
	ArrayList<RentACarObject> objects;
	ArrayList<Vehicle> cars;
	User customer;
	int price;
	String time;
	public ComplexRentingOrderCreation() {
		super();
	}
	public ComplexRentingOrderCreation(String startDate, String endDate, ArrayList<RentACarObject> objects,
			ArrayList<Vehicle> cars, User customer, int price, String time) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.objects = objects;
		this.cars = cars;
		this.customer = customer;
		this.price = price;
		this.time = time;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public ArrayList<RentACarObject> getObjects() {
		return objects;
	}
	public void setObjects(ArrayList<RentACarObject> objects) {
		this.objects = objects;
	}
	public ArrayList<Vehicle> getCars() {
		return cars;
	}
	public void setCars(ArrayList<Vehicle> cars) {
		this.cars = cars;
	}
	public User getCustomer() {
		return customer;
	}
	public void setCustomer(User customer) {
		this.customer = customer;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	
	
}
