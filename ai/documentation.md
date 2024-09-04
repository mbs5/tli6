# Expert-Level Documentation for Implementing Analogy Features

## Project Hierarchy and Setup

### Directory Structure

The project follows a structured hierarchy to maintain clarity and modularity. Here’s a breakdown of the key directories and files:

- **app/**: Contains the main application components and pages.
  - **components/**: Contains reusable UI components.
    - **ui/**: Contains UI-specific components like buttons, inputs, and containers.
  - **analogies/**: Contains pages related to analogies.
  - **status/**: Contains markdown files for status updates.
- **components/**: Contains shared components used across the application.
- **lib/**: Contains utility functions and API clients.
- **public/**: Contains static assets like images and icons.
- **styles/**: Contains global CSS files.
- **prompts/**: Contains markdown files for feature documentation and instructions.

### Key Dependencies

- **Next.js**: Framework for server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn UI**: Component library for consistent UI design.
- **Radix UI**: Primitives for building accessible and customizable UI components.
- **Replicate**: API client for AI model integration.

## Feature Implementations

### 1. Complexity Dropdown for Changing Analogy Complexity

#### Description

A dropdown component allows users to select the complexity of the analogy (Easy, Medium, Hard). The selected complexity dynamically updates the prompt sent to the AI.

#### Implementation

- **Component**: `ComplexityDropdown`
- **File**: `app/components/ComplexityDropdown.tsx`
- **Code Reference**:

```1:22:app/components/ComplexityDropdown.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"

type ComplexityOption = "Easy" | "Medium" | "Hard";

interface ComplexityDropdownProps {
  onSelect: (complexity: ComplexityOption) => void;
}

export function ComplexityDropdown({ onSelect }: ComplexityDropdownProps) {
  return (
    <Select onValueChange={onSelect} defaultValue="Easy">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select complexity" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Easy">Easy</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="Hard">Hard</SelectItem>
      </SelectContent>
    </Select>
  )
}
```

#### Steps

1. **Create the Dropdown Component**:

   - Use the `Select` component from Shadcn UI.
   - Define the complexity options and handle the selection change.

2. **Integrate with the Analogy Page**:
   - Import and use the `ComplexityDropdown` component in the analogy page.
   - Update the prompt logic based on the selected complexity.

### 2. Message Bubbles with Avatars and Dynamic Sizing

#### Description

Enhance the chat UI by wrapping messages in styled bubbles. User messages have a top-right corner radius of 0, while AI messages have a top-left corner radius of 0. Replace the "AI" label with an avatar.

#### Implementation

- **Component**: `ChatMessage`
- **File**: `app/components/ChatMessage.tsx`
- **Code Reference**:

```1:22:app/components/ChatMessage.tsx
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar" // Adjusted path

interface ChatMessageProps {
  content: string;
  isAI: boolean;
}

export function ChatMessage({ content, isAI }: ChatMessageProps) {
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      {isAI && (
        <Avatar className="mr-2">
          <AvatarImage src="/ai-avatar.png" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div className={`p-3 max-w-[70%] ${isAI ? 'bg-blue-100 rounded-lg rounded-tl-none' : 'bg-gray-100 rounded-lg rounded-tr-none'}`}>
        {content}
      </div>
    </div>
  );
}
```

#### Steps

1. **Style Message Bubbles**:

   - Use Tailwind CSS classes to style the message bubbles.
   - Apply different corner radius styles for user and AI messages.

2. **Add Avatars**:
   - Use the `Avatar`, `AvatarImage`, and `AvatarFallback` components from Radix UI.
   - Replace the "AI" label with an avatar image.

### 3. Collapsible Sidebar for Easy Navigation

#### Description

Implement a collapsible sidebar for easy navigation using Radix UI's `Collapsible` component. The sidebar contains navigation links to various sections of the application.

#### Implementation

- **Component**: `Sidebar`
- **File**: `app/components/Sidebar.tsx`
- **Code Reference**:

```1:27:app/components/Sidebar.tsx
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible"
import { Button } from "../../components/ui/button"
import Link from 'next/link';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[250px] p-4 bg-gray-100">
      <CollapsibleTrigger asChild>
        <Button variant="outline">{isOpen ? 'Hide Sidebar' : 'Show Sidebar'}</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <nav>
          <ul className="space-y-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/study-sets">Study Sets</Link></li>
            <li><Link href="/assignments">Assignments</Link></li>
            <li><Link href="/resources">Resources</Link></li>
            <li><Link href="/analogies">Analogies</Link></li>
          </ul>
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

#### Steps

1. **Create the Sidebar Component**:

   - Use the `Collapsible`, `CollapsibleContent`, and `CollapsibleTrigger` components from Radix UI.
   - Add navigation links using the `Link` component from Next.js.

2. **Add Toggle Button**:
   - Use the `Button` component from Shadcn UI to create a toggle button for showing/hiding the sidebar.

### 4. Breadcrumb Navigation with the TLI6 Logo

#### Description

Implement a breadcrumb navigation bar at the top left of the page. The breadcrumb dynamically updates based on the current user route and includes the TLI6 logo.

#### Implementation

- **Component**: `Breadcrumb`
- **File**: `app/components/Breadcrumb.tsx`
- **Code Reference**:

```1:29:app/components/Breadcrumb.tsx
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export function Breadcrumb() {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(segment => segment);

  return (
    <div className="flex items-center p-4">
      <Image src="/tli6-logo.png" alt="TLI6 Logo" width={32} height={32} className="mr-4" />
      <nav>
        <ol className="flex">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          </li>
          {pathSegments.map((segment, index) => (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`} className="text-blue-600 hover:underline capitalize">
                {segment.replace(/-/g, ' ')}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
```

#### Steps

1. **Create the Breadcrumb Component**:

   - Use the `useRouter` hook from Next.js to get the current route.
   - Split the route into segments and create breadcrumb links.

2. **Add TLI6 Logo**:
   - Use the `Image` component from Next.js to display the TLI6 logo.
   - Position the logo to the left of the breadcrumb links.

## Conclusion

This documentation provides a comprehensive overview of the project hierarchy and the implementation of key features. Each feature is implemented using a combination of Next.js, Tailwind CSS, Shadcn UI, and Radix UI components. The provided code references and steps ensure that you can easily understand and replicate the implementations. For further details, refer to the specific code blocks mentioned in the references.
