function CandidateCard({ candidate, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(candidate.name)}
      style={{
        border: selected ? "2px solid #0b3d91" : "1px solid #ccc",
        padding: "15px",
        margin: "10px auto",
        width: "300px",
        cursor: "pointer",
        borderRadius: "8px"
      }}
    >
      {candidate.name}
    </div>
  );
}

export default CandidateCard;
