import { TabContext, TabPanel } from '@mui/lab';
import { Box, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConferenceView from 'src/views/TeamsPage/ConferenceView';
import MapView from 'src/views/TeamsPage/MapView';
import PageLayout from 'src/layout/PageLayout';
import { routes } from 'src/routes/routeObject';
import { useStore } from 'src/stores';
import './styles';

enum PageViewMode {
    SideToSide,
    Map,
}

const TeamsPage: React.FC = observer(() => {
    const {teamStore} = useStore();
    const navigate = useNavigate();

    const [pageView, setPageView] = React.useState<PageViewMode>(PageViewMode.SideToSide);

    React.useEffect(() => {
        void teamStore.fetchTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamStore]);

    const handleClickTeam = (teamId: number): void => {
        navigate(routes.games.index, {
            state: {
                teamId
            }
        });
    }

    const handleChangingPageView = (event: React.SyntheticEvent<Element, Event>, value: unknown): void => {
        setPageView(value as PageViewMode);
    }

    return (
        <PageLayout className='teams-page' hasHeader={true}>
            <TabContext value={String(pageView)}>
                <Box className='page-view-tabs'>
                    <Tabs value={pageView} onChange={handleChangingPageView}>
                        <Tab key={PageViewMode.SideToSide} value={PageViewMode.SideToSide} label='Conference view'/>
                        <Tab key={PageViewMode.Map} value={PageViewMode.Map} label='Map view'/>
                    </Tabs>
                </Box>
                <Box className='tabs-content-wrapper'>
                    <TabPanel className='tabs--tab-panel' value={String(PageViewMode.SideToSide)}>
                        <ConferenceView handleClickTeam={handleClickTeam}/>
                    </TabPanel>
                    <TabPanel className='tabs--tab-panel' value={String(PageViewMode.Map)}>
                        <MapView handleClickTeam={handleClickTeam}/>
                    </TabPanel>
                </Box>
            </TabContext>
        </PageLayout>
    );
});

export default TeamsPage;