import React from "react";

function Home() {
    return (
        <div className="min-h-[800px] bg-secondary p-6">

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondaryText">Admin HomePage</h1>
                <p className="text-primary">Welcome back, Administrator</p>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-4 gap-4 mb-8">

                <div className="bg-white p-6 rounded-lg shadow-md border border-nav_border_color">
                    <h3 className="text-secondaryText mb-2 font-semibold">Total Users</h3>
                    <p className="text-2xl font-bold text-primary">1,234</p>
                    <span className="text-green_border text-sm">↑ 12% from last month</span>
                </div>


                <div className="bg-white p-6 rounded-lg shadow-md border border-nav_border_color">
                    <h3 className="text-secondaryText mb-2 font-semibold">Active Sessions</h3>
                    <p className="text-2xl font-bold text-primary">89</p>
                    <span className="text-danger text-sm">↓ 5% from yesterday</span>
                </div>


                <div className="bg-white p-6 rounded-lg shadow-md border border-nav_border_color">
                    <h3 className="text-secondaryText mb-2 font-semibold">System Health</h3>
                    <p className="text-2xl font-bold text-primary">98%</p>
                    <span className="text-green_border text-sm">All systems operational</span>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-nav_border_color">
                    <h3 className="text-secondaryText mb-2 font-semibold">Pending Tickets</h3>
                    <p className="text-2xl font-bold text-primary">23</p>
                    <span className="text-danger text-sm">5 urgent tickets</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-nav_border_color mb-8">
                <h2 className="text-xl font-bold text-secondaryText mb-4">Recent Activity</h2>
                <ul className="space-y-4">
                    <li className="flex items-center justify-between border-b border-nav_border_color pb-2">
                        <span className="text-secondaryText">New user registration</span>
                        <span className="text-sm text-secondaryText">2 min ago</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-nav_border_color pb-2">
                        <span className="text-secondaryText">System update completed</span>
                        <span className="text-sm text-secondaryText">1 hour ago</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-nav_border_color pb-2">
                        <span className="text-secondaryText">Database backup successful</span>
                        <span className="text-sm text-secondaryText">4 hours ago</span>
                    </li>
                </ul>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <button className="bg-primary text-primaryText p-4 rounded-lg hover:bg-hover_button transition-colors shadow-md border border-nav_border_color">
                    Generate Reports
                </button>
                <button className="bg-primary text-primaryText p-4 rounded-lg hover:bg-hover_button transition-colors shadow-md border border-nav_border_color">
                    Manage Users
                </button>
            </div>

            <div className="mt-8 p-4 bg-white rounded-lg shadow-md border border-nav_border_color">
                <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-green_border"></div>
                    <span className="text-secondaryText">All systems operational</span>
                </div>
            </div>
        </div>
    );
}

export default Home;