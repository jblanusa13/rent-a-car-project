package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import beans.UserCredentials;
import dao.UserDAO;

@Path("/logIn")
public class LogInService {

	@Context
	ServletContext ctx;

	public LogInService() {
		super();
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO());
		}
	}
	
	@POST
	@Path("/authenticate")
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
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
	}
}
