import { PaletteMode } from '@mui/material';
import React from 'react';

// TODO: theme formatting
export const useCustomTheme = (): void => {
	const [mode, setMode] = React.useState<PaletteMode>('light');

	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);
};
