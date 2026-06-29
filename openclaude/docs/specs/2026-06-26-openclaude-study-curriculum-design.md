# openclaude 학습 커리큘럼 — 설계 문서 (Spec)

> 작성일: 2026-06-26
> 대상 코드베이스: `/Users/cudy/dev/cudy/openclaude` (`@gitlawb/openclaude` v0.20.1)
> 산출물: `/Users/cudy/dev/cudy/openclaude-study/` 아래 HTML 학습 자료 세트

---

## 1. 목적 (Why)

AI 시대의 개발자로서 역량을 키우기 위해, **가장 진보된 에이전트 코딩 프로덕트(Claude Code 계열)** 인
openclaude를 분석한다. 단순 사용법이 아니라 **"어떤 핵심 개념들이 있고, 그것들이 실제로 어떻게
구현되었는가"** 를 아주 깊게 이해하는 것이 목표다. 최종적으로는 "LLM 사용자"에서 "에이전트 빌더"의
관점으로 전환하는 것을 지향한다.

## 2. 학습자 프로파일 (Constraints)

- **TypeScript/Node: 능숙** → 언어 문법 설명은 생략. 코드 예시는 바로 읽을 수 있다고 가정.
- **LLM: 사용자 수준** → 에이전트 내부 원리(툴 콜링, 컨텍스트 윈도우, 스트리밍 프로토콜, 멀티모델
  추상화 등)는 개념부터 차근히 설명이 필요하다.
- 선호 학습 방식: **개념 해설 문서 + 아키텍처 다이어그램 + 다양하고 디테일한 코드 예시.**
  전체 구현을 줄줄이 따라가기보다, 핵심을 보여주는 코드 예시 위주.

## 3. 범위 (Scope)

**포함 — AI/에이전트 고유 핵심:**
에이전트 루프, 툴 시스템, 컨텍스트 엔지니어링, 멀티모델 추상화, 서브에이전트/오케스트레이션,
확장성(MCP·Skills·커맨드), 권한·안전장치.

**제외 — 일반 인프라:**
React/Ink UI 렌더링 세부, 빌드/배포 파이프라인, i18n, 텔레메트리, 웹 문서 사이트(`web/`).
(개념 이해에 필요한 최소한의 언급은 허용하되, 독립 모듈로 다루지 않는다.)

## 4. 산출물 형식 (Output Format)

각 모듈 = HTML 파일 1개. 보기 편의를 위해 HTML로 통일한다.

### 공통 HTML 템플릿 (모든 모듈)
1. **왜 이 개념인가** — AI 시대 개발자가 알아야 할 이유 (사용자 → 빌더 관점)
2. **아키텍처 다이어그램** — Mermaid 플로우차트/시퀀스 다이어그램 (CDN 임베드, 별도 빌드 불필요)
3. **핵심 메커니즘 해설** — 개념을 그림과 함께 단계별로
4. **실제 코드 예시** — openclaude에서 발췌. 문법 하이라이팅, `파일:라인` 출처 명시,
   다양하고 디테일하게.
5. **"직접 만든다면" 교훈** — 미니 의사코드 + 설계 트레이드오프
6. **네비게이션** — 상단/좌측 모듈 간 이동, `index.html` 허브로 복귀

### 기술 선택
- 정적 HTML + CDN(Mermaid.js, highlight.js). 빌드 스텝 없음 — 파일 더블클릭으로 열림.
- 공통 CSS 1개(`assets/style.css`)로 다크 테마 + 가독성 통일.
- 코드 예시는 실제 openclaude 소스를 인용하되, 길면 핵심부만 발췌하고 `파일:라인` 표기.

## 5. 커리큘럼 (Modules)

구조 원칙: **개념별 자기완결 문서(thematic)** 를 **바텀업 의존성 순서**로 배열하고,
맨 앞에 **전체 조감도**와 **한 턴의 구체적 흐름**을 두어 큰 그림을 먼저 잡는다.

