import React, { Component } from 'react';
import { observer } from 'mobservable-react';

class Canvas extends Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  }

  constructor() {
    super();
    this._canvas = null;
  }

  render() {
    const { onClick, children } = this.props;

    return <div
      ref={node => {
        this._canvas = node;
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #ccc',
        width: 640,
        height: 480
      }}
      onClick={e => {
        if (e.metaKey || e.ctrlKey) {
          onClick({x: e.nativeEvent.layerX, y: e.nativeEvent.layerY});
        }
      }}
    >
      {children}
    </div>;
  }
}

export default observer(Canvas);
