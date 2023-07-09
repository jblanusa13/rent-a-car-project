package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.CustomerComment;
import beans.CustomerCommentCreation;
import beans.CustomerType;
import beans.Location;
import beans.RentACarObject;
import beans.ShoppingCart;
import beans.Vehicle;
import beans.User;
import enums.CarStatus;
import enums.CommentStatus;
import enums.CustomerSuspiciousStatus;
import enums.CustomerTypes;
import enums.FuelType;
import enums.RentACarStatus;
import enums.StickType;
import enums.UserRole;
import enums.UserStatus;
import enums.VehicleType;

public class CustomerCommentDAO {
	private ArrayList<CustomerComment> comments = new ArrayList<>();

	private String path=null;
	
	public CustomerCommentDAO(String contextPath) {
		path = contextPath;
		
		RentACarObject object1 = new RentACarObject("1", "Kod Milana", new ArrayList<Vehicle>(),"08:30","19:00", RentACarStatus.Open, new Location("1", "22", "23", "Super"),"images/objects/1.jpg", 5, false);
		ArrayList<Vehicle> cars1 = new ArrayList<Vehicle>();
		
		Vehicle vehicle1 = new Vehicle("1", "Honda", "ne znam sad", 10000, VehicleType.Car, "1", StickType.Automatic, FuelType.Diesel, 15, 5, 5, "lepa kola", "images/vehicles/1.jpg", CarStatus.Available,"", false);
		Vehicle vehicle2 = new Vehicle("2", "Golfic", "ne znam sad", 2002, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 11, 5, 4, "odlicno", "images/vehicles/2.jpg", CarStatus.Available,"", false);
		Vehicle vehicle3 = new Vehicle("3", "Audi", "ne znam sad", 12000, VehicleType.Car, "1", StickType.Manual, FuelType.Diesel, 12, 4, 5, "super", "images/vehicles/3.jpg", CarStatus.Available,"", false);
		Vehicle vehicle4 = new Vehicle("4", "BrzaKola", "ne znam sad", 20000, VehicleType.Van, "1", StickType.Automatic, FuelType.Diesel, 13, 4, 5, "lepa kola", "images/vehicles/4.jpg", CarStatus.Available,"", false);
		Vehicle vehicle5 = new Vehicle("5", "Tojota", "ne znam sad", 50000, VehicleType.MobileHome, "1", StickType.Manual, FuelType.Diesel, 15, 5, 16, "lepa kola", "images/vehicles/5.jpg", CarStatus.Available,"", false);
		Vehicle vehicle6 = new Vehicle("6", "Ford", "Mustang", 15000, VehicleType.Car, "2", StickType.Automatic, FuelType.Diesel, 10, 2, 2, "Powerful sports car", "images/vehicles/6.jpg", CarStatus.Available,"", false);
		Vehicle vehicle7 = new Vehicle("7", "BMW", "X5", 25000, VehicleType.Van, "2", StickType.Automatic, FuelType.Diesel, 12, 5, 5, "Luxury SUV", "images/vehicles/7.png", CarStatus.Available,"", false);
		Vehicle vehicle8 = new Vehicle("8", "Mercedes-Benz", "C-Class", 18000, VehicleType.Car, "2", StickType.Automatic, FuelType.Diesel, 11, 4, 5, "good old car", "images/vehicles/8.jpg", CarStatus.Available,"", false);
		Vehicle vehicle9 = new Vehicle("9", "Porsche", "911", 50000, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 15, 2, 2, "Iconic sports car", "images/vehicles/9.jpg", CarStatus.Available,"", false);
		Vehicle vehicle10 = new Vehicle("10", "Tesla", "Model S", 60000, VehicleType.Car, "2", StickType.Automatic, FuelType.Electric, 0, 4, 5, "amazing", "images/vehicles/10.jpg", CarStatus.Available,"", false);
		
		cars1.add(vehicle1);
		cars1.add(vehicle2);
		cars1.add(vehicle3);
		cars1.add(vehicle4);
		cars1.add(vehicle5);
		object1.setAvailableCars(cars1);
		RentACarObject object2 = new RentACarObject("2", "Rent-A-Wheels", new ArrayList<Vehicle>(), "09:00", "18:00", RentACarStatus.Open, new Location("2", "25", "28", "Prime"), "images/objects/2.jpg", 8, false);
		ArrayList<Vehicle> cars2 = new ArrayList<Vehicle>();

		cars2.add(vehicle6);
		cars2.add(vehicle7);
		cars2.add(vehicle8);
		cars2.add(vehicle9);
		cars2.add(vehicle10);
		object2.setAvailableCars(cars2);
		
		User user6 = new User("6", "user6", "password6", "Sophia", "Taylor", "Female", "1998-09-06",
        		UserRole.Customer, new ArrayList<>(), new ShoppingCart(),
                new RentACarObject(), 40, new CustomerType(CustomerTypes.Bronze, 0, 0),UserStatus.Active,CustomerSuspiciousStatus.Okay);

        User user7 = new User("7", "user7", "password7", "Daniel", "Wilson", "Male", "1976-11-25",
        		UserRole.Customer, new ArrayList<>(), new ShoppingCart(),
                new RentACarObject(), 80, new CustomerType(CustomerTypes.Bronze, 0, 0),UserStatus.Active,CustomerSuspiciousStatus.Okay);
        
        CustomerComment comment1 = new CustomerComment("1", user6, object1, 4, CommentStatus.Pending,"Great place");
        CustomerComment comment2 = new CustomerComment("2", user7, object1, 5, CommentStatus.Pending,"Awesome");
        CustomerComment comment3 = new CustomerComment("3", user6, object1, 1, CommentStatus.Rejected,"Never EVER go there!!!!");
        CustomerComment comment4 = new CustomerComment("4", user7, object1, 5, CommentStatus.Approved,"Okayish");
        
        comments.add(comment1);
        comments.add(comment2);
        comments.add(comment3);
        comments.add(comment4);
        
        CustomerComment comment5 = new CustomerComment("5", user6, object2, 3, CommentStatus.Pending,"Decent experience");
        CustomerComment comment6 = new CustomerComment("6", user7, object2, 4, CommentStatus.Pending,"Good service");
        CustomerComment comment7 = new CustomerComment("7", user7, object2, 2, CommentStatus.Rejected,"Not worth the money");
        CustomerComment comment8 = new CustomerComment("8", user6, object2, 5, CommentStatus.Approved,"Highly recommended");

        comments.add(comment5);
        comments.add(comment6);
        comments.add(comment7);
        comments.add(comment8);
        
        writeToFile();
        
        System.out.println("SVI KOMENTARI:");
		for(CustomerComment u: comments) {
			System.out.println("IDENTIFIKATOR:"+u.getId());
		}

	}
	
