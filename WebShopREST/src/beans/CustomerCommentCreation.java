package beans;


public class CustomerCommentCreation {

	private User customer;
	private RentACarObject object;
	private int grade;
	private String comment;
	public CustomerCommentCreation() {
		super();
	}
	public CustomerCommentCreation(User customer, RentACarObject object, int grade, String comment) {
		super();
		this.customer = customer;
		this.object = object;
		this.grade = grade;
		this.comment = comment;
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
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	
	
}
