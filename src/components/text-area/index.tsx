// ** Mui Imports
import { styled, TextareaAutosizeProps, TextareaAutosize, Box, InputLabel, useTheme, FormHelperText } from '@mui/material'
interface TCustomTextArea extends TextareaAutosizeProps {
  error?: boolean
  helperText?: string
  label?: string
  hideResize?: boolean
}
const TextAreaStyled = styled(TextareaAutosize)<TCustomTextArea>(({ theme, hideResize, error }) => {
  return {
    borderRadius: hideResize ? "8px" : "8px 8px 0 8px",
    padding: "10px 10px 10px 12px",
    resize: hideResize ? "none" : "block",
    color: theme.palette.text.primary,
    width: "100%",
    fontSize: "14px",
    backgroundColor: "inherit",
    border: error ? `1px solid ${theme.palette.error.main}` : `1px solid rgba(${theme.palette.customColors.main}, 0.2)`,
    "&:focus": {
      border: `1px solid ${theme.palette.primary.main}`,
      outline: "none",
    },
    ":disabled": {
      backgroundColor: `${theme.palette.action.selected} !important`
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 0.42,
    },
  }
})
const CustomTextArea = (props: TCustomTextArea) => {
  const { error, helperText, label, ...rests } = props
  const theme = useTheme()
  return (
    <Box>
      <InputLabel
        sx={{
          fontSize: '13px',
          marginBottom: '4px',
          display: 'block',
          color: error
            ? theme.palette.error.main
            : `rgba(${theme.palette.customColors.main}, 0.68)`
        }}
      >
        {label}
      </InputLabel>
      <TextAreaStyled error={error} {...rests} />
      {helperText && (
        <FormHelperText
          sx={{
            color:
              theme.palette.error.main
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Box>
  )
}
export default CustomTextArea