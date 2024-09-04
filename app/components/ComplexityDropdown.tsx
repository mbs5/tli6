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