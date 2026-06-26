# openclaude 학습 커리큘럼 — 구현 계획 (Implementation Plan)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** openclaude 코드베이스를 분석해, AI 에이전트 내부 원리를 딥하게 설명하는 9개 HTML 학습 모듈 + index 허브를 만든다.

**Architecture:** 정적 HTML 파일 세트. 공통 CSS 1개와 외부 CDN(Mermaid.js, highlight.js)만 사용 — 빌드 스텝 없음. 각 모듈은 동일한 6요소 템플릿(왜→다이어그램→메커니즘→코드예시→직접만든다면→네비)을 따른다. 모든 코드 예시는 `/Users/cudy/dev/cudy/openclaude`의 실제 소스를 정독해 `파일:라인`을 검증 후 인용한다.

**Tech Stack:** HTML5, CSS3(다크 테마), Mermaid.js(CDN, 다이어그램), highlight.js(CDN, 문법 하이라이팅). 빌드 도구 없음.

## Global Constraints

- 산출물 루트: `/Users/cudy/dev/cudy/openclaude-study/`
- 분석 대상 소스 루트: `/Users/cudy/dev/cudy/openclaude/` (읽기 전용 — 절대 수정 금지)
- 모든 코드 인용은 **실제 소스를 읽고** `파일:라인`을 명시. 추측 인용 금지(활성 레포라 갱신됨).
- 학습자는 TypeScript 능숙 / LLM은 사용자 수준 → 언어 설명 생략, 에이전트 개념은 차근히.
- 언어: 해설은 한국어, 코드/식별자는 원문 그대로.
- 빌드 스텝 도입 금지 — 모든 HTML은 파일 더블클릭으로 열려야 함. CDN만 허용.
- 범위: AI/에이전트 핵심만. UI 렌더링/빌드/i18n/텔레메트리는 독립 모듈화 금지.

---

## File Structure

```
openclaude-study/
├── index.html                      # 허브 (Task 1 shell → Task 2에서 마스터 다이어그램 채움)
├── assets/style.css                # 공통 다크 테마 + 레이아웃 (Task 1)
├── assets/module-template.html     # 참조용 빈 템플릿 (Task 1)
├── 00-architecture.html            # Task 2
├── 01-one-turn.html                # Task 3
├── 02-agent-loop.html              # Task 4
├── 03-tool-system.html             # Task 5
├── 04-context-engineering.html     # Task 6
├── 05-multi-model.html             # Task 7
├── 06-subagents-orchestration.html # Task 8
├── 07-extensibility.html           # Task 9
├── 08-permissions.html             # Task 10
└── docs/{specs,plans}/             # 설계·계획 문서 (이미 존재)
```

**모듈 파일 책임:** 각 HTML은 하나의 개념 클러스터만 담당하며 자기완결적이다. 공통 스타일/네비는 `style.css`와 각 파일 상단의 동일한 `<nav>` 마크업으로 통일한다.

---

## 공통 자료 (모든 모듈 태스크가 참조)

### 모듈 HTML 골격 (모든 모듈 동일)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NN · {모듈 제목} — openclaude 학습</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true, theme: 'dark' });
  </script>
</head>
<body>
  <nav class="topnav"><!-- 공통 네비: index + 0~8 모듈 링크, 현재 모듈 .active --></nav>
  <main class="content">
    <header class="module-head">
      <span class="badge">Module NN</span>
      <h1>{제목}</h1>
      <p class="subtitle">{한 줄 요약}</p>
    </header>

    <section id="why"><h2>① 왜 이 개념인가</h2>...</section>
    <section id="diagram"><h2>② 아키텍처</h2><pre class="mermaid">...</pre></section>
    <section id="mechanism"><h2>③ 핵심 메커니즘</h2>...</section>
    <section id="code"><h2>④ 실제 코드 예시</h2>
      <!-- 각 예시: 출처 표기 + 코드블록 -->
      <figure class="code-ex">
        <figcaption><code class="src">src/QueryEngine.ts:123-140</code> — {설명}</figcaption>
        <pre><code class="language-typescript">...</code></pre>
      </figure>
    </section>
    <section id="build-it"><h2>⑤ 직접 만든다면</h2>...</section>
  </main>
  <footer class="pager"><!-- 이전/다음 모듈 --></footer>
  <script>hljs.highlightAll();</script>
