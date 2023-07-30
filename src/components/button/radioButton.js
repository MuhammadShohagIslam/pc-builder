import React from "react";

const RadioButton = () => {
    return (
        <div>
            <div className="flex items-center mb-4">
                <input
                    id="CPU"
                    type="radio"
                    value=""
                    name="product"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  dark:ring-offset-gray-800 focus:ring-2"
                />
                <label
                    htmlFor="CPU"
                    className="ml-2 text-sm font-medium text-gray-900 "
                >
                    CPU
                </label>
            </div>
            <div className="flex items-center">
                <input
                    checked
                    id="Motherboard"
                    type="radio"
                    value=""
                    name="product"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 "
                />
                <label
                    htmlFor="Motherboard"
                    className="ml-2 text-sm font-medium text-gray-900 "
                >
                    Motherboard
                </label>
            </div>
            <div className="flex items-center">
                <input
                    checked
                    id="Power-Supply-Unit"
                    type="radio"
                    value=""
                    name="product"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 "
                />
                <label
                    htmlFor="Power-Supply-Unit"
                    className="ml-2 text-sm font-medium text-gray-900 "
                >
                    Power Supply Unit
                </label>
            </div>
            <div className="flex items-center">
                <input
                    checked
                    id="RAM"
                    type="radio"
                    value=""
                    name="product"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 "
                />
                <label
                    htmlFor="RAM"
                    className="ml-2 text-sm font-medium text-gray-900 "
                >
                    RAM
                </label>
            </div>
            <div className="flex items-center">
                <input
                    checked
                    id="Monitor"
                    type="radio"
                    value=""
                    name="product"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 "
                />
                <label
                    htmlFor="Monitor"
                    className="ml-2 text-sm font-medium text-gray-900 "
                >
                    Monitor
                </label>
            </div>
            <div className="flex items-center">
                <input
                    checked
                    id="Storage-Device"
                    type="radio"
                    value=""
                    name="product"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500   focus:ring-2 "
                />
                <label
                    htmlFor="Storage-Device"
                    className="ml-2 text-sm font-medium text-gray-900 "
                >
                    Storage Device
                </label>
            </div>
        </div>
    );
};

export default RadioButton;
