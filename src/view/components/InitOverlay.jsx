import { APP_COPY } from '../../data/appContent.js';

export function InitOverlay({ onAwaken }) {
  return (
    <div className="init-overlay">
      <button className="start-button" type="button" onClick={onAwaken}>
        {APP_COPY.awakenLabel}
      </button>
    </div>
  );
}