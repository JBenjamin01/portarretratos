import React, { useRef, useState } from 'react';

interface CameraOverlayProps {
    onClose: () => void;
}

export default function CameraOverlay({ onClose }: CameraOverlayProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [photoTaken, setPhotoTaken] = useState(false);

    React.useEffect(() => {
        const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
            videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
        };

        startCamera();
    }, []);

    const takePhoto = () => {
        if (canvasRef.current && videoRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            setPhotoTaken(true);
        }
        }
    };

    const handleClose = () => {
        // Detener la cámara y cerrar el overlay
        const stream = videoRef.current?.srcObject as MediaStream;
        const tracks = stream?.getTracks();
        tracks?.forEach(track => track.stop());
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="relative">
            <video
            ref={videoRef}
            autoPlay
            className="w-[640px] h-[480px] mb-4 rounded-md"
            />
            {photoTaken && (
            <canvas ref={canvasRef} className="hidden" />
            )}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 space-x-4">
            <button
                onClick={takePhoto}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
            >
                Tomar Foto
            </button>
            <button
                onClick={handleClose}
                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700"
            >
                Salir
            </button>
            </div>
        </div>
        </div>
    );
}
