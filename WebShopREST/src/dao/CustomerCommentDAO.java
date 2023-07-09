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

		loadFromFile();
        
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
