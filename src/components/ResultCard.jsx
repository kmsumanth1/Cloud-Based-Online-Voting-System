import styles from "./ResultCard.module.css";

function ResultCard({ rank, name, votes, percentage, isLeader }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.rank}>
          #{rank} {name}
        </span>
        <span>
          {votes} votes ({percentage}%)
        </span>
      </div>

      <div className={styles.barBackground}>
        <div
          className={`${styles.barFill} ${
            isLeader ? styles.leader : styles.normal
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ResultCard;
