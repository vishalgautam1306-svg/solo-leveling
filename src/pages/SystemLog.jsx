function SystemLog({ logs }) {
  return (
    <div>
      <h2>📜 System Log</h2>

      {logs.map((log, index) => (
        <div key={index}>
          <p>{log}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default SystemLog;