import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

configure({
  adapter: new Adapter(),
});

export default shallow;
