import * as Tone from 'tone';

export function createAudioEngine() {
  let initialized = false;
  let globalFilter;
  let masterVolume;
  let reverb;

  const synths = {};

  const applyEnvelope = (synth, params) => {
    if (!synth?.envelope) {
      return;
    }

    synth.envelope.attack = params.envA;
    synth.envelope.decay = params.envD;
    synth.envelope.sustain = params.envS;
    synth.envelope.release = params.envR;
  };

  const toDb = (value) => (value === 0 ? -100 : 20 * Math.log10(value));

  async function init() {
    if (initialized) {
      return;
    }

    await Tone.start();

    reverb = new Tone.Reverb({ decay: 6, preDelay: 0.2, wet: 0.6 }).toDestination();
    masterVolume = new Tone.Volume(-12).connect(reverb);
    globalFilter = new Tone.Filter(2000, 'lowpass').connect(masterVolume);

    synths.sine = new Tone.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.1, decay: 2, sustain: 0, release: 3 },
    }).connect(globalFilter);

    synths.fm = new Tone.FMSynth({
      harmonicity: 1.5,
      modulationIndex: 2,
      oscillator: { type: 'sine' },
      modulation: { type: 'sine' },
      envelope: { attack: 0.05, decay: 2, sustain: 0, release: 3 },
    }).connect(globalFilter);

    synths.impulse = new Tone.MembraneSynth({
      pitchDecay: 0.02,
      octaves: 2,
      oscillator: { type: 'sine' },
      envelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.2 },
    }).connect(globalFilter);

    synths.saw = new Tone.Synth({
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.2, decay: 1, sustain: 0, release: 1.5 },
    }).connect(globalFilter);

    synths.noise = new Tone.NoiseSynth({
      noise: { type: 'pink' },
      envelope: { attack: 0.5, decay: 2, sustain: 0, release: 2 },
    }).connect(globalFilter);

    initialized = true;
  }

  function playAsset(asset) {
    if (!initialized) {
      return 0;
    }

    const params = asset.params;
    const frequency = params.freq;
    const duration = asset.config.length;
    const time = Tone.now();

    globalFilter?.frequency.rampTo(params.filter, 0.01);

    [synths.sine, synths.fm, synths.saw, synths.noise].forEach((synth) => applyEnvelope(synth, params));

    if (params.sine > 0) {
      synths.sine.volume.rampTo(toDb(params.sine), 0.01);

      if (asset.color === 'dew') {
        synths.sine.triggerAttackRelease(frequency * 0.4, duration, time);
        synths.sine.frequency.exponentialRampToValueAtTime(frequency * 1.8, time + params.envA + 0.05);
      } else {
        synths.sine.triggerAttackRelease(frequency, duration, time);
      }
    }

    if (params.fm > 0) {
      synths.fm.volume.rampTo(toDb(params.fm), 0.01);
      synths.fm.triggerAttackRelease(frequency, duration, time);
    }

    if (params.impulse > 0) {
      synths.impulse.volume.rampTo(toDb(params.impulse), 0.01);
      synths.impulse.triggerAttackRelease(frequency / 2, '16n', time);
    }

    if (params.saw > 0) {
      synths.saw.volume.rampTo(toDb(params.saw), 0.01);
      synths.saw.triggerAttackRelease(frequency / 2, duration, time);
    }

    if (params.noise > 0) {
      synths.noise.volume.rampTo(toDb(params.noise), 0.01);
      synths.noise.triggerAttackRelease(duration, time);
    }

    return Tone.Time(duration).toMilliseconds();
  }

  function dispose() {
    Object.values(synths).forEach((synth) => synth?.dispose?.());
    globalFilter?.dispose?.();
    masterVolume?.dispose?.();
    reverb?.dispose?.();
  }

  return {
    init,
    playAsset,
    dispose,
  };
}