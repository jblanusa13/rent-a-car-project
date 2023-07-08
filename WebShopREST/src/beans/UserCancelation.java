package beans;

public class UserCancelation {
	private String customerId;
	private String date;
	public UserCancelation() {
		super();
	}
	public UserCancelation(String customerId, String date) {
		super();
		this.customerId = customerId;
		this.date = date;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
}
