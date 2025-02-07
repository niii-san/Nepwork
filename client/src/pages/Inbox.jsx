import { useState, useEffect } from "react";
import { format, differenceInHours, parseISO } from "date-fns";
import { useAuth, useChat } from "../stores";
import default_avatar from "../assets/default_avatar.svg";
import capitalize from "../utils/capitalize.js";
import { Button } from "../components";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import {
    FiPlus,
    FiMessageSquare,
    FiArrowLeft,
    FiSearch,
    FiX,
    FiSend,
    FiPaperclip,
    FiTrash2,
    FiChevronDown,
} from "react-icons/fi";

export default function Inbox() {
    const { socket, userData: currentUser } = useAuth();
    const {
        chats,
        setChats,
        chatsLoading,
        selectedChat,
        setSelectedChat,
        connections: users,
        setConnections,
        connectionsLoading,
        addMessage,
    } = useChat();
    const [currentChatIndex, setCurrentChatIndex] = useState(-1);
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [text, setText] = useState("");

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
            setCurrentChatIndex(chatExistsIndex);
            setShowNewChatModal(false);
            return;
        } else {
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

    const handleStartChat = async (chat) => {
        try {
            const response = await api.post("/chats/create-chat", {
                receiverId: chat?.userTwo?._id,
            });
            const newChat = response.data.data;
            chats.unshift(newChat);
            setSelectedChat(chats[0]);
            setCurrentChatIndex(0);
        } catch (error) {
            toast.error("Failed to start chat");
            console.error(error);
        }
    };

    const sendMessage = async () => {
        try {
            const response = await api.post(
                `/chats/${selectedChat._id}/new-message`,
                { message: text },
            );
            const newMessage = response.data.data;
            selectedChat.messages.push(newMessage);
            setText("");
        } catch (error) {
            toast.error("Failed to send message!");
            console.error(error);
        }
    };

    const handleNewMessage = (data) => {
        addMessage(data.chatId, data.newMessage);
    };

    useEffect(() => {
        setChats();
        setConnections();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", handleNewMessage);
        }
    }, [socket]);

    return (
        <div className="flex h-[90vh] bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Left sidebar */}
            <div
                className={`md:w-96 w-full h-full bg-white shadow-xl ${selectedChat ? "hidden md:block" : "block"
                    }`}
            >
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Messages
                        </h1>
                        <button
                            onClick={() => setShowNewChatModal(true)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
                        >
                            <FiPlus className="text-lg" />
                            <span className="hidden md:block">New Chat</span>
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto h-[calc(100vh-4rem)]">
                    {chats.map((chat, index) => {
                        const otherUser =
                            chat.userOne._id === currentUser._id
                                ? chat.userTwo
                                : chat.userOne;
                        return (
                            <div
                                key={chat._id}
                                onClick={() => {
                                    setSelectedChat(chat);
                                    setCurrentChatIndex(index);
                                }}
                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat?._id === chat._id
                                        ? "bg-blue-50 hover:bg-blue-50"
                                        : ""
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${otherUser?.online
                                                    ? "bg-green-500"
                                                    : "bg-gray-400"
                                                } ring-2 ring-white`}
                                        />
                                        <img
                                            src={
                                                otherUser?.avatar ??
                                                default_avatar
                                            }
                                            className="w-12 h-12 rounded-xl object-cover"
                                            alt={otherUser?.name.firstName}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">
                                            {otherUser?.name?.firstName}{" "}
                                            {otherUser?.name?.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {otherUser?.online
                                                ? "Online"
                                                : `Last seen ${formatLastSeen(otherUser?.lastSeen)}`}
                                        </p>
                                        {chat.lastMessage && (
                                            <p className="text-sm text-gray-500 truncate mt-1">
                                                {chat.lastMessage.text}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Chat area */}
            <div
                className={`flex-1 h-full ${!selectedChat
                        ? "hidden md:flex items-center justify-center"
                        : "block"
                    }`}
            >
                {selectedChat ? (
                    <div className="h-full  overflow-y-scroll flex flex-col">
                        <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedChat(null)}
                                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FiArrowLeft className="text-xl text-gray-600" />
                                </button>
                                <div className="relative">
                                    <img
                                        src={
                                            (selectedChat.userOne._id ===
                                                currentUser._id
                                                ? selectedChat.userTwo
                                                : selectedChat.userOne
                                            )?.avatar ?? default_avatar
                                        }
                                        className="w-12 h-12 rounded-xl object-cover"
                                        alt=""
                                    />
                                    <div
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${(selectedChat.userOne._id ===
                                                currentUser._id
                                                ? selectedChat.userTwo
                                                : selectedChat.userOne
                                            )?.online
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                            } ring-2 ring-white`}
                                    />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-gray-800">
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
                                    <p className="text-sm text-gray-500">
                                        {(selectedChat.userOne._id ===
                                            currentUser._id
                                            ? selectedChat.userTwo
                                            : selectedChat.userOne
                                        )?.isTyping
                                            ? "typing..."
                                            : (selectedChat.userOne._id ===
                                                currentUser._id
                                                ? selectedChat.userTwo
                                                : selectedChat.userOne
                                            )?.online
                                                ? "Active now"
                                                : "Offline"}
                                    </p>
                                </div>
                            </div>
                            {selectedChat?.createdAt ? (
                                <Button
                                    variant="filled"
                                    className="text-red-600 hover:bg-red-50"
                                >
                                    <FiTrash2 className="mr-2" />
                                    Delete Chat
                                </Button>
                            ) : (
                                <Button
                                    variant="ghost"
                                    className="text-gray-600 hover:bg-gray-100"
                                    onClick={() => setSelectedChat(null)}
                                >
                                    <FiX className="mr-2" />
                                    Close
                                </Button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
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
                            <div className="p-4 border-t border-gray-200 bg-white">
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                                        <FiPaperclip className="text-xl" />
                                    </button>
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === "Enter" && sendMessage()
                                        }
                                        placeholder="Type your message..."
                                        className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    >
                                        <FiSend className="text-lg" />
                                        <span className="hidden md:block">
                                            Send
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-white">
                                <Button
                                    variant="filled"
                                    className="w-full py-4 text-lg flex items-center justify-center gap-2"
                                    onClick={() =>
                                        handleStartChat(selectedChat)
                                    }
                                >
                                    <FiMessageSquare />
                                    Start Conversation
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center p-8">
                        <div className="max-w-md mx-auto">
                            <div className="mb-4 text-gray-400">
                                <FiMessageSquare className="text-6xl mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                No chat selected
                            </h3>
                            <p className="text-gray-500">
                                Choose an existing conversation or start a new
                                one
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced New Chat Modal */}
            {showNewChatModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    New Conversation
                                </h2>
                                <button
                                    onClick={() => setShowNewChatModal(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FiX className="text-xl text-gray-600" />
                                </button>
                            </div>
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search connections..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto max-h-[60vh]">
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
                                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-4"
                                    >
                                        <div className="relative">
                                            <div
                                                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${user.userId.online
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                                    } ring-2 ring-white`}
                                            />
                                            <img
                                                src={
                                                    user.userId.avatar ??
                                                    default_avatar
                                                }
                                                className="w-10 h-10 rounded-lg object-cover"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                {capitalize(
                                                    user.userId.name.firstName,
                                                )}{" "}
                                                {capitalize(
                                                    user.userId.name.lastName,
                                                )}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {user.userId.jobTitle ||
                                                    "No job title provided"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
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
            <button
                onClick={() => setShowOptions(!showOptions)}
                className={`
                    } p-1 hover:opacity-80 transition-opacity`}
            >
                <FiChevronDown
                    className={`text-lg text-gray-600
                        }`}
                />
            </button>
            <div className="relative max-w-[70%]">
                <div
                    className={`p-4 rounded-2xl ${isCurrentUser
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-white border border-gray-200 rounded-bl-none"
                        } shadow-sm`}
                >
                    <p className="leading-relaxed">{message.text}</p>
                    <div className="flex items-center justify-end mt-2">
                        <span
                            className={`text-xs ${isCurrentUser
                                    ? "text-blue-100"
                                    : "text-gray-500"
                                }`}
                        >
                            {format(message.timestamp, "hh:mm a")}
                        </span>
                    </div>
                </div>

                {showOptions && (
                    <div
                        className={`absolute ${isCurrentUser ? "right-0" : "left-0"
                            } mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden`}
                    >
                        <button className="w-full p-3 text-left hover:bg-gray-100 text-red-600 flex items-center gap-2">
                            <FiTrash2 className="text-base" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
