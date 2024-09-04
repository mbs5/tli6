# Complexity Dropdown for changing the analogy complexity.

- Add a dropdown above the input box with options "Easy" (default), "Medium," and "Hard."
- When the user selects one of the options, update the prompt that is sent to the AI dynamically.
- Modify the existing prompt logic such that selecting "Medium" or "Hard" changes the complexity of the analogy.
- Use the shadcn UI Select component for the dropdown.

# Message Bubbles with avatars and dynamic sizing.

- For the chat UI, wrap both user and AI messages in `div` elements styled as message bubbles.
- User message bubbles should have the top-right corner radius set to 0 using tailwind classes like `rounded-lg rounded-tr-none`.
- AI message bubbles should have the top-left corner radius set to 0 using `rounded-lg rounded-tl-none`.
- Remove the "You:" and "AI:" labels. Replace the AI label with an avatar using the radix UI Avatar component.
- Adjust the bubble size dynamically to conform to the message content.

# Collapsible Sidebar for easy navigation.

- Implement a collapsible sidebar using radix UI's `Collapsible` or shadcn UI Sidebar component.
- Add the following navigation items: Home, Study Sets, Assignments, Resources, Analogies.
- Set up the corresponding routes for each item.
- Add a toggle button to show or hide the sidebar, ensuring it works smoothly across different screen sizes.

# Breadcrumb Navigation with the TLI6 logo.

- Implement a breadcrumb navigation bar at the top left of the page using shadcn Breadcrumb or a custom HTML solution with Tailwind.
- The breadcrumb should dynamically update based on the current user route (e.g., Home > Study Sets > Current Set).
- Place the TLI6 logo to the left of the breadcrumb as an image or icon.
