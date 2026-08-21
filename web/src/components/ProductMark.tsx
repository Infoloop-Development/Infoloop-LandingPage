/** Product marks in the brand style (five-bar geometry, one orange accent) until final logos exist. */
export function ProductMark({ name, size = 56 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 56 56", fill: "none", "aria-hidden": true as const };
  if (name === "OpsDeck") {
    // attendance: a clock face with an orange hand
    return (
      <svg {...common}>
        <rect x="6" y="6" width="44" height="44" rx="12" fill="#0A0A0A" />
        <circle cx="28" cy="28" r="14" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M28 18v10l7 4" stroke="#F47B00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "GarageZone") {
    // garage: a bay outline with an orange car block
    return (
      <svg {...common}>
        <rect x="6" y="6" width="44" height="44" rx="12" fill="#0A0A0A" />
        <path d="M14 38V24l14-9 14 9v14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="20" y="29" width="16" height="9" rx="2" fill="#F47B00" />
      </svg>
    );
  }
  if (name === "Verko") {
    // governance: a shield with an orange check
    return (
      <svg {...common}>
        <rect x="6" y="6" width="44" height="44" rx="12" fill="#0A0A0A" />
        <path d="M28 14l11 4v9c0 7-4.5 12-11 15-6.5-3-11-8-11-15v-9l11-4z" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M22 28l4 4 8-8" stroke="#F47B00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // LoopIQ: an open book with an orange page
  return (
    <svg {...common}>
      <rect x="6" y="6" width="44" height="44" rx="12" fill="#0A0A0A" />
      <path d="M15 19h9c2 0 4 1 4 3v17c0-2-2-3-4-3h-9V19z" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M41 19h-9c-2 0-4 1-4 3v17c0-2 2-3 4-3h9V19z" fill="#F47B00" />
    </svg>
  );
}

