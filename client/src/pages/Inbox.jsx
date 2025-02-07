import { useState, useEffect } from "react";
import { format, differenceInHours, parseISO } from "date-fns";
import { useAuth, useChat } from "../stores";
import default_avatar from "../assets/default_avatar.svg";
import capitalize from "../utils/capitalize.js";
import { Button } from "../components";

export default function Inbox() {
    const { userData: currentUser } = useAuth();
    const {
        chats,
        setChats,
        chatsLoading,
        selectedChat,
        setSelectedChat,
        connections: users,
        setConnections,
        connectionsLoading,
    } = useChat();
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [newMessage, setNewMessage] = useState("");

    const formatLastSeen = (date) => {
        if (!date) return "Never seen";

        try {
            const parsedDate = date instanceof Date ? date : parseISO(date);
            if (isNaN(parsedDate)) return "Invalid date";

            const now = new Date();
            const hoursDifference = differenceInHours(now, parsedDate);

            if (hoursDifference < 24) {
                return format(parsedDate, "hh:mm a");
            }
            return format(parsedDate, "MM/dd/yyyy");
        } catch (error) {
            console.error("Error formatting last seen:", error);
            return "--";
        }
    };

    const handleNewChat = (user) => {
        let chatExistsIndex = -1;
        chats.some((item, index) => {
            if (
                item.userOne._id === user.userId._id ||
                item.userTwo._id === user.userId._id
            ) {
                chatExistsIndex = index;
            } else {
                chatExistsIndex = -1;
            }
            return (
                item.userOne._id === user.userId._id ||
                item.userTwo._id === user.userId._id
            );
        });

        if (chatExistsIndex >= 0) {
            setSelectedChat(chats[chatExistsIndex]);
            setShowNewChatModal(false);
            return;
        } else {
            console.log(user);
            setSelectedChat({
                createdAt: null,
                updatedAt: null,
                messages: null,
                unreadOne: 0,
                unreadTwo: 0,
                userOne: currentUser,
                userTwo: user.userId,
            });

            setShowNewChatModal(false);

            return;
        }
    };

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const message = {
            _id: `m${Date.now()}`,
            text: newMessage,
            sender: currentUser._id,
            receiver:
                selectedChat.userOne === currentUser._id
                    ? selectedChat.userTwo
                    : selectedChat.userOne,
            timestamp: new Date(),
        };
        setChats(
            chats.map((chat) =>
                chat._id === selectedChat._id
                    ? {
                        ...chat,
                        messages: [...chat.messages, message],
                        lastMessage: message,
                    }
                    : chat,
            ),
        );
        setNewMessage("");
    };

    useEffect(() => {
        setChats();
        setConnections();
    }, []);
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left sidebar */}
            <div
                className={`md:w-1/3 w-full h-[90%] bg-white ${selectedChat ? "hidden md:block" : "block"}`}
            >
                <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">Chats</h1>
                        <button
                            onClick={() => setShowNewChatModal(true)}
                            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-4rem)]">
                    {chats.map((chat) => {
                        const otherUser =
                            chat.userOne._id === currentUser._id
                                ? chat.userTwo
                                : chat.userOne;
                        return (
                            <div
                                key={chat._id}
                                onClick={() => setSelectedChat(chat)}
                                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedChat?._id === chat._id ? "bg-blue-50 hover:bg-blue-50" : ""}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img
                                            src={
                                                otherUser?.avatar ??
                                                default_avatar
                                            }
                                            className="w-12 h-12 rounded-full"
                                            alt={otherUser?.name.firstName}
                                        />
                                        <div
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${otherUser?.online ? "bg-green-500" : "bg-gray-400"}`}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">
                                            {otherUser?.name?.firstName}{" "}
                                            {otherUser?.name?.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {otherUser?.online
                                                ? "Online"
                                                : `Last seen ${formatLastSeen(otherUser?.lastSeen)}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Chat area */}
            <div
                className={`md:w-2/3 w-full  ${!selectedChat ? "hidden md:flex items-center justify-center" : "block"}`}
            >
                {selectedChat ? (
                    <div className="h-[90%] flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center">
                            <button
                                onClick={() => setSelectedChat(null)}
                                className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                            >
                                ←
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src={
                                            (selectedChat.userOne._id ===
                                                currentUser._id
                                                ? selectedChat.userTwo
                                                : selectedChat.userOne
                                            )?.avatar ?? default_avatar
                                        }
                                        className="w-10 h-10 rounded-full"
                                        alt=""
                                    />
                                    <div
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${(selectedChat.userOne._id === currentUser._id ? selectedChat.userTwo : selectedChat.userOne)?.online ? "bg-green-500" : "bg-gray-400"}`}
                                    />
                                </div>
                                <div>
                                    <h2 className="font-semibold">
                                        {
                                            (selectedChat.userOne._id ===
                                                currentUser._id
                                                ? selectedChat.userTwo
                                                : selectedChat.userOne
                                            )?.name.firstName
                                        }{" "}
                                        {
                                            (selectedChat.userOne._id ===
                                                currentUser._id
                                                ? selectedChat.userTwo
                                                : selectedChat.userOne
                                            )?.name.lastName
                                        }
                                    </h2>
                                    {(selectedChat.userOne._id ===
                                        currentUser._id
                                        ? selectedChat.userTwo
                                        : selectedChat.userOne
                                    )?.isTyping ? (
                                        <p className="text-sm text-gray-500">
                                            typing...
                                        </p>
                                    ) : (selectedChat.userOne._id ===
                                        currentUser._id
                                        ? selectedChat.userTwo
                                        : selectedChat.userOne
                                    )?.online ? (
                                        <p className="text-sm text-gray-500">
                                            Active
                                        </p>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            Offline
                                        </p>
                                    )}
                                </div>
                            </div>
                            {selectedChat?.createdAt ? (
                                <Button>Delete Chat</Button>
                            ) : (
                                <Button
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => setSelectedChat(null)}
                                >
                                    Close Chat
                                </Button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                            {selectedChat?.messages?.map((message) => (
                                <MessageBubble
                                    key={message._id}
                                    message={message}
                                    isCurrentUser={
                                        message.sender === currentUser._id
                                    }
                                />
                            ))}
                        </div>

                        {selectedChat && selectedChat?.createdAt ? (
                            <div className="p-4 border-t bg-white">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            e.key === "Enter" && sendMessage()
                                        }
                                        placeholder="Type a message"
                                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                variant="filled"
                                className="w-[98%] mx-auto"
                            >
                                Start chat
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="text-gray-500 text-center">
                        Select a chat to start messaging
                    </div>
                )}
            </div>

            {/* New Chat Modal */}
            {showNewChatModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">
                            New Conversation
                        </h2>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full p-2 border rounded mb-4"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="space-y-2">
                            {users
                                .filter(
                                    (user) =>
                                        user.userId.name.firstName
                                            .toLowerCase()
                                            .includes(
                                                searchQuery.toLowerCase(),
                                            ) ||
                                        (user.userId.name.lastName
                                            .toLowerCase()
                                            .includes(
                                                searchQuery.toLowerCase(),
                                            ) &&
                                            user.userId._id !==
                                            currentUser._id),
                                )
                                .map((user) => (
                                    <div
                                        key={user._id}
                                        onClick={() => handleNewChat(user)}
                                        className="p-2 hover:bg-gray-100 cursor-pointer rounded flex items-center gap-3"
                                    >
                                        <img
                                            src={
                                                user.userId.avatar ??
                                                default_avatar
                                            }
                                            className="w-8 h-8 rounded-full"
                                            alt=""
                                        />
                                        <span>
                                            {capitalize(
                                                user.userId.name.firstName,
                                            )}{" "}
                                            {capitalize(
                                                user.userId.name.lastName,
                                            )}
                                        </span>
                                    </div>
                                ))}
                        </div>
                        <button
                            onClick={() => setShowNewChatModal(false)}
                            className="mt-4 w-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function MessageBubble({ message, isCurrentUser }) {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div
            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
        >
            <div className="relative">
                <div
                    className={`p-3 rounded-lg ${isCurrentUser ? "bg-blue-500 text-white" : "bg-white border"}`}
                >
                    <p>{message.text}</p>
                    <p
                        className={`text-xs mt-1 ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}
                    >
                        {format(message.timestamp, "hh:mm a")}
                    </p>
                </div>
                <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="absolute top-0 right-0 -mt-2 -mr-2 p-1 hover:bg-gray-100 rounded-full"
                >
                    •••
                </button>
                {showOptions && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
                        <button className="w-full p-2 text-left hover:bg-gray-100 text-red-500">
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
