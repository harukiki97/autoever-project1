import SparkleIcon from "../../assets/SparkleIcon";
import BurstIcon from "../../assets/BurstIcon";
import type { HistoryItem as HistoryItemType } from "./data";

interface HistoryItemProps {
  itemData: HistoryItemType;
}

function HistoryItem({ itemData }: HistoryItemProps) {
  const IconComponent = itemData.iconType === "burst" ? BurstIcon : SparkleIcon;
  return (
    <div className="itemContainer">
      <div className="leftColumn">
        {/* 왼쪽 영역 (아이콘, 날짜) */}
        <IconComponent
          width={18}
          fill={itemData.isActive ? "#2563EB" : "#D1D5DB"}
        />
        <span className="date">{itemData.date}</span>
      </div>

      {/* 오른쪽 영역 (제목, 부제목, 상세 내용) */}
      <div className="rightColumn">
        <h3>{itemData.title}</h3>
        {itemData.subtitle && <p>{itemData.subtitle}</p>}

        {itemData.descriptions && itemData.descriptions.length > 0 && (
          <ul>
            {itemData.descriptions.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HistoryItem;
