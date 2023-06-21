package dao;

import java.util.ArrayList;

import beans.Location;
import beans.RentACarObject;
import beans.User;
import beans.Vehicle;
import enums.CarStatus;
import enums.FuelType;
import enums.RentACarStatus;
import enums.StickType;
import enums.VehicleType;

public class RentACarObjectDAO {
	private ArrayList<RentACarObject> objects = new ArrayList<>();

	public RentACarObjectDAO() {
		Vehicle vehicle1 = new Vehicle("1", "Honda", "ne znam sad", 10000, VehicleType.Car, "1", StickType.Automatic, FuelType.Diesel, 15, 5, 5, "lepa kola","", CarStatus.Available);
		Vehicle vehicle2 = new Vehicle("2", "Golfic", "ne znam sad", 2002, VehicleType.Car, "2", StickType.Manual, FuelType.Diesel, 11, 5, 4, "lepa kola","", CarStatus.Available);
		Vehicle vehicle3 = new Vehicle("3", "Audi", "ne znam sad", 12000, VehicleType.Car, "1", StickType.Manual, FuelType.Diesel, 12, 4, 5, "lepa kola", "",CarStatus.Available);
		Vehicle vehicle4 = new Vehicle("4", "BrzaKola", "ne znam sad", 20000, VehicleType.Van, "1", StickType.Automatic, FuelType.Diesel, 13, 4, 5, "lepa kola","", CarStatus.Available);
		Vehicle vehicle5 = new Vehicle("5", "Tojota", "ne znam sad", 50000, VehicleType.MobileHome, "1", StickType.Manual, FuelType.Diesel, 15, 5, 16, "lepa kola","", CarStatus.Available);
		RentACarObject object1 = new RentACarObject("1", "Kod Milana", new ArrayList<Vehicle>(), RentACarStatus.Open, new Location("1", "22", "23", "Super"), 5);
		RentACarObject object2 = new RentACarObject("2", "Djordjevic", new ArrayList<Vehicle>(), RentACarStatus.Closed, new Location("2", "233", "23", "Super"), 3);
	
		ArrayList<Vehicle> cars = new ArrayList<Vehicle>();
		cars.add(vehicle1);
		cars.add(vehicle3);
		cars.add(vehicle4);
		cars.add(vehicle5);
		
		object1.setAvailableCars(cars);
		
		ArrayList<Vehicle> cars1 = new ArrayList<Vehicle>();
		cars1.add(vehicle2);
		
		object2.setAvailableCars(cars1);
		
		objects.add(object2);
		objects.add(object1);
		
	}
	
	public RentACarObject getById(String id) {
        for (RentACarObject object : objects) {
            if (object.getId().equals(id)) {
                return object;
            }
        }
        return null;
    }
	
	public ArrayList<RentACarObject> findAll() {
		ArrayList<RentACarObject> sortedObjects = new ArrayList<>();
		for(RentACarObject o : objects) {
			if(o.getStatus().equals(RentACarStatus.Open)) {
				sortedObjects.add(o);
			}
		}
		
		for(RentACarObject o : objects) {
			if(o.getStatus().equals(RentACarStatus.Closed)) {
				sortedObjects.add(o);
			}
		}
		
		return sortedObjects;
	}
	
}
