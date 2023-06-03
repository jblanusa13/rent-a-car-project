package beans;

import enums.CustomerTypes;

public class CustomerType {
    private CustomerTypes typeName;
    private double discount;
    private int requiredPoints;
    
    public CustomerType() {
		super();
	}

	public CustomerType(CustomerTypes typeName, double discount, int requiredPoints) {
		super();
		this.typeName = typeName;
		this.discount = discount;
		this.requiredPoints = requiredPoints;
	}

	public CustomerTypes getTypeName() {
        return typeName;
    }

    public void setTypeName(CustomerTypes typeName) {
        this.typeName = typeName;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public int getRequiredPoints() {
        return requiredPoints;
    }

    public void setRequiredPoints(int requiredPoints) {
        this.requiredPoints = requiredPoints;
    }
}

