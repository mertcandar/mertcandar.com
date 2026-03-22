export default function ScanlineOverlay() {
  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)'
      }}
    />
  );
}
