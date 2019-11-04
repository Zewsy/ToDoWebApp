import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'

export const projectButtonTheme = createMuiTheme({
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

export const styles = {
  btnProject: {
    margin: '10px'
  },
};
