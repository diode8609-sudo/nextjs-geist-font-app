```markdown
# Detailed Implementation Plan – College Placement Portal Frontend

This plan outlines the step-by-step changes and additions needed in the Next.js frontend codebase to build the College Placement Portal with role-based login and distinct dashboards for Students, Placement Officers, and Administrators.

---

## 1. Global Styles & Configuration

### File: src/app/globals.css
- **Changes:**
  - Update global font families, base colors, and spacing to achieve a clean, minimalist design.
  - Add utility classes for error messages (e.g., `.error { color: #ef4444; }`) and success notifications.
- **Error Handling & Best Practices:**
  - Ensure text inputs, buttons, and alerts have focus and hover states for usability.

### File: next.config.ts
- **Changes:**
  - No modifications needed for the current frontend implementation.
  - Verify that any static assets remain correctly configured.

---

## 2. Login & Role-Based Navigation

### File: src/app/login/page.tsx
- **Changes:**
  - Create a new login page that imports the `LoginForm` component.
  - Use a role selector (dropdown: Student, Placement Officer, Admin) with email and password fields.
  - On submission, simulate login and use Next.js router to redirect to the appropriate dashboard (e.g., `/student/dashboard`).
- **Error Handling:**
  - Validate that all fields are filled; show inline error messages when inputs are missing or invalid.

### File: src/components/LoginForm.tsx
- **Changes:**
  - Create a reusable login form component with controlled inputs for email, password, and a role dropdown.
  - Implement client-side validation (using useState) with error state management.
  - Utilize Tailwind CSS classes for a modern, clean look without external icon libraries.
- **Best Practices:**
  - Use template literals for any dynamic strings.
  - Provide accessible labels and ARIA attributes.

---

## 3. Student Dashboard

### File: src/app/student/dashboard/page.tsx
- **Changes:**
  - Build the student dashboard page with a header (e.g., “Student Dashboard”) and minimal navigation (Profile, Drives, Logout).
  - Divide the page into sections:
    - **Profile Overview:** Display dummy data for name, CGPA, branch, and a resume upload field (input type file, with client-side file type validation).
    - **Upcoming Placement Drives:** Render a list of drives using the `DriveCard` component.
- **Error Handling:**
  - Show an appropriate message if no drives are available.
  - Validate resume file type and size on the client side.

### File: src/components/DriveCard.tsx
- **Changes:**
  - Create a card component that accepts props: company name, role, offered package, eligibility, and drive date.
  - Display drive details in a clean card layout using Tailwind CSS.
  - Include an “Apply” button that toggles state (e.g., changes to “Applied”), and update status visually.
  - Optionally, if an image is needed, use an `<img>` tag with:
    ```typescript
    const driveImage = "https://placehold.co/400x300?text=Placement+drive+card+with+clean+modern+design";
    ```
    with an appropriate `alt` text and an `onerror` fallback.
- **Best Practices:**
  - Ensure buttons are accessible using ARIA roles.

---

## 4. Placement Officer Dashboard

### File: src/app/officer/dashboard/page.tsx
- **Changes:**
  - Create a dashboard page with two sections:
    - **Add New Drive:** Render the `PlacementDriveForm` component.
    - **Student Applications:** Display a table (leveraging existing `src/components/ui/table.tsx`) with dummy application data.
  - Use a two-column layout for clear separation.
- **Error Handling:**
  - Validate form inputs before submission.
  - Show error messages if the applications table is empty or fails to load dummy data.

### File: src/components/PlacementDriveForm.tsx
- **Changes:**
  - Develop a form with fields: company name, role, package, eligibility criteria, drive date (using input type date), and process details (textarea).
  - On submission, simulate drive creation and display a success or error notification.
  - Clear input fields after a successful submission.
- **Best Practices:**
  - Use client-side validation with immediate feedback.

---

## 5. Administrator Dashboard

### File: src/app/admin/dashboard/page.tsx
- **Changes:**
  - Construct the admin dashboard with two main sections:
    - **Verify Drives:** List pending drives in a table (use the existing table UI component) with “Approve” and “Reject” buttons for each entry.
    - **Analytics & Reports:** Display key metrics such as total companies visited, branch-wise placements, package statistics, and a placement percentage. Optionally, incorporate a simple bar or pie chart using the `src/components/ui/chart.tsx` component.
  - Provide an “Export Report” button that simulates CSV download.
- **Error Handling:**
  - Handle button actions with confirmation dialogs (using `src/components/ui/alert-dialog.tsx` if needed) and ensure proper state updates if data is missing.

---

## 6. Additional UI/UX Considerations

- **Navigation & Layout:**
  - Consider creating a shared layout component (e.g., `src/app/dashboard/layout.tsx`) for common dashboard elements like headers and navigation menus.
- **Responsive Design:**
  - Use Tailwind’s responsive utilities to ensure the design is mobile-friendly.
- **Accessibility:**
  - Ensure all interactive elements are keyboard accessible with sufficient color contrast.
- **Form Validation & Error States:**
  - Implement client-side error handling for all form submissions using state validations and display messages in a consistent style.

---

## Summary

- Created new pages for login, student, officer, and admin dashboards with role-based navigation.
- Developed reusable components: `LoginForm`, `DriveCard`, and `PlacementDriveForm` with client-side validations.
- Implemented clear, modern UI elements using Tailwind CSS with focus on accessibility and responsive design.
- Leveraged existing UI components (e.g., table, alert, chart) to maintain design consistency.
- Ensured error handling for form submissions and empty states.
- Prioritized a clean, minimalist design with proper spacing and typography.
