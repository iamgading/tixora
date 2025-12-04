"use client";


import { Plus, Trash2, GripVertical } from "lucide-react";
import type { CustomField } from "@/lib/types/database";

interface CustomFieldsEditorProps {
  value: CustomField[];
  onChange: (fields: CustomField[]) => void;
}

const fieldTypes = [
  { value: "text", label: "Teks" },
  { value: "email", label: "Email" },
  { value: "number", label: "Angka" },
  { value: "textarea", label: "Teks Panjang" },
  { value: "select", label: "Pilihan" },
] as const;

export function CustomFieldsEditor({ value, onChange }: CustomFieldsEditorProps) {
  const addField = () => {
    const newField: CustomField = {
      id: `field_${Date.now()}`,
      label: "",
      type: "text",
      required: false,
    };
    onChange([...value, newField]);
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    onChange(
      value.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (id: string) => {
    onChange(value.filter((field) => field.id !== id));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...value];
    const [removed] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, removed);
    onChange(newFields);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Custom Fields</p>
          <p className="text-xs text-muted">Tambah pertanyaan tambahan untuk peserta</p>
        </div>
        <button
          type="button"
          onClick={addField}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-accent bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Tambah Field
        </button>
      </div>

      {value.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
          <p className="text-sm text-muted">Belum ada custom field</p>
          <button
            type="button"
            onClick={addField}
            className="mt-2 text-sm text-accent hover:underline"
          >
            Tambah field pertama
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {value.map((field) => (
            <div
              key={field.id}
              className="flex items-start gap-3 p-4 bg-surface-hover rounded-xl border border-border"
            >
              <button
                type="button"
                className="p-1 text-muted hover:text-foreground cursor-grab mt-2"
                onMouseDown={() => {
                  // Simple drag logic placeholder
                }}
              >
                <GripVertical className="w-4 h-4" />
              </button>

              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    placeholder="Label field"
                    className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => updateField(field.id, { 
                      type: e.target.value as CustomField["type"],
                      options: e.target.value === "select" ? [""] : undefined,
                    })}
                    className="px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                  >
                    {fieldTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {field.type === "select" && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted">Pilihan (pisah dengan enter)</p>
                    <textarea
                      value={field.options?.join("\n") || ""}
                      onChange={(e) =>
                        updateField(field.id, {
                          options: e.target.value.split("\n").filter(Boolean),
                        })
                      }
                      placeholder="Opsi 1&#10;Opsi 2&#10;Opsi 3"
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-none"
                    />
                  </div>
                )}

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                    className="w-4 h-4 rounded border-border text-accent focus:ring-accent focus:ring-offset-0"
                  />
                  <span className="text-sm text-muted">Wajib diisi</span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => removeField(field.id)}
                className="p-2 text-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hidden input to store JSON value */}
      <input
        type="hidden"
        name="custom_fields"
        value={JSON.stringify(value)}
      />
    </div>
  );
}