</body>
</html>
```

### 모듈 작성 5단계 (모든 모듈 태스크 공통 절차)

1. **소스 정독** — 태스크에 명시된 파일들을 Read로 읽고, 인용할 핵심부의 정확한 `파일:라인`을 메모.
2. **HTML 작성** — 골격에 맞춰 6요소 채우기. 다이어그램(Mermaid), 코드예시(검증된 인용, 다양하게).
3. **검증** — 아래 "검증 체크리스트" 통과.
4. **index.html 갱신** — 해당 모듈 카드의 상태/요약을 최신화(필요 시).
5. **커밋** — `git add -A && git commit`.

### 검증 체크리스트 (모든 모듈)

- [ ] 파일이 브라우저에서 열린다 (`open <file>` 후 콘솔 에러 없음 가정 — 구조 검증).
- [ ] `<pre class="mermaid">` 블록 문법이 유효하다 (괄호/화살표 짝 맞음).
- [ ] 모든 `<figcaption>`의 `파일:라인`이 실제 소스와 일치한다 (작성 중 Read로 확인한 값).
- [ ] 6개 섹션(why/diagram/mechanism/code/build-it + head)이 모두 존재한다.
- [ ] topnav/pager 링크가 올바른 파일명을 가리킨다.

> **검증 방법 주석:** 정적 HTML이라 자동 테스트 대신 (a) 구조적 grep 검증, (b) `파일:라인` 대조,
> (c) 가능하면 `open`으로 육안 확인을 쓴다. 각 모듈 태스크의 검증 단계에 구체 명령을 적는다.

---

## Task 1: 스캐폴딩 — 공통 CSS, 템플릿, index 허브 shell

**Files:**
- Create: `openclaude-study/assets/style.css`
- Create: `openclaude-study/assets/module-template.html`
- Create: `openclaude-study/index.html`

**Interfaces:**
- Produces: `style.css`의 클래스 계약 — `.topnav`, `.topnav a.active`, `.content`, `.module-head`,
  `.badge`, `.subtitle`, `section h2`, `figure.code-ex`, `figcaption code.src`, `.pager`,
  `.module-grid`, `.module-card`. 이후 모든 모듈이 이 클래스를 사용.
- Produces: 모듈 파일명 규약 — `00-architecture.html` … `08-permissions.html`.

- [ ] **Step 1: 공통 CSS 작성**

`openclaude-study/assets/style.css`:

```css
:root {
  --bg: #0d1117; --bg2: #161b22; --fg: #e6edf3; --muted: #8b949e;
  --accent: #58a6ff; --accent2: #d2a8ff; --border: #30363d; --code-bg: #161b22;
  --maxw: 920px;
}
* { box-sizing: border-box; }
body {
  margin: 0; background: var(--bg); color: var(--fg);
  font-family: -apple-system, "Apple SD Gothic Neo", "Pretendard", system-ui, sans-serif;
  line-height: 1.75; font-size: 16px;
}
.topnav {
  position: sticky; top: 0; z-index: 10; display: flex; flex-wrap: wrap; gap: 4px;
  padding: 10px 16px; background: rgba(13,17,23,.9); backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.topnav a {
  color: var(--muted); text-decoration: none; font-size: 13px;
  padding: 4px 10px; border-radius: 6px;
}
.topnav a:hover { color: var(--fg); background: var(--bg2); }
.topnav a.active { color: var(--accent); background: var(--bg2); font-weight: 600; }
.content { max-width: var(--maxw); margin: 0 auto; padding: 32px 20px 80px; }
.module-head { border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 28px; }
.badge {
  display: inline-block; font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
  color: var(--accent2); border: 1px solid var(--border); border-radius: 999px; padding: 2px 10px;
}
.module-head h1 { font-size: 30px; margin: 12px 0 6px; }
.subtitle { color: var(--muted); margin: 0; font-size: 17px; }
section { margin: 40px 0; }
section h2 { font-size: 22px; border-left: 3px solid var(--accent); padding-left: 12px; }
section h3 { font-size: 18px; color: var(--accent2); }
p, li { color: var(--fg); }
code { font-family: "SFMono-Regular", ui-monospace, Menlo, monospace; font-size: .9em; }
:not(pre) > code { background: var(--code-bg); padding: 2px 6px; border-radius: 4px; color: var(--accent2); }
pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; padding: 16px; overflow: auto; }
figure.code-ex { margin: 20px 0; }
figure.code-ex figcaption { font-size: 13px; color: var(--muted); margin-bottom: 6px; }
figcaption code.src { color: var(--accent); background: var(--bg2); padding: 2px 8px; border-radius: 4px; }
pre.mermaid { background: var(--bg2); text-align: center; }
blockquote { border-left: 3px solid var(--accent2); margin: 16px 0; padding: 4px 16px; color: var(--muted); background: var(--bg2); border-radius: 0 8px 8px 0; }
table { border-collapse: collapse; width: 100%; margin: 16px 0; }
th, td { border: 1px solid var(--border); padding: 8px 12px; text-align: left; font-size: 14px; }
th { background: var(--bg2); }
.pager { max-width: var(--maxw); margin: 0 auto; padding: 24px 20px 60px; display: flex; justify-content: space-between; border-top: 1px solid var(--border); }
.pager a { color: var(--accent); text-decoration: none; }
.module-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin: 28px 0; }
.module-card { display: block; text-decoration: none; color: var(--fg); background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 18px; transition: border-color .15s, transform .15s; }
.module-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.module-card .num { color: var(--accent2); font-size: 13px; font-weight: 600; }
.module-card h3 { margin: 6px 0; font-size: 17px; color: var(--fg); }
.module-card p { margin: 0; font-size: 13px; color: var(--muted); }
.callout { background: var(--bg2); border: 1px solid var(--border); border-left: 3px solid var(--accent); border-radius: 0 8px 8px 0; padding: 12px 16px; margin: 16px 0; }
```

- [ ] **Step 2: 빈 모듈 템플릿 저장**

`openclaude-study/assets/module-template.html` — 위 "모듈 HTML 골격" 전체를 그대로 저장
(이후 모듈 작성 시 복사 기반으로 사용). topnav/pager 마크업을 실제 9개 링크로 완성해 둔다:

topnav 링크 순서(모든 파일 동일):
`index.html`(허브) · `00-architecture.html`(0·조감도) · `01-one-turn.html`(1·한 턴) ·
`02-agent-loop.html`(2·루프) · `03-tool-system.html`(3·툴) · `04-context-engineering.html`(4·컨텍스트) ·
`05-multi-model.html`(5·멀티모델) · `06-subagents-orchestration.html`(6·서브에이전트) ·
`07-extensibility.html`(7·확장성) · `08-permissions.html`(8·권한)

- [ ] **Step 3: index.html 허브 shell 작성**

`openclaude-study/index.html` — topnav + 인트로(이 학습 자료의 목적/사용법) +
`<section id="master-diagram">`(빈 자리, Task 2에서 마스터 다이어그램 삽입) +
`.module-grid` 안에 9개 `.module-card`(각 모듈 제목+한 줄 설명, href는 위 파일명).
카드 내용은 스펙 §5 표를 사용.

- [ ] **Step 4: 검증**

Run:
```bash
cd /Users/cudy/dev/cudy/openclaude-study
ls assets/style.css assets/module-template.html index.html
grep -c "module-card" index.html   # expect: 10 (정의 1 + 카드 9, 최소 9 이상)
grep -o '0[0-8]-[a-z-]*\.html' index.html | sort -u | wc -l   # expect: 9 (9개 모듈 링크)
open index.html   # 육안: 다크 테마 + 9개 카드 그리드
```
Expected: 파일 3개 존재, 카드 9개, 모듈 링크 9개, 브라우저에 그리드 표시.

- [ ] **Step 5: 커밋**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
git add -A && git commit -m "feat: 학습 자료 스캐폴딩 — 공통 CSS, 템플릿, index 허브"
```

