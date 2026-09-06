# Portfolio Homepage Specification

## Purpose

Define a portfolio homepage that presents Shariff's recent work through a clear responsive shell, preserves public project routes, and keeps content ownership simple.

## ADDED Requirements

### Requirement: Immediate identity and primary actions

The portfolio SHALL render Shariff's name, professional positioning, and primary contact links without a blocking introduction. It SHALL NOT publish or link a résumé.

#### Scenario: Visitor opens the homepage

- **WHEN** a visitor loads `/`
- **THEN** the page shows Shariff's name and positioning in the first content section
- **AND** the page exposes GitHub, LinkedIn, and email actions before the work sections
- **AND** the page exposes no résumé link or public résumé asset
- **AND** no timed overlay blocks the page

#### Scenario: Visitor uses a mobile viewport

- **WHEN** a visitor opens `/` at a 390 by 844 viewport
- **THEN** the first viewport contains the identity and primary actions
- **AND** the page begins the work-experience section without horizontal scrolling

#### Scenario: Visitor reads the recent-work summary

- **WHEN** the visitor reads the profile introduction
- **THEN** the recent-work copy states that Shariff takes AI products from prototype to production
- **AND** it names structured AI workflows, prompt tracing, document-processing reliability, and evaluations with domain experts
- **AND** it avoids repeating the generic applied-AI positioning in the preceding sentence

### Requirement: Work-experience-first information hierarchy

The homepage SHALL present GovTech and HTX (Home Team Science and Technology Agency) under Work Experience before the featured-project section.

#### Scenario: Visitor reads the homepage in document order

- **WHEN** a visitor moves past the identity section
- **THEN** the page presents GovTech first
- **AND** the page presents HTX (Home Team Science and Technology Agency) second
- **AND** the featured-project heading follows the work-experience section

### Requirement: Evidence-led work-experience summaries

Each work-experience entry SHALL show the organization, role, date range, and two or three concise highlights. All experience highlights SHALL use the same implied-first-person, action-led perspective.

#### Scenario: Visitor scans a collapsed internship row

- **WHEN** the internship details are collapsed
- **THEN** the visitor can still identify the organization, role, and date range

#### Scenario: Visitor expands an internship

- **WHEN** the visitor activates the internship disclosure
- **THEN** the page reveals the internship highlights
- **AND** keyboard focus remains on the disclosure control
- **AND** assistive technology can determine the expanded state

#### Scenario: Visitor compares internship entries

- **WHEN** the visitor reads highlights from GovTech and HTX
- **THEN** both entries use action-led resume phrasing with the subject implied
- **AND** neither entry switches to explicit first-person pronouns

#### Scenario: Visitor expands the GovTech internship

- **WHEN** the visitor opens the GovTech details
- **THEN** the highlights state Shariff's ownership of full-stack development, AI engineering, and production operations across two AI products
- **AND** the highlights state that Shariff built the document-job queue system
- **AND** the prompt-management highlight states that the changes improved cache reuse and reduced latency
- **AND** the highlights cover Langfuse tracing and shared document ingestion
- **AND** the copy remains grounded in the settled September resume without invented metrics or responsibilities

### Requirement: Featured project navigation

The homepage SHALL show four featured projects sourced from published MDX entries. It SHALL present the iPiD FYP first, the SMU BIA hate-speech project second, the Privacy-Focused Agentic Anonymiser third, and Hate Speech Classification with BERT fourth.

Each featured-project description SHALL lead with one concrete differentiator or result rather than a generic study or platform summary. The SMU BIA entry SHALL be named for its Singlish-aware hate-speech guardrail, and its description and case study SHALL identify the code-switched language work.

#### Scenario: Project qualifies for the homepage

- **WHEN** a published project has a `homepageOrder` value
- **THEN** the homepage includes it at that position
- **AND** the component does not duplicate its title, description, date, image, or category in another data file

#### Scenario: Visitor selects a featured project

- **WHEN** the visitor activates a project link
- **THEN** the matching root-level project route renders the full MDX case study

#### Scenario: Visitor scans featured-project descriptions

