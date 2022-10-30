import { Divider } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { ConferenceEnum } from 'src/dataLayer/balldontlie/models/Conference';
import { useStore } from 'src/stores';
import Conference from '../Conference';

export enum ConferenceViewType {
    Shown = 'Shown',
    Hidden = 'Hidden',
    Expanded = 'Expanded',
}

// TODO: move to team views directory
interface ConferenceViewProps {
    handleClickTeam: (teamId: number) => void;
}

const ConferenceView: React.FC<ConferenceViewProps> = observer((props) => {
    const {teamStore} = useStore();
    const {handleClickTeam} = props;

    const [conferenceViewTypes, setConferenceViewTypes] = React.useState<{[key in ConferenceEnum]: ConferenceViewType}>({West: ConferenceViewType.Shown, East: ConferenceViewType.Shown});

    const handleExpandingConferenceView = (conference: ConferenceEnum) => (expand: boolean): void => {
        if (expand) {
            setConferenceViewTypes({
                West: conference === ConferenceEnum.West ? ConferenceViewType.Expanded : ConferenceViewType.Hidden,
                East: conference === ConferenceEnum.East ? ConferenceViewType.Expanded : ConferenceViewType.Hidden
            });
        } else {
            setConferenceViewTypes({
                West: ConferenceViewType.Shown,
                East: ConferenceViewType.Shown
            });
        }
    }

    return (
        <>
            <Conference conferenceType={ConferenceEnum.West} teamsMap={teamStore.westConferenceTeams} onTeamClick={handleClickTeam} viewType={conferenceViewTypes.West} onExpand={handleExpandingConferenceView(ConferenceEnum.West)}/>
            {/** TODO: нужен передвигающийся разделитель */}
            {conferenceViewTypes.West == ConferenceViewType.Shown && conferenceViewTypes.East == ConferenceViewType.Shown && <Divider orientation='vertical'></Divider>}
            <Conference conferenceType={ConferenceEnum.East} teamsMap={teamStore.eastConferenceTeams} onTeamClick={handleClickTeam} viewType={conferenceViewTypes.East} onExpand={handleExpandingConferenceView(ConferenceEnum.East)}/>
        </>
    );
});

export default ConferenceView;