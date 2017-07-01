import { observable } from 'mobx';
import { service } from '../service';
import classnames from 'classnames/bind'

class HomePM {
    @observable isGeolocationAvailable = false;
    @observable position = null;
    @observable services = [
        {
            id: 'tube',
            name: 'Tube',
            lines: [],
        },
        {
            id: 'dlr',
            name: 'DLR',
            lines: [],
        },
        {
            id: 'overground',
            name: 'Overground',
            lines: [],
        }
    ];

    constructor() {
        this.checkGeolocationAvailable();
    }

    fetch() {
        this.getPositionCoordinates();
        this.updateServicesStatus();
    }

    update(next) {
        this.fetch(next);
    }

    updateServicesStatus = () => {
        const modes = this.services
            .slice(0)
            .map(service => service.id)
            .join(',');

            service(`Line/Mode/${modes}/Status?detail=true`)
                .then(resp => this.getServicesStatus(resp))
    };


    // ---------- Utilities ----------
    checkGeolocationAvailable = () => {
        this.isGeolocationAvailable = !!navigator.geolocation;
    };

    getPositionCoordinates = () => {
        if (this.isGeolocationAvailable) {
           navigator.geolocation.getCurrentPosition(pos => (
               this.position = {
                   lat: pos.coords.latitude,
                   long: pos.coords.longitude,
               }
           ))
        }
    };

    getServicesStatus = (resp) => {
        if (resp) {
            this.services = this.services
                .map(service => (
                    {
                        id: service.id,
                        name: service.name,
                        lines: this.getModeStatus(service.id, resp),
                    })
                );
        }
    };

    getModeStatus = (type, list) => {
        return list
            .filter(item => item.modeName === type)
            .map(item => ({
                lineName: item.name,
                serviceStatus: item.lineStatuses[0].statusSeverityDescription,
                statusColor: classnames(
                    { green: item.lineStatuses[0].statusSeverity === 10 },
                    { orange: item.lineStatuses[0].statusSeverity === 5 },
                    { red: (item.lineStatuses[0].statusSeverity !== 10
                    && item.lineStatuses[0].statusSeverity !== 5)},
                ),
                details: item.lineStatuses[0].reason
            })
            )
    }

}

export default HomePM;
