import React from 'react';
import { presenter } from '../hoc';
import Presenter from './ModePM';
import { Card } from 'antd';

const Mode = ({ pm }) => (
    <div>
        <Card
            title={<strong>{pm.type}</strong>}
            bordered={false}
        >
            {!pm.disruptions.length && <strong>There is a good service on the {pm.type}</strong>}
            {!!pm.disruptions.length && (
                <ul>
                    {pm.disruptions.map(disruption =>
                        <li key={disruption.description}>
                            <strong>{disruption.type}:</strong>
                            <strong>
                                {disruption.description}
                            </strong>
                            <ul>
                                {disruption.affectedRoutes.map(r => (
                                    <li key={r.name}>{r.name}</li>
                                ))}
                            </ul>
                        </li>)}
                </ul>)
            }
        </Card>
        <Card
            title={<strong>{`${pm.type} Stations near you`}</strong>}
            bordered={false}
        >
            {!pm.places.length && <strong>{`None found`}</strong>}
            {!!pm.places.length && (
                <ul>
                    {pm.places.map(place =>
                        <li key={place}>
                            <strong>{place}</strong>
                        </li>)}
                </ul>)
            }
        </Card>
    </div>

 );

export default presenter(Presenter, Mode);
