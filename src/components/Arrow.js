import React, {Component} from 'react';
import { observer } from 'mobservable-react';
import ArrowModel from '../models/Arrow.js';

const { instanceOf } = React.PropTypes;

class Arrow extends Component {
  static propTypes = {
    arrow: instanceOf(ArrowModel)
  }

  render() {
    const {to, from} = this.props.arrow;
    return <path d={`M ${ from.x } ${ from.y } L ${ to.x } ${ to.y }`}
      stroke="blue" strokeWidth="3"/>;
  }
}

export default observer(Arrow);
