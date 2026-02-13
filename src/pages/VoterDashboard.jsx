import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "./VoterDashboard.module.css";

function VoterDashboard() {
  const { user, logout } = useAuth();

  const [candidates] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Lee" },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(
    localStorage.getItem("hasVoted") === "true"
  );
  const [loading, setLoading] = useState(false);

  const handleVoteSubmit = async () => {
    if (!selectedCandidate) {
      alert("Please select a candidate.");
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      localStorage.setItem("hasVoted", "true");
      setHasVoted(true);

    } catch (error) {
      alert("Vote submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Voter Dashboard</h1>
      <p className={styles.welcome}>Welcome, {user?.email}</p>

      {hasVoted ? (
        <div className={styles.success}>
          Vote Successfully Submitted
        </div>
      ) : (
        <>
          <div className={styles.candidateList}>
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate.name)}
                className={`${styles.candidateCard} ${
                  selectedCandidate === candidate.name ? styles.selected : ""
                }`}
              >
                {candidate.name}
              </div>
            ))}
          </div>

          <button
            onClick={handleVoteSubmit}
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Submitting..." : "Submit Vote"}
          </button>
        </>
      )}
    </div>
  );
}

export default VoterDashboard;
