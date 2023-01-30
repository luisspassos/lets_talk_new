import { useCallback, useEffect } from 'react';
import { PauseButton } from './PauseButton';
import { PlayButton } from './PlayButton';
import { useAudiosPlaying } from 'contexts/Audio/AudiosPlaying';
import { useAudio, Event } from 'contexts/Audio/AudioContext';

export type SetIsPlaying = (isPlaying: boolean) => void;

export function CurrentButton() {
  const { audiosPlaying, setAudiosPlaying } = useAudiosPlaying();
  const { audio, iterateAudioEvents } = useAudio();
  const index = audio?.index ?? 0;

  const isPlaying = audiosPlaying[index];

  const setIsPlaying: SetIsPlaying = useCallback(
    (isPlaying) => {
      const newAudiosPlaying = audiosPlaying.map((_, i) => {
        if (index !== i) return false;

        return isPlaying;
      });

      setAudiosPlaying(newAudiosPlaying);
    },
    [audiosPlaying, index, setAudiosPlaying]
  );

  // set audio events
  useEffect(() => {
    function resetAudio() {
      setIsPlaying(false);
    }

    const events: Event[] = [
      {
        type: 'ended',
        func: resetAudio,
      },
    ];

    iterateAudioEvents('add', events);

    return () => {
      iterateAudioEvents('remove', events);
    };
  }, [iterateAudioEvents, setIsPlaying]);

  const play = audio?.element.play.bind(audio.element);
  const pause = audio?.element.pause.bind(audio.element);

  // handle play and pause
  useEffect(() => {
    // to prevent useEffect from executing below code on first render
    if (isPlaying === null) return;

    if (isPlaying === true) {
      if (play === undefined) return;

      play();
    } else {
      if (pause === undefined) return;

      pause();
    }
  }, [isPlaying, pause, play]);

  if (isPlaying) return <PauseButton setIsPlaying={setIsPlaying} />;

  return <PlayButton setIsPlaying={setIsPlaying} />;
}