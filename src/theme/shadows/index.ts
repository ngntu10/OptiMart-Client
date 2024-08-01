// ** Type Imports
import { PaletteMode, ThemeOptions } from '@mui/material'

const Shadows = (mode: PaletteMode): ThemeOptions['shadows'] => {
  if (mode === 'light') {
    return [
      'none',
      '0px 2px 4px 0px rgba(47, 43, 61, 0.12)',
      '0px 2px 6px 0px rgba(47, 43, 61, 0.14)',
      '0px 3px 8px 0px rgba(47, 43, 61, 0.14)',
      '0px 3px 9px 0px rgba(47, 43, 61, 0.15)',
      '0px 4px 10px 0px rgba(47, 43, 61, 0.15)',
      '0px 4px 11px 0px rgba(47, 43, 61, 0.16)',
      '0px 4px 18px 0px rgba(47, 43, 61, 0.1)',
      '0px 4px 13px 0px rgba(47, 43, 61, 0.18)',
      '0px 5px 14px 0px rgba(47, 43, 61, 0.18)',
      '0px 5px 15px 0px rgba(47, 43, 61, 0.2)',
      '0px 5px 16px 0px rgba(47, 43, 61, 0.2)',
      '0px 6px 17px 0px rgba(47, 43, 61, 0.22)',
      '0px 6px 18px 0px rgba(47, 43, 61, 0.22)',
      '0px 6px 19px 0px rgba(47, 43, 61, 0.24)',
      '0px 7px 20px 0px rgba(47, 43, 61, 0.24)',
      '0px 7px 21px 0px rgba(47, 43, 61, 0.26)',
      '0px 7px 22px 0px rgba(47, 43, 61, 0.26)',
      '0px 8px 23px 0px rgba(47, 43, 61, 0.28)',
      '0px 8px 24px 6px rgba(47, 43, 61, 0.28)',
      '0px 9px 25px 0px rgba(47, 43, 61, 0.3)',
      '0px 9px 26px 0px rgba(47, 43, 61, 0.32)',
      '0px 9px 27px 0px rgba(47, 43, 61, 0.32)',
      '0px 10px 28px 0px rgba(47, 43, 61, 0.34)',
      '0px 10px 30px 0px rgba(47, 43, 61, 0.34)'
    ]
  } else {
    return [
      'none',
      '0px 2px 4px 0px rgba(15, 20, 34, 0.12)',
      '0px 2px 6px 0px rgba(15, 20, 34, 0.14)',
      '0px 3px 8px 0px rgba(15, 20, 34, 0.14)',
      '0px 3px 9px 0px rgba(15, 20, 34, 0.15)',
      '0px 4px 10px 0px rgba(15, 20, 34, 0.15)',
      '0px 4px 11px 0px rgba(15, 20, 34, 0.16)',
      '0px 4px 18px 0px rgba(15, 20, 34, 0.1)',
      '0px 4px 13px 0px rgba(15, 20, 34, 0.18)',
      '0px 5px 14px 0px rgba(15, 20, 34, 0.18)',
      '0px 5px 15px 0px rgba(15, 20, 34, 0.2)',
      '0px 5px 16px 0px rgba(15, 20, 34, 0.2)',
      '0px 6px 17px 0px rgba(15, 20, 34, 0.22)',
      '0px 6px 18px 0px rgba(15, 20, 34, 0.22)',
      '0px 6px 19px 0px rgba(15, 20, 34, 0.24)',
      '0px 7px 20px 0px rgba(15, 20, 34, 0.24)',
      '0px 7px 21px 0px rgba(15, 20, 34, 0.26)',
      '0px 7px 22px 0px rgba(15, 20, 34, 0.26)',
      '0px 8px 23px 0px rgba(15, 20, 34, 0.28)',
      '0px 8px 24px 6px rgba(15, 20, 34, 0.28)',
      '0px 9px 25px 0px rgba(15, 20, 34, 0.3)',
      '0px 9px 26px 0px rgba(15, 20, 34, 0.32)',
      '0px 9px 27px 0px rgba(15, 20, 34, 0.32)',
      '0px 10px 28px 0px rgba(15, 20, 34, 0.34)',
      '0px 10px 30px 0px rgba(15, 20, 34, 0.34)'
    ]
  }
}
export default Shadows
