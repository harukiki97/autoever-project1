import { techData } from "../data/techStack";

// key - value : 기술 이름 - 기술 객체
// "react" => { name: "React", icon: "react", color: "61DAFB" }
// 이런 식으로 데이터가 출력됨니다.
export const techMap = new Map();

techData.forEach((category) => {
  category.items.forEach((item) => {
    techMap.set(item.name.toLowerCase(), item);
  });
});
