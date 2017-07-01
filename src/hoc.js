import React, { Component } from 'react';
import { observer } from 'mobx-react';

/**
 * Observer function / decorator
 */
export const presenter = (Presenter, View) => {
    if (Presenter && View) {
        const ViewComponent = observer(View);
        class WrappedView extends Component {
            constructor(props) {
                super(props);
                this.pm = new Presenter(this);
                this.view = View;
            }

            componentDidMount() {
                this.pm.fetch && this.pm.fetch();
            }

            componentWillReceiveProps(next) {
                this.pm.update && this.pm.update(next);
            }

            componentWillUnmount() {
                this.pm.dispose && this.pm.dispose();
            }

            render() {
                return (<ViewComponent
                    {...this.props}
                    pm={this.pm}
                />);
            }
        }
        return WrappedView;
    }
    console.log('pass Presenter and View');
};