---

## Task 2: Module 0 — 전체 아키텍처 조감도

**Files:**
- Create: `openclaude-study/00-architecture.html`
- Modify: `openclaude-study/index.html` (master-diagram 섹션에 동일 마스터 다이어그램 임베드)

**Interfaces:**
- Consumes: Task 1의 `style.css` 클래스, topnav/pager 마크업.
- Produces: "마스터 아키텍처 다이어그램"(Mermaid) — Module 1이 이 그림을 참조해 흐름을 덧그림.

**정독할 소스 (Read 먼저):**
- `openclaude/AGENTS.md` (레포 맵)
- `openclaude/src/entrypoints/cli.tsx` (CLI 진입점)
- `openclaude/src/bootstrap/state.ts`
- `openclaude/src/main.tsx`
- `openclaude/src/QueryEngine.ts` (상단 구조/주요 export만)
- `openclaude/src/Tool.ts`, `openclaude/src/tools.ts` (툴 레지스트리 큰 그림)
- `openclaude/src/services/` 디렉터리 목록

**다룰 내용:**
- ① 왜: "에이전트 코딩 CLI는 어떤 레이어로 쪼개지는가" — 모놀리식이 아니라 진입점/세션/엔진/툴/프로바이더/서비스 레이어로 분리된 이유.
- ② 마스터 다이어그램: `flowchart` — CLI 진입 → bootstrap/세션 → QueryEngine(에이전트 루프) → {Tool 레지스트리, Provider/api, Context 서비스, 권한} → Ink UI 렌더. 각 박스에 담당 디렉터리 라벨.
- ③ 메커니즘: 각 레이어의 책임을 1~2문단씩. "제어 흐름(누가 누구를 호출)" vs "데이터 흐름(메시지/토큰이 어디로)" 분리 설명.
- ④ 코드예시(다양하게, 최소 4개): (a) 진입점에서 엔진을 띄우는 부분, (b) 툴 레지스트리 형태, (c) 서비스 디렉터리가 책임별로 나뉜 모습(목록), (d) 주요 타입/인터페이스 1개. 각 `파일:라인` 명시.
- ⑤ 직접 만든다면: 최소 에이전트 CLI의 레이어 의사코드 + "왜 엔진과 툴을 분리하나" 트레이드오프.

