"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Dumbbell } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "client" | "trainer";
  timestamp: string;
};

const initialMessages: Message[] = [
  { id: "1", content: "Szia! Hogy érzed magad a tegnapi edzés után?", sender: "trainer", timestamp: "09:15" },
  { id: "2", content: "Szia! Kicsit érzem az izomlázt a lábamban, de jó érzés 😊", sender: "client", timestamp: "09:22" },
  { id: "3", content: "Az teljesen normális a guggolás növelés után. Fontos, hogy jól nyújtottál utána?", sender: "trainer", timestamp: "09:25" },
  { id: "4", content: "Igen, csináltam 10 perc nyújtást ahogy mondtad. A foam roller is segített.", sender: "client", timestamp: "09:30" },
  { id: "5", content: "Szuper! Holnapra tervezett edzésnél könnyítünk a lábon és inkább felső testre fókuszálunk. Nézd meg az edzéstervedben, frissítettem!", sender: "trainer", timestamp: "09:35" },
  { id: "6", content: "Rendben, köszi! Egyébként a fehérje shakeot edzés előtt vagy után érdemes inni?", sender: "client", timestamp: "10:12" },
  { id: "7", content: "Edzés után javaslom, 30 percen belül. Ha reggel edzel, előtte egy könnyű reggeli (pl. banán + zabkása) elég, a shake-et utána idd meg. A lényeg a napi összfehérje bevitel legyen meg!", sender: "trainer", timestamp: "10:20" },
  { id: "8", content: "Értem, köszi a részletes választ! Akkor holnap 8-ra megyek.", sender: "client", timestamp: "10:25" },
  { id: "9", content: "Várunk! Ne felejtsd el a vizet és a törölközőt 💪", sender: "trainer", timestamp: "10:28" },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSend() {
    if (!newMessage.trim()) return;

    const msg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "client",
      timestamp: new Date().toLocaleTimeString("hu-HU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
          Üzenetek
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Beszélgess az edződdel
        </p>
      </div>

      <Card className="border-zinc-200 flex flex-col" style={{ height: "calc(100vh - 14rem)" }}>
        {/* Chat Header */}
        <CardHeader className="border-b pb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-lime/30">
              <AvatarFallback className="bg-lime/10 text-lime-dark font-semibold">
                <Dumbbell className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">Kiss Trainer</CardTitle>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Elérhető
              </p>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full" ref={scrollRef}>
            <div className="p-4 space-y-4">
              <div className="text-center">
                <span className="text-xs text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">
                  Ma
                </span>
              </div>
              {messages.map((msg) => {
                const isClient = msg.sender === "client";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isClient ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                        isClient
                          ? "bg-lime text-zinc-900 rounded-br-md"
                          : "bg-zinc-100 text-zinc-800 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          isClient ? "text-zinc-600" : "text-zinc-400"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Írj üzenetet..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="bg-lime text-zinc-900 hover:bg-lime-dark"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
