package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.UserRegistration;
import beans.Vehicle;
import beans.VehicleCreation;
import dao.UserDAO;
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
	    VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
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
	
	@GET
	@Path("/findVehicle/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle getVehicle(@PathParam("id") String id) {
	    VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
	    System.out.println("Finding Vehicle ");
	    Vehicle v = dao.findVehicle(id);
	    if (v!=null) {
	        return v;
	    } else {
	        System.out.println("No vehicle found.");
	        return null;
	    }
	}
	
	@GET
	@Path("/changeStatusToRented/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Boolean rented(@PathParam("id") String id) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
		System.out.println("Service received id of v in v service: " + id);
		Vehicle v= dao.vehicleRented(id);
        if (v!=null) {
        	System.out.println("v updejtovana: rented");
            return true;
        } else {
        	System.out.println("v NIJE updejtovana: rented");
            return false;
        }
    }
	
	@GET
	@Path("/changeStatusToAvailable/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Vehicle available(@PathParam("id") String id) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
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
	
	@POST
	@Path("/addVehicle")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Vehicle addVehicle(VehicleCreation newVehicle) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
		System.out.println("Dodaje vehicle u servisu");
		return dao.addVehicle(newVehicle);
	}
	
	@PUT
    @Path("/update/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Vehicle updateVehicle(@PathParam("id") String id, VehicleCreation updatedVehicle) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
        System.out.println("Vehicle se updejtuje");
        return dao.updateVehicle(id,updatedVehicle); 
	}
	
	@PUT
    @Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public boolean deleteVehicle(@PathParam("id") String id) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
        System.out.println("Vehicle se brise u servisu");
        return dao.deleteVehicle(id); 
	}
	
	@PUT
	@Path("/deleteVehiclesForObject/")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public boolean deleteVehicleForObject(ArrayList<Vehicle> vehicles) {
		VehicleDAO dao = (VehicleDAO) ctx.getAttribute("VehicleDAO");
		return dao.deleteVehicles(vehicles);
	}

}