- [ ] **Step 1: 소스 정독** — 위 파일들 Read, 인용부 `파일:라인` 확보.
- [ ] **Step 2: `00-architecture.html` 작성** (템플릿 복사 → 6요소 채움, topnav active=0).
- [ ] **Step 3: index.html의 `#master-diagram`에 동일 Mermaid 블록 삽입.**
- [ ] **Step 4: 검증**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
grep -q 'class="mermaid"' 00-architecture.html && echo OK-diagram
grep -c 'code-ex' 00-architecture.html         # expect >= 4 (코드예시 4개+)
grep -o 'src/[A-Za-z0-9/_.-]*:[0-9]' 00-architecture.html | head   # 인용 존재 확인
open 00-architecture.html
```
각 `파일:라인`을 Read 결과와 1건씩 대조(체크리스트). Expected: 다이어그램·예시 4+·인용 일치.

- [ ] **Step 5: 커밋**

```bash
git add -A && git commit -m "feat: Module 0 — 전체 아키텍처 조감도 + 마스터 다이어그램"
```

---

## Task 3: Module 1 — 한 턴의 전체 흐름 (end-to-end)

**Files:** Create `openclaude-study/01-one-turn.html`

**Interfaces:** Consumes Task 2의 마스터 다이어그램(이 모듈은 그 위에 실제 한 턴을 시퀀스로 덧그림).

**정독할 소스:** `src/QueryEngine.ts`, `src/query.ts` (턴 진입~응답 경로), `src/main.tsx`(입력 수신), `src/Task.ts`.

**다룰 내용:**
- ① 왜: 추상 개념을 "사용자가 엔터를 친 순간부터"의 구체 타임라인으로 묶기.
- ② 시퀀스 다이어그램(`sequenceDiagram`): User→UI→QueryEngine→Provider(LLM)→ToolDispatch→(툴 실행)→다시 LLM→…→최종 텍스트. 스트리밍·툴콜 왕복 표현.
- ③ 메커니즘: 한 "턴"과 한 "스텝"의 차이, 툴콜이 왜 루프를 다시 도는지, 언제 멈추는지(개관 — 상세는 Module 2).
- ④ 코드예시(3~5개): 턴 시작 함수, provider 호출부, 툴콜 감지·디스패치 분기, 결과를 메시지에 push해 재호출하는 부분. `파일:라인` 명시.
- ⑤ 직접 만든다면: while 루프 의사코드(messages 배열 → LLM → toolcalls? → 실행 → append → 반복).

- [ ] **Step 1: 소스 정독.**
- [ ] **Step 2: HTML 작성** (topnav active=1, pager: ←00 / →02).
- [ ] **Step 3: 검증**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
grep -q 'sequenceDiagram' 01-one-turn.html && echo OK-seq
grep -c 'code-ex' 01-one-turn.html      # expect >= 3
open 01-one-turn.html
```
`파일:라인` 대조. Expected: 시퀀스 다이어그램 존재, 예시 3+.

