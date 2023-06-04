package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.RentACarObject;
import dao.RentACarObjectDAO;
import dao.UserDAO;

@Path("/objects")
public class RentACarObjectService {
	@Context
	ServletContext ctx;
	
	public RentACarObjectService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("ObjectDAO") == null) {
			ctx.setAttribute("ObjectDAO", new RentACarObjectDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<RentACarObject> getAllObjects(){
		RentACarObjectDAO dao = (RentACarObjectDAO) ctx.getAttribute("ObjectDAO");
		return dao.findAll();
	}
}
