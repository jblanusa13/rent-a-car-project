package dao;

// import com.google.gson.Gson;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.StringTokenizer;
import java.util.Date;
import beans.CustomerType;
import beans.RentACarObject;
import beans.ShoppingCart;
import beans.User;
import beans.UserRegistration;
import enums.UserRole;
import enums.CustomerTypes;
public class UserDAO {
	private ArrayList<User> users = new ArrayList<>();
	
	
	public UserDAO() {
		
		User user1 = new User("1", "user1", "password1", "John", "Doe", "Male", LocalDate.of(1999, 6, 12), UserRole.Manager, new ShoppingCart(), new RentACarObject(), 100, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user2 = new User("2", "user2", "password2", "Jane", "Smith", "Female", LocalDate.of(1987, 2, 14), UserRole.Customer, new ShoppingCart(), new RentACarObject(), 150, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user3 = new User("3", "user3", "password3", "Michael", "Johnson", "Male", LocalDate.of(2001, 7, 22), UserRole.Customer, new ShoppingCart(), new RentACarObject(), 80, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user4 = new User("4", "user4", "password4", "Emily", "Williams", "Female", LocalDate.of(1966, 1, 1), UserRole.Customer, new ShoppingCart(), new RentACarObject(), 200, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user5 = new User("5", "user5", "password5", "Daniel", "Brown", "Male", LocalDate.of(1957, 3, 12), UserRole.Customer, new ShoppingCart(), new RentACarObject(), 120, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user6 = new User("6", "user6", "password6", "Olivia", "Taylor", "Female", LocalDate.of(1978, 6, 6), UserRole.Customer, new ShoppingCart(), new RentACarObject(), 90, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user7 = new User("7", "user7", "password7", "William", "Anderson", "Male", LocalDate.of(1988, 5, 5), UserRole.Customer, new ShoppingCart(), new RentACarObject(), 180, new CustomerType(CustomerTypes.Bronze,0.0,10));

        
        users.add(user1);
        users.add(user2);
        users.add(user3);
        users.add(user4);
        users.add(user5);
        users.add(user6);
        users.add(user7);


		for (User user : users) {
		    System.out.println(user);
		}

	}
	
	public User getById(String id) {
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
	public void registerUser(UserRegistration userReg) {
		System.out.println("Korisnik treba da se registruje");
		User user = new User();
		Integer maxId = -1;
		for (User f : users) {
			int idNum =Integer.parseInt(f.getId());
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		user.setId(maxId.toString());
		user.setBirthDate(userReg.getBirthDate());
		user.setCollectedPoints(0);
		user.setCustomerType(null);
		user.setGender(userReg.getGender());
		user.setName(userReg.getName());
		user.setPassword(userReg.getPassword());
		user.setUsername(userReg.getUsername());
		user.setRole(UserRole.Customer);
		user.setRentACar(null);
		user.setSurname(userReg.getSurname());
		
		users.add(user);
		System.out.println("Korisnik registrovan");
	}
	
	public UserRegistration getUserRegistrationById(String id) {
		User user= getById(id);
		UserRegistration ur=new UserRegistration(user.getUsername(), user.getPassword(), user.getName(), user.getSurname(), user.getGender(), user.getBirthDate());
		
		return ur;
	}
	
	public Boolean updateUser(String id, UserRegistration updatedUser) {
		User user = getById(id);
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
		User user = getById(id);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy.");
		String birthDateString = user.getBirthDate().format(formatter);
		return birthDateString;
	}
}

/*// Declaration
 * Gson gs = new Gson(); 
 * YourObject objToSerialize = new YourObject();
 * 
 * // Serialization 
 * String serializedObj = gs.toJson(objToSerialize);
 * 
 * // Deserialization 
 * YourObject objAfterDerserialize = gs.fromJson(serializedObj, YourObject.class);
 */