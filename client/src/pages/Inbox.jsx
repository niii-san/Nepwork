import React, { useState, useEffect } from 'react';

// Mock data
const mockUsers = [
  {
    _id: '1',
    name: { firstName: 'John', lastName: 'Doe' },
    online: true,
    lastSeen: new Date(),
    avatar: null,
    isTyping: false
  },
  {
    _id: '2',
    name: { firstName: 'Jane', lastName: 'Smith' },
    online: false,
    lastSeen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    avatar: null,
    isTyping: true
  }
];

const mockMessages = [
  {
    _id: '1',
    text: 'Hey, how are you?',
    sender: '1',
    receiver: '2',
    timestamp: new Date(Date.now() - 60 * 60 * 1000)
  },
  {
    _id: '2',
    text: 'I\'m good, thanks! How about you?',
    sender: '2',
    receiver: '1',
    timestamp: new Date(Date.now() - 30 * 60 * 1000)
  }
];

const Inbox= () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const [showMessageOptions, setShowMessageOptions] = useState(null);
  const [currentUser] = useState('1'); // Mock current user ID
  const [isMobileView, setIsMobileView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setFilteredUsers(
      mockUsers.filter(user => 
        `${user.name.firstName} ${user.name.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  const formatLastSeen = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
    return `Last seen ${date.toLocaleDateString()}`;
  };

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">New Conversation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  const UserAvatar = ({ user }) => (
    <div className="relative">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
        {user.avatar ? (
          <img src={user.avatar} alt={`${user.name.firstName}'s avatar`} className="w-full h-full rounded-full" />
        ) : (
          <span className="text-lg">{user.name.firstName[0]}</span>
        )}
      </div>
      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
        user.online ? 'bg-green-500' : 'bg-gray-400'
      } border-2 border-white`} />
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex space-x-1 items-center p-2">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:200ms]" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:400ms]" />
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar */}
      <div className={`bg-white w-full md:w-80 border-r ${
        isMobileView && selectedChat ? 'hidden' : 'block'
      }`}>
        <div className="p-4 border-b">
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            <span className="text-xl">+</span>
            <span>Add Conversation</span>
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-5rem)]">
          {mockUsers.map(user => (
            <div
              key={user._id}
              onClick={() => setSelectedChat(user)}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                selectedChat?._id === user._id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <UserAvatar user={user} />
                <div className="flex-1">
                  <h3 className="font-medium">
                    {user.name.firstName} {user.name.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatLastSeen(user.lastSeen)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className={`flex-1 flex flex-col ${
        isMobileView && !selectedChat ? 'hidden' : 'block'
      }`}>
        {selectedChat ? (
          <>
            <div className="bg-white p-4 border-b flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isMobileView && (
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="mr-2 text-gray-500 hover:text-gray-700"
                  >
                    ←
                  </button>
                )}
                <UserAvatar user={selectedChat} />
                <div>
                  <h2 className="font-medium">
                    {selectedChat.name.firstName} {selectedChat.name.lastName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedChat.online ? 'Online' : formatLastSeen(selectedChat.lastSeen)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedChat(null)}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.sender === currentUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className="relative max-w-[70%] group">
                    <div className={`p-3 rounded-lg ${
                      message.sender === currentUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200'
                    }`}>
                      {message.text}
                    </div>
                    <button
                      onClick={() => setShowMessageOptions(
                        showMessageOptions === message._id ? null : message._id
                      )}
                      className={`absolute top-0 ${
                        message.sender === currentUser ? '-left-6' : '-right-6'
                      } opacity-0 group-hover:opacity-100 text-gray-500`}
                    >
                      •••
                    </button>
                    {showMessageOptions === message._id && (
                      <div className="absolute top-0 bg-white shadow-lg rounded-lg p-2 z-10">
                        <button 
                          onClick={() => {
                            setMessages(messages.filter(m => m._id !== message._id));
                            setShowMessageOptions(null);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {selectedChat.isTyping && (
                <div className="flex justify-start">
                  <TypingIndicator />
                </div>
              )}
            </div>

            <div className="bg-white p-4 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>

      {/* Search Users Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:border-blue-500"
          />
          <div className="max-h-64 overflow-y-auto">
            {filteredUsers.map(user => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedChat(user);
                  setShowModal(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer flex items-center space-x-3"
              >
                <UserAvatar user={user} />
                <span>{user.name.firstName} {user.name.lastName}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Inbox;
