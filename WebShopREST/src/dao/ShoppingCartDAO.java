package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Type;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.ShoppingCart;
import beans.User;
import beans.Vehicle;

public class ShoppingCartDAO {
	private String path=null;
	private ArrayList<ShoppingCart> carts = new ArrayList<>();
	DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
	public ShoppingCartDAO(String path) {
		this.path = path;
		loadFromFile();
		System.out.println("SVE POTROSACKE KORPE:");
		for(ShoppingCart u: carts) {
			System.out.println("IDENTIFIKATOR:"+u.getId());
		}
		
	}
	public void writeToFile() {
		Gson gs = new GsonBuilder().setPrettyPrinting().create(); 
    	String jsonString = gs.toJson(carts);
    	try (FileWriter writer = new FileWriter(path+"/shoppingCarts.json")) {
            writer.write(jsonString);
            System.out.println("JSON file created successfully.Putanja:" +path+ "/shoppingCarts.json");
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	public void loadFromFile() {
		carts.clear();
		Gson gson = new Gson();
	    try (FileReader reader = new FileReader(path+"/shoppingCarts.json")) {

            Type userListType = new TypeToken<ArrayList<ShoppingCart>>(){}.getType();

            carts = gson.fromJson(reader, userListType);
            
	        System.out.println("JSON file loaded successfully. Putanja:" +path+ "shoppingCarts.json");
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
	
	public ShoppingCart getById(String id) {
        for (ShoppingCart v : carts) {
            if (v.getId().equals(id)) {
            	System.out.println("KORPA SEARCH PRONADENA");
                return v;
            }
        }
        return null;
    }
	
	public ArrayList<ShoppingCart> findAll() {
		return carts;
	}
	public ShoppingCart addNewCart(User customer) {
		ShoppingCart cart= new ShoppingCart();
		Integer maxId = -1;
		for (ShoppingCart f : carts) {
		    int idNum = Integer.parseInt(f.getId());
		    if (idNum > maxId) {
		        maxId = idNum;
		    }
		}
		maxId++;
		cart.setId(maxId.toString());
		cart.setPrice(0);
		cart.setCustomerId(customer.getId());
		ArrayList<Vehicle> cars= new ArrayList<>();
		cart.setCars(cars);
		carts.add(cart);
		writeToFile();
		return cart;
	}
	public Boolean addToCart(Vehicle v,String id) {
		ShoppingCart c=getById(id);
		if(c!=null) {
			System.out.println("Dodavanje vozila u korpu.Nadena korpa.");
			c.getCars().add(v);
			c.setPrice(c.getPrice()+(int)v.getPrice());
			writeToFile();
			return true;
		}
		System.out.println("Nije nadena korpa."+ id);
		return false;
	}
	public ShoppingCart findCustomerCart(String id) {
		ShoppingCart c=getById(id);
		if(c!=null) {
			System.out.println("Trazenje korpe za usera.");
			return c;
		}
		System.out.println("Nije nadena korpa."+ id);
		return null;
	}

	public ArrayList<Vehicle> findCustomerCartVehicles(String id, String cart) {
		ShoppingCart c=getById(cart);
		ArrayList<Vehicle> vs= new ArrayList<Vehicle>();
		if(c!=null) {
			System.out.println("Trazenje korpe za usera i vozila odgovarajucih.");
			for(Vehicle v: c.getCars()) {
				System.out.println("VOZILO SA objektom ID"+v.getObjectId()+" treba id: "+id);
				if(v.getObjectId().equals(id)) {
					vs.add(v);
				}
			}
			return vs;
		}
		System.out.println("Nije nadena korpa. niti vozila u njoj"+ cart);
		return null;
	}
	
	public ShoppingCart removeVehicleById(String id, String sc) {
		System.out.println("Parametri id vozila: "+ id+"Id korpe"+sc);
		ShoppingCart c=getById(sc);
		if(c!=null) {			
			System.out.println("Trazenje vozila za brisanje.");
			for(Vehicle v: c.getCars()) {
				System.out.println("VOZILO SA ID"+v.getId()+" treba id: "+id);
				if(v.getId().equals(id)) {
					c.getCars().remove(v);
					c.setPrice(c.getPrice()-(int)v.getPrice());
					System.out.println("NADENO vozila za brisanje.");
					return c;
				}
			}
			System.out.println("NIJE NADENO");
			return null;
		}
		System.out.println("Nije nadeno vozilo."+ id);
		return null;
	}
    
}

