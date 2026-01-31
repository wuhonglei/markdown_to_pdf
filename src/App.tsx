import { useCallback, useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./App.css";

const DEFAULT_MARKDOWN = `# 欢迎使用 Markdown 编辑器

在这里编写 **Markdown**，右侧将实时预览。

## 功能

- 左侧编辑，右侧预览
- 支持 GFM（表格、任务列表等）
- 点击顶部 **导出 PDF** 可下载当前预览

## 代码块示例

\`\`\`js
console.log('Hello, Markdown!')
\`\`\`
`;

function App() {
  const [markdownContent, setMarkdownContent] = useState(DEFAULT_MARKDOWN);

  const handleExportPdf = useCallback(() => {
    window.print();
  }, []);

  const markdownExtensions = useMemo(
    () => [markdown({ base: markdownLanguage, codeLanguages: languages })],
    []
  );

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <header className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm print:hidden">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8 shrink-0 object-contain"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            Markdown 编辑器
          </h1>
        </div>
        <button
          type="button"
          onClick={handleExportPdf}
          className="button-export-pdf"
        >
          导出 PDF
        </button>
      </header>

      <main className="flex min-h-0 flex-1">
        <section className="flex w-1/2 min-w-0 flex-col border-r border-gray-200 bg-white print:hidden">
          <div className="editor-wrapper flex-1 overflow-hidden">
            <CodeMirror
              value={markdownContent}
              onChange={setMarkdownContent}
              extensions={markdownExtensions}
              height="100%"
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightSpecialChars: true,
                history: true,
                foldGutter: true,
                drawSelection: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
                syntaxHighlighting: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: true,
                highlightActiveLine: true,
                highlightSelectionMatches: true,
                searchKeymap: true,
                historyKeymap: true,
                foldKeymap: true,
                defaultKeymap: true,
                tabSize: 2,
              }}
            />
          </div>
        </section>

        <section className="flex w-1/2 min-w-0 flex-1 flex-col overflow-hidden bg-white print:w-full">
          <div className="preview-content flex-1 overflow-auto p-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdownContent}
            </ReactMarkdown>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
