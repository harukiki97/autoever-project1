import type { Project } from '../../types';

export default function Projects() {
  // 실제로는 DB(API)에서 가져올 데이터 예시입니다.
  const dummyProjects: Project[] = [
    {
      id: 1,
      title: "자동차 커뮤니티 앱",
      start_date: "2026-02-01",
      is_team: true,
      tech_stacks: "React, TypeScript, PostgreSQL"
    }
  ];

  return (
    <div>
      <h1>🚀 프로젝트 목록</h1>
      <div className="project-grid">
        {dummyProjects.map((project) => (
          <article key={project.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{project.title}</h3>
            <p>기간: {project.start_date} ~ {project.end_date || '진행 중'}</p>
            <p>기술 스택: {project.tech_stacks}</p>
            <p>구분: {project.is_team ? "팀 프로젝트" : "개인 프로젝트"}</p>
            <button>상세보기</button>
          </article>
        ))}
      </div>
    </div>
  );
}