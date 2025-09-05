// // File: frontend/src/components/AdminFeedbackView.js

// import React, { useState, useEffect } from 'react';
// import API from '../api';
// import { Star, User, Mail, Plane } from 'lucide-react';

// const AdminFeedbackView = () => {
//     const [feedbacks, setFeedbacks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     const getToken = () => {
//         const userInfo = localStorage.getItem('userInfo');
//         return userInfo ? JSON.parse(userInfo).token : null;
//     };

//     useEffect(() => {
//         const fetchFeedbacks = async () => {
//             const token = getToken();
//             if (!token) {
//                 setError("Admin authentication required.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 // This GET request is protected by your admin middleware on the backend
//                 const response = await API.get('/api/feedback', {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 if (response.data?.success) {
//                     setFeedbacks(response.data.data);
//                 }
//             } catch (err) {
//                 setError("Failed to fetch feedback. You may not have admin rights.");
//                 console.error("Error fetching feedback:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFeedbacks();
//     }, []);

//     const RatingStars = ({ rating }) => (
//         <div className="flex">
//             {[...Array(5)].map((_, i) => (
//                 <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
//             ))}
//         </div>
//     );

//     if (loading) return <p className="text-center p-6">Loading feedback...</p>;
//     if (error) return <p className="text-center text-red-500 p-6">{error}</p>;

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             <div className="max-w-4xl mx-auto">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">User Feedback</h1>
//                 {feedbacks.length === 0 ? (
//                     <p className="text-gray-500">No feedback has been submitted yet.</p>
//                 ) : (
//                     <div className="space-y-4">
//                         {feedbacks.map((item) => (
//                             <div key={item._id} className="bg-white rounded-lg shadow p-5">
//                                 <div className="flex justify-between items-start">
//                                     <RatingStars rating={item.rating} />
//                                     <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</span>
//                                 </div>
//                                 <p className="text-gray-700 my-3">{item.feedback}</p>
//                                 <div className="border-t pt-3 mt-3 flex items-center justify-between text-sm text-gray-500">
//                                     <div className="flex items-center">
//                                         <User size={14} className="mr-2" /> {item.name} (<Mail size={14} className="inline-block mx-1" />{item.email})
//                                     </div>
//                                     {item.flightNumber && (
//                                         <div className="flex items-center">
//                                             <Plane size={14} className="mr-2" /> {item.flightNumber}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AdminFeedbackView;



// File: frontend/src/components/AdminFeedbackView.js

// File: frontend/src/components/AdminFeedbackView.js

import React, { useState, useEffect } from 'react';
import API from '../api';
import { Star, User, Mail, Plane } from 'lucide-react';

const AdminFeedbackView = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getToken = () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo).token : null;
    };

    useEffect(() => {
        const fetchFeedbacks = async () => {
            const token = getToken();
            if (!token) {
                setError("Admin authentication required.");
                setLoading(false);
                return;
            }

            try {
                const response = await API.get('/api/feedback', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.data?.success) {
                    setFeedbacks(response.data.data);
                }
            } catch (err) {
                setError("Failed to fetch feedback. You may not have admin rights.");
                console.error("Error fetching feedback:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const RatingStars = ({ rating }) => (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
            ))}
        </div>
    );

    if (loading) return <p className="text-center p-6">Loading feedback...</p>;
    if (error) return <p className="text-center text-red-500 p-6">{error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">User Feedback</h1>
                {feedbacks.length === 0 ? (
                    <p className="text-gray-500">No feedback has been submitted yet.</p>
                ) : (
                    <div className="space-y-4">
                        {feedbacks.map((item) => (
                            <div key={item._id} className="bg-blue-50 rounded-lg shadow p-5">
                                <div className="flex justify-between items-start">
                                    <RatingStars rating={item.rating} />
                                    <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</span>
                                </div>
                                {/* --- START OF FIX --- */}
                                {/* CORRECTED: Added the 'font-semibold' class to make the feedback text bold. */}
                                <p className="text-gray-800 my-3 font-semibold">{item.feedback}</p>
                                {/* --- END OF FIX --- */}
                                <div className="border-t pt-3 mt-3 flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <User size={14} className="mr-2" /> {item.name} (<Mail size={14} className="inline-block mx-1" />{item.email})
                                    </div>
                                    {item.flightNumber && (
                                        <div className="flex items-center">
                                            <Plane size={14} className="mr-2" /> {item.flightNumber}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFeedbackView;