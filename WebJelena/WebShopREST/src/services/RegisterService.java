package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.UserRegistration;

import javax.ws.rs.*;

import dao.UserDAO;

@Path("/registerUser")
public class RegisterService {
	@Context
	ServletContext ctx;

	public RegisterService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("UserDAO") == null) {
			ctx.setAttribute("UserDAO", new UserDAO());
		}
	}
	
	@POST
	@Path("/register")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registerUser(UserRegistration userRegistration) {
		System.out.println("Registrovanje korisnika u register servisu");
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		dao.registerUser(userRegistration);
		return Response.ok().build();
	}
}
