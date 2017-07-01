import React from 'react';
import { presenter } from '../hoc';
import Presenter from './HomePM';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ pm }) => (
    <div>
        {!pm.isGeolocationAvailable && <div>
            <Row gutter={16}>
                <input type="text" placeholder="Enter your postcode"/>
            </Row>
        </div> }
        {pm.isGeolocationAvailable && (
            <div>
                {pm.position && (
                    <Row gutter={16}>
                        <strong>Your position is {pm.position.lat} {pm.position.long}</strong>
                    </Row>
                )}
                <Row gutter={16}>
                    {pm.services.slice(0).map(service => (
                        <Col span={8} key={service.name}>
                            <Card
                                title={<CardTitle link={{link: service.id, name: service.name}} />}
                                bordered={false}
                            >
                                <ul>
                                    {service.lines.map(line =>
                                        <li key={line.lineName}>
                                            <strong>{line.lineName}:</strong>
                                            <strong
                                                className={line.statusColor}>
                                                {` ${line.serviceStatus}`}
                                            </strong>
                                        </li>)}
                                </ul>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        )}
    </div>
);

const CardTitle = ({ link }) => <Link to={link.link}>{link.name}</Link>;


export default presenter(Presenter, Home);
