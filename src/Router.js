import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import InitialPage from './components/InitialPage';
import SwiperFile from './components/swiperFile';
import ThankYou from './components/Thankyou';
import List from './components/List';

const RouterComponent = () =>
  <Router>
    <Scene key="root">
      <Scene key="initial" component={InitialPage} hideNavBar initial/>
      <Scene key="survey" component={SwiperFile} hideNavBar />
      <Scene key="thankYou" component={ThankYou} hideNavBar />
      <Scene key="list" component={List} hideNavBar />
    </Scene>
  </Router>;

export default RouterComponent;