| # | 모듈 | 핵심 질문 | openclaude 주요 소스 |
|---|------|----------|---------------------|
| 0 | **전체 아키텍처 조감도** | 시스템 전체 레이어/서브시스템 지도, 컴포넌트 관계, 고수준 제어·데이터 흐름. "무엇이 어디에" | `src/entrypoints/cli.tsx`, `src/bootstrap/`, `src/main.tsx`, `src/QueryEngine.ts`, 레포 맵 전체 |
| 1 | **한 턴의 전체 흐름** | 프롬프트 입력 → 응답까지 조감도를 관통하는 end-to-end 추적 | `src/QueryEngine.ts`, `src/query.ts`, `src/main.tsx` |
| 2 | **에이전트 루프** | LLM이 어떻게 "스스로 도구를 쓰며 반복"하나? 턴 사이클·스트리밍·종료조건·auto-continuation | `src/QueryEngine.ts`, `src/query.ts` |
| 3 | **툴 시스템 / Tool Use** | 툴 정의·스키마화·디스패치·결과 되먹임 | `src/Tool.ts`, `src/tools/*` (Bash, FileEdit, Grep, Glob…) |
| 4 | **컨텍스트 엔지니어링** | 한정된 컨텍스트 윈도우 관리: compaction·collapse·메모리·토큰추정 | `src/services/compact`, `src/services/contextCollapse`, `src/services/SessionMemory`, `src/services/tokenEstimation*` |
| 5 | **멀티모델 추상화** | 하나의 루프로 200+ 모델을? tool-call 포맷 변환·openai-shim | `src/integrations/`, `src/services/api`, openai-shim |
| 6 | **서브에이전트 & 오케스트레이션** | 에이전트가 에이전트를 부른다 — 위임·태스크·팀 | `src/tools/AgentTool`, `src/tasks/`, `src/tools/TaskCreateTool`, `src/coordinator/` |
| 7 | **확장성: MCP · Skills · 슬래시 커맨드** | 외부 기능을 플러그인처럼 끼우는 법 | `src/tools/MCPTool`, `src/tools/SkillTool`, `src/commands.ts`, `src/services/mcp` |
| 8 | **권한 & 안전장치** | 위험 작업 게이팅: plan mode·permission | `src/types/permissions.ts`, `src/utils/permissions`, `src/tools/EnterPlanModeTool`, `src/components/permissions` |

## 6. 파일 배치

```
/Users/cudy/dev/cudy/openclaude-study/
├── index.html              # 허브: 커리큘럼 개요 + 모듈 카드 + 마스터 아키텍처 다이어그램
├── 00-architecture.html
├── 01-one-turn.html
├── 02-agent-loop.html
├── 03-tool-system.html
├── 04-context-engineering.html
├── 05-multi-model.html
├── 06-subagents-orchestration.html
├── 07-extensibility.html
├── 08-permissions.html
├── assets/
│   └── style.css           # 공통 다크 테마 CSS
└── docs/specs/             # 본 설계 문서
```

## 7. 작업 방식 (Implementation Notes)

- 각 모듈 작성 전, 해당 서브시스템의 실제 소스를 정독하여 **정확한 `파일:라인` 인용**을 확보한다.
  추측으로 코드를 쓰지 않는다 (openclaude는 계속 갱신되는 활성 레포).
- 다이어그램은 Mermaid로 작성하되, 복잡한 흐름은 시퀀스 다이어그램, 구조는 플로우차트/그래프로.
- 모듈 0(조감도)과 1(한 턴 흐름)을 먼저 완성해 큰 그림을 확정한 뒤, 2~8을 순차 작성한다.
- 코드 예시는 "다양하게" — 한 모듈에 한 종류만 보여주지 말고, 대표 패턴 여러 개를 발췌.

## 8. 성공 기준 (Success Criteria)

- 9개 HTML 모듈 + index 허브가 모두 열리고 상호 네비게이션이 동작한다.
- 각 모듈이 공통 템플릿 6요소를 모두 포함한다.
- 모든 코드 예시가 실제 openclaude 소스의 `파일:라인`과 일치한다 (검증됨).
- 학습자가 각 모듈을 읽고 "이 개념이 왜 필요하고, 어떻게 구현했고, 내가 만든다면 어떻게 할지"를
  설명할 수 있다.

## 9. 비목표 (Non-Goals / YAGNI)

- openclaude를 직접 빌드·실행하거나 수정하지 않는다 (학습 자료 생성이 목표).
- 일반 인프라(UI 렌더링, 빌드, i18n) 독립 모듈화하지 않는다.
- 인터랙티브 웹앱(검색, 동적 코드 실행 등)을 만들지 않는다. 정적 HTML로 충분.
