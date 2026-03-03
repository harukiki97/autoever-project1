export const formatRelativeDate = (dateString: string | Date) => {
  const now = new Date();
  const target = new Date(dateString);

  const diff = (now.getTime() - target.getTime()) / 1000; // 초 단위

  if (diff < 60) return `${Math.floor(diff)}초 전`;

  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;

  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;

  if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;

  // 7일 이상이면 날짜 형식으로!!
  const year = target.getFullYear();
  const month = String(target.getMonth() + 1).padStart(2, "0");
  const day = String(target.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};
