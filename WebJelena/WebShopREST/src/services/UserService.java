package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.User;
import beans.UserCredentials;
import beans.UserRegistration;
import dao.UserDAO;

@Path("/user")
public class UserService {
	@Context
	ServletContext ctx;
	
	public UserService() {}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("UserDAO") == null) {
			ctx.setAttribute("UserDAO", new UserDAO());
		}
	}
	
	@PUT
    @Path("/update/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(@PathParam("id") String id, UserRegistration updatedUser) {
        UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
        System.out.println("Korisnik se updejtuje");
        Boolean b=dao.updateUser(id,updatedUser);
        if (b) {
        	System.out.println("Korisnik updejtovan");
            return Response.ok().build();
        } else {
        	System.out.println("Korisnik NIJE updejtovan");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
	}
	
	@GET
	@Path("/profile/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUserById(@PathParam("id") String id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
        User user = dao.getById(id);
        if (user != null) {
            return user;
        } else {
        	System.out.println("An error occurred while finding the user");
            return null;
        }
    }
	
	@GET
	@Path("/birthDate/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getUserBirthDate(@PathParam("id") String id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.getBirthDate(id);
	}
}
