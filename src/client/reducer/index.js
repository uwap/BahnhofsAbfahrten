// @ƒlow
import { combineReducers } from 'redux';
import abfahrten from './abfahrten';
import auslastung from './auslastung';
import config from './config';
import fav from './fav';
import reihung from './reihung';

export default combineReducers({
  abfahrten,
  auslastung,
  config,
  fav,
  reihung,
});
