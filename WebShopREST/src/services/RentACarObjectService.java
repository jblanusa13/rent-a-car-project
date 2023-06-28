package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.RentACarObject;
import beans.Vehicle;
import dao.RentACarObjectDAO;

@Path("/objects")
public class RentACarObjectService {
	@Context
	ServletContext ctx;
	
	public RentACarObjectService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("ObjectDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("ObjectDAO", new RentACarObjectDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> getAllObjects(){
		RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public RentACarObject getObjectById(@PathParam("id") String id){
		RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
		return dao.getById(id);
	}
	
	@GET
	@Path("/findCar/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Vehicle getCarById(@PathParam("id") String id){
		String[] idParts = id.split("_");
	    if (idParts.length != 2) {
	    	System.out.println("nesto nije dobro");
	        return null;
	    }
	    
	    String carId = idParts[0];
	    String idObject = idParts[1];
		System.out.println("id vozila:"+carId+"IdObjekta"+idObject);
		RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
		Vehicle v=dao.getCarById(idObject,carId);
		if(v!=null) {
			System.out.println("Vozilo uspesno pronadeno");
			return v;
		}
		System.out.println("Vozilo NIJE pronadeno");
		return null;
	}
	
	@GET
	@Path("/carAvailable/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean changeCarStatusToAvailable(@PathParam("id") String id){

	    String[] idParts = id.split("_");
	    String objectId = idParts[0];
	    String carId = idParts[1];
	    
		System.out.println("Objectid: " + objectId);
		System.out.println("CarId: "+ carId);
		RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
		Boolean b= dao.vehicleAvailable(objectId,carId);
		System.out.println("Taken enabled: "+b);
        return b;
	}
	
	@GET
	@Path("/carRented/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Boolean changeCarStatusToRented(@PathParam("id") String id){

	    String[] idParts = id.split("_");
	    String objectId = idParts[0];
	    String carId = idParts[1];
	    
		System.out.println("Objectid: " + objectId);
		System.out.println("CarId: "+ carId);
		RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
		Boolean b= dao.vehicleRented(objectId,carId);
		System.out.println("Taken enabled: "+b);
        return b;
	}
}
