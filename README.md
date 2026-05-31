# AI🌿WasteLess 

**Keep the receipt. We handle the rest.**

AI🌿WasteLess is an AI-powered zero-waste meal planning app that transforms grocery receipts into low-waste meal recommendations and grocery insights.

---
## Problem

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

Uploaded images are validated before entering the AI workflow to reduce false OCR detection from non-receipt images. The current OCR workflow primarily supports English receipts with partial German receipt support. 

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
- AI-powered food waste prediction
- personalized shopping assistance
- sustainability analytics
- grocery ecosystem integration

Potential future AI expansion may include machine learning models for food waste prediction based on ingredient type, storage time, quantity, purchase behavior, and household cooking patterns.