# AI🌿WasteLess 

**Keep the receipt. We handle the rest.**

AI🌿WasteLess is an AI-powered zero-waste meal planning app that transforms supermarket receipts into low-waste meal recommendations and grocery insights.  

---

## Try the MVP

Open the website by clicking the link or scanning the QR code:

```text
https://ai-waste-less.vercel.app/
```

<p align="center">
  <img
    src="public/ai-wasteless-qr.png"
    alt="AI WasteLess MVP QR Code"
    width="220"
  />
</p>

For a more app-like mobile experience, AI🌿WasteLess also supports <strong>"Add to Home Screen"</strong>. 

--- 

## Why AI🌿WasteLess?

Students, young professionals, and small households often overbuy groceries, forget ingredients they already purchased, and struggle to plan meals around perishable food before expiration.

This creates unnecessary food waste, higher grocery costs, and inefficient household consumption behavior.

---

## Current MVP

The MVP focuses on lightweight AI-powered grocery understanding, waste-risk estimation, and low-waste meal planning through a session-based multi-agent workflow.

Current AI architecture combines OCR, rule-based reasoning, and category-level food intelligence without persistent inventory tracking or long-term memory.

The current user flow is: 

```text
Upload Receipt 
↓ 
OCR.space 
↓ 
Receipt Validation 
↓ 
Receipt Analysis Agent 
↓ 
Expiration Agent 
↓ 
Meal Planning Agent 
↓ 
AI Dashboard 
↓ 
User Confirmation 
↓ 
Updated Recommendation
```
---

## Core AI Workflow

### 1. Receipt Analysis Agent

Responsible for:

- OCR text parsing
- ingredient detection
- food category matching
- quantity understanding
- purchase time extraction

### 2. Expiration Agent

Responsible for:

- shelf life estimation
- waste risk estimation
- freshness timeline generation

### 3. Meal Planning Agent

Responsible for:

- Today’s Priority
- meal recommendation
- weekly meal plan
- smart shopping suggestion

---
 
## Receipt Validation  

Uploaded images are validated before entering the AI workflow to reduce false OCR detection from non-receipt images. The current OCR workflow is primarily optimized for English-language receipts.

---

## Food Category Knowledge Base

foodCategories.ts is a shared rule-based food knowledge system used across all Agents to generalize ingredient recognition and reduce dependency on fixed ingredient lists.

---

## Commercialization UI

The MVP includes early-stage commercialization concepts designed around sustainable grocery behavior and low-waste household support.

Potential monetization directions include:

- Smart Refill recommendations
- low-waste grocery bundles
- kitchen tool recommendations
- sustainability-focused shopping support

---

## Architecture

Main system modules:

- route.ts
- receiptValidator.ts
- receiptAnalysisAgent.ts
- expirationAgent.ts
- mealPlanningAgent.ts
- foodCategories.ts 

---

## Tech Stack

- Next.js
- React
- Tailwind CSS
- GitHub
- Vercel

---

## Sustainability Goals

AI-WasteLess supports:

- **SDG 12 — Responsible Consumption and Production**
- **SDG 13 — Climate Action**

---

## Future Vision

Future development directions include:

- inventory tracking and persistent ingredient memory
- machine learning-driven food waste prediction
- personalized shopping assistance
- sustainability analytics
- grocery ecosystem integration

AI🌿WasteLess aims to evolve into an AI-powered sustainable kitchen ecosystem with intelligent inventory tracking, predictive food waste reduction, personalized grocery optimization, and future integration with retailers, delivery platforms, and smart kitchen technologies.  