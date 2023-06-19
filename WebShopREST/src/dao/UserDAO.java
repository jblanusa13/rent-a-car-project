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

import java.time.format.DateTimeFormatter;



public class UserDAO {
	private ArrayList<User> users = new ArrayList<>();

	ArrayList<Vehicle> cars = new ArrayList<Vehicle>();
	ArrayList<Vehicle> cars1 = new ArrayList<Vehicle>();
	ArrayList<RentACarObject> objects= new ArrayList<RentACarObject>();
	
	public UserDAO(String contextPath) {
		
		Vehicle vehicle1 = new Vehicle("1", "Honda", "ne znam sad", 10000, VehicleType.Car, "1", StickType.Automatic, FuelType.Diesel, 15, 5, 5, "lepa kola", CarStatus.Available);
		Vehicle vehicle2 = new Vehicle("2", "Golfic", "ne znam sad", 2002, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 11, 5, 4, "lepa kola", CarStatus.Available);
		Vehicle vehicle3 = new Vehicle("3", "Audi", "ne znam sad", 12000, VehicleType.Car, "1", StickType.Manual, FuelType.Diesel, 12, 4, 5, "lepa kola", CarStatus.Available);
		Vehicle vehicle4 = new Vehicle("4", "BrzaKola", "ne znam sad", 20000, VehicleType.Van, "1", StickType.Automatic, FuelType.Diesel, 13, 4, 5, "lepa kola", CarStatus.Available);
		Vehicle vehicle5 = new Vehicle("5", "Tojota", "ne znam sad", 50000, VehicleType.MobileHome, "1", StickType.Manual, FuelType.Diesel, 15, 5, 16, "lepa kola", CarStatus.Available);
		RentACarObject object1 = new RentACarObject("1", "Kod Milana", new ArrayList<Vehicle>(), RentACarStatus.Open, new Location("1", "22", "23", "Super"), 5);
		RentACarObject object2 = new RentACarObject("2", "Djordjevic", new ArrayList<Vehicle>(), RentACarStatus.Closed, new Location("2", "233", "23", "Super"), 3);
	
		cars.add(vehicle1);
		cars.add(vehicle3);
		cars.add(vehicle4);
		cars.add(vehicle5);
		
		object1.setAvailableCars(cars);
		cars1.add(vehicle2);

		
		objects.add(object2);
		objects.add(object1);
		
		
		object2.setAvailableCars(cars1);
		User user1 = new User("1", "user1", "password1", "John", "Doe", "Male", "2002-01-14", UserRole.Manager, new ShoppingCart("1", objects, "1", 20000), object1, 100, new CustomerType(CustomerTypes.Bronze, 0.0, 10));
		User user2 = new User("2", "user2", "password2", "Jane", "Smith", "Female", "1997-01-12", UserRole.Customer, new ShoppingCart("2", objects, "2", 20000), object2, 150, new CustomerType(CustomerTypes.Bronze, 0.0, 10));
		User user3 = new User("3", "user3", "password3", "Michael", "Johnson", "Male", "1999-03-29", UserRole.Customer, new ShoppingCart("3", objects, "3", 20000), object1, 80, new CustomerType(CustomerTypes.Bronze, 0.0, 10));
		User user4 = new User("4", "user4", "password4", "Emily", "Williams", "Female", "1989-06-05", UserRole.Customer, new ShoppingCart("4", objects, "4", 20000), object2, 200, new CustomerType(CustomerTypes.Bronze, 0.0, 10));
		User user5 = new User("5", "user5", "password5", "Daniel", "Brown", "Male", "2003-09-14", UserRole.Customer, new ShoppingCart("5", objects, "5", 20000), object1, 120, new CustomerType(CustomerTypes.Bronze, 0.0, 10));
		User user6 = new User("6", "user6", "password6", "Olivia", "Taylor", "Female", "1995-08-17", UserRole.Customer, new ShoppingCart("6", objects, "6", 20000), object2, 90, new CustomerType(CustomerTypes.Bronze, 0.0, 10));
		User user7 = new User("7", "user7", "password7", "William", "Anderson", "Male", "1965-02-28", UserRole.Customer, new ShoppingCart("7", objects, "7", 20000), object1, 180, new CustomerType(CustomerTypes.Bronze, 0.0, 10));

        users.add(user1);
        users.add(user2);
        users.add(user3);
        users.add(user4);
        users.add(user5);
        users.add(user6);
        users.add(user7);
	}

	/*public void writeToFile() {
		Gson gs = new Gson(); 
    	String jsonString = gs.toJson(users);
    	try (FileWriter writer = new FileWriter(path+"data/users.json")) {
            writer.write(jsonString);
            System.out.println("JSON file created successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	public User loadFromFile() {
	    Gson gson = new Gson();
	    User user = null;
	    
	    try (FileReader reader = new FileReader(path + "data/users.json")) {
	        user = gson.fromJson(reader, User.class);
	        System.out.println("JSON file loaded successfully.");
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    return user;
	}*/
	
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
			//writeToFile();
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

