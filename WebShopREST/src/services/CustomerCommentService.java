package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.CustomerComment;
import beans.CustomerCommentCreation;
import dao.CustomerCommentDAO;

@Path("/comments")
public class CustomerCommentService {
	
	@Context
	ServletContext ctx;
	
	public CustomerCommentService() {}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("CustomerCommentDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("CustomerCommentDAO", new CustomerCommentDAO(contextPath));
		}
	}
	
	@GET
	@Path("/allComments")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<CustomerComment> getAllComments() {
	    CustomerCommentDAO dao = (CustomerCommentDAO) ctx.getAttribute("CustomerCommentDAO");
	    System.out.println("Finding All Comments");
	    ArrayList<CustomerComment> comments = dao.findAll();
	    if (comments.size() != 0) {
	        return comments;
	    } else {
	        System.out.println("No comments found.");
	        return null;
	    }
	}
	
	@POST
	@Path("/newComment")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String addNewComment(CustomerCommentCreation comment) {
		System.out.println("Dodavanje komentara u servisu");
		CustomerCommentDAO dao = (CustomerCommentDAO) ctx.getAttribute("CustomerCommentDAO");
		String c=dao.createComment(comment);
		if(c!=null) {
			System.out.println("Komentar je napravljen");
			return c;
		}
		else {
			System.out.println("Komentar NIJE napravljen");
            return null;
		}	
	}
	
	@GET
	@Path("/approveComment/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Boolean approveComment(@PathParam("id") String id) {
		CustomerCommentDAO dao = (CustomerCommentDAO) ctx.getAttribute("CustomerCommentDAO");
		System.out.println("Service received comment id: " + id);
		Boolean b = dao.updateStatusToApproved(id);
        if (b) {
        	System.out.println("Comment approved.");
            return true;
        } else {
        	System.out.println("Comment not found or unable to approve.");
            return false;
        }
    }
	
	@GET
	@Path("/rejectComment/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Boolean rejectComment(@PathParam("id") String id) {
		CustomerCommentDAO dao = (CustomerCommentDAO) ctx.getAttribute("CustomerCommentDAO");
		System.out.println("Service received comment id: " + id);
		Boolean b = dao.updateStatusToRejected(id);
        if (b) {
        	System.out.println("Comment rejected.");
            return true;
        } else {
        	System.out.println("Comment not found or unable to reject.");
            return false;
        }
    }
	
	@GET
	@Path("/allApprovedComments/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<CustomerComment> getAllApprovedComments(@PathParam("id") String id) {
	    CustomerCommentDAO dao = (CustomerCommentDAO) ctx.getAttribute("CustomerCommentDAO");
	    System.out.println("Finding All Comments");
	    ArrayList<CustomerComment> comments = dao.findAllApproved(id);
	    if (comments.size() != 0) {
	        return comments;
	    } else {
	        System.out.println("No comments found.");
	        return null;
	    }
	}
	
	@GET
	@Path("/allCommentsInRental/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<CustomerComment> getAllallCommentsInRental(@PathParam("id") String id) {
	    CustomerCommentDAO dao = (CustomerCommentDAO) ctx.getAttribute("CustomerCommentDAO");
	    System.out.println("Finding All Comments");
	    ArrayList<CustomerComment> comments = dao.findAllCommentsInRental(id);
	    if (comments.size() != 0) {
	        return comments;
	    } else {
	        System.out.println("No comments found.");
	        return null;
	    }
	}
}
