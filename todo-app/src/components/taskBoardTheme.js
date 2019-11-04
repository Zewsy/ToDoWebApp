import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'

export const projectButtonTheme = createMuiTheme({
  overrides:{
    MuiButton: {
      root: {
        left: "10px",
        margin: "5px"
      }
    }
  },
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
      size: 'small'
    }
  },
  palette: {
    primary: green,
  }
});