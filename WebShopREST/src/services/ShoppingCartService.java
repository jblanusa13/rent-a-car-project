package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.ShoppingCart;
import beans.User;
import beans.Vehicle;
import dao.ShoppingCartDAO;

@Path("/shoppingCarts")
public class ShoppingCartService {
	@Context
	ServletContext ctx;
	public ShoppingCartService() {}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("ShoppingCartDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("ShoppingCartDAO", new ShoppingCartDAO(contextPath));
		}
	}
	@GET
	@Path("/allShoppingCarts")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<ShoppingCart> getAllShoppingCart() {
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("ShoppingCartDAO");
	    System.out.println("Finding All shopping carts");
	    ArrayList<ShoppingCart> carts = dao.findAll();
	    if (carts.size() != 0) {
	        return carts;
	    } else {
	        System.out.println("All carts: " + carts.size());
	        System.out.println("No carts found.");
	        return null;
	    }
	}
	
	@POST
	@Path("/newCart")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ShoppingCart addNewCart(User customer) {
		System.out.println("Registrovanje korisnika u register servisu");
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("ShoppingCartDAO");
		ShoppingCart cart=dao.addNewCart(customer);
		if(cart!=null) {
			System.out.println("Korpa "+ cart.getId()+ cart.getPrice()+cart.getCustomerId());
			System.out.println("Korpa je napravljena");
			return cart;
		}
		else {
			System.out.println("Korpa NIJE napravljena");
            return null;
		}	
	}
	
	@POST
	@Path("/addVehicle")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Boolean addVehicle(Vehicle ov) {
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("ShoppingCartDAO");
		System.out.println("parametri: vozilo:"+ov.getId()+"ShoppingCart:"+ ov.getObjectId());
		Boolean b=dao.addToCart(ov,ov.getShoppingCartId());			
		if(b)
		{
			System.out.println("Vozilo uspesno dodato");
			return b;
		}
		System.out.println("Vozilo NIJE uspesno dodato");
		return false;
		
	}
	
	@GET
	@Path("/getCustomerShoppingCart/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ShoppingCart getCustomerShoppingCart(@PathParam("id") String id) {
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("ShoppingCartDAO");
	    System.out.println("Finding shoppingCart id:"+id);
	    ShoppingCart cart = dao.findCustomerCart(id);
	    if (cart!=null) {
	        return cart;
	    } else {
	        System.out.println("No carts found for this customer.");
	        return null;
	    }
	}
	
	@GET
	@Path("/getShoppingCartVehicles/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Vehicle> getShoppingCartVehicles(@PathParam("id") String id) {
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("ShoppingCartDAO");
	    System.out.println("Finding shoppingCart vehicles from customer with id:"+id);
	    ShoppingCart cart = dao.findCustomerCart(id);
	    if (cart.getCars()!=null) {
	        return cart.getCars();
	    } else {
	        System.out.println("No vehicles found for this customer with this id.");
	        return null;
	    }
	}
	
	@GET
	@Path("/getShoppingCartVehiclesOfObject/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<Vehicle> getShoppingCartVehiclesOfObject(@PathParam("id") String id) {
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("ShoppingCartDAO");
		String[] idParts = id.split("_");
	    String objectId = idParts[1];
	    String scId = idParts[0];
	    
		System.out.println("Objectid: " + objectId);
		System.out.println("ShoppingCartId: "+ scId);
	    System.out.println("Finding shoppingCart vehicles from customer with id:"+id);
	    ArrayList<Vehicle> v = dao.findCustomerCartVehicles(objectId,scId);
	    if (v!=null) {
	        return v;
	    } else {
	        System.out.println("No vehicles found for this customer with this id.");
	        return null;
	    }
	}
	
	@GET
	@Path("/getShoppingCartPrice/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public int getShoppingCartPrice(@PathParam("id") String id) {
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("ShoppingCartDAO");
	    System.out.println("Finding shoppingCart vehicles from customer with id:"+id);
	    ShoppingCart cart = dao.findCustomerCart(id);
	    return cart.getPrice();
	}
	
	@GET
	@Path("/removeVehicleFromShoppingCart/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ShoppingCart removeVehicleFromShoppingCart(@PathParam("id") String id) {
		String[] idParts = id.split("_");
	    if (idParts.length != 2) {
	    	System.out.println("nesto nije dobro");
	        return null;
	    }
	    
	    String carId = idParts[0];
	    String idShoppingCart = idParts[1];
		System.out.println("id vozila:"+carId+"Id korpe"+idShoppingCart);
		ShoppingCartDAO dao = (ShoppingCartDAO) ctx.getAttribute("ShoppingCartDAO");
	    System.out.println("Finding shoppingCart vehicles from customer with id:"+id);
	    ShoppingCart b= dao.removeVehicleById(carId,idShoppingCart);
	    if (b!=null) {
	    	System.out.println("Removed Vehicle");
	        return b;
	    } else {
	        System.out.println("No remove Vehicle.");
	        return null;
	    }
	}
}
