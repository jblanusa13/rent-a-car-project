package beans;

import java.util.ArrayList;

public class ShoppingCart {
	private String id;
	private ArrayList<Vehicle> cars;
	private String customerId;
	private int price;
	
	public ShoppingCart() {
		super();
	}

	public ShoppingCart(String id, ArrayList<Vehicle> cars, String user, int price) {
		super();
		this.id = id;
		this.cars = cars;
		this.customerId = user;
		this.price = price;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ArrayList<Vehicle> getCars() {
		return cars;
	}

	public void setCars(ArrayList<Vehicle> cars) {
		this.cars = cars;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customer) {
		this.customerId = customer;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
}
