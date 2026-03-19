"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, Send, Square, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useChat } from "@ai-sdk/react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DefaultChatTransport } from "ai";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const suggestedQuestions = [
  "What solutions does 1Tech provide for core banking?",
  "How can I integrate your platform with our existing systems?",
  "What security and compliance standards do you support?",
  "Do you offer cloud deployment, on-premise, or both?",
];

interface ChatbotProps {
  settings: {
    id: number;
    context: string;
    questions: string[];
  };
}

const Chatbot = ({ settings }: ChatbotProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, stop, regenerate, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, status]);

  const handleSuggestedClick = (question: string) => {
    // Immediately send the suggested question
    sendMessage({ text: question });
  };

  return (
    <div>
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              className="w-12 h-12 rounded-full bg-brand-teal text-white shadow-lg hover:bg-brand-teal/80 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {isChatOpen ? (
                <X className="scale-115" />
              ) : (
                <BotMessageSquare className="scale-115" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[400px]"
          >
            <Card className="shadow-xl border border-slate-200/80 rounded-2xl overflow-hidden">
              {/* Header */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4 py-3 bg-slate-900 text-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/40">
                    <BotMessageSquare className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-tight">
                      1Tech AI Assistant
                    </span>
                    <span className="text-[11px] text-slate-300">
                      Smart support for your banking platform
                    </span>
                  </div>
                </div>

                <Button
                  onClick={toggleChat}
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-slate-200 hover:text-white hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </CardHeader>

              {/* Messages */}
              <CardContent className="bg-slate-50/60 px-3  ">
                <ScrollArea className="h-[320px] pr-3">
                  {messages.length === 0 && (
                    <div className="w-full mt-4 mb-4 text-xs text-slate-600 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>
                          Ask 1Tech AI anything about your banking system, or
                          try one of these:
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {settings.questions.map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => handleSuggestedClick(q)}
                            disabled={status !== "ready"}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-700 shadow-sm hover:bg-emerald-50 hover:border-emerald-200 transition disabled:opacity-50 disabled:cursor-not-allowed text-left"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-3 flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-white text-slate-800 border border-slate-200"
                        }`}
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => (
                              <p
                                className={`mb-1 last:mb-0 ${
                                  message.role === "user"
                                    ? "text-white"
                                    : "text-slate-800"
                                }`}
                              >
                                {children}
                              </p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-semibold">
                                {children}
                              </strong>
                            ),
                            em: ({ children }) => (
                              <em className="italic">{children}</em>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="underline underline-offset-2 decoration-emerald-500 hover:text-emerald-600"
                              >
                                {children}
                              </a>
                            ),
                            ul: ({ children }) => (
                              <ul className="ml-4 list-disc space-y-1">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="ml-4 list-decimal space-y-1">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => (
                              <li className="pl-0.5">{children}</li>
                            ),
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-slate-300 pl-3 italic text-slate-600">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {message.parts
                            .map((part) =>
                              part.type === "text" ? part.text : ""
                            )
                            .join("")}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}

                  {(status === "submitted" || status === "streaming") && (
                    <div>
                      {status === "submitted" && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <Spinner />
                          <span>1Tech AI is thinking…</span>
                        </div>
                      )}
                    </div>
                  )}

                  {error && (
                    <div className="mt-4 flex flex-col items-center gap-1 text-xs text-red-500">
                      <div>Something went wrong.</div>
                      <Button
                        variant="link"
                        type="button"
                        onClick={() => regenerate()}
                        className="h-auto p-0 text-emerald-600 underline underline-offset-4"
                      >
                        Retry response
                      </Button>
                    </div>
                  )}

                  <div ref={scrollRef} />
                </ScrollArea>
              </CardContent>

              {/* Input */}
              <CardFooter className="border-t bg-white px-3 py-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim()) {
                      sendMessage({ text: input });
                      setInput("");
                    }
                  }}
                  className="flex w-full items-center gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={status !== "ready"}
                    placeholder="Ask 1Tech AI about your banking software..."
                    className="text-xs"
                  />

                  {status === "submitted" || status === "streaming" ? (
                    <Button
                      className="rounded-full h-9 w-9"
                      type="button"
                      variant="outline"
                      onClick={() => stop()}
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      className="rounded-full h-9 w-9"
                      type="submit"
                      disabled={status !== "ready" || input.trim() === ""}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
