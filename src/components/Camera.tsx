'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Camera as CameraIcon, FlipHorizontal, X } from 'lucide-react';

interface CameraProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export default function Camera({ onCapture, onClose }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        await videoRef.current.play();
        setIsReady(true);
      }
      
      setStream(newStream);
      setError(null);
    } catch (err) {
      console.error('Camera error:', err);
      setError('Could not access camera. Please grant permission.');
    }
  }, [facingMode, stream]);

  useEffect(() => {
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Mirror if using front camera
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    onCapture(imageData);
  }, [facingMode, onCapture]);

  const flipCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white"
        >
          <X size={24} />
        </button>
        <span className="text-white font-bold text-lg">Find an Animal!</span>
        <button
          onClick={flipCamera}
          className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white"
        >
          <FlipHorizontal size={24} />
        </button>
      </div>

      {/* Video feed */}
      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
            <div>
              <p className="mb-4">{error}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-pokedex-red rounded-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
          />
        )}
        
        {/* Viewfinder overlay */}
        {isReady && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-12 border-4 border-white/50 rounded-3xl">
              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-pokedex-red rounded-tl-xl" />
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-pokedex-red rounded-tr-xl" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-pokedex-red rounded-bl-xl" />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-pokedex-red rounded-br-xl" />
            </div>
          </div>
        )}
      </div>

      {/* Capture button */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center bg-gradient-to-t from-black/50 to-transparent">
        <button
          onClick={capturePhoto}
          disabled={!isReady}
          className="capture-btn active:scale-95 transition-transform disabled:opacity-50"
          aria-label="Capture photo"
        />
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
