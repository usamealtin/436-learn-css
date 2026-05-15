import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiShare2, FiAward, FiCheck, FiCalendar } from 'react-icons/fi';

interface CertificateViewProps {
  score: number;
}

const CertificateView: React.FC<CertificateViewProps> = ({ score }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const certNumber = `LC-${Date.now().toString(36).toUpperCase()}`;
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const downloadCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 1200, 850);
    gradient.addColorStop(0, '#1e3a5f');
    gradient.addColorStop(0.5, '#2d4a7a');
    gradient.addColorStop(1, '#1e3a5f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 850);

    // Border
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, 1140, 790);
    ctx.strokeStyle = '#f0c04080';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1110, 760);

    // Title
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 48px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE', 600, 180);
    ctx.font = '32px Georgia, serif';
    ctx.fillText('of Completion', 600, 230);

    // Decorative line
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(300, 260);
    ctx.lineTo(900, 260);
    ctx.stroke();

    // Award text
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '22px Arial, sans-serif';
    ctx.fillText('This is to certify that', 600, 320);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Georgia, serif';
    ctx.fillText('CSS Developer', 600, 380);

    // Subtitle
    ctx.fillStyle = '#c0c0c0';
    ctx.font = '18px Arial, sans-serif';
    ctx.fillText('has successfully completed the', 600, 440);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Georgia, serif';
    ctx.fillText('LearnCSS — Master CSS Interactively', 600, 480);

    // Score
    ctx.fillStyle = '#f0c040';
    ctx.font = 'bold 24px Georgia, serif';
    ctx.fillText(`Final Exam Score: ${score}%`, 600, 550);

    // Badge
    ctx.beginPath();
    ctx.arc(600, 650, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#f0c040';
    ctx.fill();
    ctx.fillStyle = '#1e3a5f';
    ctx.font = 'bold 20px Georgia, serif';
    ctx.fillText('✓', 600, 658);

    // Date & Certificate Number
    ctx.fillStyle = '#c0c0c0';
    ctx.font = '16px Arial, sans-serif';
    ctx.fillText(`Date: ${date}`, 400, 740);
    ctx.fillText(`Certificate #${certNumber}`, 800, 740);

    // Footer
    ctx.fillStyle = '#808080';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText('LearnCSS — learn-css-platform.com', 600, 790);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LearnCSS-Certificate-${certNumber}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(`https://learn-css-platform.com/cert/${certNumber}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
          <FiCheck className="text-green-600 dark:text-green-400" />
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            Certificate Earned!
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Congratulations! 🎉
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You've completed all modules and passed the Final Exam with {score}%.
        </p>

        {/* Certificate Preview */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-xl shadow-2xl p-8 mb-8 max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-4 border-2 border-yellow-400"></div>
            <div className="absolute inset-8 border border-yellow-400"></div>
          </div>
          <div className="relative">
            <FiAward className="text-yellow-400 text-4xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-yellow-400 mb-1">CERTIFICATE</h2>
            <p className="text-xl text-gray-300 mb-6">of Completion</p>
            <div className="w-32 h-0.5 bg-yellow-400 mx-auto mb-6"></div>
            <p className="text-gray-300 mb-2">This is to certify that</p>
            <p className="text-2xl font-bold text-white mb-2">CSS Developer</p>
            <p className="text-gray-300 mb-1">has successfully completed</p>
            <p className="text-xl text-yellow-400 font-semibold mb-4">LearnCSS — Master CSS Interactively</p>
            <p className="text-lg text-yellow-400 font-bold">Final Exam Score: {score}%</p>
            <div className="flex justify-between mt-8 text-sm text-gray-400">
              <span className="flex items-center"><FiCalendar className="mr-1" /> {date}</span>
              <span>#{certNumber}</span>
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={downloadCertificate}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <FiDownload />
            <span>Download Certificate</span>
          </button>
          <button
            onClick={shareToLinkedIn}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            <FiShare2 />
            <span>Share on LinkedIn</span>
          </button>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:border-blue-500 transition-all"
          >
            <FiAward />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
