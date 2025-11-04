import React, { useState, useRef } from 'react';

const SpeechRecorder = ({ recorderId, maxDuration = 10, onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        if (onRecordingComplete) {
          onRecordingComplete(audioBlob);
        }
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playRecording = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio);
      audio.play();
    }
  };

  return (
    <div className="speech-recorder">
      <div className="subsection-title">🎤 Speech Recorder</div>
      
      <div style={{ margin: '20px 0' }}>
        <button
          className={`record-button ${isRecording ? 'recording' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
          disabled={recordingTime >= maxDuration}
        >
          {isRecording ? '⏹️' : '🎤'}
        </button>
      </div>
      
      <div style={{ margin: '10px 0' }}>
        {isRecording && (
          <div>
            Recording... {recordingTime}s / {maxDuration}s
          </div>
        )}
        
        {recordedAudio && !isRecording && (
          <div>
            <div style={{ marginBottom: '10px' }}>
              ✅ Recording complete! ({recordingTime}s)
            </div>
            <button 
              className="btn btn-info"
              onClick={playRecording}
            >
              🔊 Play Recording
            </button>
          </div>
        )}
      </div>
      
      <div style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
        {!isRecording && !recordedAudio && 'Click the microphone to start recording'}
        {isRecording && 'Speak clearly into your microphone'}
        {recordedAudio && 'Great job! You can play back your recording above.'}
      </div>
    </div>
  );
};

export default SpeechRecorder;