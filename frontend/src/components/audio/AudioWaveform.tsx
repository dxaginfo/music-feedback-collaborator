import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

interface AudioWaveformProps {
  audioUrl: string;
  onTimeUpdate?: (time: number) => void;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ audioUrl, onTimeUpdate }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Initialize wavesurfer
  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#8d81d3',
        progressColor: '#4f3cc9',
        cursorColor: '#ff5722',
        barWidth: 2,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 2,
        responsive: true,
      });

      wavesurfer.current.load(audioUrl);

      wavesurfer.current.on('ready', () => {
        if (wavesurfer.current) {
          setDuration(wavesurfer.current.getDuration());
        }
      });

      wavesurfer.current.on('audioprocess', () => {
        if (wavesurfer.current) {
          const time = wavesurfer.current.getCurrentTime();
          setCurrentTime(time);
          if (onTimeUpdate) onTimeUpdate(time);
        }
      });

      wavesurfer.current.on('seek', () => {
        if (wavesurfer.current) {
          const time = wavesurfer.current.getCurrentTime();
          setCurrentTime(time);
          if (onTimeUpdate) onTimeUpdate(time);
        }
      });

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }
      };
    }
  }, [audioUrl, onTimeUpdate]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setPlaying(!playing);
    }
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const time = typeof newValue === 'number' ? newValue : newValue[0];
    if (wavesurfer.current) {
      wavesurfer.current.seekTo(time / duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Box ref={waveformRef} sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={handlePlayPause} color="primary">
          {playing ? <Pause /> : <PlayArrow />}
        </IconButton>
        <Slider
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
          aria-labelledby="continuous-slider"
          sx={{ mx: 2 }}
        />
        <Typography variant="body2">
          {formatTime(currentTime)} / {formatTime(duration)}
        </Typography>
      </Box>
    </Box>
  );
};

export default AudioWaveform;