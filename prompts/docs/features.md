# 1. Recreate Input Field with Icons Inside the Field

- Create a Input Field component.
- Create a **reusable input field** that will be used across all tools (Create Analogy, Create Quiz, Create Flashcard).
- Ensure the **input field expands vertically** as the user types more text, adjusting its height dynamically. This should be smooth and responsive.
- Place the following icons inside the input field, aligned properly:
  1.  **Dropdown**: Place a dropdown on the left side of the input field, which allows the user to select different complexity levels (Easy, Medium, Hard). This dropdown should not affect the text typing area.
  2.  **Mention Icon**: Add a mention icon `@` next to the dropdown. When clicked or when `@` is typed in the input, it should trigger a dropdown where users can mention documents, notes, or other relevant items (like tagging functionality).
  3.  **Chat and Codebase Icons**: Place the chat and codebase toggle icons on the right side of the input field. When the chat icon is clicked, it toggles the chat tool. The codebase icon toggles the code-related interface.
- The entire input field, including the icons, should be **responsive** and work well across different screen sizes.

# 2. Use **shadcn components** for all elements:

- the input field, icons, dropdowns, and other UI elements.
- Ensure that the input field is built with **shadcn Input**, and the icons are implemented using **shadcn Icon Button** or similar components.
- The dropdown for selecting complexity should use the **shadcn Select** component.

# 3. Convert the Analogy Builder into a Sidebar

- Convert the analogy builder into a **right sidebar** using **shadcn components**.
- The sidebar should contain a **fixed header** with the following items:
  1.  A **dropdown** to switch between tools (Create Analogy, Create Quiz, Create Flashcards).
  2.  An **Add New Chat** icon (use a `+` icon) that starts a new chat session. This button should clear the input and output fields and start a fresh conversation.
  3.  A **Previous Chats** icon (reverse time arrow) that, when clicked, opens a searchable modal for chat history.
  4.  A **Close Sidebar** button (use an `X` icon) that collapses or closes the sidebar.
- The **Replicate API** should be integrated for all three tools:
  1.  **For Analogy Builder**: Use the Replicate API to generate analogies based on user input.
  2.  **For Quiz Builder**: Use the Replicate API to generate quiz questions and answers.
  3.  **For Flashcard Builder**: Use the Replicate API to create flashcards (one side with a term, the other with a definition).
  - Reuse the same **input field** and **response components** across all three tools. Only the API calls and the displayed content should change based on the selected tool.

# 4. Sidebar Responsiveness and Stretchability

- Make the sidebar **horizontally draggable**. This means the user should be able to drag the top or bottom of the sidebar to resize it horizontally.
- Ensure that the sidebar remains **responsive** when resized, adjusting smoothly across different screen sizes and device types (desktop, mobile, tablet).
- The icons and other components within the sidebar should adjust their layout based on the size of the sidebar.

# 5. Sidebar Toggle Button

- Add a **square button or icon** on the main interface that, when clicked, opens the sidebar. This button should remain visible even when the sidebar is collapsed, allowing users to open it again.
- When the sidebar is expanded, the button should toggle the collapse functionality.
- Ensure that this button is always accessible, regardless of which page the user is on.

# 6. Reusable Components Across All Tools

- Ensure that all components created (input field, icons, dropdowns, chat toggles) are **reusable** across all three tools (analogy builder, quiz builder, flashcard builder).
- Use the same **input field component** for all tools, but modify the API request based on which tool the user is interacting with.
- Reuse the **sidebar layout and design** for all interactions, ensuring consistency across all pages.
- Ensure the **dropdown, mention functionality, and response bubbles** are built once and reused across all interactions.

# 7.Additional Hover and Interaction Effects

- Ensure that all components created (input field, icons, dropdowns, chat toggles) are **reusable** across all three tools (analogy builder, quiz builder, flashcard builder).
- Use the same **input field component** for all tools, but modify the API request based on which tool the user is interacting with.
- Reuse the **sidebar layout and design** for all interactions, ensuring consistency across all pages.
- Ensure the **dropdown, mention functionality, and response bubbles** are built once and reused across all interactions.

# 8. Ensure Replicate API Integration for All Tools

- Ensure that the Replicate API is integrated for all three tools:
- For each tool, ensure that the **Replicate API** is integrated properly:
  1.  **Analogy Builder**: Use the API to generate analogies based on user input, and display the responses in the correct bubble format.
  2.  **Quiz Builder**: Use the API to generate quiz questions and answers dynamically, and display them in the same chat-style format.
  3.  **Flashcard Builder**: Use the API to generate flashcards (terms on one side, definitions on the other), and display them in the same format as the analogy responses.
- Make sure that the API calls are optimized for each tool, with relevant prompts sent to the API based on the user’s input.

# Final Summary for Claude Sonnet:

- Create a reusable input field with all icons (dropdown, mention, chat, codebase) placed inside the field and ensure the field expands as the user types.
- Use shadcn components for all elements (input, icons, dropdowns, etc.) and avoid repetition in the code.
- Convert the analogy builder into a collapsible right sidebar with a fixed header containing a tool dropdown, add new chat icon, previous chats icon, and close sidebar button.
- Ensure the sidebar is draggable horizontally and responsive, with resizing functionality.
- Add a toggle button to open and close the sidebar, and ensure it is accessible from all pages.
- Reuse components across all three tools (analogy builder, quiz builder, flashcard builder), ensuring consistency and reducing duplication.
- Integrate the Replicate API functionality into all tools (analogy, quiz, flashcards) to dynamically generate responses based on the user’s input.
- Add interactive hover effects to icons and response bubbles, ensuring the UI feels responsive and user-friendly.
