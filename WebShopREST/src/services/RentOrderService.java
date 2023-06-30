package services;
import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.ComplexRentingOrderCreation;
import beans.RentingOrder;
import beans.RentingOrderCreation;
import beans.User;
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
	@Path("/allOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> getAllOrders() {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("FindingAllOrders");
		ArrayList<RentingOrder> orders= dao.findAllRentable();
        if (orders.size()!=0) {
            return  orders;
        } else {
        	System.out.println("All orders :"+orders.size());
        	System.out.println(" any renting orders :( ");
            return null;
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
	
	@PUT
	@Path("/customerOrderCancellation/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response customerOrderCancellation(@PathParam("id") String id) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("Service recived id of order:"+id);
		Boolean b= dao.changeOrderStatusToCancelled(id);
        if (b) {
        	System.out.println("Porudzbina updejtovana: cancelled");
            return Response.ok().build();
        } else {
        	System.out.println("Porudzbina NIJE updejtovana: cancelled");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
	
	@GET
	@Path("/customerOrdersObjectNameSortingAscending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortCustomerOrdersByObjectNameAscending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting customer orders by object name (ascending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortCustomerOrdersByName(true, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted customer orders (object name ascending) is empty.");
	    }
	    return sortedOrders;
	}

	@GET
	@Path("/customerOrdersObjectNameSortingDescending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortCustomerOrdersByObjectNameDescending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting customer orders by object name (descending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortCustomerOrdersByName(false, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted customer orders (object name descending) is empty.");
	    }
	    return sortedOrders;
	}
	
	@GET
	@Path("/customerOrdersPriceSortingDescending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortCustomerOrdersByPriceDescending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting customer orders by price (descending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortCustomerOrdersByPrice(true, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted customer orders (price descending) is empty.");
	    }
	    return sortedOrders;
	}

	@GET
	@Path("/customerOrdersPriceSortingAscending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortCustomerOrdersByPriceAscending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting customer orders by price (ascending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortCustomerOrdersByPrice(false, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted customer orders (price ascending) is empty.");
	    }
	    return sortedOrders;
	}

	@GET
	@Path("/customerOrdersDateSortingDescending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortCustomerOrdersByDateDescending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting customer orders by date (descending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortCustomerOrdersByDate(true, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted customer orders (date descending) is empty.");
	    }
	    return sortedOrders;
	}

	@GET
	@Path("/customerOrdersDateSortingAscending/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentingOrder> sortCustomerOrdersByDateAscending(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("Sorting customer orders by date (ascending)");
	    ArrayList<RentingOrder> sortedOrders = dao.sortCustomerOrdersByDate(false, id);
	    if (sortedOrders.isEmpty()) {
	        System.out.println("The sorted customer orders (date ascending) is empty.");
	    }
	    return sortedOrders;
	}

	@POST
	@Path("/createOrder")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Boolean registerOrder(RentingOrderCreation c) {
		System.out.println("Registrovanje korisnika u register servisu");
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		RentingOrder o = dao.createOrder(c);
		if(o!=null) {
			System.out.println("NARUDZBINA JESTE registrovana");
			return true;
		}
		else {
			System.out.println("NARUDZBINA NIJE registrovanA");
            return null;
		}	
	}
	
	@POST
	@Path("/createComplexOrder")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Boolean registerComplexOrder(ComplexRentingOrderCreation c) {
		System.out.println("Registrovanje korisnika u register servisu");
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		 ArrayList<RentingOrder> o = dao.createComplexOrder(c);
		if(o!=null) {
			System.out.println("NARUDZBINA JESTE registrovana");
			return true;
		}
		else {
			System.out.println("NARUDZBINA NIJE registrovanA");
            return null;
		}	
	}
	
	@PUT
	@Path("/customerComment/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response customerComment(@PathParam("id") String id) {
		RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
		System.out.println("Service recived id of order:"+id);
		String[] idParts = id.split("_");
	    String orderId = idParts[0];
	    String comment = idParts[1];
	    
		System.out.println("Order id: " + orderId);
		System.out.println("Comment: "+ comment);
		Boolean b= dao.custommerCommentAdded(orderId,comment);
        if (b) {
        	System.out.println("Porudzbina updejtovana: cancelled");
            return Response.ok().build();
        } else {
        	System.out.println("Porudzbina NIJE updejtovana: cancelled");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
	
	@GET
	@Path("/customersThatOrdered/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<User> findAllCustomers(@PathParam("id") String id) {
	    RentingOrderDAO dao = (RentingOrderDAO) ctx.getAttribute("RentingOrderDAO");
	    System.out.println("TRAZE SE USERI");
	    ArrayList<User> users = dao.findUsers(id);
	    if (users.isEmpty()) {
	        System.out.println("there isnt any users");
	    }
	    return users;
	}
	
}
