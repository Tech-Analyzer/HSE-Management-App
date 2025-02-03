<<<<<<< HEAD
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
=======
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
<<<<<<< HEAD
=======

>>>>>>> 10e52d1def588322ed1ea0aedd51e37cc4fa8adf
