import React from 'react';
import { presenter } from '../hoc';
import Presenter from './CycleHirePM';
import { Card, AutoComplete } from 'antd';

const CycleHire = ({ pm }) => (
    <Card title="Cycle Hire" >
        <AutoComplete
            dataSource={pm.bikePointsHistory}
            onSelect={pm.onSelect}
            placeholder="input here"
            onSearch={pm.onSearch}
            allowClear
            style={{ width: 200 }}
        />
        <ul>
            {!!pm.bikePoints && pm.bikePoints.map(point =>
                <li key={point}>{point}</li>
            )}
        </ul>
    </Card>
);

export default presenter(Presenter, CycleHire);
