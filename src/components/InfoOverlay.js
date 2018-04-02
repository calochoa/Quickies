import React from 'react';
import { 
  View,
  Text,
} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import OverlayStyle from '../style/OverlayStyle';


class InfoOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: this.props.modalVisible,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <Overlay 
        visible={this.state.modalVisible}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(false);}}
      >
        <Text style={OverlayStyle.header}>Junior Quickies</Text>
        <View style={OverlayStyle.divider}/>
        <Text>Try these beginner level quickies if you are just starting to work out.</Text>
      </Overlay>
    );
  }
}


export default InfoOverlay;
