package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import beans.Vehicle;
import beans.VehicleCreation;
import enums.CarStatus;

public class VehicleDAO {

	
	
	private ArrayList<Vehicle> vehicles = new ArrayList<>();
	DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
	private String path=null;
	
	public VehicleDAO(String contextPath) {
		path = contextPath;
		loadFromFile();
		System.out.println("SVA VOZILA:");
		for(Vehicle u: vehicles) {
			System.out.println("IDENTIFIKATOR:"+u.getId());
		}
		
	}
	public void writeToFile() {
		Gson gs = new GsonBuilder().setPrettyPrinting().create(); 
    	String jsonString = gs.toJson(vehicles);
    	try (FileWriter writer = new FileWriter(path+"/vehicles.json")) {
            writer.write(jsonString);
            System.out.println("JSON file created successfully.Putanja:" +path+ "/vehicles.json");
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	public void loadFromFile() {
		vehicles.clear();
		Gson gson = new Gson();
	    try (FileReader reader = new FileReader(path+"/vehicles.json")) {

            Type userListType = new TypeToken<ArrayList<Vehicle>>(){}.getType();

            vehicles = gson.fromJson(reader, userListType);
            
	        System.out.println("JSON file loaded successfully. Putanja:" +path+ "vehicles.json");
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
	
	public Vehicle getById(String id) {
        for (Vehicle v : vehicles) {
            if (v.getId().equals(id)) {
                return v;
            }
        }
        return null;
    }
	
	public ArrayList<Vehicle> findAll() {
		ArrayList<Vehicle> v = new ArrayList<Vehicle>();
		for(Vehicle vh : vehicles) {
			if(vh.isDeleted() == false) {
				v.add(vh);
			}
		}
		return v;
	}
	
	public Vehicle findVehicle(String id) {
		Vehicle v = getById(id);
        if (v != null) {
        	System.out.println("Vehicle naden koji  se dodaje u korpu");
        	
            return v;
        }	
        System.out.println("Nije naden Vehicle koji se dodaje u korpu");
        return null;
	}
	
	public Vehicle vehicleRented(String id) {
		Vehicle v = getById(id);
        if (v != null) {
        	System.out.println("Vehicle naden koji  se updejtuje");
        	v.setCarStatus(CarStatus.Rented);
            writeToFile();
            return v;
        }	
        System.out.println("Nije updejtovan Vehicle");
        return null;
	}
	
	public Vehicle vehicleAvailable(String id) {
		Vehicle v = getById(id);
        if (v != null) {
        	System.out.println("Vehicle naden koji  se updejtuje");
        	v.setCarStatus(CarStatus.Available);
            writeToFile();
            return v;
        }	
        System.out.println("Nije updejtovan Vehicle");
        return null;
	}
	
	public Vehicle addVehicle(VehicleCreation newVehicle) {
		System.out.println("Treba da se doda vehicle u dao");
		Integer maxId = -1;
		for (Vehicle f : vehicles) {
		    int idNum = Integer.parseInt(f.getId());
		    if (idNum > maxId) {
		        maxId = idNum;
		    }
		}
		
		maxId++;
		Vehicle vehicle = new Vehicle();
		vehicle.setId(maxId.toString());
		vehicle.setBrand(newVehicle.getBrand());
		vehicle.setModel(newVehicle.getModel());
		vehicle.setConsumption(newVehicle.getConsumption());
		vehicle.setDescription(newVehicle.getDescription());
		vehicle.setDoorNumber(newVehicle.getDoorNumber());
		vehicle.setFuelType(newVehicle.getFuelType());
		vehicle.setImageURL(newVehicle.getImageURL());
		vehicle.setObjectId(newVehicle.getObjectId());
		vehicle.setPeopleNumber(newVehicle.getPeopleNumber());
		vehicle.setPrice(newVehicle.getPrice());
		vehicle.setStickType(newVehicle.getStickType());
		vehicle.setType(newVehicle.getType());
		vehicle.setCarStatus(CarStatus.Available);
		vehicle.setDeleted(false);
		vehicles.add(vehicle);
		writeToFile();
		System.out.println("Id novog vozila je: "+ vehicle.getId());
		return vehicle;
	}
	
	public Vehicle updateVehicle(String id, VehicleCreation updatedVehicle) {
		Vehicle vehicle = getById(id);
        if (vehicle != null) {
        	System.out.println("Vehicle nadjen koji  se updejtuje");
        	vehicle.setBrand(updatedVehicle.getBrand());
        	vehicle.setConsumption(updatedVehicle.getConsumption());
        	vehicle.setDescription(updatedVehicle.getDescription());
        	vehicle.setDoorNumber(updatedVehicle.getDoorNumber());
        	vehicle.setFuelType(updatedVehicle.getFuelType());
        	vehicle.setImageURL(updatedVehicle.getImageURL());
        	vehicle.setModel(updatedVehicle.getModel());
        	vehicle.setPeopleNumber(updatedVehicle.getPeopleNumber());
        	vehicle.setPrice(updatedVehicle.getPrice());
        	vehicle.setStickType(updatedVehicle.getStickType());
        	vehicle.setType(updatedVehicle.getType());
            writeToFile();
            return vehicle;
        }
        return null;	
	}
	
	public boolean deleteVehicle(String id) {
		Vehicle vehicle = getById(id);
		vehicle.setDeleted(true);
		writeToFile();
		return true;
	}
	
	public boolean deleteVehicles(ArrayList<Vehicle> vehicles) {

		for(Vehicle v : vehicles) {
			System.out.println("Vozilo: "+v.getId());
			Vehicle vehicle = getById(v.getId());
			System.out.println("Dobavljeno vozilo: "+vehicle.getId());
			vehicle.setDeleted(true);
			writeToFile();
		}
		return true;
	}

}
