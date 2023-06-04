package beans;

import java.util.ArrayList;

public class ShoppingCart {
	private String id;
	private ArrayList<RentACarObject> cars;
	private String userId;
	private int price;
	
	public ShoppingCart() {
		super();
	}

	public ShoppingCart(String id, ArrayList<RentACarObject> cars, String userId, int price) {
		super();
		this.id = id;
		this.cars = cars;
		this.userId = userId;
		this.price = price;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public ArrayList<RentACarObject> getCars() {
		return cars;
	}

	public void setCars(ArrayList<RentACarObject> cars) {
		this.cars = cars;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
}