	public void writeToFile() {
		Gson gs = new GsonBuilder().setPrettyPrinting().create(); 
    	String jsonString = gs.toJson(comments);
    	try (FileWriter writer = new FileWriter(path+"/comments.json")) {
            writer.write(jsonString);
            System.out.println("JSON file created successfully.Putanja:" +path+ "/comments.json");
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	public void loadFromFile() {
		comments.clear();
		Gson gson = new Gson();
	    try (FileReader reader = new FileReader(path+"/comments.json")) {

            Type userListType = new TypeToken<ArrayList<CustomerComment>>(){}.getType();

            comments = gson.fromJson(reader, userListType);
            
	        System.out.println("JSON file loaded successfully. Putanja:" +path+ "comments.json");
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}

	public CustomerComment getById(String id) {
        for (CustomerComment v :comments) {
            if (v.getId().equals(id)) {
                return v;
            }
        }
        return null;
    }
	
	public ArrayList<CustomerComment> findAll() {
		return comments;
	}
	
	public String createComment(CustomerCommentCreation c) {
		CustomerComment comment= new CustomerComment();
		Integer maxId = -1;
		for (CustomerComment f : comments) {
		    int idNum = Integer.parseInt(f.getId());
		    if (idNum > maxId) {
		        maxId = idNum;
		    }
		}
		maxId++;
		comment.setId(maxId.toString());
		comment.setComment(c.getComment());
		comment.setCustomer(c.getCustomer());
		comment.setGrade(c.getGrade());
		comment.setObject(c.getObject());
		comment.setStatus(CommentStatus.Pending);
		String avg=calculateObjectAvg(comment);
		comments.add(comment);
		writeToFile();
		return avg;
	}
	
	private String calculateObjectAvg(CustomerComment c) {
		float sum=c.getGrade();
		float br=1;
		for(CustomerComment com: comments) {
			if(c.getObject().getId().equals(com.getObject().getId())) {
				sum+=com.getGrade();
				br++;
				System.out.println("sum" +sum+" br "+br);
			}
		}
		float avg=sum/br;
		String stringValue = Float.toString(avg);
		System.out.println("New avg grade for object" +c.getObject().getId()+" is "+stringValue);
		return stringValue;
	}

	public Boolean updateStatusToApproved(String id) {
		CustomerComment o = getById(id);
        if (o != null) {
        	System.out.println("Komentar  nadena koja  se updejtuje");
        	o.setStatus(CommentStatus.Approved);
            writeToFile();
            return true;
        }	
        System.out.println("Nije updejtovana komentar");
        return false;
		
	}
	
	public Boolean updateStatusToRejected(String id) {
		CustomerComment o = getById(id);
        if (o != null) {
        	System.out.println("Komentar  nadena koja  se updejtuje");
        	o.setStatus(CommentStatus.Rejected);
            writeToFile();
            return true;
        }	
        System.out.println("Nije updejtovana komentar");
        return false;
		
	}

	public ArrayList<CustomerComment> findAllApproved(String id) {
		ArrayList<CustomerComment> approvedComments = new ArrayList<>();
		for (CustomerComment v :comments) {
            if (v.getStatus().equals(CommentStatus.Approved) && v.getObject().getId().equals(id)) {
            	approvedComments.add(v);
            }
        }
		return approvedComments;
	}

	public ArrayList<CustomerComment> findAllCommentsInRental(String id) {
		ArrayList<CustomerComment> approvedComments = new ArrayList<>();
		for (CustomerComment v :comments) {
            if (v.getObject().getId().equals(id)) {
            	approvedComments.add(v);
            }
        }
		return approvedComments;
	}
	
}