- [ ] **Step 4: 커밋** `git add -A && git commit -m "feat: Module 1 — 한 턴의 전체 흐름"`

---

## Task 4: Module 2 — 에이전트 루프

**Files:** Create `openclaude-study/02-agent-loop.html`

**정독할 소스:** `src/QueryEngine.ts` (루프 본체, 종료조건, auto-compact cooldown), `src/query.ts` (스트리밍, auto-continuation), `src/QueryEngine.autoCompactCooldown.test.ts`, `src/queryEngine.goal.test.ts` (동작 명세를 테스트에서 역참조).

**다룰 내용:**
- ① 왜: "에이전트"의 본질 = 자율 루프. 단발 호출과의 차이.
- ② `flowchart`: 루프 상태머신 — 입력→LLM 스트림→(텍스트/툴콜/종료)→분기→재진입. 종료조건·중단·연속(auto-continuation) 노드 포함.
- ③ 메커니즘: 스트리밍 파싱, 툴콜 누적, 종료조건(자연 종료 vs 강제 중단 vs goal 달성), auto-continuation이 비-Claude 모델에서 왜 문제되는지(최근 커밋 a5a8ccc 맥락).
- ④ 코드예시(4~6개, 다양): 메인 루프, 스트림 이벤트 핸들링, 종료 판정, auto-continuation 로직, 관련 테스트 1개(동작 스펙). `파일:라인`.
- ⑤ 직접 만든다면: 견고한 루프의 핵심 불변식(언제나 messages 일관, 무한루프 방지 카운터 등).

- [ ] **Step 1: 소스 정독.**
- [ ] **Step 2: HTML 작성** (active=2, pager ←01 / →03).
- [ ] **Step 3: 검증**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
grep -q 'class="mermaid"' 02-agent-loop.html && echo OK
grep -c 'code-ex' 02-agent-loop.html    # expect >= 4
open 02-agent-loop.html
```
`파일:라인` 대조.

- [ ] **Step 4: 커밋** `git add -A && git commit -m "feat: Module 2 — 에이전트 루프"`

---

## Task 5: Module 3 — 툴 시스템 / Tool Use

**Files:** Create `openclaude-study/03-tool-system.html`

**정독할 소스:** `src/Tool.ts` (툴 추상 인터페이스), `src/tools.ts` (레지스트리), 대표 툴 3~4개: `src/tools/BashTool/`, `src/tools/FileEditTool/`, `src/tools/GrepTool/`, `src/tools/ToolSearchTool/` (디퍼드 툴 검색 — 흥미 포인트).

**다룰 내용:**
- ① 왜: LLM이 외부 세계와 상호작용하는 유일한 통로 = 툴. 스키마가 곧 LLM의 "API 문서".
- ② `flowchart`: 툴 정의(스키마)→LLM에 노출→LLM이 호출 의사 생성→검증→권한 게이트→실행→결과 직렬화→모델 재투입.
- ③ 메커니즘: 툴 인터페이스 형태(이름/설명/입력스키마/실행), 입력 검증, 결과 매핑(`shellToolResultMappers`), ToolSearch 식 지연 로딩의 의미(툴 많을 때 컨텍스트 절약).
- ④ 코드예시(5~7개, 다양): Tool 인터페이스 정의, 한 툴의 스키마 선언, 실행 함수, 결과 매퍼, 레지스트리 등록, ToolSearch 발췌. `파일:라인`.
- ⑤ 직접 만든다면: 최소 Tool 타입 + 디스패처 의사코드, 스키마 검증을 왜 LLM 밖에서 하나.

- [ ] **Step 1: 소스 정독.**
- [ ] **Step 2: HTML 작성** (active=3, pager ←02 / →04).
- [ ] **Step 3: 검증**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
grep -c 'code-ex' 03-tool-system.html   # expect >= 5
grep -q 'class="mermaid"' 03-tool-system.html && echo OK
open 03-tool-system.html
```
`파일:라인` 대조.

