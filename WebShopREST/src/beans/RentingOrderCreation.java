package beans;

import java.util.ArrayList;

public class RentingOrderCreation {
	String startDate;
	String endDate;
	RentACarObject object;
	ArrayList<Vehicle> cars;
	User customer;
	int price;
	String time;
	
	public RentingOrderCreation() {

	}
	
	public RentingOrderCreation(String startDate, String endDate, RentACarObject object, ArrayList<Vehicle> cars,
			User customer, int price, String time) {
		super();
		this.startDate = startDate;
		this.endDate = endDate;
		this.object = object;
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
	public RentACarObject getObject() {
		return object;
	}
	public void setObject(RentACarObject object) {
		this.object = object;
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
