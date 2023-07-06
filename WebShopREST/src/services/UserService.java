package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

import beans.Manager;
import beans.RentACarObject;
import beans.ShoppingCart;
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
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("UserDAO", new UserDAO(contextPath));
		}
	}
	
	@PUT
    @Path("/update/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(@PathParam("id") String id, UserRegistration updatedUser) {
        UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
        System.out.println("Korisnik se updejtuje");
        Boolean b=dao.updateUserForm(id,updatedUser);
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
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.getBirthDate(id);
	}
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticateUser(UserCredentials credentials) {
	    String username = credentials.getUsername();
	    String password = credentials.getPassword();
	    
	    UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
	    User user = dao.getRegisteringUser(username, password);
	    
	    if (user != null) {
	        return Response.ok().entity(user).build();
	    } else {
	        return Response.status(Response.Status.NOT_FOUND).build();
	    }
	}
	
	@GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public UserRegistration getUserRegById(@PathParam("id") String id) {
		System.out.println("Trazi korisnika po id");
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
        UserRegistration user = dao.getUserRegistrationById(id);
        if (user != null) {
        	System.out.println("User found");
            return user;
        } else {
        	System.out.println("An error occurred while finding the user");
            return null;
        }
    }
	
	@POST
	@Path("/register/{type}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User registerUser(@PathParam("type") String type, UserRegistration userRegistration) {
		System.out.println("Registrovanje korisnika u register servisu");
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		User user = dao.registerUser(userRegistration, type);
		if(user!=null) {
			System.out.println("Korisnik JESTE registrovan");
			return user;
		}
		else {
			System.out.println("Korisnik NIJE registrovan");
            return null;
		}	
	}
	
	@GET
	@Path("/managerObject/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String getMnagerObjectId(@PathParam("id") String id) {
		System.out.println("TRAZI ID OBJEKTA");
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
        String o = dao.getMnagerObjectId(id);
        if (o != null) {
        	System.out.println("ID JE:"+o);
            return o;
        } else {
        	System.out.println("An error occurred while finding the manager rentacar object id");
            return "1";
        }
    }
	
	@GET
	@Path("/allUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<User> getAllUsers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.findAll();
    }
	
	@GET
	@Path("/managers")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Manager> getAvailableManagers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		System.out.println("Trazi u servisu menadzere");
		return dao.getAvailableManagers();
    }
	
	@PUT
    @Path("/setManagerObject/{managerId}")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public String setObjectForManager(@PathParam("managerId") String managerId, RentACarObject object) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		System.out.println("Usao u servis za menadzera");
		System.out.println(managerId);
		System.out.println(object.getId());
		return dao.setManagerObject(managerId, object);
	}
	
	@POST
    @Path("/addShoppingCart/{id}")
	@Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUserShoppingCart(@PathParam("id") String id, ShoppingCart cart) {
        UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
        System.out.println("Korisnik se updejtuje");
        Boolean b=dao.updateUserShoppingCart(id,cart);
        if (b) {
        	System.out.println("Korisnik updejtovan, dodata korpa");
            return Response.ok().build();
        } else {
        	System.out.println("Korisnik NIJE updejtovan, nema korpe");
            return Response.status(Response.Status.NOT_FOUND).build();
        }
	}
	

	@GET
	@Path("/getShoppingCart/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public ShoppingCart getShoppingCart(@PathParam("id") String id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
	    System.out.println("Finding shoppingCart from customer with id:"+id);
	    ShoppingCart cart = dao.findCart(id);
	    if (cart!=null) {
	        return cart;
	    } else {
	        System.out.println("No carts found for this customer with this id.");
	        return null;
	    }
	}
	@POST
	@Path("/customerPointsLoss/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User customerPointsLoss(@PathParam("id") String id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		System.out.println("Service received id : " + id);

		    String[] idParts = id.split("_");
		    String userId = idParts[0];
		    int points = Integer.parseInt(idParts[1]);
		    
		System.out.println("New number of points to be added: " + points);
		System.out.println("Service recived id of user:"+userId);
		System.out.println("New number of points to be added:"+points);
		User user= dao.userPointsChange(userId, points, false);
        if (user!=null) {
        	System.out.println("Porudzbina updejtovana: dodati bodovi");
            return user;
        } else {
        	System.out.println("Porudzbina NIJE updejtovana: rejected");
            return null;
        }
    }
	
	@POST
	@Path("/customerPointsGain/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User customerPointsGain(@PathParam("id") String id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		System.out.println("Service received id : " + id);

		    String[] idParts = id.split("_");
		    String userId = idParts[0];
		    int points = Integer.parseInt(idParts[1]);
		    
		System.out.println("New number of points to be added: " + points);
		System.out.println("Service recived id of user:"+userId);
		System.out.println("New number of points to be added:"+points);
		User user= dao.userPointsChange(userId, points, false);
        if (user!=null) {
        	System.out.println("Porudzbina updejtovana: dodati bodovi");
            return user;
        } else {
        	System.out.println("Porudzbina NIJE updejtovana: rejected");
            return null;
        }
    }
	
	@POST
	@Path("/userDeactivated/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User userDeactivated(@PathParam("id") String id) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		System.out.println("Service received id : " + id);
		User user= dao.userDeactivated(id);
        if (user!=null) {
        	System.out.println("User deaktiviran");
            return user;
        } else {
        	System.out.println("User nije deaktiviran");
            return null;
        }
    }
}
