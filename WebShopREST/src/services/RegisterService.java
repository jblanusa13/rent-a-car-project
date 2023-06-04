package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Produces;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.User;
import beans.UserRegistration;
import dao.UserDAO;

@Path("/register")
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
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response registerUser(UserRegistration userRegistration) {
		System.out.println("Registrovanje korisnika");
		System.out.println("Registrovanje korisnika");
		System.out.println("Registrovanje korisnika");
		System.out.println("Registrovanje korisnika");
		System.out.println("Registrovanje korisnika");
		System.out.println("Registrovanje korisnika");
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		dao.registerUser(userRegistration);
		return Response.ok().build();
	}
}
