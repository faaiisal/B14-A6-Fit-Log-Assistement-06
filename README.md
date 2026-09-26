# 💪 FitLog — Workout Library

FitLog is a dark, focused workout library and daily workout planning application built with **Next.js 16, React 19, TypeScript, and Tailwind CSS v4**.

The app lets users browse a curated workout library, view detailed workout information, save exercises for later, and build a focused **Today's Plan** with a maximum of five exercises.

The project is designed around a simple idea:

> **Train with intent. Log every set.**

---

## 🌐 Project Links

- **Live Site:** _Add your deployed URL here_
- **GitHub Repository:** _https://github.com/faaiisal/B14-A6-Fit-Log-Assistement-06_

---

## ✨ Features

### 🏋️ Workout Library

Browse the available workouts fetched directly from the FitLog REST API.

Each workout card includes:

- Workout image
- Muscle group/category tags
- Workout name
- Equipment
- Duration
- Calories
- Rating

The library is fully responsive and adapts from a desktop 3-column layout to smaller tablet and mobile layouts.

---

### 🔎 Workout Details

Every workout has its own details page:

```text
/workout/[id]
```

Showing detailed workout information including:

- High-quality workout image
- Detailed description
- Step-by-step instructions
- Equipment needed
- Category, duration, calories, rating

Users can **Add to Today's Plan** directly from this page.

---

### 🗓️ Today's Plan

Manage your daily workout with a smart **5-exercise limit**.

The Today's Plan page features:

- **Live counters** showing total exercises, minutes, and calories
- **Add from workout details** — easily add new workouts
- **Checkboxes** to mark exercises as complete
- **Remove** workouts from the plan
- **Progress tracking** that updates in real-time
- **5-exercise cap** — prevents overwhelming daily routines

All plan data persists across page refreshes thanks to `localStorage`.

---

### 🔖 Saved for Later

Keep track of workouts you want to do in the future.

- Separate list from Today's Plan
- Save workouts from workout details
- Remove workouts when you're ready
- Badge counters update automatically

---

### 🔄 Real-time Sync

- Badge counters in the navbar update instantly when adding/removing workouts
- `localStorage` ensures data persists across refreshes
- All plan operations update the UI immediately

---

### 🔔 Notifications & Error Handling

- **Toast notifications** for every action:
  - Workout added
  - Workout removed
  - Workout marked complete
  - Workout already in plan
- **Custom 404 page** — shows the FitLog brand instead of a default Next.js error

---

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **React 19** with Hooks
- **TypeScript** for type safety
- **Tailwind CSS v4** with custom theme tokens
- **Context API** for global state management
- **FitLog REST API** for workout data


## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd fit-log-app
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.