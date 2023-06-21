package beans;

import java.util.ArrayList;

import enums.RentACarStatus;

public class RentACarObject {
	private String id;
	private String name;
	private ArrayList<Vehicle> availableCars;
	//radno vreme
	private RentACarStatus status;
	private Location location;
	private String imageURL;
	private float rate;
	
	public RentACarObject() {
		super();
	}
	
	public RentACarObject(String id, String name, ArrayList<Vehicle> availableCars, RentACarStatus status,
			Location location, String imageURL, float rate) {
		super();
		this.id = id;
		this.name = name;
		this.availableCars = availableCars;
		this.status = status;
		this.location = location;
		this.imageURL = imageURL;
		this.rate = rate;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ArrayList<Vehicle> getAvailableCars() {
		return availableCars;
	}



	public void setAvailableCars(ArrayList<Vehicle> availableCars) {
		this.availableCars = availableCars;
	}



	public RentACarStatus getStatus() {
		return status;
	}

	public void setStatus(RentACarStatus status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public float getRate() {
		return rate;
	}

	public void setRate(float rate) {
		this.rate = rate;
	}


	public String getImageURL() {
		return imageURL;
	}


	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

}
