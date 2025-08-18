// backend/seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import all models
const FuelCost = require('./models/fuelCostModel');
const Salary = require('./models/salaryModel');
const MaintenanceCost = require('./models/maintenanceCostModel');
const OperationalCost = require('./models/operationalCostModel');
const Flight = require('./models/flight');

dotenv.config();

// --- NEW: Expanded Dummy Flight Data ---
const dummyFlights = [
    // August 2025
    { flightNumber: 'SK404', departure: 'CDG', arrival: 'HND', departureTime: new Date('2025-08-22T18:00:00Z'), arrivalTime: new Date('2025-08-23T13:00:00Z'), price: 1450, seatsAvailable: 95 },
    { flightNumber: 'SK110', departure: 'JFK', arrival: 'LAX', departureTime: new Date('2025-08-22T08:30:00Z'), arrivalTime: new Date('2025-08-22T11:30:00Z'), price: 380, seatsAvailable: 78 },
    { flightNumber: 'SK501', departure: 'LHR', arrival: 'DXB', departureTime: new Date('2025-08-23T21:00:00Z'), arrivalTime: new Date('2025-08-24T07:00:00Z'), price: 920, seatsAvailable: 180 },

    // September 2025
    { flightNumber: 'SK101', departure: 'JFK', arrival: 'LHR', departureTime: new Date('2025-09-10T09:00:00Z'), arrivalTime: new Date('2025-09-10T21:00:00Z'), price: 890, seatsAvailable: 150 },
    { flightNumber: 'SK102', departure: 'JFK', arrival: 'LAX', departureTime: new Date('2025-09-10T11:00:00Z'), arrivalTime: new Date('2025-09-10T14:00:00Z'), price: 450, seatsAvailable: 80 },
    { flightNumber: 'SK202', departure: 'LAX', arrival: 'HND', departureTime: new Date('2025-09-12T22:00:00Z'), arrivalTime: new Date('2025-09-13T17:00:00Z'), price: 1300, seatsAvailable: 120 },
    { flightNumber: 'SK303', departure: 'CDG', arrival: 'DXB', departureTime: new Date('2025-09-15T14:30:00Z'), arrivalTime: new Date('2025-09-15T23:00:00Z'), price: 760, seatsAvailable: 200 },
    { flightNumber: 'SK601', departure: 'SYD', arrival: 'SIN', departureTime: new Date('2025-09-18T23:00:00Z'), arrivalTime: new Date('2025-09-19T05:00:00Z'), price: 650, seatsAvailable: 220 },

    // October 2025
    { flightNumber: 'SK701', departure: 'FRA', arrival: 'JFK', departureTime: new Date('2025-10-05T10:00:00Z'), arrivalTime: new Date('2025-10-05T13:00:00Z'), price: 950, seatsAvailable: 160 },
    { flightNumber: 'SK702', departure: 'JFK', arrival: 'FRA', departureTime: new Date('2025-10-05T18:00:00Z'), arrivalTime: new Date('2025-10-06T08:00:00Z'), price: 980, seatsAvailable: 155 },
    { flightNumber: 'SK801', departure: 'AMS', arrival: 'BCN', departureTime: new Date('2025-10-20T07:00:00Z'), arrivalTime: new Date('2025-10-20T09:30:00Z'), price: 250, seatsAvailable: 130 },
];

// Other dummy data (no changes)
const dummyFuelCosts = [{ fuelType: 'Jet A-1', cost: 1.52, liters: 50000, date: new Date('2025-08-01T10:00:00Z'), notes: 'Bulk purchase.' }];
const dummySalaries = [{ employeeName: 'Capt. John Doe', amount: 8500, paymentDate: new Date('2025-07-31T18:00:00Z'), notes: 'July salary.' }];
const dummyMaintenanceCosts = [{ aircraftId: 'N12345', description: 'Engine Check', cost: 15000, date: new Date('2025-08-02T14:00:00Z') }];
const dummyOperationalCosts = [{ category: 'Airport Fees', description: 'Landing Fee at JFK', cost: 7500, airportCode: 'JFK', date: new Date('2025-08-01T10:05:00Z') }];


const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding...');
        // Clear all collections
        await Promise.all([
            FuelCost.deleteMany(),
            Salary.deleteMany(),
            MaintenanceCost.deleteMany(),
            OperationalCost.deleteMany(),
            Flight.deleteMany()
        ]);
        console.log('Existing data cleared...');
        // Insert all data
        await Promise.all([
            FuelCost.insertMany(dummyFuelCosts),
            Salary.insertMany(dummySalaries),
            MaintenanceCost.insertMany(dummyMaintenanceCosts),
            OperationalCost.insertMany(dummyOperationalCosts),
            Flight.insertMany(dummyFlights)
        ]);
        console.log('Dummy data has been successfully imported!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

importData();



