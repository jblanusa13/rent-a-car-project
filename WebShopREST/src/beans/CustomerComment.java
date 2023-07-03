package beans;

import enums.CommentStatus;

public class CustomerComment {
	private String id;
	private User customer;
	private RentACarObject object;
	private int grade;
	private CommentStatus status;
	private String comment;
	public CustomerComment() {
		super();
	}
	
	public CustomerComment(String id, User customer, RentACarObject object, int grade, CommentStatus status,
			String comment) {
		super();
		this.id = id;
		this.customer = customer;
		this.object = object;
		this.grade = grade;
		this.status = status;
		this.comment = comment;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public User getCustomer() {
		return customer;
	}
	public void setCustomer(User customer) {
		this.customer = customer;
	}
	public RentACarObject getObject() {
		return object;
	}
	public void setObject(RentACarObject object) {
		this.object = object;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	public CommentStatus getStatus() {
		return status;
	}
	public void setStatus(CommentStatus status) {
		this.status = status;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	
}
