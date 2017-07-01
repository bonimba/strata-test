import { service } from '../service';
import { observable } from 'mobx';

class CycleHirePM {
    @observable bikePoints = [];
    @observable bikePointsHistory = [];

    onSearch = (search) => {
        // I could use the lodash throttle method here instead
        // just have to import lodash though
        // so for now I just return if less then a certain length
        if (search.length < 4) return;
        service(`/BikePoint/Search?query=${search}`)
            .then((resp) => this.onSearchSuccess(resp, search))
    };

    onSearchSuccess = (resp, search) => {
        const duplicate = this.bikePointsHistory.find(point => search.includes(point));
        if (duplicate) {
            this.bikePointsHistory.remove(duplicate);
        }
        const previous = this.bikePointsHistory.slice(0, 2);
        this.bikePointsHistory = previous.concat([search]);
        this.bikePoints = resp.map(point => point.commonName);

    };

    onSelect = (search) => {
        this.onSearch(search);
    }
}

export default CycleHirePM;