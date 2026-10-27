import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Trash2, Play, Pause, AlertCircle } from 'lucide-react';
import { formatDuration } from '../utils/formatters';

export default function AudioRecorder({ onAudioRecorded, initialBlob = null, initialDuration = 0 }) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(initialDuration);
  const [audioUrl, setAudioUrl] = useState(null);
  const [permissionError, setPermissionError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const audioElemRef = useRef(null);

  // Sync initial blob if provided (e.g. when editing)
  useEffect(() => {
    if (initialBlob) {
      const url = URL.createObjectURL(initialBlob);
      setAudioUrl(url);
      setDuration(initialDuration);
      return () => URL.revokeObjectURL(url);
    }
  }, [initialBlob, initialDuration]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const startRecording = async () => {
    setPermissionError(null);
    audioChunksRef.current = [];

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionError('Audio recording is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        onAudioRecorded(audioBlob, duration);
        // Stop all tracks to release mic hardware
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      const startTime = Date.now();
      timerIntervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setDuration(elapsed);
      }, 500);
    } catch (err) {
      console.error('Microphone error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionError('Microphone permission was denied. Please allow microphone access in your browser settings.');
      } else {
        setPermissionError('Could not access microphone: ' + err.message);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
  };

  const discardRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setDuration(0);
    setIsPlaying(false);
    onAudioRecorded(null, 0);
  };

  const togglePlayback = () => {
    if (!audioElemRef.current) return;
    if (isPlaying) {
      audioElemRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElemRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="audio-recorder-panel">
      <div className="recorder-info">
        <div className={`mic-badge ${isRecording ? 'recording' : ''}`}>
          <Mic size={20} />
        </div>
        <div className="recorder-text">
          <h4>{isRecording ? 'Listening and capturing story...' : audioUrl ? 'Voice Recording Attached' : 'Oral History Recording'}</h4>
          <p>
            {isRecording
              ? 'Speak naturally. Take your time to recall details.'
              : audioUrl
              ? 'Audio captured and saved locally with this memory.'
              : 'Record a spoken memory, conversation, or oral family history.'}
          </p>
        </div>
      </div>

      <div className="recorder-controls">
        {permissionError && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B93535', fontSize: '0.8rem' }}>
            <AlertCircle size={15} />
            <span>{permissionError}</span>
          </div>
        )}

        {!isRecording && !audioUrl && (
          <button
            type="button"
            className="btn-secondary"
            onClick={startRecording}
            id="btn-start-audio-record"
          >
            <Mic size={16} />
            <span>Record Voice</span>
          </button>
        )}

        {isRecording && (
          <>
            <span className="timer-tag" aria-live="polite">
              {formatDuration(duration)}
            </span>
            <button
              type="button"
              className="btn-primary"
              style={{ backgroundColor: '#B93535' }}
              onClick={stopRecording}
              id="btn-stop-audio-record"
            >
              <Square size={16} />
              <span>Finish Recording</span>
            </button>
          </>
        )}

        {audioUrl && !isRecording && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="archival-player">
              <button
                type="button"
                className="player-btn"
                onClick={togglePlayback}
                aria-label={isPlaying ? 'Pause audio preview' : 'Play audio preview'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <span className="player-time">{formatDuration(duration)}</span>
              <audio
                ref={audioElemRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
              />
            </div>

            <button
              type="button"
              className="btn-icon"
              title="Discard recording"
              onClick={discardRecording}
              aria-label="Discard recording"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
