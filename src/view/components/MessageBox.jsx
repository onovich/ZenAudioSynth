export function MessageBox({ message }) {
  return <div className={`message-box ${message ? 'visible' : ''}`}>{message || '提示信息'}</div>;
}