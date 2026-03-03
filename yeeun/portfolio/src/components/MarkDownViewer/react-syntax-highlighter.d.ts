// src/types/react-syntax-highlighter.d.ts

declare module "react-syntax-highlighter/dist/esm/styles/prism" {
  const styles: { [key: string]: any };
  export default styles;
  // 많이 쓰이는 테마들을 명시적으로 선언해줍니다.
  export const prism: any;
  export const oneLight: any;
  export const vscDarkPlus: any;
  export const atomDark: any;
}

declare module "react-syntax-highlighter/dist/cjs/styles/prism" {
  const styles: { [key: string]: any };
  export default styles;
  export const prism: any;
  export const oneLight: any;
  export const vscDarkPlus: any;
  export const atomDark: any;
}
