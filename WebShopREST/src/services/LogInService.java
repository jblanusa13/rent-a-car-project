package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.User;
import beans.UserCredentials;
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
    public User getUserById(@PathParam("id") String id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
        User user = dao.getUserById(id);
        if (user != null) {
            return user;
        } else {
        	System.out.println("An error occurred while finding the user");
            return null;
        }
    }
	
}
