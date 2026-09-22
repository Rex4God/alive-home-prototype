"use client";
import { useEffect, useRef, ChangeEvent } from "react";
import { Loader2, Send, Trash, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import remarkGfm from "remark-gfm";
import ReactMarkdown, { Components } from "react-markdown";
import { useChat } from "@ai-sdk/react";

interface ChatbotProps {
  toggleChat: () => void;
}
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function Chatbot({ toggleChat }: ChatbotProps) {
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    isLoading,
    stop,
    setMessages,
    reload,
    error,
  } = useChat({ api: "/api/openai", id: "persistent-chat" });

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const clearMessages = () => {
    setMessages([]);
  };

  const MarkdownComponents: Components = {
    code: ({ node, inline, className, children, ...props }: CodeProps) => {
      return inline ? (
        <code {...props} className="bg-gray-200 px-1 rounded">
          {children}
        </code>
      ) : (
        <pre {...props} className="bg-gray-200 p-2 rounded">
          <code>{children}</code>
        </pre>
      );
    },
    ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal ml-4">{children}</ol>,
  };

  return (
    <div className="text-black">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 right-2 md:right-4 z-50 w-[95%] md:w-[500px]"
        >
          <div className="border-2 bg-white rounded-lg p-6 shadow-lg">
            <div className="flex flex-row items-center justify-between space-y-0 pb-3">
              <h3 className="text-lg font-bold">Ask AI</h3>
              <div className="rounded-md flex items-center gap-4">
                {messages.length !== 0 && (
                  <button
                    onClick={clearMessages}
                    className="rounded-md gap-6 hover:bg-slate-100 p-2"
                  >
                    <Trash className="size-4" />
                  </button>
                )}
                <button
                  onClick={toggleChat}
                  className="rounded-md gap-6 hover:bg-slate-100 p-2"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            <div>
              <div className="relative overflow-y-auto h-[300px] pr-4">
                {messages.length === 0 && (
                  <>
                    <p className="bg-slate-100 text-gray-800 inline-block p-4 rounded-lg text-sm text-left ">
                      Hi! I&apos;m an AI assistant trained on documentation,
                      help articles, and other content. <br />
                      <span className="mt-3 block">
                        Ask me anything about Alive Home.
                      </span>
                    </p>
                    <div className="pl-4">
                      <p className="text-gray-800 inline-block my-4 rounded-lg text-sm text-left">
                        Example Questions
                      </p>

                      <p
                        onClick={(e) => {
                          const questionText = (
                            e.target as HTMLElement
                          ).textContent
                            ?.replace("✍️", "")
                            .trim();
                          if (questionText) {
                            const syntheticEvent = {
                              target: { value: questionText },
                            } as ChangeEvent<HTMLInputElement>;
                            handleInputChange(syntheticEvent);
                          }
                        }}
                        className="text-gray-800 animate-border-sweep block p-3 mb-3 rounded-md text-sm text-left w-fit cursor-pointer border border-slate-200 hover:bg-slate-100"
                      >
                        How do I buy or rent an appartment? ✍️
                      </p>
                      <p
                        onClick={(e) => {
                          const questionText = (
                            e.target as HTMLElement
                          ).textContent?.trim();
                          if (questionText) {
                            // Create a synthetic event
                            const syntheticEvent = {
                              target: { value: questionText },
                            } as ChangeEvent<HTMLInputElement>;
                            handleInputChange(syntheticEvent);
                          }
                        }}
                        className="text-gray-800 block p-3 mb-3 rounded-md text-sm text-left w-fit cursor-pointer border hover:bg-slate-100"
                      >
                        How do I search for appartment?
                      </p>
                    </div>
                  </>
                )}
                {messages?.map((message, index: number) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-4 rounded-lg text-sm ${
                        message.role === "user"
                          ? "bg-[#C77D01] text-[#FFFFFF]"
                          : "bg-[#F4E8E1] text-gray-800"
                      }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={MarkdownComponents}
                      >
                        {message?.content as string}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="w-full items-center flex justify-center gap-3">
                    <Loader2 className="animate-spin h-5 w-5 text-green-400" />
                    <button
                      type="button"
                      className="underline"
                      onClick={() => stop()}
                    >
                      abort
                    </button>
                  </div>
                )}
                {error && (
                  <div className="w-full items-center flex justify-center gap-3">
                    <p>An error occurred.</p>
                    <button
                      type="button"
                      className="underline"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </button>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </div>

            <div className="flex items-center pt-6 ">
              <form
                onSubmit={handleSubmit}
                className="flex items-center w-full space-x-2"
              >
                <input
                  type="text"
                  placeholder="Type your message here..."
                  onChange={handleInputChange}
                  disabled={isLoading}
                  value={input}
                  className="flex-1 h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-800 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="size-9 rounded-full flex items-center justify-center bg-[#C77D01] hover:opacity-80"
                >
                  <Send className="size-4 text-[#FFFFFF]" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
