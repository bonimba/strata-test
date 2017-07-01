import { service} from '../service';
import { observable } from 'mobx';

class ModePM {
    @observable disruptions = [];
    @observable type = 'tube';
    @observable places = [];

    constructor(view) {
        this.props = view.props;
        const { pathname } = this.props.location;
        this.type = pathname.replace('/', '');
    }

    fetch() {
        this.getDistruptionsPerMode();
        this.getClosestStations();
    }

    update() {
        this.fetch();
    }

    getDistruptions(resp) {
        if (resp) {
            this.disruptions = resp.map(item => ({
                type: item.categoryDescription,
                description: item.description,
                affectedRoutes: this.getAffectedRoutes(item.affectedRoutes),
            })
            );
        }
    }

    getDistruptionsPerMode = () => {
        service(`Line/Mode/${this.type}/Disruption`)
            .then(resp => this.getDistruptions(resp));
    };

    getAffectedRoutes = (routes) => {
        if (routes.length) {
            return routes.map(route => route.name);
        }
    };

    getClosestStations() {
        navigator.geolocation.getCurrentPosition(pos => {
            const { coords: { latitude, longitude} } = pos;
            service(`Place?type=NaptanMetroStation,NaptanRailStation&lat=${latitude}&lon=${longitude}&radius=800`)
                .then((resp) => this.onGetStations(resp));
        });

    }

    onGetStations = (resp) => {
        if (resp.places.length) {
            this.places = resp.places
                .filter(place => place.modes[0] === this.type)
                .slice(0, 5)
                .map(place => place.commonName)
        }
    };
}

export default ModePM;
