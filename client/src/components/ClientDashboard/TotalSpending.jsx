import React from "react";

function TotalSpending() {
    return (
        <div className="bg-gradient-to-r from-primary/60 to-primary/90 text-white p-6 rounded-xl mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Total Spendings</h2>
            <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold">Rs. 606940</span>
                <button className="ml-auto bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
                    View All Transactions
                </button>
            </div>
        </div>
    );
}

export default TotalSpending;
