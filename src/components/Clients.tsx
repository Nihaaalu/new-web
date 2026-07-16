import React, { useEffect, useState } from "react";
import { Client } from "../types";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch("/data/clients.json")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load clients configurations");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setClients(data);
        }
      })
      .catch(() => {
        // Safe empty state if not found or misconfigured
        setClients([]);
      });
  }, []);

  // Safe fallback to prevent rendering empty elements if no partners exist yet
  if (clients.length === 0) {
    return null;
  }

  // Multiply entries to guarantee standard scroll loop span without gaps
  const itemsCount = clients.length;
  const loopMultiplier = itemsCount < 4 ? 6 : 4;
  const loopedClients = Array(loopMultiplier).fill(clients).flat();

  return (
    <section
      id="clients"
      className="relative w-full py-16 bg-white overflow-hidden border-y border-neutral-100 flex flex-col items-center select-none"
    >
      {/* Dynamic Keyframes for perfect left-to-right infinite loops */}
      <style>{`
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .marquee-inner-loop {
          display: flex;
          width: max-content;
          animation: marquee-reverse 35s linear infinite;
        }
        .marquee-inner-loop:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Decorative tracking text */}
      <div className="max-w-6xl mx-auto w-full px-6 mb-8 flex flex-col sm:flex-row items-center justify-between text-left gap-4 font-sans">
        <div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase">
            TRUSTED PARTNERS
          </span>
          <h3 className="text-xl font-normal text-neutral-950 tracking-tight">
            Companies Powering Growth with HRBY Solutions
          </h3>
        </div>
        <span className="hidden sm:block font-mono text-[10px] text-neutral-450 border border-neutral-200 rounded-full px-3 py-1 bg-neutral-50">
          [ Pause on Hover ]
        </span>
      </div>

      {/* Marquee container with soft left/right feather blends */}
      <div className="w-full relative overflow-hidden" id="clients-scrolling-container">
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="marquee-inner-loop gap-8 sm:gap-14 py-2">
          {loopedClients.map((client, index) => (
            <ClientNode key={`${client.name}-${index}`} client={client} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Single Client Logo Node
function ClientNode({ client, index }: { client: Client; index: number; key?: string | number }) {
  const [hasError, setHasError] = useState(false);

  return (
    <a
      href={client.link || "#"}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-center h-16 w-36 sm:w-44 px-6 rounded-xl border border-neutral-150 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300 filter grayscale contrast-125 hover:grayscale-0"
      id={`client-node-${index}`}
    >
      {!hasError && client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          onError={() => setHasError(true)}
          className="max-h-8 max-w-full object-contain opacity-75 group-hover:opacity-100 transition-opacity"
        />
      ) : (
        /* Dynamic premium logotype text backing */
        <span className="font-sans font-semibold tracking-widest text-[11px] sm:text-xs text-neutral-850 select-none uppercase group-hover:scale-105 transition-transform">
          {client.name}
        </span>
      )}
    </a>
  );
}
