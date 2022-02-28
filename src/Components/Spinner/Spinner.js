export function Spinner() {
  return (
    <div style={{ zIndex: "100" }} className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
