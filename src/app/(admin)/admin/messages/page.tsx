"use client";

import React, { useState } from "react";
import { dummyMessages } from "@/data/messages";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge from "@/components/admin/StatusBadge";
import { Mail, Send, Clock, User, Phone, CheckCircle2 } from "lucide-react";

export default function MessagesPage() {
  const [messages, setMessages] = useState(dummyMessages);
  const [activeId, setActiveId] = useState(dummyMessages[0]?.id || null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const activeMessage = messages.find(m => m.id === activeId);

  const handleSelectMessage = (id: string) => {
    setActiveId(id);
    // Mark as read locally
    setMessages(prev =>
      prev.map(m =>
        m.id === id && m.status === "unread" ? { ...m, status: "read" as const } : m
      )
    );
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeId) return;

    setIsSending(true);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(m =>
          m.id === activeId
            ? { 
                ...m, 
                status: "replied" as const, 
                repliedAt: new Date(), 
                replyMessage: replyText 
              }
            : m
        )
      );
      setReplyText("");
      setIsSending(false);
      alert("Reply confirmation email simulated and sent to guest!");
    }, 1000);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      <PageHeader 
        title="Guest Inquiries Mailbox" 
        description="View contact form submissions, honeymoon planning requests, and corporate packages queries."
      />

      {/* Inbox Split Layout Frame */}
      <div className="flex-1 flex bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-805 rounded-xl shadow-sm overflow-hidden min-h-0">
        
        {/* Left Side: Message List (take 1/3) */}
        <div className="w-full md:w-80 border-r border-slate-200 dark:border-zinc-800 flex flex-col min-h-0 bg-slate-50/10">
          <div className="p-4 border-b border-slate-250 dark:border-zinc-800 bg-slate-50/30 dark:bg-zinc-900/40 font-semibold text-xs text-slate-500 uppercase tracking-wider">
            Guest Inquiries ({messages.length})
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-zinc-800/80">
            {messages.map((msg) => {
              const isSelected = msg.id === activeId;
              return (
                <div
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg.id)}
                  className={`p-4 cursor-pointer transition-colors relative flex flex-col gap-1.5 ${
                    isSelected 
                      ? "bg-slate-100/70 dark:bg-zinc-800/50" 
                      : "hover:bg-slate-50/50 dark:hover:bg-zinc-800/10"
                  }`}
                >
                  {msg.status === "unread" && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-teal-500" />
                  )}
                  <div className="flex items-center justify-between pr-3">
                    <span className="font-bold text-xs text-slate-800 dark:text-zinc-200 truncate">
                      {msg.fullName}
                    </span>
                    <span className="text-[9px] text-slate-400 dark:text-zinc-500">
                      {new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-zinc-100 truncate">
                    {msg.subject || "Resort Inquiry"}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1 leading-normal">
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Message Details (take remaining) */}
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-zinc-900">
          {activeMessage ? (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Header metadata */}
              <div className="p-6 border-b border-slate-100 dark:border-zinc-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="text-base font-bold text-slate-950 dark:text-zinc-50">
                    {activeMessage.subject || "Resort Inquiry"}
                  </h3>
                  <StatusBadge status={activeMessage.status} />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 text-xs text-slate-500 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-teal-500" />
                    <span className="font-bold text-slate-850 dark:text-zinc-200">{activeMessage.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-teal-500" />
                    <span>{activeMessage.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-teal-500" />
                    <span>{activeMessage.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-teal-500" />
                    <span>Received on {new Date(activeMessage.createdAt).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Message text details */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="p-4 bg-slate-50/50 dark:bg-zinc-950 border border-slate-100 dark:border-zinc-850 rounded-xl leading-relaxed text-sm text-slate-750 dark:text-zinc-300">
                  <p className="whitespace-pre-line">{activeMessage.message}</p>
                </div>

                {/* Simulated replies display if replied */}
                {activeMessage.replyMessage && (
                  <div className="p-4 bg-teal-50/20 border border-teal-100 dark:bg-teal-950/10 dark:border-teal-900/30 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-xs font-semibold">
                      <CheckCircle2 size={14} />
                      <span>Replied on {activeMessage.repliedAt && new Date(activeMessage.repliedAt).toLocaleString("en-IN")}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-zinc-350 whitespace-pre-line">
                      {activeMessage.replyMessage}
                    </p>
                  </div>
                )}
              </div>

              {/* Reply Form */}
              {!activeMessage.replyMessage && (
                <form 
                  onSubmit={handleSendReply}
                  className="p-4 border-t border-slate-150 dark:border-zinc-800 bg-slate-50/20 dark:bg-zinc-950/10 space-y-3"
                >
                  <textarea
                    rows={3}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${activeMessage.fullName} via email...`}
                    className="block w-full px-3 py-2 text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-zinc-100"
                  />
                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isSending || !replyText.trim()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg shadow disabled:opacity-50 transition-colors"
                    >
                      <Send size={12} />
                      <span>{isSending ? "Sending..." : "Send Reply Email"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center text-slate-400 dark:text-zinc-500 flex-col gap-2">
              <Mail size={32} />
              <p className="text-xs">Select an inquiry to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
