import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';

import Home from '../pages/Home';
import Mode from '../pages/Mode';
import CycleHire from '../pages/CycleHire';

const { Content } = Layout;

const MainContent = (props) => (
    <Content style={{ padding: '0 50px' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
            {props.services.map(service => {
                if (service.link === '/') {
                    return <Route key={service.link} exact path="/" component={Home} />
                } else if (service.link === 'cycle-hire') {
                    return <Route key={service.link} path="/cycle-hire" component={CycleHire}/>
                }
               return <Route key={service.link} path={`/${service.link}`} component={Mode} />
            })}
        </div>
    </Content>
);

export default MainContent;
