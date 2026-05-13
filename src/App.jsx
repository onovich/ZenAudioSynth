import { useZenAudioSynth } from './logic/hooks/useZenAudioSynth.js';
import { ZenAudioSynthScreen } from './view/screens/ZenAudioSynthScreen.jsx';

function App() {
  const controller = useZenAudioSynth();

  return <ZenAudioSynthScreen controller={controller} />;
}

export default App;