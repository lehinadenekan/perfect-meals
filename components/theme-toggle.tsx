'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={theme === 'light' ? 'secondary' : 'ghost'} // Highlight if light is active
        size="sm"
        onClick={() => setTheme('light')}
        aria-label="Switch to light theme"
      >
        <Sun className="h-4 w-4 mr-2" />
        Light
      </Button>
      <Button
        variant={theme === 'dark' ? 'secondary' : 'ghost'} // Highlight if dark is active
        size="sm"
        onClick={() => setTheme('dark')}
        aria-label="Switch to dark theme"
      >
        <Moon className="h-4 w-4 mr-2" />
        Dark
      </Button>
      {/* Optional: Add system theme button */}
      <Button
        variant={theme === 'system' ? 'secondary' : 'ghost'} // Highlight if system is active
        size="sm"
        onClick={() => setTheme('system')}
        aria-label="Switch to system theme"
      >
        System
      </Button>
    </div>
  )
} 