/* eslint-disable no-unused-vars */
// frontend/src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import API from '../api';
import BudgetManagement from './BudgetManagement';
import FlightManagement from './FlightManagement';

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

  // --- FORM STATES FOR EACH CATEGORY (No changes here) ---
  const [fuelFormData, setFuelFormData] = useState({ fuelType: 'Jet A-1', cost: '', liters: '', notes: '' });
  const [fuelMessage, setFuelMessage] = useState({ text: '', type: '' });
  const [isSubmittingFuel, setIsSubmittingFuel] = useState(false);
  const [salaryFormData, setSalaryFormData] = useState({ employeeName: '', amount: '', paymentDate: new Date().toISOString().split('T')[0], notes: '' });
  const [salaryMessage, setSalaryMessage] = useState({ text: '', type: '' });
  const [isSubmittingSalary, setIsSubmittingSalary] = useState(false);
  const [maintenanceFormData, setMaintenanceFormData] = useState({ aircraftId: '', description: '', cost: '', date: new Date().toISOString().split('T')[0] });
  const [maintenanceMessage, setMaintenanceMessage] = useState({ text: '', type: '' });
  const [isSubmittingMaintenance, setIsSubmittingMaintenance] = useState(false);
  const [operationalFormData, setOperationalFormData] = useState({ category: 'Airport Fees', description: '', airportCode: '', cost: '', date: new Date().toISOString().split('T')[0] });
  const [operationalMessage, setOperationalMessage] = useState({ text: '', type: '' });
  const [isSubmittingOperational, setIsSubmittingOperational] = useState(false);


  // --- LOGIC FUNCTIONS ---

  const getToken = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      return JSON.parse(userInfo).token;
    }
    return null;
  };


  const fetchFuelCosts = async () => {
    try {
      const token = getToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await API.get('/api/fuelcosts', { headers });
      if (response.data?.success) setFuelCosts(response.data.data);
    } catch (err) {
      console.error('Error refreshing fuel costs:', err);
      setFuelMessage({ text: 'Could not refresh fuel cost list.', type: 'error' });
    }
  };

  const handleFuelInputChange = (e) => setFuelFormData({ ...fuelFormData, [e.target.name]: e.target.value });

  const handleFuelSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingFuel(true);
    setFuelMessage({ text: '', type: '' });
    const token = getToken();
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      await API.post('/api/fuelcosts', fuelFormData, { headers });
      setFuelFormData({ fuelType: 'Jet A-1', cost: '', liters: '', notes: '' });
      setFuelMessage({ text: 'Fuel cost added successfully!', type: 'success' });
      fetchFuelCosts();
    } catch (error) {
      console.error('Error submitting fuel cost:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add fuel cost.';
      setFuelMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsSubmittingFuel(false);
    }
  };

  const fetchSalaries = async () => {
    try {
      const token = getToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await API.get('/api/salaries', { headers });
      if (response.data?.success) setSalaries(response.data.data);
    } catch (err) {
      console.error('Error refreshing salaries:', err);
      setSalaryMessage({ text: 'Could not refresh salary list.', type: 'error' });
    }
  };

  const handleSalaryInputChange = (e) => setSalaryFormData({ ...salaryFormData, [e.target.name]: e.target.value });

  const handleSalarySubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingSalary(true);
    setSalaryMessage({ text: '', type: '' });
    const token = getToken();
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      await API.post('/api/salaries', salaryFormData, { headers });
      setSalaryFormData({ employeeName: '', amount: '', paymentDate: new Date().toISOString().split('T')[0], notes: '' });
      setSalaryMessage({ text: 'Salary payment added successfully!', type: 'success' });
      fetchSalaries();
    } catch (error) {
      console.error('Error submitting salary:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add salary payment.';
      setSalaryMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsSubmittingSalary(false);
    }
  };

  const fetchMaintenanceCosts = async () => {
    try {
      const token = getToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await API.get('/api/maintenancecosts', { headers });
      if (response.data?.success) setMaintenanceCosts(response.data.data);
    } catch (err) {
      console.error('Error refreshing maintenance costs:', err);
      setMaintenanceMessage({ text: 'Could not refresh maintenance list.', type: 'error' });
    }
  };

  const handleMaintenanceInputChange = (e) => setMaintenanceFormData({ ...maintenanceFormData, [e.target.name]: e.target.value });

  const handleMaintenanceSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingMaintenance(true);
    setMaintenanceMessage({ text: '', type: '' });
    const token = getToken();
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      await API.post('/api/maintenancecosts', maintenanceFormData, { headers });
      setMaintenanceFormData({ aircraftId: '', description: '', cost: '', date: new Date().toISOString().split('T')[0] });
      setMaintenanceMessage({ text: 'Maintenance cost added successfully!', type: 'success' });
      fetchMaintenanceCosts();
    } catch (error) {
      console.error('Error submitting maintenance cost:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add maintenance cost.';
      setMaintenanceMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsSubmittingMaintenance(false);
    }
  };

  const fetchOperationalCosts = async () => {
    try {
      const token = getToken();
      const headers = { 'Authorization': `Bearer ${token}` };
      const response = await API.get('/api/operationalcosts', { headers });
      if (response.data?.success) setOperationalCosts(response.data.data);
    } catch (err) {
      console.error('Error refreshing operational costs:', err);
      setOperationalMessage({ text: 'Could not refresh operational cost list.', type: 'error' });
    }
  };

  const handleOperationalInputChange = (e) => setOperationalFormData({ ...operationalFormData, [e.target.name]: e.target.value });

  const handleOperationalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingOperational(true);
    setOperationalMessage({ text: '', type: '' });
    const token = getToken();
    try {
      const headers = { 'Authorization': `Bearer ${token}` };
      await API.post('/api/operationalcosts', operationalFormData, { headers });
      setOperationalFormData({ category: 'Airport Fees', description: '', airportCode: '', cost: '', date: new Date().toISOString().split('T')[0] });
      setOperationalMessage({ text: 'Operational cost added successfully!', type: 'success' });
      fetchOperationalCosts();
    } catch (error) {
      console.error('Error submitting operational cost:', error);
      const errorMessage = error.response?.data?.error || 'Failed to add operational cost.';
      setOperationalMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsSubmittingOperational(false);
    }
  };


  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const token = getToken();
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }
        const headers = { Authorization: `Bearer ${token}` };

        // --- ALL API CALLS BELOW HAVE BEEN CORRECTED WITH THE '/api' PREFIX ---
        const [summaryRes, fuelRes, salaryRes, maintenanceRes, operationalRes] = await Promise.all([
          API.get('/api/reports/summary', { headers }),
          API.get('/api/fuelcosts', { headers }),
          API.get('/api/salaries', { headers }),
          API.get('/api/maintenancecosts', { headers }),
          API.get('/api/operationalcosts', { headers })
        ]);

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

  const formatCurrency = (number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  if (loading) return <div className="p-8 text-center">Loading admin data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  const CostTable = ({ title, headers, data, renderRow }) => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b"><h2 className="text-xl font-semibold">{title}</h2></div>
      <div className="p-6">
        {data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>{headers.map(header => (<th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>))}</tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">{data.map(renderRow)}</tbody>
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

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {['dashboard', 'budget', 'fuel costs', 'salaries', 'maintenance', 'operational', 'flight status'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`py-2 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${ activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300' }`}>{tab}</button>
              ))}
            </nav>
          </div>
        </div>

        {/* --- Tab Content --- */}
        
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
        
        {activeTab === 'budget' && ( <BudgetManagement /> )}

        {activeTab === 'flight status' && ( <FlightManagement /> )}

        {activeTab === 'salaries' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800">Employee Salary Management</h2>
            <div className="add-cost-form-container mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Add New Salary Payment</h3>
              <form onSubmit={handleSalarySubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="form-group"><label>Employee Name</label><input type="text" name="employeeName" value={salaryFormData.employeeName} onChange={handleSalaryInputChange} required /></div>
                      <div className="form-group"><label>Amount ($)</label><input type="number" name="amount" value={salaryFormData.amount} onChange={handleSalaryInputChange} required /></div>
                      <div className="form-group"><label>Payment Date</label><input type="date" name="paymentDate" value={salaryFormData.paymentDate} onChange={handleSalaryInputChange} required /></div>
                      <div className="form-group"><label>Notes</label><input type="text" name="notes" value={salaryFormData.notes} onChange={handleSalaryInputChange} /></div>
                  </div>
                  <div className="flex justify-end mt-4"><button type="submit" disabled={isSubmittingSalary}>{isSubmittingSalary ? 'Saving...' : 'Add Salary Payment'}</button></div>
              </form>
              {salaryMessage.text && <div className={`message ${salaryMessage.type} mt-4`}>{salaryMessage.text}</div>}
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Recorded Salary Payments</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th></tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {salaries.length > 0 ? (salaries.map((salary) => (<tr key={salary._id}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(salary.paymentDate)}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{salary.employeeName}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{salary.notes}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 text-right">{formatCurrency(salary.amount)}</td></tr>))) : (<tr><td colSpan="4" className="text-center py-4 text-gray-500">No salary payments recorded yet.</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'fuel costs' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800">Fuel Cost Management</h2>
            <div className="add-cost-form-container mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Add New Fuel Cost</h3>
              <form onSubmit={handleFuelSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="form-group"><label>Fuel Type</label><select name="fuelType" value={fuelFormData.fuelType} onChange={handleFuelInputChange}><option value="Jet A-1">Jet A-1</option><option value="Avgas">Avgas</option></select></div>
                  <div className="form-group"><label>Cost per Liter</label><input type="number" name="cost" value={fuelFormData.cost} onChange={handleFuelInputChange} required /></div>
                  <div className="form-group"><label>Liters</label><input type="number" name="liters" value={fuelFormData.liters} onChange={handleFuelInputChange} required /></div>
                  <div className="form-group"><label>Notes</label><input type="text" name="notes" value={fuelFormData.notes} onChange={handleFuelInputChange} /></div>
                </div>
                <div className="flex justify-end mt-4"><button type="submit" disabled={isSubmittingFuel}>{isSubmittingFuel ? 'Saving...' : 'Add Fuel Cost'}</button></div>
              </form>
              {fuelMessage.text && <div className={`message ${fuelMessage.type} mt-4`}>{fuelMessage.text}</div>}
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Recorded Fuel Costs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fuel Type</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Liters</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Cost/Liter</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total Cost</th></tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fuelCosts.length > 0 ? ( fuelCosts.map((item) => ( <tr key={item._id}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(item.date)}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.fuelType}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{item.liters.toLocaleString()}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(item.cost)}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600 text-right">{formatCurrency(item.cost * item.liters)}</td></tr>))) : (<tr><td colSpan="5" className="text-center py-4 text-gray-500">No fuel costs recorded yet.</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800">Maintenance Cost Management</h2>
            <div className="add-cost-form-container mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Add New Maintenance Cost</h3>
              <form onSubmit={handleMaintenanceSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="form-group"><label>Aircraft ID</label><input type="text" name="aircraftId" value={maintenanceFormData.aircraftId} onChange={handleMaintenanceInputChange} required /></div>
                      <div className="form-group"><label>Description</label><input type="text" name="description" value={maintenanceFormData.description} onChange={handleMaintenanceInputChange} required /></div>
                      <div className="form-group"><label>Cost ($)</label><input type="number" name="cost" value={maintenanceFormData.cost} onChange={handleMaintenanceInputChange} required /></div>
                      <div className="form-group"><label>Date</label><input type="date" name="date" value={maintenanceFormData.date} onChange={handleMaintenanceInputChange} required /></div>
                  </div>
                  <div className="flex justify-end mt-4">
                      <button type="submit" disabled={isSubmittingMaintenance}>{isSubmittingMaintenance ? 'Saving...' : 'Add Maintenance Cost'}</button>
                  </div>
              </form>
              {maintenanceMessage.text && <div className={`message ${maintenanceMessage.type} mt-4`}>{maintenanceMessage.text}</div>}
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Recorded Maintenance Costs</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aircraft ID</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Cost</th></tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {maintenanceCosts.length > 0 ? (maintenanceCosts.map((item) => (<tr key={item._id}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(item.date)}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.aircraftId}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.description}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600 text-right">{formatCurrency(item.cost)}</td></tr>))) : (<tr><td colSpan="4" className="text-center py-4 text-gray-500">No maintenance costs recorded yet.</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        )}
        
        {activeTab === 'operational' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800">Operational Cost Management</h2>
            <div className="add-cost-form-container mt-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Add New Operational Cost</h3>
              <form onSubmit={handleOperationalSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="form-group">
                          <label>Category</label>
                          <select name="category" value={operationalFormData.category} onChange={handleOperationalInputChange}>
                            <option>Airport Fees</option>
                            <option>Ground Handling</option>
                            <option>Navigation Fees</option>
                          </select>
                      </div>
                      <div className="form-group"><label>Description</label><input type="text" name="description" value={operationalFormData.description} onChange={handleOperationalInputChange} required /></div>
                      <div className="form-group"><label>Airport (IATA)</label><input type="text" name="airportCode" value={operationalFormData.airportCode} onChange={handleOperationalInputChange} maxLength="4" /></div>
                      <div className="form-group"><label>Cost ($)</label><input type="number" name="cost" value={operationalFormData.cost} onChange={handleOperationalInputChange} required /></div>
                      <div className="form-group"><label>Date</label><input type="date" name="date" value={operationalFormData.date} onChange={handleOperationalInputChange} required /></div>
                  </div>
                  <div className="flex justify-end mt-4">
                      <button type="submit" disabled={isSubmittingOperational}>{isSubmittingOperational ? 'Saving...' : 'Add Operational Cost'}</button>
                  </div>
              </form>
              {operationalMessage.text && <div className={`message ${operationalMessage.type} mt-4`}>{operationalMessage.text}</div>}
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Recorded Operational Costs</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Airport</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Cost</th></tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {operationalCosts.length > 0 ? (operationalCosts.map((item) => (<tr key={item._id}><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(item.date)}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.category}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.description}</td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.airportCode}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-600 text-right">{formatCurrency(item.cost)}</td></tr>))) : (<tr><td colSpan="5" className="text-center py-4 text-gray-500">No operational costs recorded yet.</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;