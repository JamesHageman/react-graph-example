import React, { Component } from 'react';
import { observer } from 'mobservable-react';

class Canvas extends Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    onClickAway: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  }

  constructor() {
    super();
  }

  render() {
    const { onClick, onClickAway, children } = this.props;

    return <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #ccc',
        height: 480
      }}
      onClick={e => {
        if (e.metaKey || e.altKey || e.shiftKey) {
          onClick({x: e.nativeEvent.layerX, y: e.nativeEvent.layerY}, e);
        } else {
          onClickAway(e);
        }
      }}
    >
      {children}
    </div>;
  }
}

export default observer(Canvas);
