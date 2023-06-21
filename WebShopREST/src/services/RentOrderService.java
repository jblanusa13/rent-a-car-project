package services;
import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.RentingOrder;
import beans.User;
import dao.RentingOrderDAO;
import dao.UserDAO;

@Path("/rentingOrders")

public class RentOrderService {
	@Context
	ServletContext ctx;
	public RentOrderService() {}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("RentingOrderDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("RentingOrderDAO", new RentingOrderDAO(contextPath));
		}
	}
	
	@GET
	@Path("/managerOrders/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> getManagerOrders(@PathParam("id") String id) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("Service recived id :"+id);
		ArrayList<RentingOrder> managerOrders= dao.findAllManagersOrders(id);
        if (managerOrders.size()!=0) {
            return  managerOrders;
        } else {
        	System.out.println("This manager orders :"+managerOrders.size());
        	System.out.println("This manager doesnt have any renting orders :( ");
            return null;
        }
    }
	@GET
	@Path("/customerOrders/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> getCustomerOrders(@PathParam("id") String id) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		ArrayList<RentingOrder> customerOrders= dao.findAllCustomersOrders(id);
        if (customerOrders.size()!=0) {
            return  customerOrders;
        } else {
        	System.out.println("This customer orders :"+customerOrders.size());
        	System.out.println("This customer doesnt have any renting orders :( ");
            return null;
        }
    }
	
	
	
	
	
}
