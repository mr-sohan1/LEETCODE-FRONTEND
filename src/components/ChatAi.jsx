import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatAi({ problem }) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isLoading]);

    const onSubmit = async (data) => {
        const updatedMessages = [
            ...messages,
            {
                role: "user",
                parts: [{ text: data.message }],
            },
        ];

        setMessages(updatedMessages);
        reset();
        setIsLoading(true);

        try {
            const response = await axiosClient.post("/ai/chat", {
                messages: updatedMessages,
                title: problem.title,
                description: problem.description,
                testCases: problem.visibleTestCases,
                startCode: problem.startCode,
            });

            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    parts: [{ text: response.data.message }],
                },
            ]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    parts: [{ text: "Error from AI Chatbot" }],
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
               {messages.length === 0 && (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">


        <h2 className="text-2xl font-semibold">
            Hey, I'm Erical<span className="text-[#4ADE80]">AI</span>
        </h2>

        <p className="mt-3 max-w-lg text-sm text-base-content/70 leading-7">
            Your DSA coding companion.
            Ask for hints, debugging, complexity analysis,
            or explanations whenever you need help.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="badge badge-outline"> Hints</span>
            <span className="badge badge-outline"> Debug</span>
            <span className="badge badge-outline"> Complexity</span>
            <span className="badge badge-outline"> Concepts</span>
        </div>

    </div>
)}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat ${
                            msg.role === "user"
                                ? "chat-end"
                                : "chat-start"
                        }`}
                    >
                        <div
                            className={`chat-bubble max-w-full overflow-x-auto ${
                                msg.role === "user"
                                    ? "bg-base-300 text-base-content"
                                    : "bg-base-200 text-base-content"
                            }`}
                        >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.parts[0].text}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="chat chat-start">
                        <div className="chat-bubble bg-base-200 flex items-center gap-3">
                            <span className="loading loading-dots loading-md"></span>
                            <span className="text-sm font-medium">
                                AI is thinking...
                            </span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="sticky bottom-0 p-4 border-t bg-base-100"
            >
                <div className="flex items-center gap-2">
                    <input
                        placeholder="Ask me anything..."
                        className="input input-bordered flex-1"
                        {...register("message", {
                            required: true,
                            minLength: 2,
                        })}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={errors.message || isLoading}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChatAi;