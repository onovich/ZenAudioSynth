export function SliderControl({ field, value, onChange }) {
  return (
    <label className="slider-group">
      <input
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(event) => onChange(field.name, Number(event.target.value))}
      />
      <span className="slider-label">{field.label}</span>
    </label>
  );
}