// frontend/src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import API from '../api';

function AdminDashboard() {
  // State for the main summary report
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // State for each data table
  const [fuelCosts, setFuelCosts] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [maintenanceCosts, setMaintenanceCosts] = useState([]);
  const [operationalCosts, setOperationalCosts] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch all data concurrently for better performance
        const [summaryRes, fuelRes, salaryRes, maintenanceRes, operationalRes] = await Promise.all([
          API.get('/reports/summary', { headers }),
          API.get('/fuelcosts', { headers }),
          API.get('/salaries', { headers }),
          API.get('/maintenancecosts', { headers }),
          API.get('/operationalcosts', { headers })
        ]);

        // Set state from API responses
        if (summaryRes.data?.success) setSummary(summaryRes.data.data);
        if (fuelRes.data?.success) setFuelCosts(fuelRes.data.data);
        if (salaryRes.data?.success) setSalaries(salaryRes.data.data);
        if (maintenanceRes.data?.success) setMaintenanceCosts(maintenanceRes.data.data);
        if (operationalRes.data?.success) setOperationalCosts(operationalRes.data.data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to fetch admin data. You may not have admin privileges.');
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Helper functions for formatting
  const formatCurrency = (number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  // Loading and error states
  if (loading) return <div className="p-8 text-center">Loading admin data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  // --- Reusable Table Component ---
  const CostTable = ({ title, headers, data, renderRow }) => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b"><h2 className="text-xl font-semibold">{title}</h2></div>
      <div className="p-6">
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map(header => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map(renderRow)}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No data available for this category.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage sensitive flight data and operations</p>
        </div>

        {/* --- Tab Navigation --- */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {['dashboard', 'fuel costs', 'salaries', 'maintenance', 'operational'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* --- Tab Content --- */}
        
        {/* Dashboard Summary View */}
        {activeTab === 'dashboard' && summary && (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6"><h3 className="text-lg font-semibold text-gray-700">Fuel Records</h3><p className="text-3xl font-bold text-blue-600">{summary.fuel.recordCount || 0}</p></div>
                    <div className="bg-white rounded-lg shadow p-6"><h3 className="text-lg font-semibold text-gray-700">Salary Records</h3><p className="text-3xl font-bold text-green-600">{summary.salaries.recordCount || 0}</p></div>
                    <div className="bg-white rounded-lg shadow p-6"><h3 className="text-lg font-semibold text-gray-700">Maintenance Records</h3><p className="text-3xl font-bold text-yellow-600">{summary.maintenance.recordCount || 0}</p></div>
                    <div className="bg-white rounded-lg shadow p-6"><h3 className="text-lg font-semibold text-gray-700">Operational Records</h3><p className="text-3xl font-bold text-purple-600">{summary.operational.recordCount || 0}</p></div>
                </div>
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b"><h2 className="text-xl font-semibold">Financial Summary Report</h2></div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Category</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th></tr></thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Fuel Costs</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(summary.fuel.totalCost)}</td></tr>
                                <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Employee Salaries</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(summary.salaries.totalCost)}</td></tr>
                                <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Maintenance Costs</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(summary.maintenance.totalCost)}</td></tr>
                                <tr><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">Operational Costs</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(summary.operational.totalCost)}</td></tr>
                            </tbody>
                            <tfoot className="bg-gray-100"><tr className="font-bold text-gray-900"><td className="px-6 py-4 text-sm uppercase">Grand Total</td><td className="px-6 py-4 text-sm text-right">{formatCurrency(summary.grandTotal)}</td></tr></tfoot>
                        </table>
                    </div>
                </div>
            </div>
        )}

        {/* --- FIX: Restored Salaries Table --- */}
        {activeTab === 'salaries' && (
          <CostTable
            title="Employee Salary Management"
            headers={['Payment Date', 'Employee Name', 'Notes', 'Amount']}
            data={salaries}
            renderRow={(item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(item.paymentDate)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.employeeName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.notes}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{formatCurrency(item.amount)}</td>
              </tr>
            )}
          />
        )}

        {/* Fuel Costs Table */}
        {activeTab === 'fuel costs' && (
          <CostTable
            title="Fuel Cost Management"
            headers={['Date', 'Fuel Type', 'Liters', 'Cost/Liter', 'Total Cost']}
            data={fuelCosts}
            renderRow={(item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(item.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.fuelType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.liters.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatCurrency(item.cost)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{formatCurrency(item.cost * item.liters)}</td>
              </tr>
            )}
          />
        )}

        {/* Maintenance Costs Table */}
        {activeTab === 'maintenance' && <CostTable title="Maintenance Cost Management" headers={['Date', 'Aircraft ID', 'Description', 'Cost']} data={maintenanceCosts} renderRow={(item) => (<tr key={item._id}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(item.date)}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.aircraftId}</td><td className="px-6 py-4 text-sm text-gray-600">{item.description}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">{formatCurrency(item.cost)}</td></tr>)}/>}
        
        {/* Operational Costs Table */}
        {activeTab === 'operational' && <CostTable title="Operational Cost Management" headers={['Date', 'Category', 'Description', 'Airport', 'Cost']} data={operationalCosts} renderRow={(item) => (<tr key={item._id}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(item.date)}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.category}</td><td className="px-6 py-4 text-sm text-gray-600">{item.description}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.airportCode || 'N/A'}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">{formatCurrency(item.cost)}</td></tr>)}/>}
      </div>
    </div>
  );
}

export default AdminDashboard;
