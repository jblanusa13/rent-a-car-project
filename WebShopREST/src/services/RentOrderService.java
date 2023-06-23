package services;
import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.RentingFilter;
import beans.RentingOrder;
import dao.RentingOrderDAO;

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
	@Path("/managerOrderStatusChangeTaken/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean changingStatusToTakenEnabled(@PathParam("id") String id) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("Service recived id :"+id);
		Boolean b= dao.checkStatusToTakenEnabled(id);
		System.out.println("Taken enabled: "+b);
        return b;
    }

	
	@PUT
	@Path("/managerOrderConfirmation/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response managerOrderConfirmation(@PathParam("id") String id) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("Service recived id of order:"+id);
		Boolean b= dao.changeOrderStatusToApproved(id);
        if (b) {
        	System.out.println("Porudzbina updejtovana: approved");
            return Response.ok().build();
        } else {
        	System.out.println("Porudzbina NIJE updejtovana: approved");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
	
	@PUT
	@Path("/managerOrderRejection/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response managerOrderRejection(@PathParam("id") String id,String comment) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("Service recived id of order:"+id);
		Boolean b= dao.changeOrderStatusToRejected(id,comment);
        if (b) {
        	System.out.println("Porudzbina updejtovana: rejected");
            return Response.ok().build();
        } else {
        	System.out.println("Porudzbina NIJE updejtovana: rejected");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
	
	@PUT
	@Path("/managerOrderTaken/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response managerOrderTaken(@PathParam("id") String id) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("Service recived id of order:"+id);
		Boolean b= dao.changeOrderStatusToTaken(id);
        if (b) {
        	System.out.println("Porudzbina updejtovana: taken");
            return Response.ok().build();
        } else {
        	System.out.println("Porudzbina NIJE updejtovana: taken");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
	
	@PUT
	@Path("/managerOrderReturn/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response managerOrderReturn(@PathParam("id") String id) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("Service recived id of order:"+id);
		Boolean b= dao.changeOrderStatusToReturned(id);
        if (b) {
        	System.out.println("Porudzbina updejtovana: returned");
            return Response.ok().build();
        } else {
        	System.out.println("Porudzbina NIJE updejtovana: returned");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
	
	@POST
	@Path("/managerFilteredOrders")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> getManagerFilteredOrders(RentingFilter filter) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("FILTERING IN SERVICE");
		System.out.println("Service recived id :"+filter.getUserId());
		System.out.println("Filter parameters : start date: "+ filter.getStartDate()+", end date: "+ filter.getEndDate()+", min price: "+filter.getMinPrice()+", max price: "+filter.getMaxPrice());
		ArrayList<RentingOrder> managerOrders= dao.searchManagerOrders(filter,filter.getUserId());
        if (managerOrders.size()!=0) {
            return  managerOrders;
        } else {
        	System.out.println("This manager orders :"+managerOrders.size());
        	System.out.println("This manager doesnt have any renting orders :( ");
            return null;
        }
    }
	
	@GET
	@Path("/managerOrdersPriceSortingDescending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortManagerOrdersByPriceDescending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting manager orders by price (descending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortManagerOrdersByPrice(true, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted manager orders (price descending) is empty.");
	    }
	    return sortedOrders;
	}

	@GET
	@Path("/managerOrdersPriceSortingAscending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortManagerOrdersByPriceAscending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting manager orders by price (ascending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortManagerOrdersByPrice(false, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted manager orders (price ascending) is empty.");
	    }
	    return sortedOrders;
	}

	@GET
	@Path("/managerOrdersDateSortingDescending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortManagerOrdersByDateDescending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting manager orders by date (descending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortManagerOrdersByDate(true, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted manager orders (date descending) is empty.");
	    }
	    return sortedOrders;
	}

	@GET
	@Path("/managerOrdersDateSortingAscending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortManagerOrdersByDateAscending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting manager orders by date (ascending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortManagerOrdersByDate(false, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted manager orders (date ascending) is empty.");
	    }
	    return sortedOrders;
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
