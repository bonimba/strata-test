import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { presenter } from '../hoc';
import Presenter from './HeaderPM';

const { Header } = Layout;
const { Item } = Menu;

const TopHeader = (props) => (
    <Header>
        <div className="logo" />
        <Menu
            onClick={props.pm.onClick}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/']}
            selectedKeys={props.pm.selectedKeys.slice(0)}
            style={{ lineHeight: '64px' }}
        >
            {props.links.map(link =>
                <Item key={link.link}>
                    <Link to={link.link}>{link.name}</Link>
                </Item>)}
        </Menu>
    </Header>
);

export default presenter(Presenter, TopHeader);
