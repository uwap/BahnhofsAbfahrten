// @flow
import { connect } from 'react-redux';
import { fav, unfav } from 'client/actions/fav';
import { openSettings } from 'client/actions/config';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Settings from '@material-ui/icons/Settings';
import ToggleStar from '@material-ui/icons/Star';
import ToggleStarBorder from '@material-ui/icons/StarBorder';
import type { AppState } from 'AppState';
import type { Station } from 'types/abfahrten';

type StateProps = {|
  isFaved: boolean,
  currentStation: ?Station,
|};
type DispatchProps = {|
  fav: typeof fav,
  unfav: typeof unfav,
  openSettings: typeof openSettings,
|};

type Props = {|
  ...StateProps,
  ...DispatchProps,
|};

class HeaderButtons extends React.PureComponent<Props> {
  toggleFav = () => {
    const { isFaved, fav, unfav, currentStation } = this.props;

    if (currentStation) {
      if (isFaved) {
        unfav(currentStation);
      } else {
        fav(currentStation);
      }
    }
  };
  openSettings = () => {
    this.props.openSettings();
  };
  render() {
    const { currentStation, isFaved } = this.props;

    return [
      Boolean(currentStation?.id) && (
        <IconButton aria-label={isFaved ? 'unfav' : 'fav'} key="1" onClick={this.toggleFav} color="inherit">
          {isFaved ? <ToggleStar /> : <ToggleStarBorder />}
        </IconButton>
      ),
      <IconButton aria-label="settings" key="2" onClick={this.openSettings} color="inherit">
        <Settings />
      </IconButton>,
    ];
  }
}

export default connect<AppState, Function, {||}, StateProps, DispatchProps>(
  state => ({
    isFaved: Boolean(state.abfahrten.currentStation && state.fav.favs[state.abfahrten.currentStation.id]),
    currentStation: state.abfahrten.currentStation,
  }),
  {
    fav,
    unfav,
    openSettings,
  }
)(HeaderButtons);
