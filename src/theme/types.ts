declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      dark: string
      main: string
      light: string
      bodyBg: string
      trackBg: string
      avatarBg: string
      darkPaperBg: string
      lightPaperBg: string
      tableHeaderBg: string
      borderColor: string
    }
  }

  interface PaletteOptions {
    customColors?: {
      dark?: string
      main?: string
      light?: string
      bodyBg?: string
      trackBg?: string
      avatarBg?: string
      darkPaperBg?: string
      lightPaperBg?: string
      tableHeaderBg?: string
      mainGrey?: string
      lightGrey?: string
      disabledGrey?: string
    }
    customGrey?: PaletteOptions
    customBlack?: PaletteOptions
  }
}

declare module '@mui/material' {
  interface Color {
    main: '#A2A2A2'
    light: '#FCFCFC'
    disabled: '#EFEFEF'
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    tonal: true
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    tonal: true
  }
}

export {}
