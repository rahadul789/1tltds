import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

export function ArrayField({
  label,
  description,
  fieldName,
  values,
  setValues,
}: {
  label: string;
  description?: string;
  fieldName: string;
  values: string[];
  setValues: (v: string[]) => void;
}) {
  const add = () => setValues([...values, ""]);
  const remove = (idx: number) => setValues(values.filter((_, i) => i !== idx));
  const update = (idx: number, v: string) =>
    setValues(values.map((val, i) => (i === idx ? v : val)));

  return (
    <div className="shadow-md p-6 rounded-md border-l-4 border-brand-teal space-y-3">
      <div>
        <h2 className="text-sm font-semibold flex items-center gap-2">
          {label}
        </h2>
        {description ? (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        ) : null}
      </div>

      <div className="space-y-3">
        {values.map((val, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Input
              name={`${fieldName}[]`}
              value={val}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={`Item ${idx + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  add();
                }
              }}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(idx)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={add}>
            <Plus /> Add item
          </Button>
        </div>
      </div>
    </div>
  );
}
