"use client"
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaCalendarAlt, FaTruck, FaBoxOpen, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import type { OrderLineItem, UserOrder } from '@/types';

export default function UserOrders({ item }: { item: UserOrder }) {

    const [isVisible, setIsVisible] = useState(true);

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="max-w-4xl mx-auto my-8 px-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-green-100/50">
                {/* Header - Green Gradient */}
                <div className="bg-gradient-to-r from-green-700 to-green-500 px-6 py-5">
                    <div className="flex flex-wrap justify-between items-center text-white gap-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <FaBoxOpen className="text-xl" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-xl">Order #{item?.id}</span>
                                    <span className="bg-green-400/30 backdrop-blur-sm px-3 py-0.5 rounded-full text-xs font-semibold tracking-wide">{item?.isPaid ? "Paid" : "Processing"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                                    <FaCalendarAlt className="text-green-200" />
                                    <span>{new Date(item?.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black">{item?.totalOrderPrice} <span className="text-lg font-semibold">EGP</span></div>
                            <div className="text-xs text-green-100">Total Amount</div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {/* Order Details Toggle */}
                    <div className="mb-6">
                        <button
                            onClick={handleToggle}
                            className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-all duration-300 group"
                        >
                            <span className="flex items-center gap-3 font-semibold text-gray-700 group-hover:text-green-700">
                                <FaTruck className="text-green-600 text-lg" />
                                Order Details ({item?.cartItems?.length} items)
                            </span>
                            {isVisible ? <FaChevronUp className="text-green-600" /> : <FaChevronDown className="text-green-600" />}
                        </button>

                        {isVisible && (
                            <div className="mt-5 space-y-4 animate-fadeIn">
                                {item?.cartItems?.map((product: OrderLineItem, index: number) => (
                                    <div key={index} className="flex flex-wrap justify-between items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                                            <img src={product?.product?.imageCover} alt={product?.product?.title} className="w-14 h-14 rounded-xl object-cover ring-1 ring-green-100" />
                                            <div>
                                                <p className="font-semibold text-gray-800">{product?.product?.title}</p>
                                                <p className="text-xs text-gray-400">Qty: {product?.count}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-800">{product?.price * product?.count} EGP</p>
                                            <p className="text-xs text-gray-400">{product?.price} EGP / each</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 mb-6 border border-green-100">
                        <div className="flex items-center gap-2 text-green-800 font-bold mb-3">
                            <FaMapMarkerAlt className="text-green-600" />
                            <span>Delivery Address</span>
                        </div>
                        <div className="text-gray-700 text-sm space-y-1">
                            <p className="font-semibold">{item?.shippingAddress.name}</p>
                            <p>{item?.shippingAddress?.details}, {item?.shippingAddress.city}, مصر</p>
                            <p dir="ltr" className="text-green-700">📞 {item?.shippingAddress.phone}</p>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-2xl p-5 border-2 border-green-100 shadow-sm">
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium">{item?.totalOrderPrice} EGP</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-semibold">{item?.shippingPrice} EGP</span>
                            </div>
                            <div className="border-t border-green-100 my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-800 text-lg">Total</span>
                                <div className="text-right">
                                    <span className="font-black text-2xl text-green-700">{item?.totalOrderPrice + item?.shippingPrice}</span>
                                    <span className="font-semibold text-green-600 ml-1">EGP</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-green-600 bg-green-50 py-2 rounded-xl">
                            <FaCheckCircle />
                            <span>Cash on delivery available</span>
                        </div>
                    </div>

                    {/* Toggle Button Bottom */}
                    <div className="flex justify-end mt-5">
                        <button
                            onClick={handleToggle}
                            className="flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900 bg-green-50 hover:bg-green-100 px-4 py-2 rounded-full transition-all"
                        >
                            {isVisible ? <FaEyeSlash /> : <FaEye />}
                            {isVisible ? 'Hide Details' : 'Show Details'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
