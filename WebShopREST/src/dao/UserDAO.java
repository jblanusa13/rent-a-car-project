package dao;

import java.util.ArrayList;
import beans.CustomerType;
import beans.Location;
import beans.RentACarObject;
import beans.ShoppingCart;
import beans.User;
import beans.UserRegistration;
import beans.Vehicle;
import enums.UserRole;
import enums.VehicleType;
import enums.CarStatus;
import enums.CustomerTypes;
import enums.FuelType;
import enums.RentACarStatus;
import enums.StickType;
import com.google.gson.*;
import java.time.format.DateTimeFormatter;
import java.io.FileWriter;
import java.io.*;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

import java.lang.reflect.Type;



public class UserDAO {
	private ArrayList<User> users = new ArrayList<>();
	private String path=null;
	ArrayList<Vehicle> cars = new ArrayList<Vehicle>();
	ArrayList<Vehicle> cars1 = new ArrayList<Vehicle>();
	ArrayList<RentACarObject> objects= new ArrayList<RentACarObject>();
	
	public UserDAO(String contextPath) {
		
		path=contextPath;
		
		loadFromFile();
		System.out.println("SVI USERI:");
		for(User u: users) {
			System.out.println(u.getId());
		}
		
		
	}

	public void writeToFile() {
		Gson gs = new GsonBuilder().setPrettyPrinting().create(); 
    	String jsonString = gs.toJson(users);
    	try (FileWriter writer = new FileWriter(path+"/users.json")) {
            writer.write(jsonString);
            System.out.println("JSON file created successfully.Putanja:" +path+ "/users.json");
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	public void loadFromFile() {
		users.clear();
		Gson gson = new Gson();
	    try (FileReader reader = new FileReader(path+"/users.json")) {

            Type userListType = new TypeToken<ArrayList<User>>(){}.getType();

            users = gson.fromJson(reader, userListType);
            
	        System.out.println("JSON file loaded successfully. Putanja:" +path+ "users.json");
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
	
	public User getUserById(String id) {
        for (User user : users) {
            if (user.getId().equals(id)) {
                return user;
            }
        }
        return null;
    }
	
	public ArrayList<User> findAll() {
		return users;
	}
	

	public User getUser(String username, String password) {
		System.out.println("Trazi usera");
        for (User user : users) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
            	System.out.println("nasao usera");
                return user;
            }
        }
        System.out.println("nije nasao usera");
        return null;
    }
	
	public User registerUser(UserRegistration userReg) {
		System.out.println("Korisnik treba da se registruje");
		boolean userExists = users.stream()
		        .anyMatch(u -> u.getUsername().equals(userReg.getUsername()));

		if (userExists) {
		    System.out.println("Postoji vec korisnik sa ovim podacima");
		    return null;
		} else {
			User user = new User();
			Integer maxId = -1;
			for (User f : users) {
			    int idNum = Integer.parseInt(f.getId());
			    if (idNum > maxId) {
			        maxId = idNum;
			    }
			}
			maxId++;
			ShoppingCart sc=new ShoppingCart("1", objects, maxId.toString(), 0);
			user.setId(maxId.toString());
			user.setBirthDate(userReg.getBirthDate());
			user.setCollectedPoints(0);
			user.setCustomerType(new CustomerType(CustomerTypes.Bronze, 0.0, 10));
			user.setGender(userReg.getGender());
			user.setName(userReg.getName());
			user.setPassword(userReg.getPassword());
			user.setUsername(userReg.getUsername());
			user.setRole(UserRole.Customer);
			RentACarObject object1 = new RentACarObject("1", "Kod Milana", new ArrayList<Vehicle>(), RentACarStatus.Open, new Location("1", "22", "23", "Super"), 5);
			object1.setAvailableCars(cars);
			user.setRentACar(object1);
			user.setShoppingCart(sc);
			user.setSurname(userReg.getSurname());
		    users.add(user);
		    System.out.println("Korisnik registrovan");
			writeToFile();
		    return user;
		}

	}

	public UserRegistration getUserRegistrationById(String id) {
		User user= getUserById(id);
		UserRegistration ur =new UserRegistration(user.getUsername(), user.getPassword(), user.getName(), user.getSurname(), user.getGender(), user.getBirthDate());
		
		return ur;
	}

	public Boolean updateUser(String id, UserRegistration updatedUser) {
		User user = getUserById(id);
        if (user != null) {
        	System.out.println("Korisnik naden koji  se updejtuje");
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            user.setName(updatedUser.getName());
            user.setSurname(updatedUser.getSurname());
            user.setGender(updatedUser.getGender());
            user.setBirthDate(updatedUser.getBirthDate());
            return true;
        }
        return false;
		
	}
	
	public String getBirthDate(String id) {
		User user = getUserById(id);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String birthDateString = user.getBirthDate().formatted(formatter);
		return birthDateString;
	}
	
}

