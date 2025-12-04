"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CameraOff, Check, X, AlertCircle, Loader2, RotateCcw } from "lucide-react";
import { checkIn } from "./actions";

type ScanResult = {
  success: boolean;
  message: string;
  registration?: {
    name: string;
    email: string;
  };
} | null;

export function Scanner({ eventId }: { eventId: string }) {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    successAudioRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleR0LQ5PY3c2fVBIcZ6vp8f+wSQUpfcTu/96xRAAfeL/y/vG5TgEDZbLi/v/NXAQBVaXV+PncaQgAR5bI6fHyfxQAOYu87uv2ixsALoC14en6mScAJHWt3OP7pyoAHm6l2eDxszABGmif0tzsuj4EElyO0NDnwUcIF1SK0cjcvU0NElOHzcHVtEsOEVOFyb3Pq0EMFFGBw7bKokELFFB+vrDDoTsKF094ua7AlDAJH0dwsqq5iSYIKUBnqqWyhiMHNjlesZ2nfRsHQTRUnJWhaRcKSSVGjoqXWBMRWRY5fn2NSRQXZAY0b25/RBEaag8pYWRzPRAecBUcVFhpOREgchkQSlRgNRMneRQFQklcMx4weQoAPkhTNiYzePr6NkhGOTI4cfT5+D9IOD82OG3x+P5HSEA/QEHN7/f/T0s/QkZOxu3z/lhLP0ZMWLzo8v1hTz5JT2Ov5PL5a1M+SlRrntzu8nVXPU1YeYzT6e99WzpPW4V8yd3pg187UF+QarrX4H9fOVBklFqszdV4XDdRaJlLnMPMcFk1U2ybPYy4wWhVM1ZwnC17rLheUTFZdJ4jZ6CuU000XHuhD1OUolBJM2B/phJBh5lLRTFkgaoOLnqSRkEvZ4awAR5xjD8+LWuKswASaYg5Oi5wjrcHAF+DNC00coq6AgBbfy0pMXWFvAIAWX0kIixxgL4FAFZ5HA8obn+9BQBUYA8FJGx7vgUATUcIASJqeLsHAEEsAwAgaXW5CwA1FAAAHmd0uBAAKQEAFGRztwkAIgAHEGFytwAAHAAPDV5xtvX/FwASCllwtfL/EgAOClRvtO7/DgAJC09utOv/CQAHDUpttef/BQAGD0Zsteb/AAAFEENrt+X/+/8EEz9quOT/+P8DFTxpueT/9f8CGDhoveP/8/8BHDRnvuL/8f//HjFmwOH/7/7/IDBlweD/7v7/IjFjw+D/7P3/JC9jxN/+6/3/JSxixuD+6fz/Jylix+D+6Pz/KCdjyN/+5vz/KSVjyt/85Pv/KiRjy9/74/v/KiRjzN/74vv/KiRjzd/64fv/KyRjzt/54fv/KyRjz9/44Pv/KyRj0N/44Pv/KyVj0N/34Pv/KyVk0N733/v/KyVk0N/23vv/KyVl0d/23vv/KiVm0t/13fv/KiZm0t/03fv/KSZn09/z3fv/KSZo1N/y3Pv/KCZp1d/x3Pv/Jydr1t/w2/v/Jidq19/v2/v/JSds2N/u2vv/JCht2d/t2vv/Iyhu2t/s2fr/ISlu29/r2Pr/IClu3N/q1/r/Hilv3d/p1/r/HClw3uDo1vr/GShx3+Hn1fr/Fyhx4OHm1fr/FSly4eHl1Pn/Eylz4uLk1Pn/ESp04+Pj0/n/Dyt15OTi0/n/DSx25eTh0vn/Cy125ubg0fn/CS5252fg0fn/CC926Ojfz/j/Bi927+rfz/j/BTBW8Orezvj/AjFW8uzez/j//zJW8+/d0Pj/+zNW9PLc0Pj/+DRW9fbb0fj/9TVX9vnb0vj/8jdX+Pva0/n/7zhX+P3a1Pn/7DlX+f/b1fn/6TpW+f/c1vn/5ztW+v/d1/n/5DxW+v/e2Pn/4T1V+v/f2fr/3j5V+//g2vr/2z9U+//h2/r/2EBU+//i3Pr/1UFU/P/j3fr/0kJT/P/k3vr/z0NS/P/l3/v/zERR/P/m4Pv/yUVQ/P/n4fv/xkZP/P/o4vv/w0dO/P/p4/v/wEhN/P/q5Pz/vUlM/P/r5fz/ukpL+//s5vz/t0tK+//t5/z/tExJ+//u6Pz/sU1I+//v6f3/rlBI+//w6v3/q1JH+//x6/3/qFNH+//y7P3/pVRG+//z7f7/olVF+//07v7/n1ZE+//17/7/nFdD+v/28P7/mVhC+v/38f7/llpB+v/48v7/k1s/+v/59P//kFw++v/69f//jV09+v/79v//ill8+f/89///h1p7+f/++P//hFt6+f///P//gVx4+P8=");
    errorAudioRef.current = new Audio("data:audio/wav;base64,UklGRl4FAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YToFAAB/gYqWpbK3t6yei4N+f4KLm62/ycjAr5mEen18hpmxwMfCsJqEe3x+i5+0xczHtJyEe3+Elau/zNDJtJ2IgIOLnbTF0M/HspeGgIWRprjJ0s/EqJF+fIaYr8HR1c3ApIt9fYqdrsTR1Me0m4R9gY+jssfS0MW0moh/hJGmtsrU0se2nYmCh5arssjV08i4n4yFipiqtsfT08i4n42IjZutt8bS0se3n42JjpyttsTQ0MW0m4uKkqGxvMfR0MWymomKk6S0vsnT0se3noyLlKW1vsjS0se2nomLlae3v8nS0MW0m4mLlqq4wcrS0Ma1nImKlaq5wcrR0MS0moiJlqu7w8zT0se2nIiJl6u7w8zS0MWzmYaHlau8xcvT0ci4nYiIl6y8xczT0Mq5noqJmK29xszS0Mm4nYqJmK2+xszS0Mi3nImIl628xs3T0cq5oIuJmK6+x83T0su6oYyKma+/yM7U0sy7o42LmrDAyc7U0sy7o42Lm7HAyc7U0sy7o42Lm7HAyc7U0sy7o42Mm7LAys/V086+p5COoLnJ1NjV0Me1mokMGio5R1djbHJzb2dZRTMfCxomNkNQXGZtcHBrYVRCMR4LDCE0RlRfZ29ycWxjV0U0IQwbL0FTYW1xdHVxaF1QQDAYHC5FV2ZwdHd2cm1mW00+LxkcKkNYZnJ3enh1cGdfUUMzJRoiN09hbnZ6e3t3cmljVUc5KRkfMEpbaneAg4N/enRqX1FDNioWHCtBU2Z0fIKEhIF9d29kVklANCoVKjxOYnF8goaHhoJ9dmxiVUlBPTMoMUZYaXiAhYqKiIR/eG5kWE1IREI7MT9RY3N+hYqNjYuIg3x0al9WTklKSDwySVtscnyCh4yOjYuGgXl0bGNZUk9NS0Y9QlRlcnqBh4uOjoyIgXt0b2ZdVE9OTUpFPEJWZ3V7goiLjY2MiYN9dXFpYFZPT01LSERASlpha3R8goiLjY2LiIF7dnBoX1dRT09NTEhHR1BgaXF6f4WHi4yLioaAe3ZvZ2BXUlJRT09NSVFSYW1yeX+DhomLi4qIhYB7dXBpYVtVU1NSUU9NT1JgaXF4fYKGiYuLiomFgHt2b2ljXFdTU1NSUFBTV2FqcHZ9gYWHiYqKiYaDf3t2cGpkXlhUVFRTU1NWWmJpb3R6foKFh4mKiomHhIF9eHRuaGNdWFVVVVRUVlhdY2ltcnh8gISGh4iJiYiGg4B8eHNuaGNeWVZWVlZXWV1hZmtvc3d7foGEhoiJiYiHhYKAe3dzb2pmYVxZV1dXWFtfYmZqbXF1eHt+gYOGh4iIiIeFg4F+e3dzbmpmYV1aWFhZWl5gY2ZpbHBzdnl8f4GDhYeHiIiHhoSBf3x5dnNuamZiXlpZWVpbX2FjZmlscHJ1eHt+gIKEhYaHh4aFhIF/fHl2c29raGRhXltaWlteYGJkZ2pscHJ1d3p8f4GDhIaGhoaFhIF/fXp3dHFuamdjYF1bW1xdYGJkZmlrbW9ydXd5fH6AgYOEhYaGhYSDgH58eXZzcW5qZ2RhXl1dXmBiZGZoamxtb3F0dnl7fX+BgoOEhYWFhYOBf316eHVzcG5rZ2RhX15eX2FjZWdpa2xub3F0dnh6fH5/gYKDhIWFhYSCgH58eXd0cm9sameUkJGTlpibn6OmqaqqqKShnpqXlJKQj4+QkpSYnKCkqKqsq6qoo5+cmZaUkpGQkJGTl5ufoqWoqquqqKSgnpqXlZOSkZGSk5ebnqKlp6qrq6mlop+cmZeVk5KRkpOVmJyfoquor7Ovq6OZj4R7cGRWSTwwJBsWFRkiMUJTZHV/hYmPk5WWlZORjImGgoB/fn5/goWIi46Rk5WWlZSSkI2Kh4SDgYCAgoSGiYuOkJKUlZWUk5GRkJKTlZeZnKCipaaoqampp6WioJ6cnJydn6Gio6WnqaqqqqqpqKempaSko6SlpaaopwUA");
  }, []);

  const playSound = useCallback((success: boolean) => {
    const audio = success ? successAudioRef.current : errorAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  const startScanner = async () => {
    setError(null);
    setResult(null);

    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          // Stop scanning while processing
          await html5QrCode.pause();
          setIsProcessing(true);

          try {
            const response = await checkIn(eventId, decodedText);
            setResult(response);
            playSound(response.success);
          } catch {
            setResult({
              success: false,
              message: "Gagal memproses QR code",
            });
            playSound(false);
          }

          setIsProcessing(false);
        },
        () => {}
      );

      setIsScanning(true);
    } catch {
      setError("Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.");
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        // Only stop if scanner is running or paused (state 2 or 3)
        if (state === 2 || state === 3) {
          await scannerRef.current.stop();
        }
        scannerRef.current = null;
      } catch {
        // Ignore errors
        scannerRef.current = null;
      }
    }
    setIsScanning(false);
  };

  const resetScanner = async () => {
    setResult(null);
    if (scannerRef.current) {
      try {
        await scannerRef.current.resume();
      } catch {
        await stopScanner();
        await startScanner();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        try {
          const state = scannerRef.current.getState();
          if (state === 2 || state === 3) {
            scannerRef.current.stop().catch(() => {});
          }
        } catch {
          // Ignore
        }
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Scanner Container */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <div 
          id="qr-reader" 
          ref={containerRef}
          className={`aspect-square bg-zinc-900 ${!isScanning ? 'hidden' : ''}`}
        />

        {!isScanning && !result && (
          <div className="aspect-square flex flex-col items-center justify-center bg-surface-hover">
            <div className="w-20 h-20 bg-surface rounded-2xl flex items-center justify-center mb-4 border border-border">
              <Camera className="w-10 h-10 text-muted" />
            </div>
            <p className="text-muted mb-6">Kamera belum aktif</p>
            <button
              onClick={startScanner}
              className="px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-all hover:shadow-lg hover:shadow-accent/25 active:scale-[0.98]"
            >
              Mulai Scan
            </button>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 flex items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <span className="font-medium">Memproses...</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <button 
              onClick={startScanner}
              className="text-sm text-red-600 dark:text-red-400 underline mt-1"
            >
              Coba lagi
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={`p-6 rounded-2xl border ${
          result.success 
            ? 'bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-900' 
            : 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-900'
        }`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              result.success ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {result.success ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <X className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${
                result.success 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {result.success ? 'Check-in Berhasil!' : 'Check-in Gagal'}
              </p>
              <p className={`text-sm ${
                result.success 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {result.message}
              </p>
              {result.registration && (
                <div className="mt-3 p-3 bg-white dark:bg-zinc-900 rounded-lg">
                  <p className="font-medium text-foreground">{result.registration.name}</p>
                  <p className="text-sm text-muted">{result.registration.email}</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={resetScanner}
            className="w-full mt-4 py-3 bg-surface border border-border rounded-xl font-medium text-foreground hover:bg-surface-hover transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Scan Lagi
          </button>
        </div>
      )}

      {/* Stop Button */}
      {isScanning && !result && (
        <button
          onClick={stopScanner}
          className="w-full py-3 bg-surface border border-border rounded-xl font-medium text-foreground hover:bg-surface-hover transition-colors flex items-center justify-center gap-2"
        >
          <CameraOff className="w-4 h-4" />
          Stop Scanner
        </button>
      )}
    </div>
  );
}
