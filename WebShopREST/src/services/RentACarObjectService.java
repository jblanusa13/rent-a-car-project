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
	
	@POST
	@Path("/registerObject")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public RentACarObject registerObject(RentACarObject newObject){
		RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
		RentACarObject object = dao.registerObject(newObject);
		System.out.println("Objekat u servisu: "+object.getId());
		return object;
	}
	
	@PUT
	@Path("/objectsRateSortingAscending")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> sortObjectByRateAscending(ArrayList<RentACarObject> objectsToSort) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Sorting objects by rate (ascending)");
	    if(objectsToSort.isEmpty()) {
	    	System.out.println("LIST IS NULL");
	    }
	    return dao.sortObjectsByRate(false, objectsToSort);
	}
	
	@PUT
	@Path("/objectsRateSortingDescending")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> sortObjectByRateDescending(ArrayList<RentACarObject> objectsToSort) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Sorting objects by rate (descending)");
	    if(objectsToSort == null) {
	    	System.out.println("LIST IS NULL");
	    }
	    return dao.sortObjectsByRate(true, objectsToSort);
	}
	
	@PUT
	@Path("/objectsNameSortingAscending")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> sortObjectByNameAscending(ArrayList<RentACarObject> objectsToSort) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Sorting objects by name (ascending)");
	    return dao.sortObjectsByRate(false, objectsToSort);
	}
	
	@PUT
	@Path("/objectsNameSortingDescending")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> sortObjectByNameDescending(ArrayList<RentACarObject> objectsToSort) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Sorting objects by name (descending)");
	    return dao.sortObjectsByRate(true, objectsToSort);
	}
	
	@PUT
	@Path("/objectsLocationSortingAscending")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> sortObjectByCityAscending(ArrayList<RentACarObject> objectsToSort) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Sorting objects by name (ascending)");
	    return dao.sortObjectsByRate(false, objectsToSort);
	}
	
	@PUT
	@Path("/objectsLocationSortingDescending")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> sortObjectByCityDescending(ArrayList<RentACarObject> objectsToSort) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Sorting objects by name (descending)");
	    return dao.sortObjectsByRate(true, objectsToSort);
	}
	
	@PUT
	@Path("/filterObjects/{stickType}/{fuelType}/{openObject}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> filterObjects(@PathParam("stickType") String stickType,
													@PathParam("fuelType") String fuelType,
													@PathParam("openObject") boolean openObject,
													ArrayList<RentACarObject> objects){
		RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Filter objects");
	    return dao.filterObjects(stickType, fuelType, openObject, objects);
	}
	
	@PUT
	@Path("/searchObjects/{name}/{vehicleType}/{location}/{averageRate}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> searchObjects(@PathParam("name") String name,
													@PathParam("vehicleType") String vehicleType,
													@PathParam("location") String location,
													@PathParam("averageRate") String averageRate,
													ArrayList<RentACarObject> objects){
		RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Search objects");
	    return dao.searchObjects(name, vehicleType, location, averageRate, objects);
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
	
	@PUT
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean deleteObject(@PathParam("id") String id) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Delete object in service");
	    return dao.deleteObject(id);
	}
	
	@PUT
	@Path("/addVehicle/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public RentACarObject addVehicleForObject(@PathParam("id") String id, Vehicle vehicle) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Add object in service");
	    return dao.addVehicleForObject(id, vehicle);
	}
	
	@PUT
	@Path("/updateVehicle/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public RentACarObject updateVehicleForObject(@PathParam("id") String id, Vehicle vehicle) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Update object in service");
	    return dao.updateVehicleForObject(id,vehicle);
	}
	
	@PUT
	@Path("/deleteVehicle/{objectId}/{vehicleId}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public RentACarObject deleteVehicleForObject(@PathParam("objectId") String objectId, @PathParam("vehicleId") String vehicleId) {
	    RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
	    System.out.println("Update object in service");
	    return dao.deleteVehicleForObject(objectId,vehicleId);
	}
}
