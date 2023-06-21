package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.RentACarObject;
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
}
