package beans;

import enums.RentACarStatus;

public class RentACarObject {
	private String id;
	private String name;
	private String availableCars;
	//radno vreme
	private RentACarStatus status;
	private Location location;
	//logo
	private int ocena;
	
	public RentACarObject() {}
	
	public RentACarObject(String id, String name, String availableCars, RentACarStatus status, Location location,
			int ocena) {
		super();
		this.id = id;
		this.name = name;
		this.availableCars = availableCars;
		this.status = status;
		this.location = location;
		this.ocena = ocena;
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

	public String getAvailableCars() {
		return availableCars;
	}

	public void setAvailableCars(String availableCars) {
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

	public int getOcena() {
		return ocena;
	}

	public void setOcena(int ocena) {
		this.ocena = ocena;
	}
	
	
	
	
}
