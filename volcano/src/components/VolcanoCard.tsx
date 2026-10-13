interface VolcanoCardProps {
  name: string;
  location: string;
  status: string;
  onClick: () => void;
}

export function VolcanoIcon() {
  return (
    <svg className="volcano-icon" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M6 56 L32 12 L58 56 Z" fill="#e85d04" />
      <path d="M24 56 L32 34 L40 56 Z" fill="#ffb703" />
      <circle cx="32" cy="16" r="5" fill="#ffd166" />
    </svg>
  );
}

export function VolcanoCard({ name, location, status, onClick }: VolcanoCardProps) {
  return (
    <button type="button" className={`v-card status-${statusKey(status)}`} onClick={onClick}>
      <VolcanoIcon />
      <span className="v-card-name">{name}</span>
      <span className="v-card-place">{location}</span>
      <span className="v-card-status">{status}</span>
    </button>
  );
}

function statusKey(status: string): string {
  if (status === "Correct") return "correct";
  if (status === "Needs another look") return "review";
  if (status === "Answer saved") return "saved";
  return "new";
}
