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

@Path("/user")
public class UserProfileService {

	@Context
	ServletContext ctx;

	public UserProfileService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("UserDAO") == null) {
			ctx.setAttribute("UserDAO", new UserDAO());
		}
	}
	
	@GET
	@Path("/profile/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUserById(@PathParam("id") String id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
        User user = dao.getUserById(id);
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
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getBirthDate(id);
	}
}
