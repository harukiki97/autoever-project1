import SparkleIcon from "../../assets/SparkleIcon";
import BurstIcon from "../../assets/BurstIcon";
import type { HistoryItem as HistoryItemType } from "./data";
import styles from "./HistoryItem.module.css";

interface HistoryItemProps {
  itemData: HistoryItemType;
}

function HistoryItem({ itemData }: HistoryItemProps) {
  const IconComponent = itemData.iconType === "burst" ? BurstIcon : SparkleIcon;
  return (
    <div className={styles.itemContainer}>
      <div className={styles.leftColumn}>
        {/* 왼쪽 영역 (아이콘, 날짜) */}
        <IconComponent
          width={18}
          fill={itemData.isActive ? "#2563EB" : "#6B7280"}
        />
        <span className={styles.date}>{itemData.date}</span>
      </div>

      {/* 오른쪽 영역 (제목, 부제목, 상세 내용) */}
      <div className="rightColumn">
        <div className={styles.title}>{itemData.title}</div>
        {itemData.subtitle && (
          <p className={styles.subtitle}>{itemData.subtitle}</p>
        )}

        {itemData.descriptions && itemData.descriptions.length > 0 && (
          <ul className={styles.descriptionList}>
            {itemData.descriptions.map((desc, index) => (
              <li key={index} className={styles.descriptionItem}>
                {desc}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HistoryItem;
