import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navebar from '../components/Navebar';

export default function MyOrders() { // Name your component
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            alert("User not logged in");
            return; // Exit if user is not logged in 
        }

        try {
            const response = await fetch("http://localhost:5000/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail }),
            });
            const data = await response.json();
            setOrderData(data); // Ensure data is in the expected format
        } catch (err) {
            console.error("Error fetching orders:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <Navebar />
            <div className='container'>
                <div className='row'>
                    {orderData.length > 0 ? orderData.map(data => (
                        data.orderData?.order_data?.slice(0).reverse().map(arrayData => (
                            <div key={arrayData.id}> {/* Assuming arrayData has a unique id */}
                                {arrayData.Order_date && (
                                    <div className='m-auto mt-5'>
                                        <div>{arrayData.Order_date}</div>
                                        <hr />
                                    </div>
                                )}
                                <div className='col-12 col-md-6 col-lg-3'>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{arrayData.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>{arrayData.qty}</span>
                                                <span className='m-1'>{arrayData.size}</span>
                                                <div className=' d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{arrayData.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )) : "First Order Something Please"}
                </div>
                <Footer />
            </div>
        </>
    );
}

