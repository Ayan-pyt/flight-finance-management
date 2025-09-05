// import React, { useState, useEffect, useCallback } from 'react';
// import './BudgetManagement.css';
// import API from '../api';

// const BudgetManagement = () => {
//     const currentYear = new Date().getFullYear().toString();
//     const [fiscalYear, setFiscalYear] = useState(currentYear);
//     const [totalAmount, setTotalAmount] = useState('');
//     const [currentBudget, setCurrentBudget] = useState(null);
//     const [message, setMessage] = useState({ text: '', type: '' });
//     const [isLoading, setIsLoading] = useState(false);

//     const getToken = () => {
//         return localStorage.getItem('token');
//     };

//     const fetchBudget = useCallback(async (year) => {
//         setIsLoading(true);
//         const token = getToken();
//         if (!token) {
//             setMessage({ text: 'Authentication error. Please log in again.', type: 'error' });
//             setIsLoading(false);
//             return;
//         }
//         try {
//             const headers = { 'Authorization': `Bearer ${token}` };
//             // FIXED: Removed the extra '/api' from the path
//             const response = await API.get(`/budget/${year}`, { headers });
            
//             setCurrentBudget(response.data.data);
//             setMessage({ text: '', type: '' });
//         } catch (error) {
//             console.error('Failed to fetch budget:', error);
//             setCurrentBudget(null);
//             setMessage({ text: `No budget found for ${year}.`, type: 'info' });
//         } finally {
//             setIsLoading(false);
//         }
//     }, []); 

//     useEffect(() => {
//         fetchBudget(currentYear);
//     }, [currentYear, fetchBudget]);

//     const handleYearChange = (e) => {
//         const newYear = e.target.value;
//         setFiscalYear(newYear);
//         if (/^\d{4}$/.test(newYear)) {
//             fetchBudget(newYear);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         const token = getToken();
//         if (!token) {
//             setMessage({ text: 'Authentication error. Please log in again.', type: 'error' });
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const headers = { 'Authorization': `Bearer ${token}` };
//             const data = { fiscalYear, totalAmount: Number(totalAmount) };
//             // FIXED: Removed the extra '/api' from the path
//             const response = await API.post('/budget', data, { headers });

//             setCurrentBudget(response.data.data);
//             setMessage({ text: `Budget for ${fiscalYear} saved successfully!`, type: 'success' });
//             setTotalAmount('');
//         } catch (error) {
//             console.error('Failed to set budget:', error);
//             const errorMessage = error.response?.data?.error || error.message;
//             setMessage({ text: `Error: ${errorMessage}`, type: 'error' });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 2,
//         }).format(amount);
//     };

//     return (
//         <div className="budget-card">
//             <h2>Budget Management</h2>
//             <p className="subtitle">Set and view the budget for a fiscal year.</p>

//             <form onSubmit={handleSubmit} className="budget-form">
//                 <div className="form-group">
//                     <label htmlFor="fiscalYear">Fiscal Year</label>
//                     <input
//                         type="text"
//                         id="fiscalYear"
//                         value={fiscalYear}
//                         onChange={handleYearChange}
//                         placeholder="e.g., 2025"
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="totalAmount">Total Budget Amount ($)</label>
//                     <input
//                         type="number"
//                         id="totalAmount"
//                         value={totalAmount}
//                         onChange={(e) => setTotalAmount(e.target.value)}
//                         placeholder="e.g., 500000"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="submit-btn" disabled={isLoading}>
//                     {isLoading ? 'Saving...' : 'Save Budget'}
//                 </button>
//             </form>

//             {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

//             <div className="budget-display">
//                 <h3>Current Status for {fiscalYear}</h3>
//                 {isLoading && !currentBudget ? (
//                     <p>Loading...</p>
//                 ) : currentBudget ? (
//                     <p className="budget-amount">{formatCurrency(currentBudget.totalAmount)}</p>
//                 ) : (
//                     <p>No budget data available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BudgetManagement;





// File: /src/components/BudgetManagement.js

import React, { useState, useEffect, useCallback } from 'react';
import './BudgetManagement.css';
import API from '../api';

const BudgetManagement = () => {
    const currentYear = new Date().getFullYear().toString();
    const [fiscalYear, setFiscalYear] = useState(currentYear);
    const [totalAmount, setTotalAmount] = useState('');
    const [currentBudget, setCurrentBudget] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    // --- START OF FIX 1 ---
    // CORRECTED: This function now correctly retrieves the token from the 'userInfo' object.
    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo).token : null;
    };
    // --- END OF FIX 1 ---

    const fetchBudget = useCallback(async (year) => {
        setIsLoading(true);
        const token = getToken();
        if (!token) {
            setMessage({ text: 'Authentication error. Please log in again.', type: 'error' });
            setIsLoading(false);
            return;
        }
        try {
            const headers = { 'Authorization': `Bearer ${token}` };
            
            // --- START OF FIX 2 ---
            // CORRECTED: Added the required '/api' prefix to the URL.
            const response = await API.get(`/api/budget/${year}`, { headers });
            // --- END OF FIX 2 ---
            
            setCurrentBudget(response.data.data);
            setMessage({ text: '', type: '' });
        } catch (error) {
            console.error('Failed to fetch budget:', error);
            setCurrentBudget(null);
            setMessage({ text: `No budget found for ${year}.`, type: 'info' });
        } finally {
            setIsLoading(false);
        }
    }, []); 

    useEffect(() => {
        fetchBudget(currentYear);
    }, [currentYear, fetchBudget]);

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        setFiscalYear(newYear);
        if (/^\d{4}$/.test(newYear)) {
            fetchBudget(newYear);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const token = getToken();
        if (!token) {
            setMessage({ text: 'Authentication error. Please log in again.', type: 'error' });
            setIsLoading(false);
            return;
        }

        try {
            const headers = { 'Authorization': `Bearer ${token}` };
            const data = { fiscalYear, totalAmount: Number(totalAmount) };

            // --- START OF FIX 3 ---
            // CORRECTED: Added the required '/api' prefix to the URL.
            const response = await API.post('/api/budget', data, { headers });
            // --- END OF FIX 3 ---

            setCurrentBudget(response.data.data);
            setMessage({ text: `Budget for ${fiscalYear} saved successfully!`, type: 'success' });
            setTotalAmount('');
        } catch (error) {
            console.error('Failed to set budget:', error);
            const errorMessage = error.response?.data?.message || error.message;
            setMessage({ text: `Error: ${errorMessage}`, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <div className="budget-card">
            <h2>Budget Management</h2>
            <p className="subtitle">Set and view the budget for a fiscal year.</p>

            <form onSubmit={handleSubmit} className="budget-form">
                <div className="form-group">
                    <label htmlFor="fiscalYear">Fiscal Year</label>
                    <input
                        type="text"
                        id="fiscalYear"
                        value={fiscalYear}
                        onChange={handleYearChange}
                        placeholder="e.g., 2025"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="totalAmount">Total Budget Amount ($)</label>
                    <input
                        type="number"
                        id="totalAmount"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        placeholder="e.g., 500000"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Budget'}
                </button>
            </form>

            {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

            <div className="budget-display">
                <h3>Current Status for {fiscalYear}</h3>
                {isLoading && !currentBudget ? (
                    <p>Loading...</p>
                ) : currentBudget ? (
                    <p className="budget-amount">{formatCurrency(currentBudget.totalAmount)}</p>
                ) : (
                    <p>No budget data available.</p>
                )}
            </div>
        </div>
    );
};

export default BudgetManagement;