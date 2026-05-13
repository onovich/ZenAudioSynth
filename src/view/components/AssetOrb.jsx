export function AssetOrb({ active, asset, onClick }) {
  const label = asset.name.split(' / ')[0];

  return (
    <button className={`asset-orb ${active ? 'active' : ''}`} type="button" onClick={onClick}>
      <span className="asset-orb-label">{label}</span>
    </button>
  );
}