- **WHEN** the visitor reads the four featured rows
- **THEN** each description communicates a distinct engineering idea, result, or trade-off
- **AND** the SMU BIA row names the Singlish and code-switched guardrail
- **AND** supporting metrics and implementation detail remain available in the linked case study

#### Scenario: Visitor reads the SMU BIA reflection

- **WHEN** the visitor reaches the localisation reflection
- **THEN** the page explains the difficulty of generating credible adversarial Singlish data
- **AND** it distinguishes observed model behaviour from a general claim about a provider's regional safety safeguards
- **AND** it treats generated examples as untrusted data requiring human review and an independent evaluation source

#### Scenario: Visitor reads the focused SMU BIA case study

- **WHEN** the visitor opens the SMU BIA case study
- **THEN** the overview presents the embedding and traditional-ML benchmark followed by the Singlish guardrail extension
- **AND** the embedding section has no numbered track label
- **AND** the page omits the discarded sarcasm, multi-task-learning, agentic-LLM, and KG-RAG sections
- **AND** the highlights, tags, datasets, and technology list omit tools and claims used only by those discarded sections

#### Scenario: Visitor wants the complete project set

- **WHEN** the visitor reaches the homepage project section
- **THEN** featured and older-project rows together expose every published project
- **AND** each title opens its root-level case study directly
- **AND** the page requires no separate project index, folder expansion, category filter, or project-selection state

### Requirement: Publication-safe iPiD engineering note

The iPiD project route SHALL present only approved, team-level project facts and engineering analysis. It SHALL frame the work as a GTM Engineering project without presenting the underlying product.

#### Scenario: Visitor opens the iPiD project

- **WHEN** a visitor opens `/ipid-growth-intelligence`
- **THEN** the page describes verified facts about what the team built and why it supports a GTM workflow
- **AND** the page may explain engineering challenges through prose and illustrative pseudocode
- **AND** the page makes no unsupported claim about Shariff's individual contribution
- **AND** the page shows no product screenshot, interface capture, demo action, repository action, proprietary source code, or proprietary data

#### Scenario: Visitor scans the iPiD project facts

- **WHEN** the visitor reads the project summary and opening sections
- **THEN** the page names the connected market-intelligence, content, account-research, and sales-outreach workflows
- **AND** it explains that research findings retain citations, reusable context, and review history
- **AND** individual resume claims are rewritten as team-level project facts

#### Scenario: Project image is intentionally absent

- **WHEN** the iPiD entry has no image
- **THEN** the project-detail layout remains complete and balanced
- **AND** the renderer does not create a broken image, product representation, or invented placeholder

### Requirement: Older project navigation

The homepage SHALL show published projects without a `homepageOrder` value in a compact older-projects list after the four featured projects.

#### Scenario: Visitor scans older work

- **WHEN** the visitor reaches the end of the featured-project section
- **THEN** the page presents older projects as title and year links
- **AND** each link opens its existing root-level case study

#### Scenario: Maintainer adds project curation

- **WHEN** the maintainer adds a `homepageOrder` value to an older project
- **THEN** that project moves into the featured list at that position
- **AND** it no longer appears in the older-projects list

### Requirement: Canonical content ownership

The portfolio SHALL maintain one canonical owner for site links, profile and experience content, and project content.

#### Scenario: Maintainer edits a project summary

- **WHEN** the maintainer changes a project's MDX frontmatter
- **THEN** the homepage and detail metadata use that updated value

#### Scenario: Maintainer edits an internship

- **WHEN** the maintainer changes the internship content in `src/content/profile.ts`
- **THEN** each homepage representation uses that updated value

#### Scenario: Maintainer edits iPiD or SMU BIA project content

- **WHEN** the maintainer changes the matching project MDX entry
- **THEN** the homepage summary and case-study metadata use that value
- **AND** profile data does not maintain another iPiD or SMU BIA project summary

### Requirement: Animation dependency boundary

Production React code SHALL contain no `framer-motion` import or dependency. If production code retains JavaScript animation, it SHALL use the `motion` package through `motion/react`.

#### Scenario: Maintainer searches animation imports

- **WHEN** the redesign is complete
- **THEN** no production file imports `framer-motion`
- **AND** `framer-motion` is absent from the dependency manifest

#### Scenario: No JavaScript animation remains

