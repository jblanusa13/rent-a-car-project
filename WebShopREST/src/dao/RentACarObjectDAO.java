package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;


import beans.RentACarObject;
import beans.Vehicle;
import enums.CarStatus;
import enums.RentACarStatus;

public class RentACarObjectDAO {
	private String path=null;
	private ArrayList<RentACarObject> objects = new ArrayList<>();

	public RentACarObjectDAO(String contextPath) {
		path = contextPath;
		
		loadFromFile();
		
		System.out.println("SVI Objecti:");
		for(RentACarObject o: objects) {
			System.out.println(o.getId());
		}	
	}
	
	public void writeToFile() {
		Gson gs = new GsonBuilder().setPrettyPrinting().create(); 
    	String jsonString = gs.toJson(objects);
    	try (FileWriter writer = new FileWriter(path+"/objects.json")) {
            writer.write(jsonString);
            System.out.println("JSON file created successfully.Putanja:" +path+ "/objects.json");
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	public void loadFromFile() {
		objects.clear();
		Gson gson = new Gson();
	    try (FileReader reader = new FileReader(path+"/objects.json")) {

            Type userListType = new TypeToken<ArrayList<RentACarObject>>(){}.getType();

            objects = gson.fromJson(reader, userListType);
            
	        System.out.println("JSON file loaded successfully. Putanja:" +path+ "objects.json");
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
	
	public RentACarObject getById(String id) {
        for (RentACarObject object : objects) {
            if (object.getId().equals(id)) {
                return object;
            }
        }
        return null;
    }
	
	public ArrayList<RentACarObject> findAll() {
		ArrayList<RentACarObject> sortedObjects = new ArrayList<>();
		for(RentACarObject o : objects) {
			if(o.getStatus().equals(RentACarStatus.Open) && o.getDeleted() == false) {
				sortedObjects.add(o);
			}
		}
		
		for(RentACarObject o : objects) {
			if(o.getStatus().equals(RentACarStatus.Closed) && o.getDeleted() == false) {
				sortedObjects.add(o);
			}
		}
		
		return sortedObjects;
	}

	public Vehicle getCarById(String id, String carId) {
		
	    RentACarObject ro=getById(id);
	    for (Vehicle car : ro.getAvailableCars()) {
	        if (car.getId().equals(carId)) {
	            return car;
	        }
	    }
	    return null;
	}
	public Boolean vehicleRented(String id,String CarId) {
		RentACarObject ro =  getById(id);
        if (ro != null) {
        	System.out.println("Vehicles u orderu se updejtuju: rented rentacar");
        	for(Vehicle v: ro.getAvailableCars()) {
        		if(v.getId().equals(CarId)) {
        			System.out.println("Naden auto koji se updejtuje: rented rentacar");
        			v.setCarStatus(CarStatus.Rented);
        		}
        	}
            writeToFile();
            return true;
        }	
        System.out.println("Nije updejtovan Vehicles u rentacar");
        return false;
	}
	
	public RentACarObject registerObject(RentACarObject newObject) {
		System.out.println("Objekat treba da se registruje");
		Integer maxId = -1;
		for (RentACarObject f : objects) {
		    int idNum = Integer.parseInt(f.getId());
		    if (idNum > maxId) {
		        maxId = idNum;
		    }
		}
		
		RentACarObject object = new RentACarObject();
		maxId++;
		object.setId(maxId.toString());
		object.setAvailableCars(new ArrayList<Vehicle>());
		object.setName(newObject.getName());
		object.setStatus(RentACarStatus.Closed);
		object.setLocation(newObject.getLocation());
		object.setOpeningTime(newObject.getOpeningTime());
		object.setClosingTime(newObject.getClosingTime());
		object.setImageURL(newObject.getImageURL());
		object.setRate(0);
		object.setDeleted(false);
		objects.add(object);
		System.out.println("Objekat registrovan");
		writeToFile();
		System.out.println("Objekat:"+object.getId());
		return object;
	}
	
	// Sort objects by rate
    public ArrayList<RentACarObject> sortObjectsByRate(boolean descending, ArrayList<RentACarObject> objectsToSort) {
        Comparator<RentACarObject> comparator = Comparator.comparing(rentACarObject -> rentACarObject.getRate());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(objectsToSort, comparator);
        return objectsToSort;
    }
    
    // Sort objects by name
    public ArrayList<RentACarObject> sortObjectsByName(boolean descending, ArrayList<RentACarObject> objectsToSort) {
        Comparator<RentACarObject> comparator = Comparator.comparing(rentACarObject -> rentACarObject.getName());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(objectsToSort, comparator);
        return objectsToSort;
    }
    
    // Sort objects by city
    public ArrayList<RentACarObject> sortObjectsByCity(boolean descending, ArrayList<RentACarObject> objectsToSort) {
        Comparator<RentACarObject> comparator = Comparator.comparing(rentACarObject -> rentACarObject.getLocation().getAddress());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(objectsToSort, comparator);
        return objectsToSort;
    }
    
    public ArrayList<RentACarObject> filterObjects(String stickType, String fuelType, boolean openObject, ArrayList<RentACarObject> objectsToFilter){
    	System.out.println(stickType);
    	System.out.println(fuelType);
    	System.out.println(openObject);
    	ArrayList<RentACarObject> filteredObjects= new ArrayList<RentACarObject>();
    	for(RentACarObject object : objectsToFilter) {
    		for(Vehicle vehicle : object.getAvailableCars()) {
    			System.out.println("DA LI JE TACAN USLOV?");
    			boolean firstTrue = stickType.equals(vehicle.getStickType().name()) || stickType.equals("notSelected");
    			boolean secondTrue = fuelType.equals(vehicle.getFuelType().name()) || fuelType.equals("notSelected");
    			boolean isTrue = firstTrue && secondTrue;
    			System.out.println(firstTrue);
    			System.out.println(secondTrue);
    			System.out.println(isTrue);
    			if(isTrue) {
    				filteredObjects.add(object);
    				System.out.println("Filtrirani objekat: "+object.getId());
    				break;
    			}
    		}
    	}
    	
    	if(openObject) {
    		ArrayList<RentACarObject> filteredOpenObjects= new ArrayList<RentACarObject>();
        	for(RentACarObject object : filteredObjects) {
        		if(object.getStatus() == RentACarStatus.Open) {
        			filteredOpenObjects.add(object);
        			System.out.println("Otvoren objekat: "+object.getId());
        		}
        	}
        	return filteredOpenObjects;
    	}
    	return filteredObjects;
    }
    
    public ArrayList<RentACarObject> searchObjects(String name, String vehicleType, String location, String rate, ArrayList<RentACarObject> objectsToSearch){
    	ArrayList<RentACarObject> searchedObjects= new ArrayList<RentACarObject>();
    	System.out.println("Ime lokacije: "+location);
    	
    	for(RentACarObject object : objectsToSearch) {
    		for(Vehicle vehicle : object.getAvailableCars()) {
    			System.out.println("DA LI JE TACAN USLOV?");
    			System.out.println("Ime lokacije: "+location);
    			System.out.println("Ime lokacije u fajlu: "+object.getLocation().getAddress());
    			boolean nameTrue = object.getName().toLowerCase().contains(name.toLowerCase()) || name.equals("null");
    			boolean typeTrue = vehicle.getType().name().toLowerCase().contains(vehicleType.toLowerCase()) || vehicleType.equals("null");
    			boolean locationTrue = object.getLocation().getAddress().toLowerCase().contains(location.toLowerCase()) || location.equals("null");
    			//boolean rateTrue = rate.equals(String.valueOf(object.getRate())) || rate.equals("null");
    			boolean rateTrue = false;
    			if(rate.equals("null")) {
    				rateTrue = true;
    			}
    			else if (Float.parseFloat(rate) == object.getRate()) {
    				rateTrue = true;
    			}
    	
    			boolean isTrue = nameTrue && typeTrue && locationTrue && rateTrue;
    			System.out.println("ime:"+nameTrue);
    			System.out.println("tip:"+typeTrue);
    			System.out.println("grad:"+locationTrue);
    			System.out.println("Vrednost rate u objektu: " + String.valueOf(object.getRate()));
    			System.out.println("Vrednost rate pretrage: " + rate);
    			System.out.println("ocena:"+rateTrue);
    			System.out.println(isTrue);
    			if(isTrue) {
    				searchedObjects.add(object);
    				System.out.println("Pretrazeni objekat: "+object.getId());
    				break;
    			}
    		}
    	}
    	
    	return searchedObjects;
    }
	public Boolean vehicleAvailable(String id,String CarId) {
		RentACarObject ro =  getById(id);
        if (ro != null) {
        	System.out.println("Vehicles u orderu se updejtuju: available rentacar");
        	for(Vehicle v: ro.getAvailableCars()) {
        		if(v.getId().equals(CarId)) {
        			System.out.println("Naden auto koji se updejtuje: available rentacar");
        			v.setCarStatus(CarStatus.Available);
        		}
        	}
            writeToFile();
            return true;
        }	
        System.out.println("Nije updejtovan Vehicles u rentacar");
        return false;
	}
	
	public boolean deleteObject(String objectId) {
		RentACarObject object = getById(objectId);
		System.out.println("Brisanje objekta u dao");
		object.setDeleted(true);
		writeToFile();
		return true;
	}
	
	public RentACarObject updateVehicleForObject(String objectId, Vehicle vehicle) {
		RentACarObject object = getById(objectId);
		System.out.println("Izmena objekta u dao");
		for(Vehicle v : object.getAvailableCars()) {
			if(v.getId().equals(vehicle.getId())) {
				v.setBrand(vehicle.getBrand());
	        	v.setConsumption(vehicle.getConsumption());
	        	v.setDescription(vehicle.getDescription());
	        	v.setDoorNumber(vehicle.getDoorNumber());
	        	v.setFuelType(vehicle.getFuelType());
	        	v.setImageURL(vehicle.getImageURL());
	        	v.setModel(vehicle.getModel());
	        	v.setPeopleNumber(vehicle.getPeopleNumber());
	        	v.setPrice(vehicle.getPrice());
	        	v.setStickType(vehicle.getStickType());
	        	v.setType(vehicle.getType());
				break;
			}
		}
		writeToFile();
		return object;
	}
	

	public RentACarObject deleteVehicleForObject(String objectId, String vehicleId) {
		RentACarObject object = getById(objectId);
		System.out.println("Brisanje vehicle u object dao");
		for(Vehicle v : object.getAvailableCars()) {
			if(v.getId().equals(vehicleId)){
				v.setDeleted(true);
				break;
			}
		}
		writeToFile();
		return object;
	}
	
	public RentACarObject addVehicleForObject(String objectId, Vehicle vehicle) {
		RentACarObject object = getById(objectId);
		System.out.println("Dodavanje vehicle u object dao");
		object.getAvailableCars().add(vehicle);
		writeToFile();
		return object;
	}
	
	public boolean changeObjectRate(String objectId,String avg) {
		RentACarObject object = getById(objectId);
		System.out.println("Brisanje objekta u dao");
		object.setRate(Float.parseFloat(avg));
		writeToFile();
		return true;
	}
}
