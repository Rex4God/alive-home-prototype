"use client"; 
import Image from "next/image";
import { useState } from "react";
import {
  FiSearch,
  FiSend,
  FiMoreVertical,
  FiPhone,
  FiVideo,
} from "react-icons/fi";

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  fromMe: boolean;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  messages: Message[];
}

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Alexander Williams",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "Looking forward to...",
      messages: [
        {
          id: 1,
          sender: "Alexander Williams",
          text: "Hi Rosemary, I came across your impressive portfolio and wanted to reach out about a potential freelance opportunity. We’re looking for someone with your skills...",
          time: "9:07 PM",
          fromMe: false,
        },
        {
          id: 2,
          sender: "Me",
          text: "Looking forward to hearing from you!",
          time: "9:07 PM",
          fromMe: true,
        },
      ],
    },
    {
      id: 2,
      name: "Jane Doe",
      avatar: "https://i.pravatar.cc/150?img=6",
      lastMessage: "See you soon!",
      messages: [
        {
          id: 1,
          sender: "Jane Doe",
          text: "Hey! Are we still on for tomorrow?",
          time: "8:30 PM",
          fromMe: false,
        },
        {
          id: 2,
          sender: "Me",
          text: "Yes, see you soon!",
          time: "8:31 PM",
          fromMe: true,
        },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState<Chat | null>(chats[0]);
  const [messageText, setMessageText] = useState("");
  const [showChatList, setShowChatList] = useState(true); // For mobile toggle

  const sendMessage = () => {
    if (!messageText.trim() || !activeChat) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: "Me",
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fromMe: true,
    };

    const updatedChats = chats.map((chat) =>
      chat.id === activeChat.id
        ? {
            ...chat,
            lastMessage: messageText,
            messages: [...chat.messages, newMessage],
          }
        : chat
    );

    setChats(updatedChats);
    setActiveChat(
      updatedChats.find((chat) => chat.id === activeChat.id) || null
    );
    setMessageText("");
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar (Chat list) */}
      <aside
        className={`${
          showChatList ? "flex" : "hidden"
        } md:flex w-full md:w-[30%] flex-col border-r border-gray-200 bg-white`}
      >
        {/* Search */}
        <div className="p-3 border-b">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent flex-1 outline-none text-sm"
            />
          </div>
        </div>

        {/* Recents */}
        <div className="overflow-y-auto flex-1">
          <h2 className="px-4 py-2 text-gray-500 text-sm">Recents</h2>
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChat(chat);
                  setShowChatList(false); // hide on mobile
                }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                  activeChat?.id === chat.id
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <Image
                  src={chat.avatar}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900">
                    {chat.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                <span className="bg-[#C77D01] text-white text-xs rounded-full px-2">
                  2
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Chat Section */}
      <main
        className={`flex-1 flex flex-col ${
          showChatList ? "hidden md:flex" : "flex"
        }`}
      >
        {activeChat ? (
          <>
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
              <div className="flex items-center gap-3">
                {/* Mobile back button */}
                <button
                  className="md:hidden"
                  onClick={() => setShowChatList(true)}
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <Image
                  src={activeChat.avatar}
                  width={100}
                  height={100}
                  className="w-10 h-10 rounded-full"
                  alt="profile"
                />
                <div>
                  <p className="font-medium text-sm text-gray-900">
                    {activeChat.name}
                  </p>
                  <p className="text-xs text-gray-500">Last 10m ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FiPhone className="w-5 h-5 text-gray-600 cursor-pointer" />
                <FiVideo className="w-5 h-5 text-gray-600 cursor-pointer" />
                <FiMoreVertical className="w-5 h-5 text-gray-600 cursor-pointer" />
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">
              {activeChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.fromMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-sm rounded-2xl px-4 py-2 text-sm ${
                      msg.fromMe
                        ? "bg-[#C77D01] text-white rounded-br-none"
                        : "bg-[#F4E8E1] text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] text-gray-300 mt-1 text-right">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t bg-white p-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 outline-none px-4 py-2 text-sm border rounded-full bg-gray-100"
              />
              <button
                onClick={sendMessage}
                className="bg-[#C77D01] text-white p-2 rounded-full"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </main>
    </div>
  );
}
