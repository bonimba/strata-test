import { observable } from 'mobx';
import { service } from './service';

class AppPM {
    @observable menuLinks = [{
        link: '/',
        name: 'Home',
    }];

    fetch() {
        service("Journey/Meta/Modes")
            .then(resp => (
                this.menuLinks = this.menuLinks.slice(0).concat(this.getTflServices(resp)))
            );
    }

    update() {
        this.fetch();
    }


   // --------- Utilities --------

    titleize = string => {
        if (!string) return '';
        const breakDown = string.split('-');
        const capitalized = breakDown.map(s => s.charAt(0).toUpperCase() + s.slice(1));
        return capitalized.join(' ');
    };

    getTflServices = (resp = []) => {
        return resp
            .filter(service => service.isTflService)
            .map(service => ({
                link: service.modeName,
                name: this.titleize(service.modeName) }));
    };
}

export default AppPM;