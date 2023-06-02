package beans;

public class Location {
	public String id;
	public String longitude;
	public String latitude;
	public String address;
	
	public Location() {}
	
	public Location(String id, String longitude, String latitude, String address) {
		super();
		this.id = id;
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
}
