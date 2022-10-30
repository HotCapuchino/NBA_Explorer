import { Avatar, Box, Card, CardContent, CardHeader, Popover, PopoverPosition, Typography } from '@mui/material';
import { debounce } from 'lodash';
import { observer } from 'mobx-react';
import React from 'react'
import { TeamModel } from 'src/dataLayer/balldontlie/models/Team';
import { mapStateToCities, States } from 'src/helpers/stateToCityMapper';
import { USAMap } from 'src/icons';
import { useStore } from 'src/stores';
import './styles';


interface PopoverInfo {
    open: boolean;
    state: {id: States, name: string};
    teams: TeamModel[];
}

interface MapViewProps {
    handleClickTeam: (teamId: number) => void;
}

const MapView: React.FC<MapViewProps> = observer((props) => {
    const {handleClickTeam} = props;
    const {teamStore} = useStore();

    const [mouseInfo, setMouseInfo] = React.useState<PopoverPosition>({top: 0, left: 0});
    const [popoverInfo, setPopoverInfo] = React.useState<PopoverInfo>({
        open: false,
        state: {id: null, name: null},
        teams: []
    });
    const [anchorEl, setAnchorEl] = React.useState<SVGAElement | null>(null);

    const handleClickMap = () => {
        return debounce(function(event: React.MouseEvent<SVGAElement>) {
            if ((event.target as  HTMLElement).hasAttribute('id')) {
                const availableStates = Object.keys(States);

                if (availableStates.includes((event.target as HTMLElement).id)) {
                    const state: States = (event.target as HTMLElement).id as States;

                    if (state === popoverInfo.state.id) return;

                    const mapObj = mapStateToCities(state);
                    const teams = mapObj.cities.map(city => {
                        return teamStore.teams.find(team => team.city === city);
                    });
                    
                    if (teams) {
                        setPopoverInfo({
                            open: true,
                            state: {id: state, name: mapObj.name},
                            teams
                        });
                    }
                    setMouseInfo({top: event.clientY, left: event.clientX,});
                    setAnchorEl(event.target as SVGAElement);

                    return;
                }
            }

            handleClosePopover();

            event.stopPropagation();
            event.preventDefault();
        }, 50)
    }

    const handleClosePopover = (): void =>  {
        setPopoverInfo({
            open: false,
            state: {id: null, name: null},
            teams: []
        });
        setMouseInfo({top: 0, left: 0});
        setAnchorEl(null);
    }

    const handleClickingTeam = (teamId: number) => (): void => handleClickTeam(teamId);

    return (
            <>
                <Popover 
                    open={popoverInfo.open} 
                    anchorPosition={mouseInfo} 
                    transformOrigin={{horizontal: 'center', vertical: 'top'}}
                    onClose={handleClosePopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    >
                    <Card className='popover-card'>
                        <CardHeader title={popoverInfo.state.name} className={popoverInfo.teams.length ? popoverInfo.teams[0].division.toLowerCase() : ''} />
                        <CardContent>
                            {popoverInfo.teams.map(team => {
                                return (
                                    <Box className='popover-card--team-item' key={team.id}>
                                        <Box className='team-item--info'>
                                            <Avatar variant='rounded' src={team.picture} alt={team.abbreviation}/>
                                            <Typography>{team.abbreviation}</Typography>
                                        </Box> 
                                        <Typography className='team-item--fullname' onClick={handleClickingTeam(team.id)}>{team.full_name}</Typography>
                                    </Box>
                                );
                            })}
                        </CardContent>
                    </Card>  
                </Popover>
                <Box className="us-map-wrapper">
                    <USAMap className='interactive-map' onClick={handleClickMap()}/>
                </Box>
            </>
    );
});

export default MapView;