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
    const { toTask, fromTask } = this.props.arrow;
    const { markerId } = this.props;
    return <path d={`M ${ fromTask.x } ${ fromTask.y } L ${ toTask.x } ${ toTask.y }`}
      stroke="blue" strokeWidth="3" markerMid={`url(#${ markerId })`}/>;
  }
}

export default observer(Arrow);
