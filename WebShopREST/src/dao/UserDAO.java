package dao;

// import com.google.gson.Gson;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Collection;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.StringTokenizer;
import java.util.Date;
import beans.CustomerType;
import beans.RentACarObject;
import beans.User;
import enums.UserRole;
import enums.CustomerTypes;
public class UserDAO {
	private ArrayList<User> users = new ArrayList<>();
	
	
	public UserDAO() {
		
		User user1 = new User("1", "user1", "password1", "John", "Doe", "Male", new Date(102, 6, 12), UserRole.Customer, new RentACarObject(), 100, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user2 = new User("2", "user2", "password2", "Jane", "Smith", "Female", new Date(102, 8, 5), UserRole.Customer, new RentACarObject(), 150, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user3 = new User("3", "user3", "password3", "Michael", "Johnson", "Male", new Date(101, 10, 20), UserRole.Customer, new RentACarObject(), 80, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user4 = new User("4", "user4", "password4", "Emily", "Williams", "Female", new Date(100, 2, 18), UserRole.Customer, new RentACarObject(), 200, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user5 = new User("5", "user5", "password5", "Daniel", "Brown", "Male", new Date(99, 4, 30), UserRole.Customer, new RentACarObject(), 120, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user6 = new User("6", "user6", "password6", "Olivia", "Taylor", "Female", new Date(98, 7, 9), UserRole.Customer, new RentACarObject(), 90, new CustomerType(CustomerTypes.Bronze,0.0,10));
        User user7 = new User("7", "user7", "password7", "William", "Anderson", "Male", new Date(97, 9, 15), UserRole.Customer, new RentACarObject(), 180, new CustomerType(CustomerTypes.Bronze,0.0,10));

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