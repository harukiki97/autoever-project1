import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import styles from "./MarkdownViewer.module.css";

interface Props {
  content: string;
}

// 마크다운 텍스트를 ReactMarkdown 라이브러리로 렌더링
export default function MarkdownViewer({ content }: Props) {
  return (
    <div className={styles.markdownBody}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // GFM 플러그인 적용 ?? -> github 확장 마크다운 문법 지원
        rehypePlugins={[rehypeSanitize]} // 안전하게 HTML sanitize 할 수 있음
        components={{
          // 마크다운 내 특정 요소를 커스터마이징 (notion 느낌 주기 위해서)
          // `code` 블록 커스터마이징
          code: ({ node, inline, className, children, ...props }: any) => {
            // className에서 언어 정보 추출
            const match = /language-(\w+)/.exec(className || "");
            const language = match?.[1] || "tsx"; // 기본 언어 지정

            // 인라인 코드이거나 언어 지정이 없는 경우 (문제점 1 해결)
            if (inline || !match) {
              return (
                // `inline` 코드 또는 언어 정보가 없는 경우 일반 `code` 태그로 렌더링 해주기.
                <code className={className} {...props}>
                  {children}
                </code>
              );
            } else {
              return (
                // 인라인 코드가 아니면 코드 하이라이팅 적용
                <SyntaxHighlighter
                  style={prism}
                  language={language}
                  PreTag="div"
                  // SyntaxHighlighter 내부 code 태그의 기본 배경색 제거 (문제점 2 해결)
                  codeTagProps={{
                    style: { backgroundColor: "transparent", padding: 0 },
                  }}
                  customStyle={{
                    backgroundColor: "#f7f6f3",
                    padding: "1.2rem 1.5rem",
                    border: "1px solid #efeee9",
                    borderRadius: "8px",
                    margin: "1.5rem 0",
                    fontSize: "0.95rem",
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
