export const COLOR_PALETTES = {
  default: ['#EAE7E0', '#D8D4CA', '#EAE7E0'],
  bowl: ['#D6C3A3', '#8A9A86', '#EAE7E0'],
  wood: ['#A89B8C', '#7A6B5D', '#EAE7E0'],
  sand: ['#E5D3B3', '#D4C4A8', '#EAE7E0'],
  dew: ['#A0B4B7', '#C2D6D8', '#EAE7E0'],
  paper: ['#F5F2EB', '#D8D4CA', '#EAE7E0'],
};

export const PARAMETER_FIELDS = [
  { name: 'noise', label: 'Noise', min: 0, max: 1, step: 0.01, defaultValue: 0, group: 'source' },
  { name: 'impulse', label: 'Impulse', min: 0, max: 1, step: 0.01, defaultValue: 0, group: 'source' },
  { name: 'sine', label: 'Sine', min: 0, max: 1, step: 0.01, defaultValue: 0, group: 'source' },
  { name: 'fm', label: 'FM', min: 0, max: 1, step: 0.01, defaultValue: 0, group: 'source' },
  { name: 'saw', label: 'Saw', min: 0, max: 1, step: 0.01, defaultValue: 0, group: 'source' },
  { name: 'freq', label: 'Freq', min: 50, max: 2000, step: 1, defaultValue: 220, group: 'shape' },
  { name: 'filter', label: 'Filter', min: 100, max: 10000, step: 10, defaultValue: 2000, group: 'shape' },
  { name: 'envA', label: 'Atk', min: 0.005, max: 2, step: 0.01, defaultValue: 0.1, group: 'shape' },
  { name: 'envD', label: 'Dec', min: 0.05, max: 5, step: 0.01, defaultValue: 2, group: 'shape' },
  { name: 'envS', label: 'Sus', min: 0, max: 1, step: 0.01, defaultValue: 0, group: 'shape' },
  { name: 'envR', label: 'Rel', min: 0.1, max: 5, step: 0.01, defaultValue: 3, group: 'shape' },
];

export const PRESET_ASSETS = [
  {
    id: 'p1',
    name: '空钵 / Empty Bowl',
    type: 'preset',
    color: 'bowl',
    params: { noise: 0, impulse: 0.1, sine: 0.9, fm: 0.3, saw: 0, freq: 220, filter: 3000, envA: 0.1, envD: 2, envS: 0, envR: 3 },
    config: { length: '1n' },
  },
  {
    id: 'p2',
    name: '朽木 / Dead Wood',
    type: 'preset',
    color: 'wood',
    params: { noise: 0.1, impulse: 0.6, sine: 0.4, fm: 0.05, saw: 0, freq: 100, filter: 800, envA: 0.01, envD: 0.4, envS: 0, envR: 0.2 },
    config: { length: '4n' },
  },
  {
    id: 'p3',
    name: '流沙 / Flowing Sand',
    type: 'preset',
    color: 'sand',
    params: { noise: 0.7, impulse: 0.3, sine: 0, fm: 0, saw: 0, freq: 300, filter: 5000, envA: 0.5, envD: 2, envS: 0.5, envR: 2 },
    config: { length: '2n' },
  },
  {
    id: 'p4',
    name: '露滴 / Dew Drop',
    type: 'preset',
    color: 'dew',
    params: { noise: 0, impulse: 0.1, sine: 0.9, fm: 0, saw: 0, freq: 500, filter: 8000, envA: 0.005, envD: 0.15, envS: 0, envR: 0.2 },
    config: { length: '16n' },
  },
  {
    id: 'p5',
    name: '纸息 / Paper Breath',
    type: 'preset',
    color: 'paper',
    params: { noise: 0.5, impulse: 0.1, sine: 0, fm: 0, saw: 0.2, freq: 150, filter: 2000, envA: 0.2, envD: 1.5, envS: 0.2, envR: 1.5 },
    config: { length: '2n' },
  },
];

export function cloneAsset(asset) {
  return JSON.parse(JSON.stringify(asset));
}

export function createCustomAssetName(index) {
  return `Void-${index}`;
}