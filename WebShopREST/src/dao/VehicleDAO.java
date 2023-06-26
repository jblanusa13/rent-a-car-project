package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.CustomerType;
import beans.Location;
import beans.RentACarObject;
import beans.RentingOrder;
import beans.ShoppingCart;
import beans.User;
import beans.Vehicle;
import enums.CarStatus;
import enums.CustomerTypes;
import enums.FuelType;
import enums.RentACarStatus;
import enums.RentingOrderStatus;
import enums.StickType;
import enums.UserRole;
import enums.VehicleType;

public class VehicleDAO {

	
	
	private ArrayList<Vehicle> vehicles = new ArrayList<>();
	DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
	private String path=null;
	
	public VehicleDAO(String contextPath) {
		path = contextPath;
		
		/*
		Vehicle vehicle1 = new Vehicle("1", "Honda", "ne znam sad", 10000, VehicleType.Car, "1", StickType.Automatic, FuelType.Diesel, 15, 5, 5, "lepa kola", "images/vehicles/1.jpg", CarStatus.Available,"");
		Vehicle vehicle2 = new Vehicle("2", "Golfic", "ne znam sad", 2002, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 11, 5, 4, "lepa kola", "images/vehicles/2.jpg", CarStatus.Available,"");
		Vehicle vehicle3 = new Vehicle("3", "Audi", "ne znam sad", 12000, VehicleType.Car, "1", StickType.Manual, FuelType.Diesel, 12, 4, 5, "lepa kola", "images/vehicles/3.jpg", CarStatus.Available,"");
		Vehicle vehicle4 = new Vehicle("4", "BrzaKola", "ne znam sad", 20000, VehicleType.Van, "1", StickType.Automatic, FuelType.Diesel, 13, 4, 5, "lepa kola", "images/vehicles/4.jpg", CarStatus.Available,"");
		Vehicle vehicle5 = new Vehicle("5", "Tojota", "ne znam sad", 50000, VehicleType.MobileHome, "1", StickType.Manual, FuelType.Diesel, 15, 5, 16, "lepa kola", "images/vehicles/5.jpg", CarStatus.Available,"");
		Vehicle vehicle6 = new Vehicle("6", "Ford", "Mustang", 15000, VehicleType.Car, "2", StickType.Automatic, FuelType.Diesel, 10, 2, 2, "Powerful sports car", "images/vehicles/6.jpg", CarStatus.Available,"");
		Vehicle vehicle7 = new Vehicle("7", "BMW", "X5", 25000, VehicleType.Van, "2", StickType.Automatic, FuelType.Diesel, 12, 5, 5, "Luxury SUV", "images/vehicles/7.jpeg", CarStatus.Available,"");
		Vehicle vehicle8 = new Vehicle("8", "Mercedes-Benz", "C-Class", 18000, VehicleType.Car, "2", StickType.Automatic, FuelType.Diesel, 11, 4, 5, "images/vehicles/8.jpg", "images/vehicles/8.jpg", CarStatus.Available,"");
		Vehicle vehicle9 = new Vehicle("9", "Porsche", "911", 50000, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 15, 2, 2, "Iconic sports car", "images/vehicles/9.jpg", CarStatus.Available,"");
		Vehicle vehicle10 = new Vehicle("10", "Tesla", "Model S", 60000, VehicleType.Car, "2", StickType.Automatic, FuelType.Electric, 0, 4, 5, "images/vehicles/10.jpg", "images/vehicles/10.jpg", CarStatus.Available,"");

		vehicles.add(vehicle1);
		vehicles.add(vehicle2);
		vehicles.add(vehicle3);
		vehicles.add(vehicle4);
		vehicles.add(vehicle5);

		vehicles.add(vehicle6);
		vehicles.add(vehicle7);
		vehicles.add(vehicle8);
		vehicles.add(vehicle9);
		vehicles.add(vehicle10);

		
		writeToFile();*/
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
	
	public Vehicle getOrderById(String id) {
        for (Vehicle v : vehicles) {
            if (v.getId().equals(id)) {
                return v;
            }
        }
        return null;
    }
	
	public ArrayList<Vehicle> findAll() {
		return vehicles;
	}
}
