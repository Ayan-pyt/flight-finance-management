// File: frontend/src/components/CustomizedReport.js

import React, { useState, useEffect } from 'react';
import API from '../api';

// --- START OF THE DEFINITIVE FIX ---
// We now import the components directly from the 'recharts' library
// instead of relying on the window object.
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// --- END OF THE DEFINITIVE FIX ---


const CustomizedReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // This getToken function is correct
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo).token : null;
    };

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            const token = getToken();
            if (!token) {
                setError("Admin authentication required.");
                setLoading(false);
                return;
            }
            try {
                const response = await API.get('/api/reports/expense-summary', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.data.success) {
                    const summary = response.data.data;
                    const chartData = [
                        { name: 'Fuel Costs', value: summary.fuel || 0 },
                        { name: 'Salaries', value: summary.salaries || 0 },
                        { name: 'Maintenance', value: summary.maintenance || 0 },
                        { name: 'Operational Costs', value: summary.operational || 0 },
                    ].filter(item => item.value > 0);
                    setReportData(chartData);
                }
            } catch (err) {
                setError("Failed to fetch report data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const totalExpenses = reportData.reduce((sum, entry) => sum + entry.value, 0);

    if (loading) return <p className="p-6 text-center">Generating customized report...</p>;
    if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Customized Expense Report</h1>
                <p className="text-gray-500 mb-6">A visual breakdown of all operational expenses.</p>
                <div className="bg-white rounded-lg shadow-lg p-6" style={{ height: '500px' }}>
                    {totalExpenses > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={reportData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {reportData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No expense data is available to generate a report.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomizedReport;