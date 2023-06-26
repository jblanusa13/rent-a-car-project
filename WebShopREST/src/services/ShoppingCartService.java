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
			System.out.println("Korpa "+ cart.getId()+ cart.getPrice()+cart.getCustomer());
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
}
