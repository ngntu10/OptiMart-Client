// ** MUI Imports
import { Theme } from '@mui/material/styles'
import { ComponentsPropsList } from '@mui/material'

// ** Type Import

export type OwnerStateThemeType = {
  theme: Theme
  ownerState: ComponentsPropsList[keyof ComponentsPropsList] & Record<string, unknown>
}

// ** Overrides Imports
import MuiCard from './card'
import MuiChip from './chip'
import MuiLink from './link'
import MuiList from './list'
import MuiMenu from './menu'
import MuiTabs from './tabs'
import FabButton from './fab'
import MuiBadge from './badge'
import MuiInput from './input'
import MuiPaper from './paper'
import MuiTable from './table'
import MuiRadio from './radio'
import MuiAlerts from './alerts'
import MuiButton from './button'
import MuiDialog from './dialog'
import MuiRating from './rating'
import MuiDrawer from './drawer'
import MuiSelect from './select'
import MuiSlider from './slider'
import MuiAvatar from './avatars'
import MuiDivider from './divider'
import MuiPopover from './popover'
import MuiTooltip from './tooltip'
import MuiCheckbox from './checkbox'
import MuiBackdrop from './backdrop'
import MuiDataGrid from './dataGrid'
import MuiProgress from './progress'
import MuiSnackbar from './snackbar'
import MuiSwitches from './switches'
import MuiTimeline from './timeline'
import MuiAccordion from './accordion'
import MuiPagination from './pagination'
import MuiTypography from './typography'
import MuiBreadcrumb from './breadcrumbs'
import MuiIconButton from './icon-button'
import MuiButtonGroup from './button-group'
import MuiAutocomplete from './autocomplete'
import MuiToggleButton from './toggleButton'
import { Settings } from 'src/contexts/SettingsContext'

const Overrides = (settings: Settings) => {
  const { skin } = settings

  const chip = MuiChip()
  const list = MuiList()
  const menu = MuiMenu()
  const tabs = MuiTabs()
  const radio = MuiRadio()
  const input = MuiInput()
  const tables = MuiTable()
  const alerts = MuiAlerts()
  const button = MuiButton()
  const rating = MuiRating()
  const slider = MuiSlider()
  const cards = MuiCard(skin)
  const avatars = MuiAvatar()
  const divider = MuiDivider()
  const tooltip = MuiTooltip()
  const fabButton = FabButton()
  const dialog = MuiDialog(skin)
  const checkbox = MuiCheckbox()
  const backdrop = MuiBackdrop()
  const dataGrid = MuiDataGrid()
  const progress = MuiProgress()
  const drawer = MuiDrawer(skin)
  const switches = MuiSwitches()
  const timeline = MuiTimeline()
  const popover = MuiPopover(skin)
  const accordion = MuiAccordion()
  const pagination = MuiPagination()
  const snackbar = MuiSnackbar(skin)
  const breadcrumb = MuiBreadcrumb()
  const buttonGroup = MuiButtonGroup()
  const autocomplete = MuiAutocomplete(skin)

  return Object.assign(
    chip,
    list,
    menu,
    tabs,
    cards,
    radio,
    input,
    alerts,
    button,
    dialog,
    rating,
    slider,
    drawer,
    tables,
    avatars,
    divider,
    MuiLink,
    popover,
    tooltip,
    checkbox,
    backdrop,
    MuiBadge,
    dataGrid,
    MuiPaper,
    progress,
    snackbar,
    switches,
    timeline,
    accordion,
    MuiSelect,
    fabButton,
    breadcrumb,
    pagination,
    buttonGroup,
    autocomplete,
    MuiIconButton,
    MuiTypography,
    MuiToggleButton
  )
}

export default Overrides
