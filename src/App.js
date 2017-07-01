import React, { PureComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './layout/Header';
import MainContent from './layout/MainContent';
import { presenter } from './hoc';
import Presenter from './AppPM';
import './App.css';

const { Footer } = Layout;

class App extends PureComponent {
  render() {
    const { pm } = this.props;
    return (
    <Router history="">
      <Layout className="layout">
        <Header links={pm.menuLinks} />
        <MainContent services={pm.menuLinks} />
        <Footer style={{ textAlign: 'center' }}>
          Strata Test - Marco Boninsegni - marcoboninsegni@gmail.com
        </Footer>
      </Layout>
    </Router>
    );
  }
}

export default presenter(Presenter, App);
