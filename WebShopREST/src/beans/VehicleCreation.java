package beans;

import enums.FuelType;
import enums.StickType;
import enums.VehicleType;

public class VehicleCreation {
	private String brand;
	private String model;
	private float price;
	private VehicleType type;
	private String objectId;
	private StickType stickType;
	private FuelType fuelType;
	private float consumption;
	private int doorNumber;
	private int peopleNumber;
	private String description;
	private String imageURL;
	
	public VehicleCreation() {
		super();
	}

	public VehicleCreation(String brand, String model, float price, VehicleType type, String objectId,
			StickType stickType, FuelType fuelType, float consumption, int doorNumber, int peopleNumber,
			String description, String imageURL) {
		super();
		this.brand = brand;
		this.model = model;
		this.price = price;
		this.type = type;
		this.objectId = objectId;
		this.stickType = stickType;
		this.fuelType = fuelType;
		this.consumption = consumption;
		this.doorNumber = doorNumber;
		this.peopleNumber = peopleNumber;
		this.description = description;
		this.imageURL = imageURL;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public VehicleType getType() {
		return type;
	}

	public void setType(VehicleType type) {
		this.type = type;
	}

	public String getObjectId() {
		return objectId;
	}

	public void setObjectId(String objectId) {
		this.objectId = objectId;
	}

	public StickType getStickType() {
		return stickType;
	}

	public void setStickType(StickType stickType) {
		this.stickType = stickType;
	}

	public FuelType getFuelType() {
		return fuelType;
	}

	public void setFuelType(FuelType fuelType) {
		this.fuelType = fuelType;
	}

	public float getConsumption() {
		return consumption;
	}

	public void setConsumption(float consumption) {
		this.consumption = consumption;
	}

	public int getDoorNumber() {
		return doorNumber;
	}

	public void setDoorNumber(int doorNumber) {
		this.doorNumber = doorNumber;
	}

	public int getPeopleNumber() {
		return peopleNumber;
	}

	public void setPeopleNumber(int peopleNumber) {
		this.peopleNumber = peopleNumber;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}
	
	
}
