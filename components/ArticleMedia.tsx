'use client';

import { useState } from 'react';

interface ArticleMediaProps {
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
  title: string;
}

export function ArticleMedia({ image, imageAlt, videoUrl, title }: ArticleMediaProps) {
  const hasImage = Boolean(image && image.trim());
  const hasVideo = Boolean(videoUrl && videoUrl.trim());

  // Si no hay ninguno, no renderizamos nada
  if (!hasImage && !hasVideo) return null;

  // Si solo hay uno de los dos
  if (hasImage && !hasVideo) {
    return (
      <div className="mb-10 rounded-3xl overflow-hidden border border-[#E8EAE3] shadow-md bg-[#F4F5F0]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={imageAlt || title}
          className="w-full h-auto max-h-[520px] object-cover"
        />
        {imageAlt && (
          <div className="p-3 text-center text-xs text-[#64746B] bg-white border-t border-[#E8EAE3] italic">
            {imageAlt}
          </div>
        )}
      </div>
    );
  }

  // Componente del reproductor de video
  const renderVideoPlayer = () => {
    if (!videoUrl) return null;
    const isMp4 = videoUrl.includes('.mp4') || videoUrl.includes('.webm');
    const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:watch\?.*?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);

    if (isMp4) {
      return (
        <video
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto max-h-[540px] block mx-auto bg-black"
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      );
    }

    if (ytMatch) {
      return (
        <div className="aspect-video relative w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0`}
            title="Video del artículo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      );
    }

    return null;
  };

  if (!hasImage && hasVideo) {
    return (
      <div className="mb-10 rounded-3xl overflow-hidden shadow-xl border border-[#E8EAE3] bg-black max-w-4xl mx-auto">
        {renderVideoPlayer()}
      </div>
    );
  }

  // Si existen AMBOS (Foto y Video): Carrusel / Selector elegante de pestaña (Foto / Video)
  return <MediaSlideTabs image={image!} imageAlt={imageAlt} renderVideoPlayer={renderVideoPlayer} title={title} />;
}

function MediaSlideTabs({
  image,
  imageAlt,
  renderVideoPlayer,
  title,
}: {
  image: string;
  imageAlt?: string;
  renderVideoPlayer: () => React.ReactNode;
  title: string;
}) {
  const [activeTab, setActiveTab] = useState<'video' | 'photo'>('video');

  return (
    <div className="mb-10 rounded-3xl overflow-hidden border border-[#E8EAE3] shadow-md bg-white">
      {/* Controles del Slide / Selector superior */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F4F5F0] border-b border-[#E8EAE3]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              activeTab === 'video'
                ? 'bg-[#2C5E43] text-white shadow-sm'
                : 'bg-white text-[#64746B] hover:text-[#17201B] border border-[#E8EAE3]'
            }`}
          >
            <span>🎬</span> Video
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              activeTab === 'photo'
                ? 'bg-[#2C5E43] text-white shadow-sm'
                : 'bg-white text-[#64746B] hover:text-[#17201B] border border-[#E8EAE3]'
            }`}
          >
            <span>📷</span> Foto
          </button>
        </div>
        <span className="text-[11px] text-[#64746B] font-medium hidden sm:inline">
          Multimedia del artículo
        </span>
      </div>

      {/* Visor interactivo */}
      <div className="relative bg-black min-h-[300px] flex items-center justify-center">
        {activeTab === 'video' ? (
          <div className="w-full">{renderVideoPlayer()}</div>
        ) : (
          <div className="w-full bg-[#F4F5F0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={imageAlt || title}
              className="w-full h-auto max-h-[520px] object-cover"
            />
            {imageAlt && (
              <div className="p-3 text-center text-xs text-[#64746B] bg-white border-t border-[#E8EAE3] italic">
                {imageAlt}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
