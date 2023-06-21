package dao;

import java.time.LocalDate;
import java.util.Comparator;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.CustomerType;
import beans.Location;
import beans.RentACarObject;
import beans.RentingOrder;
import beans.ShoppingCart;
import beans.User;
import beans.Vehicle;
import enums.CarStatus;
import enums.CustomerTypes;
import enums.FuelType;
import enums.RentACarStatus;
import enums.RentingOrderStatus;
import enums.StickType;
import enums.UserRole;
import enums.VehicleType;

public class RentingOrderDAO {
	private ArrayList<RentingOrder> orders = new ArrayList<>();
	ArrayList<RentingOrder> managerOrders = new ArrayList<>();
	ArrayList<RentingOrder> customerOrders = new ArrayList<>();
	DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
	private String path=null;
	
	public RentingOrderDAO(String contextPath) {
		path = contextPath;
		User user1 = new User("7", "user7", "password7", "Daniel", "Wilson", "Male", "1976-11-25",
        		UserRole.Customer, new ArrayList<>(), new ShoppingCart(),
                new RentACarObject(), 80, new CustomerType(CustomerTypes.Bronze, 0, 0));
		
		RentACarObject object1 = new RentACarObject("1", "Kod Milana", new ArrayList<Vehicle>(), RentACarStatus.Open, new Location("1", "22", "23", "Super"), 5);

		Vehicle vehicle1 = new Vehicle("1", "Honda", "ne znam sad", 10000, VehicleType.Car, "1", StickType.Automatic, FuelType.Diesel, 15, 5, 5, "lepa kola", "images/vehicles/1.jpg", CarStatus.Available);
		Vehicle vehicle2 = new Vehicle("2", "Golfic", "ne znam sad", 2002, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 11, 5, 4, "lepa kola", "images/vehicles/2.jpg", CarStatus.Available);
		Vehicle vehicle3 = new Vehicle("3", "Audi", "ne znam sad", 12000, VehicleType.Car, "1", StickType.Manual, FuelType.Diesel, 12, 4, 5, "lepa kola", "images/vehicles/3.jpg", CarStatus.Available);
		Vehicle vehicle4 = new Vehicle("4", "BrzaKola", "ne znam sad", 20000, VehicleType.Van, "1", StickType.Automatic, FuelType.Diesel, 13, 4, 5, "lepa kola", "images/vehicles/4.jpg", CarStatus.Available);
		Vehicle vehicle5 = new Vehicle("5", "Tojota", "ne znam sad", 50000, VehicleType.MobileHome, "1", StickType.Manual, FuelType.Diesel, 15, 5, 16, "lepa kola", "images/vehicles/5.jpg", CarStatus.Available);
		
		ArrayList<Vehicle> cars = new ArrayList<Vehicle>();
		cars.add(vehicle1);
		cars.add(vehicle2);
		
		// Create seven instances of RentingOrder
		RentingOrder order1 = new RentingOrder("1", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle1)), "2023-06-22", "10:00", 3, user1, RentingOrderStatus.Processing, 300,"","");
		RentingOrder order2 = new RentingOrder("2", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle2)), "2023-06-22", "11:00", 2, user1, RentingOrderStatus.Processing, 400,"","");
		RentingOrder order3 = new RentingOrder("3", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle3)), "2023-06-23", "09:00", 1, user1, RentingOrderStatus.Approved, 200,"","");
		RentingOrder order4 = new RentingOrder("4", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle4)), "2023-06-23", "10:00", 5, user1, RentingOrderStatus.Taken, 600,"","");
		RentingOrder order5 = new RentingOrder("5", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle5)), "2023-06-24", "13:00", 2, user1, RentingOrderStatus.Returned, 500,"","");
		RentingOrder order6 = new RentingOrder("6", generateRandomId(), object1, cars , "2023-06-26", "15:00", 4, user1, RentingOrderStatus.Rejected, 800,"","");
		
		orders.add(order1);
		orders.add(order2);
		orders.add(order3);
		orders.add(order4);
		orders.add(order5);
		orders.add(order6);
		
		writeToFile();
		//loadFromFile();
		System.out.println("SVI USERI:");
		for(RentingOrder u: orders) {
			System.out.println(u.getId()+"IDENTIFIKATOR:"+u.getIdentificator());
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
	public ArrayList<RentingOrder> findAllManagersOrders(String managerObject) {
		managerOrders = new ArrayList<>();
		if(managerObject!=null) {
			for (RentingOrder order : orders) {
				System.out.println("Order id:"+order.getId()+", Order renting object id:"+ order.getRentingObject().getId()+",manager object id:"+ managerObject);
	            if (order.getRentingObject().getId().equals(managerObject)) {
	                managerOrders.add(order);
	            }
	        }
			return managerOrders;
		}
		System.out.println("Doslo je do greske pri slanju objekta");
		return null;
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
	/*private String setDateToString(LocalDate date) {
        String dateString = date.format(dateFormatter);
        //LocalDate parsedDate = LocalDate.parse(dateString, dateFormatter);
        System.out.println(dateString);
		return dateString;
	}
	private String setTimeToString(LocalTime time) {
        String timeString = time.format(timeFormatter);
        //LocalTime parsedTime = LocalTime.parse(timeString, timeFormatter);
        System.out.println(timeString);
		return timeString;
	}*/
	public static String generateRandomId() {
        UUID uuid = UUID.randomUUID();
        String randomId = uuid.toString().replaceAll("-", "").substring(0, 10);
        return randomId;
    }
	private void update(RentingOrder order) {
		RentingOrder o = getOrderById(order.getId());
        if (o != null) {
        	System.out.println("Porudzbina  nadena koja  se updejtuje");
        	o.setOrderStatus(order.getOrderStatus());
            writeToFile();
            return;
        }	
        System.out.println("Nije updejtovana naruzbina");
		
	}
	
	public void changeOrderStatusToApproved(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Approved);
		update(order);
	}

	public void changeOrderStatusToTaken(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Taken);
		update(order);
	}
	
	public void changeOrderStatusToReturned(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Returned);
		update(order);
	}
	
	public void changeOrderStatusToRejected(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Rejected);
		update(order);
	}
	
	public void changeOrderStatusToCancelled(RentingOrder order) {
		order.setOrderStatus(RentingOrderStatus.Cancelled);
		update(order);
	}
	
    public ArrayList<RentingOrder> searchOrders(String rentingObjectName, int minPrice, int maxPrice, String fromDate, String toDate) {
        ArrayList<RentingOrder> filteredOrders = new ArrayList<>();
        LocalDate parsedfromDate = LocalDate.parse(fromDate, dateFormatter);
        LocalDate parsedtoDate = LocalDate.parse(toDate, dateFormatter);
        
        for (RentingOrder order : orders) {
            if (rentingObjectName != null && !order.getRentingObject().getName().equals(rentingObjectName)) {
                continue;
            }
            if (minPrice > 0 && order.getPrice() < minPrice) {
                continue;
            }
            if (maxPrice > 0 && order.getPrice() > maxPrice) {
                continue;
            }
            LocalDate orderStartDate= LocalDate.parse(order.getDate(),dateFormatter);
            LocalDate orderEndDate= orderStartDate.plusDays(order.getDuration());
            if (fromDate != null && orderStartDate.isBefore(parsedfromDate)) {
                continue;
            }
            if (toDate != null && orderEndDate.isAfter(parsedtoDate)) {
                continue;
            }

            filteredOrders.add(order);
        }

        return filteredOrders;
    }
    // Sort orders by object name
    public ArrayList<RentingOrder> sortOrdersByName(boolean descending,ArrayList<RentingOrder> list) {
        Comparator<RentingOrder> comparator = Comparator.comparing(order -> order.getRentingObject().getName());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(list, comparator);
        return list;
    }

    // Sort orders by price
    public ArrayList<RentingOrder> sortOrdersByPrice(boolean descending,ArrayList<RentingOrder> list) {
        Comparator<RentingOrder> comparator = Comparator.comparingInt(RentingOrder::getPrice);
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(list, comparator);
        return list;
    }

    // Sort orders by date
    public ArrayList<RentingOrder> sortOrdersByDate(boolean descending,ArrayList<RentingOrder> list) {
        Comparator<RentingOrder> comparator = Comparator.comparing(RentingOrder::getDate);
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(list, comparator);
        return list;
    }
}
