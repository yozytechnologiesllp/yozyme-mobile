import React from "react";
import Text from 'react-native'

export default class MyInput extends React.Component {
    textChange(event) {
        this.props.textChange(this.props.name, event.target.value);
    }

    render() {
        return (
            <Text>
                <input
                    type="text"
                    name={this.props.name}
                    onChange={e => this.textChange(e)}
                    {...this.props}
                />
            </Text>
        );
    }
}