import { useState, useEffect, useRef } from "react";
import { format, parseISO, differenceInHours } from "date-fns";

// Icons
const SearchIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const BackIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
    </svg>
);

const DeleteIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
    </svg>
);

const CloseIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

const DotsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        />
    </svg>
);

// Mock data
let mockConversations = [
    {
        id: 1,
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        online: true,
        lastSeen: new Date().toISOString(),
        messages: [
            {
                id: 1,
                text: "Hey, how are you?",
                timestamp: "2025-02-05T14:42:07.954Z",
                sender: 1,
            },
            {
                id: 2,
                text: "I'm good, thanks!",
                timestamp: "2025-02-05T14:43:07.954Z",
                sender: "me",
            },
        ],
        isTyping: true,
        unread: 2,
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        online: false,
        lastSeen: "2025-02-04T09:12:07.954Z",
        messages: [
            {
                id: 3,
                text: "See you tomorrow!",
                timestamp: "2025-02-04T09:12:07.954Z",
                sender: 2,
            },
        ],
        isTyping: false,
        unread: 0,
    },
];

// Utility functions
const formatTimestamp = (isoString) => {
    const date = parseISO(isoString);
    return differenceInHours(new Date(), date) < 24
        ? format(date, "h:mm")
        : format(date, "MMM d");
};

const formatLastSeen = (isoString) => {
    const date = parseISO(isoString);
    return differenceInHours(new Date(), date) < 24
        ? `Last seen ${format(date, "h:mm a")}`
        : `Last seen ${format(date, "MMM d")}`;
};

export default function Inbox() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const filteredConversations = mockConversations.filter((convo) =>
        convo.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleSend = () => {
        if (!newMessage.trim()) return;

        const conversation = mockConversations.find(
            (c) => c.id === selectedUser?.id,
        );
        const newMsg = {
            id: conversation.messages.length + 1,
            text: newMessage,
            timestamp: new Date().toISOString(),
            sender: "me",
        };

        conversation.messages.push(newMsg);
        setNewMessage("");
    };

    const deleteMessage = (messageId) => {
        const conversation = mockConversations.find(
            (c) => c.id === selectedUser?.id,
        );
        conversation.messages = conversation.messages.filter(
            (msg) => msg.id !== messageId,
        );
        setMenuOpen(null);
    };

    const deleteChat = () => {
        mockConversations = mockConversations.filter(
            (c) => c.id !== selectedUser?.id,
        );
        setSelectedUser(null);
    };

    return (
        <div className="flex h-[90vh] bg-gray-100">
            {/* Left Sidebar */}
            <div
                className={`flex flex-col w-full sm:w-96 bg-white ${isMobile && selectedUser ? "hidden" : "block"}`}
            >
                <div className="p-4 bg-gray-50 border-b">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="overflow-y-auto">
                    {filteredConversations.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer ${selectedUser?.id === user.id ? "bg-blue-50" : ""
                                }`}
                        >
                            <div className="relative">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                {user.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>

                            <div className="ml-4 flex-1">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <h3 className="font-semibold">
                                            {user.name}
                                        </h3>
                                        {user.online && (
                                            <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {formatTimestamp(
                                            user.messages[
                                                user.messages.length - 1
                                            ]?.timestamp,
                                        )}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">
                                    {
                                        user.messages[user.messages.length - 1]
                                            ?.text
                                    }
                                    {user.unread > 0 && (
                                        <span className="ml-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                                            {user.unread}
                                        </span>
                                    )}
                                </p>
                                <div className="text-xs text-gray-500">
                                    {user.online
                                        ? "Active now"
                                        : formatLastSeen(user.lastSeen)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div
                className={`flex-1 flex flex-col ${isMobile && !selectedUser ? "hidden" : "block"}`}
            >
                {selectedUser ? (
                    <>
                        <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="mr-4 text-gray-600 hover:text-gray-800"
                                >
                                    <BackIcon />
                                </button>
                                <div className="relative">
                                    <img
                                        src={selectedUser.avatar}
                                        alt={selectedUser.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {selectedUser.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold">
                                        {selectedUser.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {selectedUser.online
                                            ? "Active now"
                                            : formatLastSeen(
                                                selectedUser.lastSeen,
                                            )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={deleteChat}
                                    className="text-red-500 hover:text-red-600"
                                    title="Delete chat"
                                >
                                    <DeleteIcon />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {selectedUser.messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className="relative group max-w-xs">
                                        <div
                                            className={`flex items-end ${message.sender === "me" ? "flex-row-reverse" : ""}`}
                                        >
                                            {message.sender !== "me" && (
                                                <img
                                                    src={selectedUser.avatar}
                                                    alt={selectedUser.name}
                                                    className="w-8 h-8 rounded-full object-cover mr-2"
                                                />
                                            )}

                                            <div
                                                className={`p-3 rounded-lg ${message.sender === "me"
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-gray-200 text-gray-800"
                                                    }`}
                                            >
                                                <p>{message.text}</p>
                                                <span
                                                    className={`text-xs opacity-70 mt-1 block ${message.sender === "me"
                                                            ? "text-blue-100"
                                                            : "text-gray-500"
                                                        }`}
                                                >
                                                    {message.sender === "me"
                                                        ? `me:${formatTimestamp(message.timestamp)}`
                                                        : formatTimestamp(
                                                            message.timestamp,
                                                        )}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                setMenuOpen(
                                                    menuOpen === message.id
                                                        ? null
                                                        : message.id,
                                                )
                                            }
                                            className={`absolute top-1/2 -translate-y-1/2 ${message.sender === "me"
                                                    ? "-left-8"
                                                    : "-right-8"
                                                } text-gray-500 hover:text-gray-700`}
                                        >
                                            <DotsIcon />
                                        </button>

                                        {menuOpen === message.id && (
                                            <div
                                                className={`absolute ${message.sender === "me"
                                                        ? "left-0"
                                                        : "right-0"
                                                    } top-6 bg-white shadow-lg rounded-md p-2`}
                                            >
                                                <button
                                                    onClick={() =>
                                                        deleteMessage(
                                                            message.id,
                                                        )
                                                    }
                                                    className="text-red-500 hover:bg-gray-100 w-full px-4 py-2 text-left flex items-center"
                                                >
                                                    <DeleteIcon className="w-4 h-4 mr-2" />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {selectedUser.isTyping && (
                                <div className="flex items-center">
                                    <img
                                        src={selectedUser.avatar}
                                        alt={selectedUser.name}
                                        className="w-8 h-8 rounded-full object-cover mr-2"
                                    />
                                    <div className="flex space-x-1 bg-gray-200 rounded-full p-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div
                                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.2s" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                                            style={{ animationDelay: "0.4s" }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleSend()
                                    }
                                    placeholder="Type a message..."
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <p className="text-gray-500">
                            Select a conversation to start chatting
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
