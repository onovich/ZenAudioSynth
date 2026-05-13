import { APP_COPY } from '../../data/appContent.js';
import { PARAMETER_FIELDS } from '../../data/audioAssets.js';
import { AssetOrb } from '../components/AssetOrb.jsx';
import { InitOverlay } from '../components/InitOverlay.jsx';
import { MessageBox } from '../components/MessageBox.jsx';
import { SliderControl } from '../components/SliderControl.jsx';

const sourceFields = PARAMETER_FIELDS.filter((field) => field.group === 'source');
const shapeFields = PARAMETER_FIELDS.filter((field) => field.group === 'shape');

export function ZenAudioSynthScreen({ controller }) {
  const {
    audioReady,
    canvasRef,
    clearSelection,
    closePanel,
    customAssets,
    editingAsset,
    message,
    openPanel,
    panelOpen,
    presetAssets,
    remixAsset,
    renameAsset,
    saveAsset,
    selectAsset,
    selectedAssetId,
    showContextAction,
    awaken,
    updateParam,
  } = controller;

  const isCustomAsset = editingAsset?.type === 'custom';
  const panelStatus = isCustomAsset ? APP_COPY.panel.customStatus : APP_COPY.panel.presetStatus;

  return (
    <div className="app-shell" onClick={clearSelection}>
      <div className="noise-overlay" />
      <canvas ref={canvasRef} className="fluid-canvas" />
      <MessageBox message={message} />

      <div className="ui-layer app-padding">
        <header className="app-header">
          <h1 className="app-title">{APP_COPY.title}</h1>
          <p className="app-subtitle">{APP_COPY.subtitle}</p>
        </header>

        <main className="workspace">
          {!audioReady && <InitOverlay onAwaken={awaken} />}

          <div className="asset-area" onClick={(event) => event.stopPropagation()}>
            <div className="asset-grid">
              {presetAssets.map((asset) => (
                <AssetOrb
                  key={asset.id}
                  active={selectedAssetId === asset.id}
                  asset={asset}
                  onClick={() => selectAsset(asset)}
                />
              ))}
            </div>

            {customAssets.length > 0 && (
              <section className="custom-assets-section">
                <p className="custom-assets-title">{APP_COPY.customSectionLabel}</p>
                <div className="custom-assets-grid">
                  {customAssets.map((asset) => (
                    <AssetOrb
                      key={asset.id}
                      active={selectedAssetId === asset.id}
                      asset={asset}
                      onClick={() => selectAsset(asset)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>

        <div className={`context-actions ${showContextAction ? 'is-visible' : ''}`} onClick={(event) => event.stopPropagation()}>
          <button className="btn-minimal" type="button" onClick={openPanel}>
            {APP_COPY.buttons.deconstruct}
          </button>
        </div>
      </div>

      <section className={`deconstruct-panel ${panelOpen ? 'open' : ''}`} onClick={(event) => event.stopPropagation()}>
        <div className="panel-header">
          <div className="panel-header-copy">
            {isCustomAsset ? (
              <input
                className="panel-title-input"
                type="text"
                value={editingAsset?.name ?? APP_COPY.panel.emptyTitle}
                onChange={(event) => renameAsset(event.target.value)}
              />
            ) : (
              <h2 className="panel-title">{editingAsset?.name ?? APP_COPY.panel.emptyTitle}</h2>
            )}
            <p className="panel-status">{editingAsset ? panelStatus : APP_COPY.panel.emptyStatus}</p>
          </div>

          <div className="panel-actions">
            {!isCustomAsset && editingAsset && (
              <button className="btn-minimal" type="button" onClick={remixAsset}>
                {APP_COPY.buttons.remix}
              </button>
            )}
            <button className={`btn-minimal btn-primary ${isCustomAsset ? '' : 'btn-disabled'}`} type="button" onClick={saveAsset} disabled={!isCustomAsset}>
              {APP_COPY.buttons.save}
            </button>
            <button className="btn-minimal btn-close" type="button" onClick={closePanel}>
              {APP_COPY.buttons.close}
            </button>
          </div>
        </div>

        <div className="slider-rows">
          <div className="slider-row">
            {sourceFields.map((field) => (
              <SliderControl
                key={field.name}
                field={field}
                value={editingAsset?.params[field.name] ?? field.defaultValue}
                onChange={updateParam}
              />
            ))}
          </div>

          <div className="slider-row bordered">
            {shapeFields.map((field) => (
              <SliderControl
                key={field.name}
                field={field}
                value={editingAsset?.params[field.name] ?? field.defaultValue}
                onChange={updateParam}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}