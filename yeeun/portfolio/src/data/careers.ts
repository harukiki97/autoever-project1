import type { Career } from "../types";

export const careers: Career[] = [
  {
    category: "교육",
    items: [
      {
        id: 1,
        period: "2015-2019",
        title: "현토에버대학교",
        desc: "Computer Science, Business Administration",
        desc_detail:
          "Studied software engineering, data structures, and database systems. Participated in multiple team-based development projects.",
      },
      {
        id: 2,
        period: "2012-2015",
        title: "현토에버고등학교",
      },
    ],
  },
  {
    category: "어학 및 자격증",
    items: [
      {
        id: 1,
        period: "2023.08.19",
        title: "TOEIC",
        desc: "920점",
      },
      {
        id: 2,
        period: "2022.11.15",
        title: "OPIc",
        desc: "IH",
      },
      {
        id: 3,
        period: "2021.06.05",
        title: "SQL Developer",
        desc: "Certified",
      },
    ],
  },
  {
    category: "활동",
    items: [
      {
        id: 1,
        period: "2024-현재",
        title: "Open Source Contributor",
        desc: "Contributed to frontend UI improvements and documentation updates for open-source React projects.",
      },
      {
        id: 2,
        period: "2023",
        title: "University Coding Club",
        desc: "Led weekly algorithm study sessions and organized internal hackathons.",
      },
    ],
  },
];
