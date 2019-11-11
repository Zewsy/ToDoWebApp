import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'
import { red } from '@material-ui/core/colors'

export const barTheme = createMuiTheme({
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
      size: 'small'
    }
  },
  palette: {
    primary: green,
    secondary: red
  },
  typography: {
    h1: {
        fontSize: 60
    },
    h2: {
        fontSize: 25,
        fontStyle: 'italic'
    }
},
});

export const styles = {
  btnProject: {
    margin: '10px'
  },
  subTitle: {
    marginTop: '20px',
    marginBottom: '20px'
  }
};
