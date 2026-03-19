"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  CircleHelp as CircleQuestionMark,
  Plus,
  Pencil,
  Check,
  X,
  Trash2,
  Loader2,
} from "lucide-react";

import {
  addAIQuestions,
  editAIQuestion,
  deleteAIQuestion,
} from "@/app/lib/actions";

import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/* ------------------------------------------------------ */
/*               Reusable Section Card Wrapper            */
/* ------------------------------------------------------ */
const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4 hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
        <Icon size={20} />
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

/* ------------------------------------------------------ */
/*                     MAIN COMPONENT                      */
/* ------------------------------------------------------ */

type Question = {
  id: string;
  text: string;
};

type QuestionListProps = {
  onChange?: (questions: string[]) => void;
  aiSettings: {
    id: number;
    context: string;
    questions: string[];
  };
};

const QuestionList = ({ onChange, aiSettings }: QuestionListProps) => {
  const [questions, setQuestions] = useState<Question[]>(() =>
    aiSettings.questions.map((text, index) => ({
      id: index.toString(),
      text,
    }))
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  const emitChange = (next: Question[]) => {
    setQuestions(next);
    onChange?.(next.map((q) => q.text));
  };

  const [addState, addAction, addPending] = useActionState(
    addAIQuestions,
    undefined
  );

  useEffect(() => {
    if (addState?.success && newQuestion.trim()) {
      const next: Question[] = [
        ...questions,
        { id: questions.length.toString(), text: newQuestion.trim() },
      ];

      emitChange(next);
      setNewQuestion("");
      setIsAddOpen(false);
      toast.success("Question added successfully.");
    }
  }, [addState]);

  const handleDeleteLocal = (id: string) => {
    const next = questions
      .filter((q) => q.id !== id)
      .map((q, index) => ({ ...q, id: index.toString() }));

    emitChange(next);
  };

  return (
    <SectionCard icon={CircleQuestionMark} title="Custom Questions">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-2">
        <Label className="font-medium text-sm flex items-center gap-1"></Label>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 cursor-pointer"
            >
              <Plus size={14} />
              Add
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <form action={addAction}>
              <DialogHeader>
                <DialogTitle>Add a question</DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  name="question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g. What does this software do?"
                  autoFocus
                />
              </div>

              <DialogFooter className="mt-4 flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setIsAddOpen(false);
                    setNewQuestion("");
                  }}
                >
                  <X />
                </Button>

                <Button
                  type="submit"
                  disabled={!newQuestion.trim() || addPending}
                  className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
                >
                  {addPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Check />
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Empty State */}
      {questions.length === 0 && (
        <Card className="shadow-none border border-dashed">
          <CardContent className="p-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              No custom questions added yet.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddOpen(true)}
            >
              <Plus size={14} className="mr-1" />
              Add Question
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Question List */}
      <div className="space-y-2">
        {questions.map((q) => (
          <QuestionItem
            key={q.id}
            question={q}
            onUpdate={(text) => {
              const next = questions.map((item) =>
                item.id === q.id ? { ...item, text } : item
              );
              emitChange(next);
            }}
            onDelete={() => handleDeleteLocal(q.id)}
          />
        ))}
      </div>
    </SectionCard>
  );
};

/* ------------------------------------------------------ */
/*               SINGLE QUESTION ITEM (FIXED)             */
/* ------------------------------------------------------ */

type QuestionItemProps = {
  question: Question;
  onUpdate: (text: string) => void;
  onDelete: () => void;
};

const QuestionItem = ({ question, onUpdate, onDelete }: QuestionItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(question.text);
  const [open, setOpen] = useState(false);

  const [editState, editAction, editPending] = useActionState<any, FormData>(
    editAIQuestion,
    undefined
  );
  const [deleteState, deleteAction, deletePending] = useActionState<
    any,
    FormData
  >(deleteAIQuestion, undefined);

  useEffect(() => {
    if (editState?.success) {
      onUpdate(editText.trim());
      setIsEditing(false);
      toast.success("Question updated successfully.");
    }
  }, [editState]);

  useEffect(() => {
    if (deleteState?.success) {
      onDelete();
      toast.success("Question deleted.");
    }
  }, [deleteState]);

  return (
    <Card className="transition hover:shadow-md">
      <CardContent className="flex justify-between items-center gap-3 py-3">
        <div className="flex-1">
          {isEditing ? (
            /* ---------------------------------------------- */
            /* ENTER SUBMIT FIX → wrap Input inside the form   */
            /* ---------------------------------------------- */
            <form
              action={editAction}
              className="flex items-center gap-1 w-full"
            >
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="text-sm flex-1"
                autoFocus
                name="question"
              />

              <input type="hidden" name="index" value={question.id} />

              <Button
                size="icon"
                variant="ghost"
                className="text-emerald-600"
                type="submit"
                disabled={!editText.trim() || editPending}
              >
                {editPending ? <Loader2 className="animate-spin" /> : <Check />}
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setEditText(question.text);
                  setIsEditing(false);
                }}
              >
                <X size={16} />
              </Button>
            </form>
          ) : (
            <p className="text-sm text-foreground">{question.text}</p>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="rounded-full"
            >
              <Pencil size={16} />
            </Button>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={deletePending}
                  className="cursor-pointer rounded-full"
                >
                  {deletePending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="text-red-600" />
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-48">
                <h4 className="font-medium text-sm">Are you sure?</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  This action cannot be undone.
                </p>

                <div className="flex gap-2 justify-end mt-4">
                  <form action={deleteAction}>
                    <input type="hidden" name="index" value={question.id} />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setOpen(false)}
                    >
                      Delete
                    </Button>
                  </form>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionList;
