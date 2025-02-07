import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./Layout.jsx";
import {
    Dashboard,
    Home,
    Login,
    Logout,
    Notifications,
    Profile,
    Signup,
    Settings,
    VerifyEmail,
    Kyc,
    SwitchRole,
    Jobs,
    Inbox,
    Following,
    Followers,
    Account,
    Pay,
    PaySuccess,
    PayFailure,
    SingleTransaction,
    Transactions,
} from "./pages/index.js";
import { Protected } from "./components";
import { TagsProvider } from "./contexts/tagContext";

createRoot(document.getElementById("root")).render(
    <TagsProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route
                        path="dashboard"
                        element={
                            <Protected>
                                <Dashboard />
                            </Protected>
                        }
                    />
                    <Route
                        path="notifications"
                        element={
                            <Protected>
                                <Notifications />
                            </Protected>
                        }
                    />
                    <Route path="profile/:userId" element={<Profile />} />
                    <Route
                        path="settings"
                        element={
                            <Protected>
                                <Settings />
                            </Protected>
                        }
                    />
                    <Route
                        path="settings/kyc"
                        element={
                            <Protected>
                                <Kyc />
                            </Protected>
                        }
                    />
                    <Route
                        path="settings/verify-email"
                        element={
                            <Protected>
                                <VerifyEmail />
                            </Protected>
                        }
                    />
                    <Route
                        path="settings/switch-role"
                        element={
                            <Protected>
                                <SwitchRole />
                            </Protected>
                        }
                    />
                    <Route
                        path="settings/account"
                        element={
                            <Protected>
                                <Account />
                            </Protected>
                        }
                    />

                    <Route
                        path="jobs/:jobId"
                        element={
                            <Protected>
                                <Jobs />
                            </Protected>
                        }
                    />
                    <Route
                        path="jobs/:jobId/pay"
                        element={
                            <Protected>
                                <Pay />
                            </Protected>
                        }
                    />

                    <Route
                        path="jobs/transaction/:tId/pay/success"
                        element={
                            <Protected>
                                <PaySuccess />
                            </Protected>
                        }
                    />
                    <Route
                        path="jobs/transaction/:tId/pay/failure"
                        element={
                            <Protected>
                                <PayFailure />
                            </Protected>
                        }
                    />
                    <Route
                        path="all-transactions"
                        element={
                            <Protected>
                                <Transactions />
                            </Protected>
                        }
                    />
                    <Route
                        path="transactions/:tId"
                        element={
                            <Protected>
                                <SingleTransaction />
                            </Protected>
                        }
                    />

                    <Route
                        path="inbox"
                        element={
                            <Protected>
                                <Inbox />
                            </Protected>
                        }
                    />
                    <Route path="following/:userId" element={<Following />} />
                    <Route path="followers/:userId" element={<Followers />} />

                    <Route path="signup" element={<Signup />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </TagsProvider>,
);