- [ ] **Step 4: 커밋** `git add -A && git commit -m "feat: Module 3 — 툴 시스템 / Tool Use"`

---

## Task 6: Module 4 — 컨텍스트 엔지니어링

**Files:** Create `openclaude-study/04-context-engineering.html`

**정독할 소스:** `src/services/compact/` (컴팩션), `src/services/contextCollapse/`, `src/services/SessionMemory/`, `src/services/tokenEstimation.test.ts` 및 `tokenEstimation` 구현, `src/services/extractMemories/`, `src/history.ts`.

**다룰 내용:**
- ① 왜: 컨텍스트 윈도우는 유한 자원. "무엇을 남기고 무엇을 버리는가"가 에이전트 품질을 좌우.
- ② `flowchart`: 토큰 추정→임계 도달 감지→compaction(요약) / collapse(접기) / memory 추출→축약된 컨텍스트로 재구성.
- ③ 메커니즘: 토큰 추정 방식, auto-compact 트리거와 cooldown, 요약 전략, 세션 메모리 추출/주입, history 직렬화.
- ④ 코드예시(4~6개): 토큰 추정 함수, compact 트리거 판정, 요약 생성 호출, 메모리 추출, collapse 로직. `파일:라인`.
- ⑤ 직접 만든다면: 슬라이딩 윈도우 vs 요약 vs 외부 메모리 트레이드오프, 간단 토큰 budget 관리 의사코드.

- [ ] **Step 1: 소스 정독.**
- [ ] **Step 2: HTML 작성** (active=4, pager ←03 / →05).
- [ ] **Step 3: 검증**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
grep -c 'code-ex' 04-context-engineering.html  # expect >= 4
grep -q 'class="mermaid"' 04-context-engineering.html && echo OK
open 04-context-engineering.html
```
`파일:라인` 대조.

- [ ] **Step 4: 커밋** `git add -A && git commit -m "feat: Module 4 — 컨텍스트 엔지니어링"`

---

## Task 7: Module 5 — 멀티모델 추상화

**Files:** Create `openclaude-study/05-multi-model.html`

**정독할 소스:** `src/integrations/index.ts`, `src/integrations/registry.ts`, `src/integrations/define.ts`, `src/integrations/compatibility.ts`, `src/integrations/profileResolver.ts`, `src/services/api/` (프로바이더 호출), openai-shim 관련(최근 커밋 2083d1c: GLM/Qwen XML 툴콜 복구 — `grep -ri "openai-shim\|openaiShim" src | head`로 위치 확인).

**다룰 내용:**
- ① 왜: 하나의 에이전트 루프로 200+ 모델 지원 = 프로바이더 차이를 흡수하는 추상화 계층의 힘.
- ② `flowchart`: 통합 메시지/툴 포맷 ↔ 프로바이더별 어댑터(OpenAI/Anthropic/Gemini/Ollama) ↔ 실제 API. 툴콜 포맷 차이(JSON vs XML) 변환 지점 강조.
- ③ 메커니즘: integration descriptor/registry 구조, capability/compatibility 매칭, 모델 프로파일 해석, 비표준 모델의 툴콜 파싱 복구(shim).
- ④ 코드예시(5~7개, 다양): integration 정의 1개, 레지스트리 등록, compatibility 판정, 프로바이더 어댑터 호출부, openai-shim의 XML 툴콜 복구 로직. `파일:라인`.
- ⑤ 직접 만든다면: "포트/어댑터" 패턴으로 프로바이더 추상화, 공통 인터페이스 설계 의사코드.

- [ ] **Step 1: 소스 정독** (openai-shim 위치 grep 포함).
- [ ] **Step 2: HTML 작성** (active=5, pager ←04 / →06).
- [ ] **Step 3: 검증**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
grep -c 'code-ex' 05-multi-model.html    # expect >= 5
grep -q 'class="mermaid"' 05-multi-model.html && echo OK
open 05-multi-model.html
```
`파일:라인` 대조.

