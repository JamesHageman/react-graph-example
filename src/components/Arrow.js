import React, {Component} from 'react';
import { observer } from 'mobservable-react';
import ArrowModel from '../models/Arrow.js';

const { instanceOf, string } = React.PropTypes;

class Arrow extends Component {
  static propTypes = {
    arrow: instanceOf(ArrowModel),
    markerId: string.isRequired
  }

  render() {
    const { to, from } = this.props.arrow;
    const { markerId } = this.props;
    return <path d={`M ${ from.x } ${ from.y } L ${ to.x } ${ to.y }`}
      stroke="blue" strokeWidth="3" markerEnd={`url(#${ markerId })`}/>;
  }
}

export default observer(Arrow);
