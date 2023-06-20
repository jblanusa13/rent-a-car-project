package dao;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.RentACarObject;
import beans.RentingOrder;
import beans.User;
import beans.Vehicle;
import enums.RentingOrderStatus;

public class RentingOrderDAO {
	private ArrayList<RentingOrder> orders = new ArrayList<>();
	ArrayList<RentingOrder> managerOrders = new ArrayList<>();
	ArrayList<RentingOrder> customerOrders = new ArrayList<>();
	private String path=null;
	
	public RentingOrderDAO(String contextPath) {
		path = contextPath;
		loadFromFile();
		System.out.println("SVI USERI:");
		for(RentingOrder u: orders) {
			System.out.println(u.getId());
		}
	}
	
	public void writeToFile() {
		Gson gs = new GsonBuilder().setPrettyPrinting().create(); 
    	String jsonString = gs.toJson(orders);
    	try (FileWriter writer = new FileWriter(path+"/rentingOrders.json")) {
            writer.write(jsonString);
            System.out.println("JSON file created successfully.Putanja:" +path+ "/rentingOrders.json");
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	public void loadFromFile() {
		orders.clear();
		Gson gson = new Gson();
	    try (FileReader reader = new FileReader(path+"/rentingOrders.json")) {

            Type userListType = new TypeToken<ArrayList<User>>(){}.getType();

            orders = gson.fromJson(reader, userListType);
            
	        System.out.println("JSON file loaded successfully. Putanja:" +path+ "rentingOrders.json");
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
	
	public RentingOrder getOrderById(String id) {
        for (RentingOrder order : orders) {
            if (order.getId().equals(id)) {
                return order;
            }
        }
        return null;
    }
	
	public ArrayList<RentingOrder> findAll() {
		return orders;
	}
	public ArrayList<RentingOrder> findAllManagersOrders(String managerId) {
		for (RentingOrder order : orders) {
            if (order.getCustomer().getId().equals(managerId)) {
                managerOrders.add(order);
            }
        }
		return managerOrders;
	}
	public ArrayList<RentingOrder> findAllCustomersOrders(String customerId) {
		for (RentingOrder order : orders) {
            if (order.getCustomer().getId().equals(customerId)) {
            	customerOrders.add(order);
            }
        }
		return customerOrders;
	}
	public RentingOrder createOrder(ArrayList<Vehicle> cars, RentACarObject object,int duration,int price,User user,String date,String time) {
		RentingOrder order=new RentingOrder();
		Integer maxId = -1;
		for (RentingOrder f : orders) {
		    int idNum = Integer.parseInt(f.getId());
		    if (idNum > maxId) {
		        maxId = idNum;
		    }
		}
		maxId++;
		order.setId(maxId.toString());
		order.setIdentificator(generateRandomId());
		order.setVehicles(cars);
		order.setRentingObject(object);
		order.setDate(date);
		order.setTime(time);
		order.setDuration(duration);
		order.setPrice(price);
		order.setCustomer(user);
		order.setOrderStatus(RentingOrderStatus.Processing);
		
		return order;
	}
	private String setDateToString(LocalDate date) {

		DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String dateString = date.format(dateFormatter);
        //LocalDate parsedDate = LocalDate.parse(dateString, dateFormatter);
        System.out.println(dateString);
		return dateString;
	}
	private String setTimeToString(LocalTime time) {

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        String timeString = time.format(timeFormatter);
        //LocalTime parsedTime = LocalTime.parse(timeString, timeFormatter);
        System.out.println(timeString);
		return timeString;
	}
	public static String generateRandomId() {
        UUID uuid = UUID.randomUUID();
        String randomId = uuid.toString().replaceAll("-", "").substring(0, 10);
        return randomId;
    }
	public void changeOrderStatusToApproved(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Approved);
	}
	public void changeOrderStatusToTaken(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Taken);
	}
	public void changeOrderStatusToReturned(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Returned);
	}
	public void changeOrderStatusToRejected(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Rejected);
	}
	public void changeOrderStatusToCancelled(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Cancelled);
	}
}
