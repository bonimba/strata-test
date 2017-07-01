import { observable } from 'mobx'

class HeaderPM {
    @observable selectedKeys = [];
    onClick = (e) => {
        const link = e.key;
        this.selectedKeys = [link];
    }
}

export default HeaderPM;