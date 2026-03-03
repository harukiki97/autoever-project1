import type { HistoryItem as HistoryItemType } from "./data";
import HistoryItem from "./HistoryItem";
import styles from "./HistorySection.module.css";

interface HistorySectionProps {
  title: string;
  items: HistoryItemType[];
}

// 교육, 어학 및 자격증, 활동
function HistorySection({ title, items }: HistorySectionProps) {
  return (
    <section className={styles.section}>
      {/* 임시 확인용 렌더링 코드 */}
      <div className={styles.title}>{title}</div>
      {items.map((item) => (
        // 각 큰 리스트
        <HistoryItem key={item.title} itemData={item} />
      ))}
    </section>
  );
}

export default HistorySection;
