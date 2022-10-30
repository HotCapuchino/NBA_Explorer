import { createTheme } from '@mui/material/styles';

export const generalTheme = createTheme({
	components: {
		MuiAppBar: {
			defaultProps: {
				sx: {
					'&.MuiAppBar-root': {
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						maxHeight: 50,
						padding: '0 20px',
					},
				},
			},
		},
		MuiAvatar: {
			defaultProps: {
				sx: {
					'&.MuiAvatar-root': {
						img: {
							objectFit: 'contain',
						},
					},
				},
				variant: 'rounded',
			},
		},
	},
});