- [ ] **Step 4: 커밋** `git add -A && git commit -m "feat: Module 5 — 멀티모델 추상화"`

---

## Task 8: Module 6 — 서브에이전트 & 오케스트레이션

**Files:** Create `openclaude-study/06-subagents-orchestration.html`

**정독할 소스:** `src/tools/AgentTool/`, `src/tasks/` (local/remote/workflow/monitor), `src/tools/TaskCreateTool/`, `src/tools/TaskListTool/`, `src/tools/TeamCreateTool/`, `src/coordinator/coordinatorMode.ts`, `src/coordinator/workerAgent.ts`.

**다룰 내용:**
- ① 왜: 단일 컨텍스트의 한계 → 작업을 하위 에이전트로 분할·위임. 병렬성·격리·전문화.
- ② `flowchart` 또는 `sequenceDiagram`: 부모 에이전트가 AgentTool로 서브에이전트 스폰 → 태스크 큐/DAG → 코디네이터-워커 → 결과 회수·합성.
- ③ 메커니즘: 서브에이전트 호출이 결국 또 하나의 QueryEngine 루프라는 점, 태스크 생성/추적/중단, 코디네이터 모드, 팀 구성.
- ④ 코드예시(4~6개): AgentTool 실행부, 태스크 생성/상태 전이, coordinator 루프, worker 디스패치. `파일:라인`.
- ⑤ 직접 만든다면: 재귀적 에이전트(에이전트가 에이전트를 부른다)의 위험(무한 분기, 비용)과 가드.

- [ ] **Step 1: 소스 정독.**
- [ ] **Step 2: HTML 작성** (active=6, pager ←05 / →07).
- [ ] **Step 3: 검증**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
grep -c 'code-ex' 06-subagents-orchestration.html  # expect >= 4
grep -q 'class="mermaid"' 06-subagents-orchestration.html && echo OK
open 06-subagents-orchestration.html
```
`파일:라인` 대조.

- [ ] **Step 4: 커밋** `git add -A && git commit -m "feat: Module 6 — 서브에이전트 & 오케스트레이션"`

---

## Task 9: Module 7 — 확장성: MCP · Skills · 슬래시 커맨드

**Files:** Create `openclaude-study/07-extensibility.html`

**정독할 소스:** `src/tools/MCPTool/`, `src/services/mcp/`, `src/tools/SkillTool/`, `src/tools/DiscoverSkillsTool/`, `src/skills/`, `src/commands.ts`, `src/commands/` (대표 커맨드 1~2개).

**다룰 내용:**
- ① 왜: 코어를 건드리지 않고 기능을 확장하는 3가지 축 — 외부 툴(MCP), 절차적 지식(Skills), 사용자 단축(커맨드).
- ② `flowchart`: 확장 지점 3개가 각각 에이전트 루프/툴 레지스트리에 어떻게 끼워지는지.
- ③ 메커니즘: MCP 서버 연결·툴 노출·승인, Skill 발견/로딩/주입, 슬래시 커맨드 파싱·디스패치. 셋의 공통점(런타임 등록)과 차이.
- ④ 코드예시(5~7개, 다양): MCP 툴 래핑, MCP 서버 승인, Skill 디스커버리/로드, 커맨드 등록·실행. `파일:라인`.
- ⑤ 직접 만든다면: 플러그인 레지스트리 설계, 신뢰 경계(외부 MCP를 어떻게 안전히).

- [ ] **Step 1: 소스 정독.**
- [ ] **Step 2: HTML 작성** (active=7, pager ←06 / →08).
- [ ] **Step 3: 검증**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
grep -c 'code-ex' 07-extensibility.html  # expect >= 5
grep -q 'class="mermaid"' 07-extensibility.html && echo OK
open 07-extensibility.html
```
`파일:라인` 대조.

