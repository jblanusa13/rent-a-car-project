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

	private void addrentacar() {
		RentACarObject object1 = new RentACarObject("1", "Kod Milana", new ArrayList<Vehicle>(),"08:30","19:00", RentACarStatus.Open, new Location("1", "22", "23", "Super"),"images/objects/1.jpg", 5);

		Vehicle vehicle1 = new Vehicle("1", "Honda", "ne znam sad", 10000, VehicleType.Car, "1", StickType.Automatic, FuelType.Diesel, 15, 5, 5, "lepa kola", "images/vehicles/1.jpg", CarStatus.Available,"");
		Vehicle vehicle2 = new Vehicle("2", "Golfic", "ne znam sad", 2002, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 11, 5, 4, "lepa kola", "images/vehicles/2.jpg", CarStatus.Available,"");
		Vehicle vehicle3 = new Vehicle("3", "Audi", "ne znam sad", 12000, VehicleType.Car, "1", StickType.Manual, FuelType.Diesel, 12, 4, 5, "lepa kola", "images/vehicles/3.jpg", CarStatus.Available,"");
		Vehicle vehicle4 = new Vehicle("4", "BrzaKola", "ne znam sad", 20000, VehicleType.Van, "1", StickType.Automatic, FuelType.Diesel, 13, 4, 5, "lepa kola", "images/vehicles/4.jpg", CarStatus.Available,"");
		Vehicle vehicle5 = new Vehicle("5", "Tojota", "ne znam sad", 50000, VehicleType.MobileHome, "1", StickType.Manual, FuelType.Diesel, 15, 5, 16, "lepa kola", "images/vehicles/5.jpg", CarStatus.Available,"");
		
		ArrayList<Vehicle> cars = new ArrayList<Vehicle>();
		cars.add(vehicle1);
		cars.add(vehicle2);
		cars.add(vehicle3);
		cars.add(vehicle4);
		cars.add(vehicle5);
		object1.setAvailableCars(cars);
		
		User u=new User();
		u=getUserById("3");
		u.setRentACar(object1);
		updateManagerRentACar(u);
		
		
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
	

	public User getRegisteringUser(String username, String password) {
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
			user.setId(maxId.toString());
			user.setBirthDate(userReg.getBirthDate());
			user.setCollectedPoints(0);
			user.setCustomerType(new CustomerType(CustomerTypes.Bronze, 0.0, 10));
			user.setGender(userReg.getGender());
			user.setName(userReg.getName());
			user.setPassword(userReg.getPassword());
			user.setUsername(userReg.getUsername());
			user.setRole(UserRole.Customer);
			user.setRentACar(new RentACarObject());
			user.setShoppingCart(new ShoppingCart());
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

	public Boolean updateUserForm(String id, UserRegistration updatedUser) {
		User user = getUserById(id);
        if (user != null) {
        	System.out.println("Korisnik naden koji  se updejtuje");
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            user.setName(updatedUser.getName());
            user.setSurname(updatedUser.getSurname());
            user.setGender(updatedUser.getGender());
            user.setBirthDate(updatedUser.getBirthDate());
            writeToFile();
            return true;
        }
        return false;
		
	}
	public void updateManagerRentACar(User updatedUser) {
		User user = getUserById(updatedUser.getId());
        if (user != null) {
        	System.out.println("Korisnik naden koji  se updejtuje");
            user.setRentACar(updatedUser.getRentACar());
            writeToFile();
            return;
        }	
        System.out.println("Nije updejtovan korisnik");
	}
	
	public String getBirthDate(String id) {
		User user = getUserById(id); 
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String birthDateString = user.getBirthDate().formatted(formatter);
		return birthDateString;
	}

	public String getMnagerObjectId(String id) {
		User user= getUserById(id);
		if(user!=null) {
			return user.getRentACar().getId();
		}
		return null;
	}
	
	public ArrayList<User> getAvailableManagers(){
		ArrayList<User> managers = new ArrayList<User>();
		for(User user : users) {
			if(user.getRole().equals(UserRole.Manager) && user.getRentACar().equals(null)) {
				managers.add(user);
			}
		}
		
		if(managers.isEmpty()) {
			return null;
		}
		return managers;
	}
	
	public boolean userPointsChange(String id,int numberOfPoints,boolean lost) {
		User user = getUserById(id);
        if (user != null) {
        	int newPoints=0;
        	System.out.println("Korisnik naden koji  se updejtuje");
        	if(lost) {
        		newPoints=user.getCollectedPoints()-numberOfPoints;
        	}
        	else {
        		newPoints=user.getCollectedPoints()+numberOfPoints;
        	}
            user.setCollectedPoints(newPoints);
            writeToFile();
            return true;
        }	
        System.out.println("Nije updejtovan korisnik");
        return false;
	}

	public Boolean updateUserShoppingCart(String id, ShoppingCart cart) {
		User user = getUserById(id);
        if (user != null) {
        	System.out.println("Korisnik naden koji  se updejtuje. dodata korpa");
        	user.setShoppingCart(cart);
            writeToFile();
            return true;
        }	
        System.out.println("Nije dodata korpa useru");
        return false;
	}
}

