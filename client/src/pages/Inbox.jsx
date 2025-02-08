import { useState, useEffect, useRef } from "react";
import { format, differenceInHours, parseISO } from "date-fns";
import { useAuth, useChat } from "../stores";
import default_avatar from "../assets/default_avatar.svg";
import capitalize from "../utils/capitalize.js";
import { Button, ConfirmModal, ConnectionUserList } from "../components";
import toast from "react-hot-toast";
import api from "../utils/api.js";
import {
    FiPlus,
    FiMessageSquare,
    FiArrowLeft,
    FiSearch,
    FiX,
    FiSend,
    FiTrash2,
    FiChevronDown,
} from "react-icons/fi";

export default function Inbox() {
    const bottomRef = useRef(null);
    const { socket, userData: currentUser } = useAuth();
    const {
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        connections: users,
        setConnections,
        addMessage,
        addNewChat,
        removeChat,
        setUserOffline,
        setUserOnline,
    } = useChat();
    const [showNewChatModal, setShowNewChatModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [text, setText] = useState("");
    const [deleteChatModal, setDeleteChatModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteErr, setDeleteErr] = useState(null);

    const formatLastSeen = (date) => {
        if (!date) return "Never seen";
        try {
            const parsedDate = date instanceof Date ? date : parseISO(date);
            if (isNaN(parsedDate)) return "Invalid date";
            const now = new Date();
            const hoursDifference = differenceInHours(now, parsedDate);
            return hoursDifference < 24
                ? format(parsedDate, "hh:mm a")
                : format(parsedDate, "MM/dd/yyyy");
        } catch (error) {
            console.error("Error formatting last seen:", error);
            return "--";
        }
    };

    const handleAddNewChat = (user) => {
        const chatExistsIndex = chats.findIndex((chat) =>
            [chat.userOne._id, chat.userTwo._id].includes(user.userId._id),
        );

        if (chatExistsIndex >= 0) {
            setSelectedChat(chats[chatExistsIndex]);
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
        }
        setShowNewChatModal(false);
    };

    const handleStartChat = async (chat, text) => {
        try {
            const response = await api.post("/chats/create-chat", {
                receiverId: chat?.userTwo?._id,
                text,
            });
            const newChat = response.data.data;
            setText("");
            addNewChat(newChat);
            setSelectedChat(newChat);
        } catch (error) {
            toast.error("Failed to start chat");
            console.error(error);
        }
    };

    const sendMessage = async () => {
        if (!text.trim()) return;
        if (!selectedChat?.createdAt) {
            handleStartChat(selectedChat, text);
            return;
        }

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

    const handleNewChat = (newChat) => {
        addNewChat(newChat);
    };

    const handleUserOnline = ({ userId }) => {
        setUserOnline(userId);
    };

    const handleUserOffline = ({ userId, lastSeen }) => {
        setUserOffline(userId, lastSeen);
    };

    const handleOnConfirmDelete = async () => {
        if (!selectedChat) return;

        setDeleting(true);
        try {
            const response = await api.delete(
                `/chats/delete/${selectedChat?._id}`,
            );
            removeChat(response.data.data._id);
            setDeleteChatModal(false);
            toast.success("Chat deleted");
        } catch (error) {
            setDeleteErr(error.response.data.message);
            console.error(error);
        } finally {
            setDeleting(false);
        }
    };

    const handleChatDelete = ({ chatId }) => {
        removeChat(chatId);
    };

    useEffect(() => {
        setChats();
        setConnections();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", handleNewMessage);
            socket.on("newChat", handleNewChat);
            socket.on("userOffline", handleUserOffline);
            socket.on("userOnline", handleUserOnline);
            socket.on("chatDelete", handleChatDelete);
            return () => {
                socket.off("newMessage", handleNewMessage);
                socket.off("newChat", handleNewChat);
                socket.off("userOffline", handleUserOffline);
                socket.off("userOnline", handleUserOnline);
                socket.off("chatDelete", handleChatDelete);
            };
        }
    }, [socket]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedChat?.messages?.length]);

    return (
        <>
            {deleteChatModal && (
                <ConfirmModal
                    title={"Are you sure? Chat will be deleted for both"}
                    isDelete={true}
                    setShowModalFn={setDeleteChatModal}
                    onConfirmFn={handleOnConfirmDelete}
                    loading={deleting}
                    err={deleteErr}
                />
            )}
            <div className="flex h-[94vh] bg-gray-50">
                {/* Chat List Sidebar */}
                <div
                    className={`md:w-96 w-full h-full bg-white shadow-lg transition-transform ${selectedChat ? "hidden md:block" : "block"}`}
                >
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Messages
                            </h1>
                            <button
                                onClick={() => setShowNewChatModal(true)}
                                className="p-2 bg-primary/80 text-white rounded-full hover:bg-primary-90 transition-all"
                            >
                                <FiPlus className="text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-y-auto  custom-scrollbar">
                        {chats.map((chat) => {
                            const otherUser =
                                chat.userOne._id === currentUser._id
                                    ? chat.userTwo
                                    : chat.userOne;
                            return (
                                <div
                                    key={chat._id}
                                    onClick={() => {
                                        setSelectedChat(chat);
                                    }}
                                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-primary/20 transition-colors ${
                                        selectedChat?._id === chat._id
                                            ? "bg-primary/20"
                                            : ""
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div
                                                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                                                    otherUser?.online
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                                } ring-2 ring-white`}
                                            />
                                            <img
                                                src={
                                                    otherUser?.avatar ||
                                                    default_avatar
                                                }
                                                className="w-12 h-12 rounded-xl object-cover"
                                                alt={`${otherUser?.name.firstName}'s avatar`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 truncate">
                                                {otherUser?.name.firstName}{" "}
                                                {otherUser?.name.lastName}
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

                {/* Chat Window */}
                <div
                    className={`flex-1 h-full ${!selectedChat ? "hidden md:flex items-center justify-center" : "block"}`}
                >
                    {selectedChat ? (
                        <div className="h-full flex flex-col">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSelectedChat(null)}
                                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
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
                                                )?.avatar || default_avatar
                                            }
                                            className="w-12 h-12 rounded-xl object-cover"
                                            alt=""
                                        />
                                        <div
                                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                                                (selectedChat.userOne._id ===
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
                                                : "Online"}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    className="text-gray-600 bg-none border-none hover:bg-gray-300"
                                    onClick={() =>
                                        selectedChat.createdAt
                                            ? setDeleteChatModal(true)
                                            : setSelectedChat(null)
                                    }
                                >
                                    {selectedChat.createdAt ? (
                                        <>
                                            <FiTrash2 className="mr-2" />
                                            Chat
                                        </>
                                    ) : (
                                        <>
                                            <FiX className="mr-2" /> Close
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Messages Container */}
                            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white custom-scrollbar">
                                {selectedChat.messages?.map(
                                    (message, index) => (
                                        <div key={message._id}>
                                            <MessageBubble
                                                message={message}
                                                isCurrentUser={
                                                    message.sender ===
                                                    currentUser._id
                                                }
                                            />
                                            {index ===
                                                selectedChat.messages.length -
                                                    1 && (
                                                <div ref={bottomRef} />
                                            )}
                                        </div>
                                    ),
                                )}
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-gray-100 bg-white">
                                <div className="flex gap-2">
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
                                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:primary/80 focus:ring-2 focus:ring-primary/50 transition-all"
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="px-5 py-3 bg-primary/80 text-white rounded-xl hover:bg-primary transition-colors flex items-center gap-2"
                                    >
                                        <FiSend className="text-lg" />
                                        <span className="hidden md:block">
                                            {selectedChat.createdAt
                                                ? "Send"
                                                : "Start"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center p-8">
                            <div className="max-w-md mx-auto">
                                <div className="mb-6 text-gray-300">
                                    <FiMessageSquare className="text-7xl mx-auto" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    Select a conversation
                                </h3>
                                <p className="text-gray-500">
                                    Choose from your existing chats or start a
                                    new one
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* New Chat Modal */}
                {showNewChatModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        New Chat
                                    </h2>
                                    <button
                                        onClick={() =>
                                            setShowNewChatModal(false)
                                        }
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <FiX className="text-xl text-gray-600" />
                                    </button>
                                </div>
                                <div className="relative">
                                    <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search connections..."
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/50"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
                                {users
                                    .filter(
                                        (user) =>
                                            `${user.userId.name.firstName} ${user.userId.name.lastName}`
                                                .toLowerCase()
                                                .includes(
                                                    searchQuery.toLowerCase(),
                                                ) &&
                                            user.userId._id !== currentUser._id,
                                    )
                                    .map((user) => (
                                        <div
                                            key={user._id}
                                            onClick={() =>
                                                handleAddNewChat(user)
                                            }
                                            className="p-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-4"
                                        >
                                            <div className="relative">
                                                <div
                                                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${
                                                        user.userId.online
                                                            ? "bg-green-500"
                                                            : "bg-gray-400"
                                                    } ring-2 ring-white`}
                                                />
                                                <img
                                                    src={
                                                        user.userId.avatar ||
                                                        default_avatar
                                                    }
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-medium text-gray-800 truncate">
                                                    {capitalize(
                                                        user.userId.name
                                                            .firstName,
                                                    )}{" "}
                                                    {capitalize(
                                                        user.userId.name
                                                            .lastName,
                                                    )}
                                                </h4>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {user.userId.jobTitle ||
                                                        "No job title"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

function MessageBubble({ message, isCurrentUser }) {
    const [showOptions, setShowOptions] = useState(false);
    const timestamp = format(message.timestamp, "hh:mm a");

    return (
        <div
            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4 group`}
        >
            <div className="relative max-w-[75%]">
                <div
                    className={`relative px-4 py-2 rounded-2xl ${
                        isCurrentUser
                            ? "bg-primary/80 text-white rounded-br-none"
                            : "bg-white border border-gray-200 rounded-bl-none"
                    } shadow-sm transition-all duration-200`}
                >
                    <p className="break-words">{message.text}</p>
                    <div className="mt-1 flex justify-end">
                        <span
                            className={`text-xs ${isCurrentUser ? "text-gray-100" : "text-gray-500"}`}
                        >
                            {timestamp}
                        </span>
                    </div>
                </div>

                {isCurrentUser && (
                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        className={`absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${
                            showOptions ? "opacity-100" : ""
                        }`}
                    >
                        <FiChevronDown className="text-gray-500 hover:text-gray-700" />
                    </button>
                )}

                {showOptions && (
                    <div className="absolute -top-10 right-0 z-10 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600 flex items-center gap-2">
                            <FiTrash2 className="text-sm" />
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
