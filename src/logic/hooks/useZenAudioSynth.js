import { useEffect, useRef, useState } from 'react';
import { APP_COPY } from '../../data/appContent.js';
import { COLOR_PALETTES, PRESET_ASSETS, cloneAsset, createCustomAssetName } from '../../data/audioAssets.js';
import { createAudioEngine } from '../engine/audioEngine.js';
import { createFluidRenderer } from '../engine/fluidRenderer.js';

export function useZenAudioSynth() {
  const canvasRef = useRef(null);
  const audioEngineRef = useRef(null);
  const rendererRef = useRef(null);
  const paletteRef = useRef(COLOR_PALETTES.default);
  const paletteResetTimerRef = useRef(0);
  const messageTimerRef = useRef(0);

  if (!audioEngineRef.current) {
    audioEngineRef.current = createAudioEngine();
  }

  const [audioReady, setAudioReady] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [editingAsset, setEditingAsset] = useState(null);
  const [customAssets, setCustomAssets] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [targetColors, setTargetColors] = useState(COLOR_PALETTES.default);

  useEffect(() => {
    paletteRef.current = targetColors;
  }, [targetColors]);

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    rendererRef.current = createFluidRenderer(canvasRef.current, () => paletteRef.current);

    return () => {
      window.clearTimeout(messageTimerRef.current);
      window.clearTimeout(paletteResetTimerRef.current);
      rendererRef.current?.stop();
      audioEngineRef.current?.dispose();
    };
  }, []);

  const showMessage = (nextMessage) => {
    setMessage(nextMessage);
    window.clearTimeout(messageTimerRef.current);
    messageTimerRef.current = window.setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  const schedulePaletteReset = (durationMs) => {
    window.clearTimeout(paletteResetTimerRef.current);
    paletteResetTimerRef.current = window.setTimeout(() => {
      setTargetColors(COLOR_PALETTES.default);
    }, durationMs + 1000);
  };

  const playAsset = (asset) => {
    if (!audioReady) {
      return;
    }

    const durationMs = audioEngineRef.current.playAsset(asset);
    setTargetColors(COLOR_PALETTES[asset.color] ?? COLOR_PALETTES.default);
    schedulePaletteReset(durationMs);
  };

  const selectAsset = (asset) => {
    const detachedAsset = cloneAsset(asset);
    setSelectedAssetId(asset.id);
    setEditingAsset(detachedAsset);
    playAsset(detachedAsset);
  };

  const awaken = async () => {
    await audioEngineRef.current.init();
    setAudioReady(true);
    showMessage(APP_COPY.messages.awake);
  };

  const clearSelection = () => {
    setSelectedAssetId(null);
    setEditingAsset(null);
    setPanelOpen(false);
  };

  const openPanel = () => {
    if (editingAsset) {
      setPanelOpen(true);
    }
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  const updateParam = (name, value) => {
    if (!editingAsset) {
      return;
    }

    const nextAsset = cloneAsset(editingAsset);
    nextAsset.params[name] = value;
    setEditingAsset(nextAsset);
    playAsset(nextAsset);
  };

  const remixAsset = () => {
    if (!editingAsset) {
      return;
    }

    const newAsset = {
      ...cloneAsset(editingAsset),
      id: `c${Date.now()}`,
      name: createCustomAssetName(customAssets.length + 1),
      type: 'custom',
    };

    setCustomAssets((currentAssets) => [...currentAssets, newAsset]);
    setSelectedAssetId(newAsset.id);
    setEditingAsset(newAsset);
    setPanelOpen(true);
    showMessage(APP_COPY.messages.remixed);
  };

  const renameAsset = (value) => {
    if (!editingAsset || editingAsset.type !== 'custom') {
      return;
    }

    const nextName = value || APP_COPY.fallbackCustomName;
    const nextAsset = { ...editingAsset, name: nextName };

    setEditingAsset(nextAsset);
    setCustomAssets((currentAssets) => currentAssets.map((asset) => {
      if (asset.id !== nextAsset.id) {
        return asset;
      }

      return { ...asset, name: nextName };
    }));
  };

  const saveAsset = () => {
    if (!editingAsset || editingAsset.type !== 'custom') {
      return;
    }

    setCustomAssets((currentAssets) => currentAssets.map((asset) => {
      if (asset.id !== editingAsset.id) {
        return asset;
      }

      return cloneAsset(editingAsset);
    }));
    showMessage(APP_COPY.messages.saved);
  };

  return {
    audioReady,
    canvasRef,
    clearSelection,
    closePanel,
    customAssets,
    editingAsset,
    message,
    openPanel,
    panelOpen,
    presetAssets: PRESET_ASSETS,
    remixAsset,
    renameAsset,
    saveAsset,
    selectAsset,
    selectedAssetId,
    showContextAction: Boolean(editingAsset) && !panelOpen,
    awaken,
    updateParam,
  };
}