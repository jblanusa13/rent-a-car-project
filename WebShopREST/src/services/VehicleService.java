package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;


import beans.Vehicle;
import dao.VehicleDAO;
@Path("/vehicles")
public class VehicleService {
	
	@Context
	ServletContext ctx;
	public VehicleService() {}
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("VehicleDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("VehicleDAO", new VehicleDAO(contextPath));
		}
	}
	
	@GET
	@Path("/allVehicles")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Vehicle> getAllVehicleOrders() {
	    VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleOrderDAO");
	    System.out.println("Finding All Vehicle Orders");
	    ArrayList<Vehicle> orders = dao.findAll();
	    if (orders.size() != 0) {
	        return orders;
	    } else {
	        System.out.println("All vehicle orders: " + orders.size());
	        System.out.println("No vehicle orders found.");
	        return null;
	    }
	}
	
	@POST
	@Path("/changeStatusToRented/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Vehicle rented(@PathParam("id") String id) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleOrderDAO");
		System.out.println("Service received id : " + id);
		Vehicle v= dao.vehicleRented(id);
        if (v!=null) {
        	System.out.println("v updejtovana: rented");
            return v;
        } else {
        	System.out.println("v NIJE updejtovana: rented");
            return null;
        }
    }
	
	@POST
	@Path("/changeStatusToAvailable/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Vehicle available(@PathParam("id") String id) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleOrderDAO");
		System.out.println("Service received id : " + id);
		Vehicle v= dao.vehicleAvailable(id);
        if (v!=null) {
        	System.out.println("v updejtovana: Available");
            return v;
        } else {
        	System.out.println("v NIJE updejtovana: Available");
            return null;
        }
    }

}
