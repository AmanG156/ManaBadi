/* eslint-disable func-names */
/* eslint-disable no-multi-str */
const makeGradientStyle = (function () {
  const gradientString = '\
      /* Mozilla Firefox */ \
      background-image: -moz-linear-gradient(top, {colour1} 0%, {colour2} 100%);\
      /* Opera */ \
      background-image: -o-linear-gradient(top, {colour1} 0%, {colour2} 100%);\
      /* Webkit (Safari/Chrome 10) */ \
      background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, {colour1}), color-stop(1, {colour2}));\
      /* Webkit (Chrome 11+) */ \
      background-image: -webkit-linear-gradient(top, {colour1} 0%, {colour2} 100%);\
      /* IE10+ */\
      background: -ms-linear-gradient(top,  {colour1} 0%,{colour2} 100%);\
      /* W3C */\
      background: linear-gradient(top,  {colour1} 0%,{colour2} 100%);\
  ';

  return function (colour1, colour2) {
    return gradientString.replace(/\{colour1\}/g, colour1).replace(/\{colour2\}/g, colour2);
  };
}());

const colors = {
  primary: '#104F96',
  secondary: '#e4f5fd',
  border: '#9D9D9D',
  yellow: '#FECA57',
  white: '#FFFFFF',
  black: '#000000',
  lightMustard: '#FECA57',
  vibrantGreen: '#04CA00',
  torchRed: '#F80D38',
  reddishMagenta: '#4B47C5',
  cyanBlue: '#2798F7',
  red: '#FF0000',
  blue: '#2E4DD4',
  green: '#2C7236',
  lightGreen: '#9CC962',
  disabledPrimary: '#104f9694',
  orange: '#FF2424',
  purple: '#763CEF',
  gray: 'rgba(181, 181, 181, 0.2)',
  textPrimary: '#0F0A39',
  textTertiary: '#7B7B7B',
  textGrey: '#B4B4B4',
  lightGrey: '#9B9B9B',
  averageColor: '#FF981F',
  passColor: '#49BE20',
  failColor: '#F0441A',
  homeWorkProgressBar: '#4DBCF4',
  attendanceProgressBar: '#ACC3E2',
  backgroundGrey: '#E4E4E4',
  borderGrey: '#707070',
  borderColor: '#D4D4D4',
  settingsDescription: '#505050',
  borderBottomColor: '#ACABAB',
  placeHolderColor: '#979797',
  progressGrey: '#C1C1C1',
  lightGray: '#f3f3f3',
  textColor: '#333333',
  textColorLite: '#2E384D',
  compaformColor: '#fed189',
  webColor: '#00a0df',
  fontColor: '#d0d8df',
  listItemHover: '#2e3b46',
  appBar: '#7cc4a3',
  drawerBackground: '#394a59',
  labelColor: '#797979',
  formHeading: '#688a7e',
  bgGrey: '#F7F7F7',
  greyIcon: '#acb1b8',
  appbarColor: '#324c57',
  greyLabel: '#89817e',
  tabelHeadGrey: '#688a73',
  grey: '#bdbdbd',
  cancelRed: '#ff2d55',
  iconButton: '#7cc4a3',
  errorText: '#d32f2f',
  mainHeaderDescColor: '#CBE6FF',
  footerBottomColor: '#767676',
  modalInstructionColor: '#515151',
  logoBGColor: '#E0F0F8',
  newBGColor: makeGradientStyle('#015EEA', '#104F96'),
  actionIconsColor: '#015EEA',
  scrollBarColor: '#9F9F9F',
  backgroundColor: '#E4F5FD',
  cardBackgroundColor: '#F6F6F6',
  cardMenuBG: '#C4E0FF',
  toggleButtonBG: '#0956BC',
  cardValueSecondaryColor: '#3B3B3B',
  passwordGreen: '#028E10',
  disabledField: 'rgba(196, 196, 196, 0.3)',
  borderBottomNewColor: '#C4C4C4',
  donateColor: '#6BBE00',
  accordionBarColor: '#E8F5FE',
  userProfleName: '#3f3f3f',
  rolename: '#8F8F8F',
  formBorder: 'rgba(0, 0, 0, 0.23)',
  navyBlue: '#100DB1',
  mapTitleColor: '#343434',
  greyBorder: '#d3d3d3',
  anchorTagColor: 'rgba(0, 0, 0, 0.87)',
  greyShade: '#E5E5E5',
  persianBlue: '#1E19B6',
  yellowOrange: '#FFB740',
  rum: '#6C5B8C',
  highLand: '#00805B',
  violet: '#B60091',
  persimmon: '#FF6C46',
  rosePink: '#F60068',
  pinkShade: '#F837D9',
  skyBlue: '#2798F7',
  darkGrey: '#DADADA',
  redShade: '#F80D38',
  greenShade: '#16D81E',
  blackShade: '#6F6262',
  blueShade: '#015EEA',
  primaryBlueColor: '#015EEA',
  darkBrown: '#7c4f4f',
  seaGreen: '#50cdaa',
  purpleShade: '#6b2ba5',
  dullGreen: '#7ca52b',
  blackGreen: '#2b9fa5',
};

export default colors;
