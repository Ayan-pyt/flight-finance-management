import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming your backend is running on port 5000
const API_URL = 'http://localhost:5000/api/fuelcosts';

const FuelCostDashboard = () => {
    const [fuelCosts, setFuelCosts] = useState([]);
    const [formData, setFormData] = useState({ fuelType: '', cost: '', liters: '' });
    const [error, setError] = useState(null);

    // Function to fetch all fuel costs from the backend
    const fetchFuelCosts = async () => {
        try {
            const response = await axios.get(API_URL);
            setFuelCosts(response.data.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching fuel costs:', error);
            setError('Failed to fetch fuel costs.');
        }
    };

    // Fetch data when the component first loads
    useEffect(() => {
        fetchFuelCosts();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, formData);
            setFormData({ fuelType: '', cost: '', liters: '' }); // Clear form
            fetchFuelCosts(); // Refresh the list
            setError(null);
        } catch (error) {
            console.error('Error submitting fuel cost:', error);
            setError('Failed to add fuel cost.');
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Fuel Cost Management</h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> {error}</span>
                </div>
            )}

            {/* Form to add a new fuel cost */}
            <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="fuelType" className="block text-gray-700 text-sm font-bold mb-2">Fuel Type:</label>
                        <input
                            type="text"
                            id="fuelType"
                            name="fuelType"
                            placeholder="Jet A-1"
                            value={formData.fuelType}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="cost" className="block text-gray-700 text-sm font-bold mb-2">Cost:</label>
                        <input
                            type="number"
                            id="cost"
                            name="cost"
                            placeholder="100.00"
                            value={formData.cost}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label htmlFor="liters" className="block text-gray-700 text-sm font-bold mb-2">Liters:</label>
                        <input
                            type="number"
                            id="liters"
                            name="liters"
                            placeholder="1000"
                            value={formData.liters}
                            onChange={handleInputChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </div>
                <button type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                    Add Fuel Cost
                </button>
            </form>

            {/* Display the list of fuel costs */}
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Fuel Costs</h3>
            {fuelCosts.length === 0 ? (
                <p className="text-gray-500">No fuel costs recorded yet.</p>
            ) : (
                <ul className="list-disc pl-5">
                    {fuelCosts.map((cost) => (
                        <li key={cost._id} className="mb-2">
                            <strong className="font-bold text-gray-700">{cost.fuelType}</strong> - ${cost.cost} ({cost.liters} liters) on {new Date(cost.date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FuelCostDashboard;  