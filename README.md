# AI🌿WasteLess 

**Keep the receipt. We handle the rest.**

AI🌿WasteLess is an AI-powered zero-waste meal planning app that turns grocery receipts into personalized food waste reduction suggestions.

The project helps students, young professionals, and independent households reduce food waste, save money, and build more sustainable grocery habits.

---

## Problem

Many students and young adults often:

- buy too much food
- forget what they already bought
- let ingredients expire
- struggle with meal planning
- repeat unnecessary grocery purchases

This leads to food waste, extra spending, and higher environmental impact.

---

## Current MVP

This is a lightweight MVP focused on one clear user flow:

```text
Upload Receipt
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

The current version focuses on:

- receipt upload experience
- AI processing workflow UI
- ingredient and waste-risk demo logic
- meal planning dashboard
- cooked / wasted user confirmation
- sustainability-focused product experience

Some dashboard content currently uses demo data and rule-based logic for presentation.

---

## Core AI Workflow

### 1. Receipt Analysis Agent

Responsible for:

- OCR
- ingredient detection
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

## Product Pages

### Landing Page

Introduces the product:

- logo
- slogan
- product value
- Start Now button

### Receipt Upload Page

Supports:

- grocery receipt upload
- mobile photo upload
- up to 10 receipt images
- AI processing state
- step-by-step agent workflow
- OCR failure UI

### AI Dashboard

Includes:

- Today’s Priority
- Weekly Meal Plan
- AI Insight

---

## Commercialization UI

The MVP includes lightweight commercialization entry points as UI concepts and does not include real payment or marketplace integration yet.

### Smart Refill

Suggests ingredient refill options when essential groceries may run low.

### Zero-Waste Grocery Bundle

Suggests low-waste grocery bundles with home delivery based on users’ cooking habits.

### Kitchen Recommendations

Suggests kitchen tools and meal prep equipment that may help users cook more efficiently and reduce food waste.

---

## Tech Stack

- Next.js
- React
- Tailwind CSS
- GitHub
- Vercel

Planned data / AI sources:

- OCR.space
- USDA FoodData Central
- Kaggle Shelf Life Dataset
- Food.com Recipes Dataset
- UNEP Food Waste Index

---

## Sustainability Goals

AI-WasteLess supports:

- **SDG 12 — Responsible Consumption and Production**
- **SDG 13 — Climate Action**


---

## Current Version

A lightweight MVP focused on receipt understanding, waste-risk estimation, AI-powered meal planning, and sustainability-focused dashboard interaction.

---

## Future Vision

In the future, AI-WasteLess can expand into a fuller AI kitchen assistant with:

### Inventory Tracking Agent

Future responsibilities:

- ingredient inventory tracking
- cooked / wasted confirmation
- automatic ingredient deduction
- waste event logging

### Smart Shopping Agent

Future responsibilities:

- refill reminders
- grocery recommendations
- kitchen tool suggestions
- low-waste shopping support

### Machine Learning: Food Waste Prediction

Future AI direction:

- use food waste prediction to identify high-risk ingredients
- possible model direction: XGBoost
- prediction inputs may include ingredient type, storage time, purchase frequency, meal prep frequency, quantity, and historical waste behavior

### Future Business Ecosystem

Potential future commercialization opportunities:

- smart grocery delivery partnerships
- low-waste grocery subscription bundles
- personalized kitchen product recommendations
- sustainability-focused affiliate marketplace
- AI-powered grocery ecosystem integration
- premium personalized meal planning features

---

## Long-Term Vision

We are starting with food waste reduction.

The long-term vision is an intelligent sustainable kitchen ecosystem with:

- smart refill automation
- personalized sustainability analytics
- AI shopping assistant
- grocery ecosystem integration
- full AI-powered kitchen operating system