- **WHEN** no production file imports `motion/react` after the replaced interface is removed
- **THEN** `motion` is absent from the dependency manifest

#### Scenario: Visitor requests reduced motion

- **WHEN** the visitor enables `prefers-reduced-motion`
- **THEN** the portfolio suppresses nonessential movement
- **AND** all content and controls remain available

### Requirement: Public route compatibility

The redesign SHALL preserve current project, Capoo, and Wordle URLs.

#### Scenario: Existing project link is opened

- **WHEN** a visitor opens any published root-level project slug
- **THEN** the portfolio returns the matching case study

#### Scenario: Experiment route is opened

- **WHEN** a visitor opens `/capoo` or `/wordle`
- **THEN** the existing experience renders at that route

### Requirement: Responsive and accessible navigation

The portfolio SHALL provide the reference desktop composition with a left navigation rail, centred reading column, and empty right gutter, plus a top navigation bar with one content column on mobile. Each layout SHALL retain readable document order, visible focus, semantic headings, and labelled controls.

#### Scenario: Visitor uses a desktop viewport

- **WHEN** a visitor opens a main portfolio route at 1440 by 1000
- **THEN** the page shows navigation and contact links in a left rail
- **AND** the page shows route content in the centre column
- **AND** the right grid track remains unoccupied as visual breathing room
- **AND** no semantic right rail, availability claim, location label, or time-zone label renders
- **AND** the left rail remains visible while the central document scrolls

#### Scenario: Visitor uses a mobile viewport

- **WHEN** a visitor opens a main portfolio route at 390 by 844
- **THEN** the left-rail navigation appears as a top navigation bar
- **AND** the route content renders in one column
- **AND** no status rail or status substitute renders
- **AND** the navigation requires no drawer or menu expansion
- **AND** the top navigation remains in normal document flow rather than sticking to the viewport
- **AND** the home-linked brand mark replaces a redundant Home or About text item
- **AND** the text navigation contains Experience, Projects, and Play
- **AND** the page has no horizontal scrolling

#### Scenario: Visitor uses a tablet viewport

- **WHEN** a visitor opens a main portfolio route from 768 through 1099 pixels wide
- **THEN** the page shows the navigation rail and main content column
- **AND** the page does not add status information to the profile content

#### Scenario: Visitor follows a section link from a project route

- **WHEN** a visitor activates Experience or Projects from a project case study
- **THEN** the portfolio opens the matching section on the homepage

#### Scenario: Visitor returns to the profile

- **WHEN** a visitor activates Home in the desktop rail or the brand mark in the mobile header
- **THEN** the portfolio opens the homepage identity and introduction
- **AND** the navigation exposes no separate About item or page

#### Scenario: Assistive technology identifies the home mark

- **WHEN** a visitor encounters the visible `SR` home link
- **THEN** its accessible name starts with `SR`
- **AND** the name identifies Shariff Rashid and the home destination

#### Scenario: Visitor expands experience on mobile

- **WHEN** a visitor expands an internship at a 390 by 844 viewport
- **THEN** the evidence appears as a compact full-width continuation of the summary
- **AND** the details do not retain an empty logo-column indent
- **AND** organization, role, date, and evidence use a neutral foreground hierarchy without green or teal metadata accents

#### Scenario: Keyboard-only visitor scans the homepage

- **WHEN** the visitor uses Tab, Shift+Tab, Enter, and Space
- **THEN** each interactive element receives visible focus
- **AND** each disclosure and link can be activated
- **AND** focus order follows document order

### Requirement: Accessible experiments

The Capoo and Wordle experiments SHALL expose meaningful names, keyboard behavior, and status information without relying on repeated ASCII characters or color alone.

#### Scenario: Assistive technology reads the Capoo experiment

- **WHEN** a visitor opens `/capoo`
- **THEN** the repeating ASCII artwork has one concise text alternative
- **AND** repeated art characters are not announced as document content

#### Scenario: Visitor plays Wordle without relying on color

- **WHEN** a guess is evaluated
- **THEN** each result has a visible shape cue in addition to color
- **AND** assistive technology can determine the letter and result
- **AND** turn and outcome changes are announced as status messages
- **AND** every on-screen key exposes its disabled state and meaningful name
