'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProposeModuleDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Dummy submit handler
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Proposed Module Data:", data);
    toast({
      title: "Module Proposed!",
      description: `${data.title} has been submitted for review.`,
    });
    setIsOpen(false); // Close dialog on submit
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Propose New Module
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Propose a New Module</DialogTitle>
          <DialogDescription>
            Share your idea for a new learning module. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" name="title" className="col-span-3" placeholder="e.g., Advanced React Patterns" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="outcomes" className="text-right">
              Outcomes
            </Label>
            <Textarea id="outcomes" name="outcomes" className="col-span-3" placeholder="List key learning outcomes, one per line." required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Est. Duration
            </Label>
            <Input id="duration" name="duration" className="col-span-3" placeholder="e.g., 4 hours, 2 weeks" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tools" className="text-right">
              Required Tools
            </Label>
            <Input id="tools" name="tools" className="col-span-3" placeholder="e.g., VS Code, Node.js (comma-separated)" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input id="category" name="category" className="col-span-3" placeholder="e.g., Web Development, Data Science" />
          </div>
           <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Proposal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
