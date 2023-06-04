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
public class LogInService {

	@Context
	ServletContext ctx;

	public LogInService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("UserDAO") == null) {
			ctx.setAttribute("UserDAO", new UserDAO());
		}
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User authenticateUser(UserCredentials credentials) {
		String username = credentials.getUsername();
		String password = credentials.getPassword();
		System.out.println(username);
		System.out.println(password);
		UserDAO dao = (UserDAO)ctx.getAttribute("UserDAO");
		return dao.getUser(username, password);	
	}
	
	@GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public UserRegistration getUserRegById(@PathParam("id") String id) {
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
}
