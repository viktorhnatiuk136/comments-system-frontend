import styles from "./SortControls.module.css";

interface Props {
  sortBy: string;
  order: string;
  onSortByChange: (value: string) => void;
  onOrderChange: (value: string) => void;
}

export default function SortControls({
  sortBy,
  order,
  onSortByChange,
  onOrderChange,
}: Props) {
  return (
    <div className={styles.controls}>
      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="createdAt">Date</option>

        <option value="userName">User Name</option>

        <option value="email">Email</option>
      </select>

      <select
        className={styles.select}
        value={order}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value="desc">DESC</option>

        <option value="asc">ASC</option>
      </select>
    </div>
  );
}
