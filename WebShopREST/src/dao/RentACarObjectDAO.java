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
	
}
