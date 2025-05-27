"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label: string
}

const presetColors = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#f43f5e",
  "#84cc16",
  "#06b6d4",
  "#64748b",
  "#374151",
  "#1f2937",
  "#111827",
  "#fbbf24",
  "#34d399",
]

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState(color)
  const [isOpen, setIsOpen] = useState(false)

  const handleColorSelect = (selectedColor: string) => {
    onChange(selectedColor)
    setCustomColor(selectedColor)
    setIsOpen(false)
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setCustomColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border border-gray-300" style={{ backgroundColor: color }} />
              <span>{color}</span>
              <Palette className="ml-auto h-4 w-4" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-3">
            <div>
              <Label className="text-sm font-medium">پیش‌فرض</Label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {presetColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    className={cn(
                      "h-8 w-8 rounded border-2 border-gray-200 hover:scale-105 transition-transform",
                      color === presetColor && "ring-2 ring-blue-500 ring-offset-2",
                    )}
                    style={{ backgroundColor: presetColor }}
                    onClick={() => handleColorSelect(presetColor)}
                  >
                    {color === presetColor && <Check className="h-4 w-4 text-white mx-auto" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">رنگ دلخواه</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="w-12 h-10 p-1 border rounded"
                />
                <Input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value)
                    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                      onChange(e.target.value)
                    }
                  }}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
