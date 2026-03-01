export interface HistoryItem {
  date: string;
  title: string;
  subtitle?: string;
  descriptions?: string[];
  isActive: boolean;
  iconType?: "star" | "burst";
}

export interface HistorySection {
  sectionTitle: string;
  items: HistoryItem[];
}

export const leftSections: HistorySection[] = [
  // iconType이 star이면 명시 안 하기 -> HistoryItem 컴포넌트에서 처리
  {
    sectionTitle: "교육",
    items: [
      {
        date: "2021-2026",
        title: "한국대학교",
        subtitle: "컴퓨터공학 전공",
        isActive: false,
      },
      {
        date: "2019-2021",
        title: "현토에버고등학교",
        isActive: false,
      },
    ],
  },
  {
    sectionTitle: "어학 및 자격증",
    items: [
      {
        date: "2024.03.19",
        title: "OPIc",
        subtitle: "Advanced Low",
        isActive: false,
      },
    ],
  },
];

export const rightSections: HistorySection[] = [
  {
    sectionTitle: "활동",
    items: [
      {
        date: "2025 - 현재",
        title: "현대오토에버 모빌리티 SW 스쿨",
        subtitle: "웹/앱 개발 과정",
        descriptions: ["이렇고 저렇고 이런 저런 내용을 배움"],
        isActive: true,
        iconType: "burst",
      },
    ],
  },
];
