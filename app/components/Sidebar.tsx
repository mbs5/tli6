
'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Home,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  LogOut,
  PanelLeftOpen,
  PanelRightOpen,
  Settings,
  Moon,
  Sun,
  Palette,
  HelpCircle,
  Calculator,
  Atom,
  Beaker,
  Leaf,
  BookOpen,
  Globe,
  BookMarked,
  Languages,
  Code,
  Paintbrush,
  Music,
  Dumbbell,
  TrendingUp,
  Brain,
  Users,
  Lightbulb,
  Scale,
  TreeDeciduous,
  Telescope,
  Mountain,
  GraduationCap,
  CheckSquare,
  X,
} from 'lucide-react'

const subjects = [
  { name: 'Mathematics', icon: Calculator },
  { name: 'Physics', icon: Atom },
  { name: 'Chemistry', icon: Beaker },
  { name: 'Biology', icon: Leaf },
  { name: 'History', icon: BookOpen },
  { name: 'Geography', icon: Globe },
  { name: 'Literature', icon: BookMarked },
  { name: 'Language Arts', icon: Languages },
  { name: 'Computer Science', icon: Code },
  { name: 'Art', icon: Paintbrush },
  { name: 'Music', icon: Music },
  { name: 'Physical Education', icon: Dumbbell },
  { name: 'Economics', icon: TrendingUp },
  { name: 'Psychology', icon: Brain },
  { name: 'Sociology', icon: Users },
  { name: 'Philosophy', icon: Lightbulb },
  { name: 'Political Science', icon: Scale },
  { name: 'Environmental Science', icon: TreeDeciduous },
  { name: 'Astronomy', icon: Telescope },
  { name: 'Geology', icon: Mountain },
]

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function Sidebar({ isExpanded, onToggle }: SidebarProps) {
  const { theme, setTheme } = useTheme()
  const [activeItem, setActiveItem] = useState('Home')
  const [isSubjectsExpanded, setIsSubjectsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const subjectsRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false)
      }
      if (spotlightRef.current && !spotlightRef.current.contains(event.target as Node)) {
        setIsSpotlightOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.length > 0) {
      const filteredSuggestions = subjects
        .filter(subject => subject.name.toLowerCase().includes(value.toLowerCase()))
        .map(subject => subject.name)
      setSuggestions(filteredSuggestions)
      setIsSuggestionsVisible(true)
    } else {
      setSuggestions([])
      setIsSuggestionsVisible(false)
    }
  }, [])

  const handleSearchKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSubjectSelect(suggestions[0])
    }
  }, [suggestions])

  const handleSubjectSelect = useCallback((subject: string) => {
    setSearchTerm('')
    setSuggestions([])
    setIsSuggestionsVisible(false)
    setIsSpotlightOpen(false)
    setActiveItem(subject)
    scrollToSubject(subject)
  }, [])

  const scrollToSubject = useCallback((subject: string) => {
    if (subjectsRef.current) {
      const subjectElement = subjectsRef.current.querySelector(`[data-subject="${subject}"]`)
      if (subjectElement) {
        subjectElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [])

  return (
    <TooltipProvider>
      <motion.div
        className={cn(
          "fixed left-0 top-0 bottom-0 flex flex-col h-screen bg-background border-r",
          isExpanded ? "w-64" : "w-[68px]"
        )}
        initial={false}
        animate={{ width: isExpanded ? 256 : 68 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between p-4 h-14">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="flex items-center space-x-3 overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-background rounded-full" />
                </div>
                <span className="font-semibold text-lg whitespace-nowrap">TLI6</span>
              </motion.div>
            )}
          </AnimatePresence>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="transition-all duration-300 ease-in-out"
                onClick={onToggle}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isExpanded ? <PanelRightOpen className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
                </motion.div>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={20} hidden={isExpanded}>
              <p>{isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="px-3 py-2" ref={searchRef}>
          <div className="relative">
            {isExpanded ? (
              <>
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Quick search"
                  className="pl-8 w-full transition-all duration-300 ease-in-out"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                />
              </>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 p-0"
                    onClick={() => setIsSpotlightOpen(true)}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  <p>Open search</p>
                </TooltipContent>
              </Tooltip>
            )}
            <AnimatePresence>
              {isExpanded && isSuggestionsVisible && suggestions.length > 0 && (
                <motion.div
                  className="absolute z-10 w-full bg-popover border rounded-md shadow-lg mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      className="px-4 py-2 hover:bg-muted cursor-pointer"
                      onClick={() => handleSubjectSelect(suggestion)}
                      whileHover={{ backgroundColor: "var(--muted)" }}
                      transition={{ duration: 0.2 }}
                    >
                      {suggestion}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {['Home', 'Tasks', 'Resources'].map((item) => (
          <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "flex items-center justify-start px-4 py-2 w-[calc(100%-16px)] mx-2 my-1 border rounded-md transition-all duration-200 ease-in-out",
                    activeItem === item ? "bg-muted shadow-sm border-border" : "border-transparent",
                    "hover:bg-muted"
                  )}
                  onClick={() => setActiveItem(item)}
                >
                  {item === 'Home' && <Home className="h-5 w-5" />}
                  {item === 'Tasks' && <CheckSquare className="h-5 w-5" />}
                  {item === 'Resources' && <FolderOpen className="h-5 w-5" />}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        className="ml-3 flex-grow text-left"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={20} hidden={isExpanded}>
                <p>{item}</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        ))}
        <div className="relative">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center justify-start px-4 py-2 w-[calc(100%-16px)] mx-2 my-1 border rounded-md transition-all duration-200 ease-in-out",
                    activeItem === 'Subjects' ? "bg-muted shadow-sm border-border" : "border-transparent",
                    "hover:bg-muted"
                  )}
                  onClick={() => {
                    setIsSubjectsExpanded(!isSubjectsExpanded)
                    setActiveItem('Subjects')
                  }}
                >
                  <GraduationCap className="h-5 w-5" />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        className="ml-3 flex-grow text-left"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        Subjects
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      animate={{ rotate: isSubjectsExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={20} hidden={isExpanded}>
                <p>Subjects</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
          <AnimatePresence>
            {isExpanded && isSubjectsExpanded && (
              <motion.div 
                className="overflow-hidden ml-6 pl-4 border-l border-border"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-1" ref={subjectsRef}>
                    {subjects.map((subject, index) => (
                      <motion.div key={subject.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="ghost" 
                          className={cn(
                            "flex items-center justify-start w-full py-1 px-2 text-sm rounded-md transition-all duration-200 ease-in-out",
                            "hover:bg-muted",
                            activeItem === subject.name ? "bg-muted font-medium" : ""
                          )}
                          onClick={() => {
                            setActiveItem(subject.name)
                            scrollToSubject(subject.name)
                          }}
                          data-subject={subject.name}
                        >
                          <subject.icon className="h-4 w-4 mr-2" />
                          <span>{subject.name}</span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-auto mb-4">
          <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost"
                className={cn(
                  "flex items-center justify-start w-full px-3 py-2 transition-all duration-200 ease-in-out",
                  "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                  isProfileOpen && "bg-muted"
                )}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-8ebef56c3eca20eff5ff1bad59d5c4be-CwmMrsgi29JoynPN3YqsIvCJQuzmL2.png" alt="Muhammad" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      className="ml-3 flex-grow text-left"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="font-semibold text-sm">Muhammad</div>
                      <div className="text-xs text-muted-foreground">Pro trial</div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {isExpanded && (
                  <motion.div
                    animate={{ rotate: isProfileOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              side="right" 
              align="end" 
              className="w-56 p-1 mt-1 ml-1 bg-popover rounded-lg shadow-lg border"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="px-2 py-1.5 text-sm cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="px-2 py-1.5 text-sm cursor-pointer">Billing</DropdownMenuItem>
              <DropdownMenuItem className="px-2 py-1.5 text-sm cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">Preferences</DropdownMenuLabel>
              <DropdownMenuItem className="px-2 py-1.5 text-sm cursor-pointer" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                <span className="flex-grow">{theme === 'dark' ? 'Light' : 'Dark'} mode</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-2 py-1.5 text-sm cursor-pointer">
                <Palette className="mr-2 h-4 w-4" />
                <span>Themes</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-2 py-1.5 text-sm cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="px-2 py-1.5 text-sm cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
      <AnimatePresence>
        {isSpotlightOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <div 
              ref={spotlightRef}
              className="bg-background rounded-lg shadow-xl w-full max-w-lg mx-4"
            >
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search subjects..."
                  className="w-full pl-11 pr-10 py-3 text-lg rounded-t-lg border-b focus:outline-none focus:ring-2 focus:ring-ring"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setIsSpotlightOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {suggestions.length > 0 && (
                <ScrollArea className="max-h-64">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-left hover:bg-muted"
                      onClick={() => handleSubjectSelect(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </ScrollArea>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  )
}