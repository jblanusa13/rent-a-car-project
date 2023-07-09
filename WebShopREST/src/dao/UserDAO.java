package dao;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import beans.CustomerType;
import beans.Location;
import beans.Manager;
import beans.RentACarObject;
import beans.RentingOrder;
import beans.ShoppingCart;
import beans.User;
import beans.UserRegistration;
import beans.UserCancelation;
import beans.Vehicle;
import enums.UserRole;
import enums.UserStatus;
import enums.VehicleType;
import enums.CarStatus;
import enums.CustomerSuspiciousStatus;
import enums.CustomerTypes;
import enums.FuelType;
import enums.RentACarStatus;
import enums.StickType;
import com.google.gson.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.io.FileWriter;
import java.io.*;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;



public class UserDAO {
	private ArrayList<User> users = new ArrayList<>();
	ArrayList<UserCancelation> cancelations = new ArrayList<UserCancelation>();
	private String path=null;
	ArrayList<Vehicle> cars = new ArrayList<Vehicle>();
	ArrayList<Vehicle> cars1 = new ArrayList<Vehicle>();
	ArrayList<RentACarObject> objects= new ArrayList<RentACarObject>();
	
	public UserDAO(String contextPath) {
		
		path=contextPath;
		
		loadFromFile();
		loadFromFileCancelations();
		System.out.println("SVI USERI:");
		for(User u: users) {
			System.out.println(u.getId());
		}
		
		System.out.println("SVA OTKAZIVANJA:");
		for(UserCancelation u: cancelations) {
			System.out.println(u.getCustomerId());
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
	

	public User getRegisteringUser(String username, String password) {
		System.out.println("Trazi usera");
        for (User user : users) {
            if (user.getUsername().equals(username) && user.getPassword().equals(password)) {
            	System.out.println("nasao usera");
            	if(user.getUserStatus().equals(UserStatus.Active)) {
            		return user;
            	}
            	else {
            		System.out.println("nalog deaktiviran");
            		return user;
            	}
            	
            }
        }
        System.out.println("nije nasao usera");
        return null;
    }
	
	public User registerUser(UserRegistration userReg, String type) {
		System.out.println("Korisnik treba da se registruje");
		System.out.println("Tip korisnika: " + type);
		System.out.println("Pol korisnika: " + userReg.getGender());
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
			user.setGender(userReg.getGender());
			user.setName(userReg.getName());
			user.setPassword(userReg.getPassword());
			user.setUsername(userReg.getUsername());
			user.setSurname(userReg.getSurname());
			user.setUserStatus(UserStatus.Active);
			user.setSusStatus(CustomerSuspiciousStatus.Okay);
			if(type.equals("m")) {
				System.out.println("Registruje menadzera");
				user.setRole(UserRole.Manager);
			}
			else if(type.equals("c")){
				System.out.println("Registruje kupca");
				user.setRole(UserRole.Customer);
				user.setOrders(new ArrayList<RentingOrder>());
				user.setCustomerType(new CustomerType(CustomerTypes.Bronze, 0.0, 3000));
				user.setShoppingCart(new ShoppingCart());
				user.setCollectedPoints(0);
			}
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
	
	public ArrayList<Manager> getAvailableManagers(){
		ArrayList<Manager> managers = new ArrayList<Manager>();
		for(User user : users) {
			if(user.getRole().equals(UserRole.Manager) && (user.getRentACar() == null || user.getRentACar().getDeleted() == true)) {
				
				managers.add(new Manager(user.getId(), 
										user.getUsername(),
										user.getPassword(),
										user.getName(),
										user.getSurname(),
										user.getGender(),
										user.getBirthDate()));			
			}
		}
		
		for(Manager manager : managers) {
			System.out.println("Menadzer: "+manager.getId());
		}
		
		if(managers.isEmpty()) {
			System.out.println("Menadzeri: null");
			return null;
		}
		return managers;
	}
	
	public User userPointsChange(String id,int numberOfPoints,boolean lost) {
		User user = getUserById(id);
        if (user != null) {
        	int newPoints=0;
        	System.out.println("Korisnik naden koji  se updejtuje");
        	if(lost) {
        		newPoints=user.getCollectedPoints()-numberOfPoints;
        		user=checkCustomerStatus(user);
        	}
        	else {
        		newPoints=user.getCollectedPoints()+numberOfPoints;
        		if (newPoints > 10000) {
        			user.setCustomerType(new CustomerType(CustomerTypes.Golden,10.0,10000));
        		} 
        		else if (newPoints > 5000) {
        			user.setCustomerType(new CustomerType(CustomerTypes.Silver,5.0,5000));
        		}
        		
        	}
            user.setCollectedPoints(newPoints);
            writeToFile();
            return user;
        }	
        System.out.println("Nije updejtovan korisnik");
        return null;
	}

	private User checkCustomerStatus(User user) {
		int br=0;
		int i=0;
		DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String today = LocalDate.now().format(dateFormatter);
		UserCancelation uc=new UserCancelation(user.getId(),today);
		cancelations.add(uc);
		writeToFileCancelations();
		for(UserCancelation c: cancelations) {
			System.out.println(i++);
			if(c.getCustomerId().equals(user.getId()) ){
				System.out.println(i++);
				LocalDate currentDate = LocalDate.now().plusDays(1);
				LocalDate givenDate = LocalDate.parse(c.getDate(), dateFormatter);
		        LocalDate oneMonthAgo = currentDate.minus(1, ChronoUnit.MONTHS);

		        if (givenDate.isAfter(oneMonthAgo) && givenDate.isBefore(currentDate)) {
		        	System.out.println(i++);
		            System.out.println("Yay! The date is within the past month.");
		            br++;
		        } else {
		            System.out.println("The date is not within the past month.");
		        }
			}
		}
		if(br>=5) {
			System.out.println("USER IS SUS");
            user.setSusStatus(CustomerSuspiciousStatus.Suspicious);
		}
		
		return user;
	}

	public void writeToFileCancelations() {
		Gson gs = new GsonBuilder().setPrettyPrinting().create(); 
    	String jsonString = gs.toJson(cancelations);
    	try (FileWriter writer = new FileWriter(path+"/cancelations.json")) {
            writer.write(jsonString);
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	public void loadFromFileCancelations() {
		cancelations.clear();
		Gson gson = new Gson();
	    try (FileReader reader = new FileReader(path+"/cancelations.json")) {
            Type userListType = new TypeToken<ArrayList<UserCancelation>>(){}.getType();
            cancelations = gson.fromJson(reader, userListType);
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
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

	public ShoppingCart findCart(String id) {
		User user = getUserById(id);
        if (user != null) {
        	System.out.println("Nadena korpa");
            return user.getShoppingCart();
        }	
        System.out.println("Nije nadena korpa");
        return null;
	}
	
	public String setManagerObject(String managerId, RentACarObject object) {
		System.out.println("Menadzer: "+managerId);
		System.out.println("Objekat: "+object.getId());
		User manager = getUserById(managerId);
		if(manager == null) {
			System.out.println("Nije nasao menadzera ne znam zasto");
		}
		else {
			System.out.println("NASAO menadzera");
			manager.setRentACar(object);
			writeToFile();
		}
		return manager.getId();
	}

	public User userDeactivated(String id) {
		User user = getUserById(id);
        if (user != null) {
        	user.setUserStatus(UserStatus.Deactivated);
            writeToFile();
            return user;
        }	
        System.out.println("Nije updejtovan korisnik");
        return null;
	}
	
	// Sort users by name
    public ArrayList<User> sortUsersByName(boolean descending, ArrayList<User> usersToSort) {
        Comparator<User> comparator = Comparator.comparing(user -> user.getName());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(usersToSort, comparator);
        return usersToSort;
    }
    
    // Sort users by surname
    public ArrayList<User> sortUsersBySurname(boolean descending, ArrayList<User> usersToSort) {
        Comparator<User> comparator = Comparator.comparing(user -> user.getSurname());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(usersToSort, comparator);
        return usersToSort;
    }
    
    // Sort users by username
    public ArrayList<User> sortUsersByUsername(boolean descending, ArrayList<User> usersToSort) {
        Comparator<User> comparator = Comparator.comparing(user -> user.getUsername());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(usersToSort, comparator);
        return usersToSort;
    }
    // Sort users by points
    public ArrayList<User> sortUsersByPoints(boolean descending, ArrayList<User> usersToSort) {
        Comparator<User> comparator = Comparator.comparing(user -> user.getCollectedPoints());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(usersToSort, comparator);
        return usersToSort;
    }
    
    public ArrayList<User> filterUsers(String userRole, String customerType, ArrayList<User> usersToFilter){
    	System.out.println(userRole);
    	System.out.println(customerType);
    	boolean firstTrue;
    	boolean secondTrue;
    	ArrayList<User> filteredUsers = new ArrayList<User>();
    	for(User u : usersToFilter) {
    		firstTrue = userRole.equals(u.getRole().name()) || userRole.equals("null");
    		if(userRole.equals("Customer") && u.getRole().name().equals("Customer")) {
    			System.out.println("customerType string: "+ customerType);
    			System.out.println("cutomerType file: "+ u.getCustomerType().getTypeName().name());
    			secondTrue = customerType.equals(u.getCustomerType().getTypeName().name()) || customerType.equals("null");
    		}
    		else {
    			secondTrue = true;
    		}
    		boolean isTrue = firstTrue && secondTrue;
    		System.out.println("First true: "+firstTrue);
    		System.out.println("Second true: "+secondTrue);
    		System.out.println("Is true: "+isTrue);
    		
    		if(isTrue) {
    			filteredUsers.add(u);
    			System.out.println("Filtrirani user: "+u);
    		}
     	}
    	
    	return filteredUsers;
    }
    
    public ArrayList<User> searchUsers(String name, String surname, String username, ArrayList<User> usersToSearch){
    	ArrayList<User> searchedUsers = new ArrayList<User>();
    	
    	for(User u : usersToSearch) {
    		boolean nameTrue = u.getName().toLowerCase().contains(name.toLowerCase()) || name.equals("null");
    		boolean surnameTrue = u.getSurname().toLowerCase().contains(surname.toLowerCase()) || surname.equals("null");
    		boolean usernameTrue = u.getUsername().toLowerCase().contains(username.toLowerCase()) || username.equals("null");
    		
    		System.out.println("nameTrue: " +nameTrue);
    		System.out.println("surnameTrue: "+surnameTrue);
    		System.out.println("usernameTrue: "+usernameTrue);
    		boolean isTrue = nameTrue && surnameTrue && usernameTrue;
    		
    		if(isTrue) {
    			searchedUsers.add(u);
    			System.out.println("Pretrazeni user: "+u);
    		}
    	}
    	
    	return searchedUsers;
    }
    
    public User deleteObjectForManager(String id) {
    	User manager = getUserById(id);
    	manager.getRentACar().setDeleted(true);
    	writeToFile();
    	System.out.println("Obrisan objekat kod menadzera");
    	return manager;
    }
    
    public User findManagerByObjectId(String objectId) {
    	for(User u : users) {
    		if(u.getRentACar() == null) {
    			continue;
    		}
    		else {
    			if(u.getRentACar().getId().equals(objectId)) {
    				System.out.println("USER: "+u.getId());
    	    		System.out.println("U FAJLU: "+u.getRentACar().getId());
    	    		System.out.println("PROSLEDJEN: "+objectId);
    				return u;
    			}
    		}
    	}
    	
    	return null;
    }
    
    public User updateObjectForManager(String id, RentACarObject object) {
    	User manager = getUserById(id);
    	manager.setRentACar(object);
    	writeToFile();
    	return manager;
    }
}

