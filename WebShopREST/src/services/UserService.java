package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import beans.UserCredentials;
import beans.UserRegistration;
import dao.UserDAO;

@Path("/logIn")
public class UserService {

	@Context
	ServletContext ctx;

	public UserService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("UserDAO") == null) {
			ctx.setAttribute("UserDAO", new UserDAO());
		}
	}
	
	@POST
	@Path("/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticateUser(UserCredentials credentials) {
	    String username = credentials.getUsername();
	    String password = credentials.getPassword();
	    
	    UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
	    User user = dao.getUser(username, password);
	    
	    if (user != null) {
	        return Response.ok().entity(user).build();
	    } else {
	        return Response.status(Response.Status.NOT_FOUND).build();
	    }
	}
	
	@GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public UserRegistration getUserById(@PathParam("id") String id) {
		System.out.println("Trazi korisnika po id");
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
        UserRegistration user = dao.getUserRegistrationById(id);
        if (user != null) {
        	System.out.println("nasao korisnika");
            return user;
        } else {
        	System.out.println("An error occurred while finding the user");
            return null;
        }
    }
	
	@POST
	@Path("/register")
	@Produces(MediaType.APPLICATION_JSON)
	public Response registerUser(UserRegistration userRegistration) {
		System.out.println("Registrovanje korisnika u login servisu");
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		dao.registerUser(userRegistration);
		return Response.ok().build();
	}
	
	@PUT
    @Path("/update/{id}")
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
	
}
