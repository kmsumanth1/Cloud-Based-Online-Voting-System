import { useEffect, useState } from "react";
import { fetchResults } from "../services/voteService";
import styles from "./Results.module.css";
import ResultCard from "../components/ResultCard";
import LoadingSpinner from "../components/LoadingSpinner";

function Results() {
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadResults = async () => {
    try {
      setLoading(true);

      const voteData = await fetchResults();

      const total = voteData.reduce(
        (sum, item) => sum + item.votes,
        0
      );

      const formattedResults = voteData
        .map((item) => ({
          ...item,
          percentage: ((item.votes / total) * 100).toFixed(1),
        }))
        .sort((a, b) => b.votes - a.votes);

      setResults(formattedResults);
      setTotalVotes(total);

    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResults();

    const interval = setInterval(loadResults, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Proper global spinner usage
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Election Results</h1>
      <p className={styles.totalVotes}>
        Total Votes: {totalVotes}
      </p>

      {results.map((candidate, index) => (
        <ResultCard
          key={candidate.name}
          rank={index + 1}
          name={candidate.name}
          votes={candidate.votes}
          percentage={candidate.percentage}
          isLeader={index === 0}
        />
      ))}
    </div>
  );
}

export default Results;
