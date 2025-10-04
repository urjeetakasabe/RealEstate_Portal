import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Toggle Content</CollapsibleTrigger>
      <CollapsibleContent>
        This content can be collapsed and expanded.
      </CollapsibleContent>
    </Collapsible>
  );
}