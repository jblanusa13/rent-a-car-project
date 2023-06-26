package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Location;
import beans.RentACarObject;
import beans.User;
import beans.Vehicle;
import enums.CarStatus;
import enums.FuelType;
import enums.RentACarStatus;
import enums.StickType;
import enums.VehicleType;

public class RentACarObjectDAO {
	private String path=null;
	private ArrayList<Vehicle> vehicles = new ArrayList<>();
	private ArrayList<RentACarObject> objects = new ArrayList<>();

	public RentACarObjectDAO(String contextPath) {
		path = contextPath;
		RentACarObject object1 = new RentACarObject("1", "Kod Milana", new ArrayList<Vehicle>(),"08:30","19:00", RentACarStatus.Open, new Location("1", "22", "23", "Super"),"images/objects/1.jpg", 5);
		ArrayList<Vehicle> cars1 = new ArrayList<Vehicle>();
		
		Vehicle vehicle1 = new Vehicle("1", "Honda", "ne znam sad", 10000, VehicleType.Car, "1", StickType.Automatic, FuelType.Diesel, 15, 5, 5, "lepa kola", "images/vehicles/1.jpg", CarStatus.Available,"");
		Vehicle vehicle2 = new Vehicle("2", "Golfic", "ne znam sad", 2002, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 11, 5, 4, "lepa kola", "images/vehicles/2.jpg", CarStatus.Available,"");
		Vehicle vehicle3 = new Vehicle("3", "Audi", "ne znam sad", 12000, VehicleType.Car, "1", StickType.Manual, FuelType.Diesel, 12, 4, 5, "lepa kola", "images/vehicles/3.jpg", CarStatus.Available,"");
		Vehicle vehicle4 = new Vehicle("4", "BrzaKola", "ne znam sad", 20000, VehicleType.Van, "1", StickType.Automatic, FuelType.Diesel, 13, 4, 5, "lepa kola", "images/vehicles/4.jpg", CarStatus.Available,"");
		Vehicle vehicle5 = new Vehicle("5", "Tojota", "ne znam sad", 50000, VehicleType.MobileHome, "1", StickType.Manual, FuelType.Diesel, 15, 5, 16, "lepa kola", "images/vehicles/5.jpg", CarStatus.Available,"");
		
		cars1.add(vehicle1);
		cars1.add(vehicle2);
		cars1.add(vehicle3);
		cars1.add(vehicle4);
		cars1.add(vehicle5);
		object1.setAvailableCars(cars1);
		//object1.setImageURL(contextPath+object1.getImageURL());
		objects.add(object1);
		RentACarObject object2 = new RentACarObject("2", "Rent-A-Wheels", new ArrayList<Vehicle>(), "09:00", "18:00", RentACarStatus.Open, new Location("2", "25", "28", "Prime"), "images/objects/2.jpg", 8);
		ArrayList<Vehicle> cars2 = new ArrayList<Vehicle>();

		Vehicle vehicle6 = new Vehicle("6", "Ford", "Mustang", 15000, VehicleType.Car, "2", StickType.Automatic, FuelType.Diesel, 10, 2, 2, "Powerful sports car", "images/vehicles/6.jpg", CarStatus.Available,"");
		Vehicle vehicle7 = new Vehicle("7", "BMW", "X5", 25000, VehicleType.Van, "2", StickType.Automatic, FuelType.Diesel, 12, 5, 5, "Luxury SUV", "images/vehicles/7.jpg", CarStatus.Available,"");
		Vehicle vehicle8 = new Vehicle("8", "Mercedes-Benz", "C-Class", 18000, VehicleType.Car, "2", StickType.Automatic, FuelType.Diesel, 11, 4, 5, "images/vehicles/8.jpg", "images/vehicles/8.jpg", CarStatus.Available,"");
		Vehicle vehicle9 = new Vehicle("9", "Porsche", "911", 50000, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 15, 2, 2, "Iconic sports car", "images/vehicles/9.jpg", CarStatus.Available,"");
		Vehicle vehicle10 = new Vehicle("10", "Tesla", "Model S", 60000, VehicleType.Car, "2", StickType.Automatic, FuelType.Electric, 0, 4, 5, "images/vehicles/10.jpg", "images/vehicles/10.jpg", CarStatus.Available,"");

		cars2.add(vehicle6);
		cars2.add(vehicle7);
		cars2.add(vehicle8);
		cars2.add(vehicle9);
		cars2.add(vehicle10);
		object2.setAvailableCars(cars2);
		//object2.setImageURL(contextPath+object2.getImageURL());
		objects.add(object2);
		writeToFile();
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
			if(o.getStatus().equals(RentACarStatus.Open)) {
				sortedObjects.add(o);
			}
		}
		
		for(RentACarObject o : objects) {
			if(o.getStatus().equals(RentACarStatus.Closed)) {
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
	
}
