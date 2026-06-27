"use client";

import React, { useState } from 'react';

export function VideoModalButton() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsVideoOpen(true)}
        className="bg-surface text-primary border-2 border-primary/20 px-8 py-3.5 rounded-full font-label-sm text-label-sm font-bold hover:bg-primary/5 transition-colors flex items-center space-x-2"
      >
        <span className="material-symbols-outlined text-sm">play_circle</span>
        <span>Pelajari Lebih Lanjut</span>
      </button>

      {isVideoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden aspect-video shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Profil TK IT Bina Insan Mulia" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
