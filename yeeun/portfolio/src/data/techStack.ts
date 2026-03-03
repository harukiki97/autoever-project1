export type TechItem = {
  id: string; // 내부 식별 이름
  name: string; // ui 표시 이름
  icon: string;
  color: string;
};

export const techData = [
  {
    category: "Language",
    items: [
      { id: "c", name: "C", icon: "c", color: "A8B9CC" },
      { id: "cpp", name: "C++", icon: "cplusplus", color: "00599C" },
      { id: "dart", name: "Dart", icon: "dart", color: "0175C2" },
      { id: "java", name: "Java", icon: "openjdk", color: "007396" },
      {
        id: "javascript",
        name: "JavaScript",
        icon: "javascript",
        color: "F7DF1E",
      },
      { id: "kotlin", name: "Kotlin", icon: "kotlin", color: "7F52FF" },
      { id: "python", name: "Python", icon: "python", color: "3776AB" },
      { id: "swift", name: "Swift", icon: "swift", color: "FA7343" },
      {
        id: "typescript",
        name: "TypeScript",
        icon: "typescript",
        color: "3178C6",
      },
    ],
  },
  {
    category: "Frontend",
    items: [
      { id: "angular", name: "Angular", icon: "angular", color: "DD0031" },
      {
        id: "bootstrap",
        name: "Bootstrap",
        icon: "bootstrap",
        color: "7952B3",
      },
      { id: "nextjs", name: "Next.js", icon: "nextdotjs", color: "000000" },
      { id: "react", name: "React", icon: "react", color: "61DAFB" },
      { id: "sass", name: "Sass", icon: "sass", color: "CC6699" },
      {
        id: "styled-components",
        name: "Styled Components",
        icon: "styledcomponents",
        color: "DB7093",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        icon: "tailwindcss",
        color: "06B6D4",
      },
      { id: "vue", name: "Vue", icon: "vuedotjs", color: "4FC08D" },
      {
        id: "react-query",
        name: "React Query",
        icon: "reactquery",
        color: "FF4154",
      },
      { id: "recoil", name: "Recoil", icon: "recoil", color: "3578E5" },
      { id: "redux", name: "Redux", icon: "redux", color: "764ABC" },
    ],
  },
  {
    category: "Backend",
    items: [
      { id: "django", name: "Django", icon: "django", color: "092E20" },
      { id: "express", name: "Express", icon: "express", color: "000000" },
      { id: "fastapi", name: "FastAPI", icon: "fastapi", color: "009688" },
      { id: "fastify", name: "Fastify", icon: "fastify", color: "000000" },
      { id: "flask", name: "Flask", icon: "flask", color: "000000" },
      { id: "nestjs", name: "NestJS", icon: "nestjs", color: "E0234E" },
      { id: "nodejs", name: "Node.js", icon: "nodedotjs", color: "339933" },
      { id: "spring", name: "Spring", icon: "spring", color: "6DB33F" },
    ],
  },
  {
    category: "Mobile",
    items: [
      { id: "android", name: "Android", icon: "android", color: "3DDC84" },
      {
        id: "android-studio",
        name: "Android Studio",
        icon: "androidstudio",
        color: "3DDC84",
      },
      { id: "expo", name: "Expo", icon: "expo", color: "000020" },
      { id: "flutter", name: "Flutter", icon: "flutter", color: "02569B" },
      {
        id: "jetpack",
        name: "Jetpack",
        icon: "jetpackcompose",
        color: "4285F4",
      },
      {
        id: "react-native",
        name: "React Native",
        icon: "react",
        color: "61DAFB",
      },
      { id: "swiftui", name: "SwiftUI", icon: "swift", color: "FA7343" },
    ],
  },
  {
    category: "Others",
    items: [
      { id: "firebase", name: "Firebase", icon: "firebase", color: "FFCA28" },
      { id: "mongodb", name: "MongoDB", icon: "mongodb", color: "47A248" },
      { id: "mysql", name: "MySQL", icon: "mysql", color: "4479A1" },
      {
        id: "postgresql",
        name: "PostgreSQL",
        icon: "postgresql",
        color: "4169E1",
      },
      { id: "redis", name: "Redis", icon: "redis", color: "DC382D" },
      { id: "supabase", name: "Supabase", icon: "supabase", color: "3ECF8E" },
      { id: "apache", name: "Apache", icon: "apache", color: "D22128" },
      { id: "aws", name: "AWS", icon: "amazonaws", color: "232F3E" },
      {
        id: "cloudflare",
        name: "Cloudflare",
        icon: "cloudflare",
        color: "F38020",
      },
      { id: "docker", name: "Docker", icon: "docker", color: "2496ED" },
      {
        id: "google-cloud",
        name: "Google Cloud",
        icon: "googlecloud",
        color: "4285F4",
      },
      { id: "heroku", name: "Heroku", icon: "heroku", color: "430098" },
      {
        id: "kubernetes",
        name: "Kubernetes",
        icon: "kubernetes",
        color: "326CE5",
      },
      { id: "nginx", name: "Nginx", icon: "nginx", color: "009639" },
      { id: "vercel", name: "Vercel", icon: "vercel", color: "000000" },
      { id: "eslint", name: "ESLint", icon: "eslint", color: "4B32C3" },
      { id: "figma", name: "Figma", icon: "figma", color: "F24E1E" },
      { id: "git", name: "Git", icon: "git", color: "F05032" },
      { id: "github", name: "GitHub", icon: "github", color: "181717" },
      { id: "gitlab", name: "GitLab", icon: "gitlab", color: "FC6D26" },
      { id: "notion", name: "Notion", icon: "notion", color: "000000" },
      { id: "slack", name: "Slack", icon: "slack", color: "4A154B" },
    ],
  },
];
