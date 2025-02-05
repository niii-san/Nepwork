import React from "react";
import { Link } from "react-router";

function TransactionListItem({ transactionData }) {
    const date = new Date(transactionData.paidTime);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const formatUUID = (uuid) => {
        return `${uuid.slice(0, 8)}...${uuid.slice(-12)}`;
    };

    return (
        <Link
            to={`/transactions/${transactionData._id}`}
            style={styles.container}
        >
            <div style={styles.leftSection}>
                <div
                    style={styles.statusIndicator(transactionData.status)}
                ></div>
                <div style={styles.detailsContainer}>
                    <h3 style={styles.amount}>
                        Rs. {transactionData.amount.toLocaleString()}
                    </h3>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Date: </span>
                        <span style={styles.detailText}>
                            {formattedDate} • {formattedTime}
                        </span>
                    </div>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>To: </span>
                        <span style={styles.detailText}>
                            {transactionData.receiver.name.firstName}{" "}
                            {transactionData.receiver.name.lastName}
                        </span>
                    </div>
                    <div style={styles.detailRow}>
                        <span style={styles.detailLabel}>Txn-Id</span>
                        <span
                            style={styles.detailText}
                            title={transactionData._Id}
                        >
                            {formatUUID(transactionData.transactionUUID)}
                        </span>
                    </div>
                </div>
            </div>
            <div style={styles.rightSection}>
                <div
                    style={{
                        ...styles.statusBadge,
                        ...statusStyles[transactionData.status],
                    }}
                >
                    {transactionData.status}
                </div>
                <div style={styles.transactionCode}>
                    {transactionData.transactionCode}
                </div>
            </div>
        </Link>
    );
}

const statusStyles = {
    done: {
        backgroundColor: "#e6f4ea",
        color: "#137333",
    },
    pending: {
        backgroundColor: "#fef7e0",
        color: "#b06000",
    },
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "16px 24px",
        margin: "8px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        ":hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        },
    },
    leftSection: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    statusIndicator: (status) => ({
        width: "8px",
        height: "40px",
        borderRadius: "4px",
        backgroundColor: status === "done" ? "#34a853" : "#fabc05",
    }),
    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    amount: {
        margin: 0,
        fontSize: "20px",
        fontWeight: "600",
        color: "#1a1a1a",
    },
    detailRow: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    detailLabel: {
        color: "#666666",
        fontSize: "14px",
    },
    detailText: {
        color: "#444444",
        fontSize: "14px",
        fontWeight: "400",
    },
    rightSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "8px",
    },
    statusBadge: {
        padding: "4px 8px",
        borderRadius: "16px",
        fontSize: "12px",
        fontWeight: "500",
        textTransform: "capitalize",
    },
    transactionCode: {
        color: "#666666",
        fontSize: "12px",
        letterSpacing: "0.5px",
    },
};

export default TransactionListItem;