- [ ] **Step 4: 커밋** `git add -A && git commit -m "feat: Module 7 — 확장성: MCP·Skills·커맨드"`

---

## Task 10: Module 8 — 권한 & 안전장치

**Files:**
- Create: `openclaude-study/08-permissions.html`
- Modify: `openclaude-study/index.html` (전 모듈 완료 반영 — 카드 상태/완성 마킹, 필요 시)

**정독할 소스:** `src/types/permissions.ts`, `src/utils/permissions/`, `src/components/permissions/`, `src/hooks/toolPermission/`, `src/tools/EnterPlanModeTool/`, `src/tools/ExitPlanModeTool/`, `src/components/BypassPermissionsModeDialog.tsx`.

**다룰 내용:**
- ① 왜: 자율 에이전트 + 파일/셸 접근 = 위험. 권한 게이트가 신뢰의 핵심.
- ② `flowchart`: 툴 실행 직전 권한 판정 — 허용목록/모드(plan/acceptEdits/bypass)/사용자 승인 분기.
- ③ 메커니즘: 권한 타입 모델, plan mode(읽기전용 강제)의 동작, bypass 모드의 위험과 가드, 툴별 권한 훅.
- ④ 코드예시(4~6개): permission 타입 정의, 권한 판정 함수, plan mode 진입/탈출, 승인 다이얼로그 트리거. `파일:라인`.
- ⑤ 직접 만든다면: 기본 거부(deny-by-default) 설계, 위험 작업 분류 기준.

- [ ] **Step 1: 소스 정독.**
- [ ] **Step 2: HTML 작성** (active=8, pager ←07 / →index).
- [ ] **Step 3: index.html 최종 점검** (9개 카드 모두 링크 정상).
- [ ] **Step 4: 검증**

```bash
cd /Users/cudy/dev/cudy/openclaude-study
grep -c 'code-ex' 08-permissions.html    # expect >= 4
grep -q 'class="mermaid"' 08-permissions.html && echo OK
# 전체 링크 무결성: 모든 모듈 파일 존재 확인
for f in 00-architecture 01-one-turn 02-agent-loop 03-tool-system 04-context-engineering 05-multi-model 06-subagents-orchestration 07-extensibility 08-permissions; do test -f "$f.html" && echo "OK $f" || echo "MISSING $f"; done
open index.html
```
Expected: 9개 모듈 파일 모두 OK, 예시 4+, 다이어그램 존재.

- [ ] **Step 5: 커밋** `git add -A && git commit -m "feat: Module 8 — 권한 & 안전장치 (커리큘럼 완성)"`

---

## Self-Review (작성자 점검 결과)

**1. 스펙 커버리지:** 스펙 §5의 9개 모듈(0~8) → Task 2~10에 1:1 매핑. 형식 6요소(스펙 §4) →
공통 골격·CSS(Task 1)로 보장. 파일 배치(스펙 §6) → File Structure와 일치. 성공기준(스펙 §8) →
각 태스크 검증 단계 + Task 10 전체 링크 점검으로 커버. 갭 없음.

**2. 플레이스홀더 스캔:** 코드가 필요한 산출물(CSS, HTML 골격, topnav 링크 규약)은 실제 내용 제공.
모듈 본문 HTML은 "실제 소스 정독 후 작성"이 본질적 작업이라, 플랜은 **무엇을(소스 파일)·어떻게(6요소
구성·다이어그램 종류·예시 개수·검증)**를 구체 지정 — 이는 콘텐츠 생성 플랜의 올바른 형태이며 빈
플레이스홀더가 아님.

**3. 타입/명명 일관성:** 파일명 규약(`00-architecture.html`…`08-permissions.html`)이 File Structure·
topnav·pager·검증 스크립트 전체에서 동일. CSS 클래스명이 Task 1 정의와 골격 사용처에서 일치.

위 점검 통과. 수정 사항 없음.
