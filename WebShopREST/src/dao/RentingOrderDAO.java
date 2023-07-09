package dao;

import java.time.LocalDate;
import java.util.Comparator;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
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

import beans.ComplexRentingOrderCreation;
import beans.CustomerType;
import beans.Location;
import beans.RentACarObject;
import beans.RentingOrder;
import beans.RentingOrderCreation;
import beans.ShoppingCart;
import beans.User;
import beans.Vehicle;
import enums.CarStatus;
import enums.CustomerSuspiciousStatus;
import enums.CustomerTypes;
import enums.FuelType;
import enums.RentACarStatus;
import enums.RentingOrderStatus;
import enums.StickType;
import enums.UserRole;
import enums.UserStatus;
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
                new RentACarObject(), 80, new CustomerType(CustomerTypes.Bronze, 0, 0),UserStatus.Active,CustomerSuspiciousStatus.Okay);
		
		RentACarObject object1 = new RentACarObject("1", "Kod Milana", new ArrayList<Vehicle>(),"08:30","19:00", RentACarStatus.Open, new Location("1", "22", "23", "Super"),"images/objects/1.jpg", 5, false);
		ArrayList<Vehicle> cars = new ArrayList<Vehicle>();
		
		Vehicle vehicle1 = new Vehicle("1", "Honda", "ne znam sad", 10000, VehicleType.Car, "1", StickType.Automatic, FuelType.Diesel, 15, 5, 5, "lepa kola", "images/vehicles/1.jpg", CarStatus.Available,"", false);
		Vehicle vehicle2 = new Vehicle("2", "Golfic", "ne znam sad", 2002, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 11, 5, 4, "odlicno", "images/vehicles/2.jpg", CarStatus.Available,"", false);
		Vehicle vehicle3 = new Vehicle("3", "Audi", "ne znam sad", 12000, VehicleType.Car, "1", StickType.Manual, FuelType.Diesel, 12, 4, 5, "super", "images/vehicles/3.jpg", CarStatus.Available,"", false);
		Vehicle vehicle4 = new Vehicle("4", "BrzaKola", "ne znam sad", 20000, VehicleType.Van, "1", StickType.Automatic, FuelType.Diesel, 13, 4, 5, "lepa kola", "images/vehicles/4.jpg", CarStatus.Available,"", false);
		Vehicle vehicle5 = new Vehicle("5", "Tojota", "ne znam sad", 50000, VehicleType.MobileHome, "1", StickType.Manual, FuelType.Diesel, 15, 5, 16, "lepa kola", "images/vehicles/5.jpg", CarStatus.Available,"", false);

		cars.add(vehicle1);
		cars.add(vehicle2);
		
		
		// Create seven instances of RentingOrder
		RentingOrder order1 = new RentingOrder("1", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle1)), "2023-06-27", "10:00", 3, user1, RentingOrderStatus.Processing, 300,"","");
		RentingOrder order2 = new RentingOrder("2", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle2)), "2023-06-28", "11:00", 2, user1, RentingOrderStatus.Processing, 400,"","");
		RentingOrder order3 = new RentingOrder("3", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle3)), "2023-06-29", "09:00", 1, user1, RentingOrderStatus.Processing, 200,"","");
		RentingOrder order4 = new RentingOrder("4", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle4)), "2023-06-30", "10:00", 5, user1, RentingOrderStatus.Processing, 600,"","");
		RentingOrder order5 = new RentingOrder("5", generateRandomId(), object1, new ArrayList<>(Collections.singletonList(vehicle5)), "2023-07-01", "13:00", 2, user1, RentingOrderStatus.Processing, 500,"","");
		RentingOrder order6 = new RentingOrder("6", generateRandomId(), object1, cars , "2023-06-26", "15:00", 4, user1, RentingOrderStatus.Rejected, 800,"","");
		
		orders.add(order1);
		orders.add(order2);
		orders.add(order3);
		orders.add(order4);
		orders.add(order5);
		orders.add(order6);
		
		writeToFile();/**/
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

            Type userListType = new TypeToken<ArrayList<RentingOrder>>(){}.getType();

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
	
	public ArrayList<RentingOrder> findAllRentable() {
	    ArrayList<RentingOrder> filteredOrders = new ArrayList<>();

	    for (RentingOrder order : orders) {
	        RentingOrderStatus orderStatus = order.getOrderStatus();
	        if (orderStatus == RentingOrderStatus.Processing
	                || orderStatus == RentingOrderStatus.Approved
	                || orderStatus == RentingOrderStatus.Taken) {
	            filteredOrders.add(order);
	        }
	    }

	    return filteredOrders;
	}
	
	public ArrayList<RentingOrder> findAllManagersOrders(String managerObject) {
		managerOrders = new ArrayList<>();
		if(managerObject!=null) {
			for (RentingOrder order : orders) {
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
		customerOrders = new ArrayList<>();
		for (RentingOrder order : orders) {
            if (order.getCustomer().getId().equals(customerId)) {
            	customerOrders.add(order);
            }
        }
		return customerOrders;
	}
	public RentingOrder createOrder(RentingOrderCreation c) {
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
		order.setVehicles(c.getCars());
		order.setRentingObject(c.getObject());
		order.setDate(c.getStartDate());
		order.setTime(c.getTime());
		LocalDate startDate = LocalDate.parse(c.getStartDate());
        LocalDate endDate = LocalDate.parse(c.getEndDate());
        long duration = ChronoUnit.DAYS.between(startDate, endDate);
        int durationInDays = (int) duration;
		order.setDuration(durationInDays);
		order.setPrice(c.getPrice());
		order.setCustomer(c.getCustomer());
		order.setOrderStatus(RentingOrderStatus.Processing);
		orders.add(order);
		writeToFile();
		return order;
	}
	
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
	
	public Boolean changeOrderStatusToApproved(String orderId) {
		RentingOrder order= getOrderById(orderId);
		if(order!=null) {
			order.setOrderStatus(RentingOrderStatus.Approved);
			update(order);
			return true;
		}
		return false;
	}

	public Boolean changeOrderStatusToTaken(String orderId) {
		RentingOrder o= getOrderById(orderId);
		ArrayList<Vehicle> vehicles= new ArrayList<Vehicle>();
		if(o!=null) {
			o.setOrderStatus(RentingOrderStatus.Taken);
			System.out.println("Vehicles u orderu se updejtuju: rented");
        	for(Vehicle v: o.getVehicles()) {
        		v.setCarStatus(CarStatus.Rented);
        		vehicles.add(v);
        	}
        	o.setVehicles(vehicles);
			update(o);
			return true;
		}
		return false;
		
	}
	
	public Boolean changeOrderStatusToReturned(String orderId) {
		RentingOrder o= getOrderById(orderId);
		ArrayList<Vehicle> vehicles= new ArrayList<Vehicle>();
		if(o!=null) {
			o.setOrderStatus(RentingOrderStatus.Returned);
			System.out.println("Vehicles u orderu se updejtuju: rented");
	    	for(Vehicle v: o.getVehicles()) {
	    		v.setCarStatus(CarStatus.Available);
	    		vehicles.add(v);
    	}
    	o.setVehicles(vehicles);
		update(o);
		return true;
		}
		return false;
	}
	
	public Boolean changeOrderStatusToRejected(String orderId,String comment) {
		RentingOrder order= getOrderById(orderId);
		if(order!=null) {
			order.setOrderStatus(RentingOrderStatus.Rejected);
			order.setManagerComment(comment);
			update(order);
			return true;
		}
		return false;
	}
	
	public Boolean changeOrderStatusToCancelled(String orderId) {
		RentingOrder order= getOrderById(orderId);
		if(order!=null) {
			order.setOrderStatus(RentingOrderStatus.Cancelled);
			update(order);
			return true;
		}
		return false;
	}
	

    // Sort orders by object name
    public ArrayList<RentingOrder> sortManagerOrdersByName(boolean descending,String objectId) {
    	ArrayList<RentingOrder> list=findAllManagersOrders(objectId);
        Comparator<RentingOrder> comparator = Comparator.comparing(order -> order.getRentingObject().getName());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(list, comparator);
        return list;
    }

    // Sort orders by price manager orders
    public ArrayList<RentingOrder> sortManagerOrdersByPrice(boolean descending,String objectId) {
    	ArrayList<RentingOrder> list=findAllManagersOrders(objectId);
        Comparator<RentingOrder> comparator = Comparator.comparingInt(RentingOrder::getPrice);
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(list, comparator);
        return list;
    }

    // Sort orders by date manager orders
    public ArrayList<RentingOrder> sortManagerOrdersByDate(boolean descending, String objectId) {
    	ArrayList<RentingOrder> list=findAllManagersOrders(objectId);
        Comparator<RentingOrder> comparator = Comparator.comparing(RentingOrder::getDate);
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(list, comparator);
        return list;
    }
    
    // Sort orders by price customer orders
    public ArrayList<RentingOrder> sortCustomerOrdersByPrice(boolean descending, String customerId) {
        ArrayList<RentingOrder> list = findAllCustomersOrders(customerId);
        Comparator<RentingOrder> comparator = Comparator.comparingInt(RentingOrder::getPrice);
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(list, comparator);
        return list;
    }
    
	// Sort orders by date customer orders
    public ArrayList<RentingOrder> sortCustomerOrdersByDate(boolean descending, String customerId) {
        ArrayList<RentingOrder> list = findAllCustomersOrders(customerId);
        Comparator<RentingOrder> comparator = Comparator.comparing(RentingOrder::getDate);
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(list, comparator);
        return list;
    }
    
	// Sort orders by rental object name customer orders
    public ArrayList<RentingOrder> sortCustomerOrdersByName(boolean descending, String customerId) {
        ArrayList<RentingOrder> list = findAllCustomersOrders(customerId);
        Comparator<RentingOrder> comparator = Comparator.comparing(o -> o.getRentingObject().getName());
        if (descending) {
            comparator = comparator.reversed();
        }
        Collections.sort(list, comparator);
        return list;
    }
    
	public Boolean checkStatusToTakenEnabled(String orderId) {
		RentingOrder order= getOrderById(orderId);
		if(order!=null) {
			LocalDate currentDate = LocalDate.now();
	        LocalTime currentTime = LocalTime.now();
			LocalDate parsedDate = LocalDate.parse(order.getDate(), dateFormatter);
			LocalTime parsedTime = LocalTime.parse(order.getTime(), timeFormatter);

	        if (parsedDate.isEqual(currentDate) && parsedTime.isBefore(currentTime)) {
	            return true;
	        }

	        LocalDate endDate = parsedDate.plusDays(order.getDuration());
	        if (currentDate.isAfter(parsedDate) && currentDate.isBefore(endDate)) {
	            return true;
	        }

	        return false;
		}
		return false;
	}

	public Boolean checkStatusToReturnEnabled(String id) {
		RentingOrder order= getOrderById(id);
		if(order!=null) {
			LocalDate currentDate = LocalDate.now();
			LocalDate parsedDate = LocalDate.parse(order.getDate(), dateFormatter);

	        LocalDate endDate = parsedDate.plusDays(order.getDuration());
	        if (currentDate.isAfter(parsedDate) && currentDate.isBefore(endDate)) {
	            return true;
	        }

	        //return false;
	        //moze da vrati bilo kada ali ako je posle end date-a verovatno ce biti oznacen kao los ili tako nesto
		}
		return false;
	}

	public ArrayList<RentingOrder> createComplexOrder(ComplexRentingOrderCreation c) {
		System.out.println("PRAVLJENJE KOMPLEKSNE NARUZBINE");
		ArrayList<RentingOrder> complexOrders= new ArrayList<RentingOrder>();
		for(RentACarObject object: c.getObjects()) {
			ArrayList<Vehicle> vehicles= new ArrayList<Vehicle>();
			int price=0;
			for(Vehicle v: object.getAvailableCars()) {
				for(Vehicle vShoppingCart: c.getCars()) {
					if(v.getId().equals(vShoppingCart.getId()))
					{
						vehicles.add(v);
						price+=(int)v.getPrice();
					}
				}
			}
			System.out.println("Cena naruzbine u objektu "+object.getId()+" je "+price);
			RentingOrderCreation cr= new RentingOrderCreation(c.getStartDate(),c.getEndDate(),object,vehicles,c.getCustomer() , price , c.getTime());
			RentingOrder ro = createOrder(cr);
			complexOrders.add(ro);
		}
		System.out.println("SVI DELOVI KOMLEKSNE NARUZBINE:");
		for(RentingOrder u: complexOrders) {
			System.out.println(u.getId()+"IDENTIFIKATOR:"+u.getIdentificator());
		}
		
		return complexOrders;
	}

	public Boolean custommerCommentAdded(String id, String comment) {
		RentingOrder order= getOrderById(id);
		if(order!=null) {
			order.setCustomerComment(comment);
			update(order);
			return true;
		}
		return false;
	}

	public ArrayList<User> findUsers(String id) {
	    ArrayList<User> users = new ArrayList<>();
	    for (RentingOrder order : orders) {
	        if (order.getRentingObject().getId().equals(id)) {
	            User user = order.getCustomer();
	            if (!users.contains(user)) {
	                users.add(user);          
	            }
	        }
	    }
	    return users;
	    
	}
	
	public boolean deleteOrder(String objectId) {
		for (RentingOrder ro : orders) {
			if(ro.getRentingObject().getId().equals(objectId)) {
				ro.setOrderStatus(RentingOrderStatus.Rejected);
				writeToFile();
			}
		}
		
		return true;
	}
}
