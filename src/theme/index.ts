import { createTheme } from '@mui/system';

export const theme = createTheme({
	components: {
		MuiTypography: {
			defaultProps: {
				component: 'span',
			},
		},
	},
});
