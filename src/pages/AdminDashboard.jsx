import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  const generateLiveData = () => {
    const voteData = {
      "John Doe": 600 + Math.floor(Math.random() * 50),
      "Jane Smith": 420 + Math.floor(Math.random() * 50),
      "Michael Lee": 150 + Math.floor(Math.random() * 50),
    };

    const total = Object.values(voteData).reduce(
      (sum, val) => sum + val,
      0
    );

    const formatted = Object.entries(voteData)
      .map(([name, votes]) => ({ name, votes }))
      .sort((a, b) => b.votes - a.votes);

    setResults(formatted);
    setTotalVotes(total);
  };

  useEffect(() => {
    generateLiveData();
    const interval = setInterval(generateLiveData, 3000);
    return () => clearInterval(interval);
  }, []);

  const leadingCandidate = results.length > 0 ? results[0] : null;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Live Monitoring</h1>

      {/* ✅ Reusable Stat Cards */}
      <div className={styles.summary}>
        <StatCard title="Total Votes" value={totalVotes} />
        <StatCard title="Total Candidates" value={results.length} />
        <StatCard
          title="Leading Candidate"
          value={leadingCandidate ? leadingCandidate.name : "-"}
        />
      </div>

      {/* Live Table */}
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.th}>Rank</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Votes</th>
          </tr>
        </thead>
        <tbody>
          {results.map((candidate, index) => (
            <tr key={candidate.name}>
              <td className={styles.td}>{index + 1}</td>
              <td className={styles.td}>{candidate.name}</td>
              <td className={styles.td}>{candidate.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
