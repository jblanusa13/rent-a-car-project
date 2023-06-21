package beans;

import java.util.ArrayList;
import enums.RentingOrderStatus;

public class RentingOrder {
	private String id;
	private String identificator;
	private RentACarObject rentingObject;
	private ArrayList <Vehicle> vehicles;
	private String date;
	private String time;
	private int duration;
	private User customer;
	private RentingOrderStatus orderStatus;
	private int price;
	private String managerComment;
	private String customerComment;
	public RentingOrder() {
		super();
	}
	
	public RentingOrder(String id, String identificator, RentACarObject rentingObject, ArrayList<Vehicle> vehicles,
			String date, String time, int duration, User customer, RentingOrderStatus orderStatus, int price,
			String managerComment, String customerComment) {
		super();
		this.id = id;
		this.identificator = identificator;
		this.rentingObject = rentingObject;
		this.vehicles = vehicles;
		this.date = date;
		this.time = time;
		this.duration = duration;
		this.customer = customer;
		this.orderStatus = orderStatus;
		this.price = price;
		this.managerComment = managerComment;
		this.customerComment = customerComment;
	}

	public String getManagerComment() {
		return managerComment;
	}

	public void setManagerComment(String managerComment) {
		this.managerComment = managerComment;
	}

	public String getCustomerComment() {
		return customerComment;
	}

	public void setCustomerComment(String customerComment) {
		this.customerComment = customerComment;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIdentificator() {
		return identificator;
	}
	public void setIdentificator(String identificator) {
		this.identificator = identificator;
	}
	public RentACarObject getRentingObject() {
		return rentingObject;
	}
	public void setRentingObject(RentACarObject rentingObject) {
		this.rentingObject = rentingObject;
	}
	public ArrayList<Vehicle> getVehicles() {
		return vehicles;
	}
	public void setVehicles(ArrayList<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public User getCustomer() {
		return customer;
	}
	public void setCustomer(User customer) {
		this.customer = customer;
	}
	public RentingOrderStatus getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(RentingOrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getPrice() {
		return price;
	}
}
