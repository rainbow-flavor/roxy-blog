import developConfig from './config.develop';
import prodConfig from './config.prod';

export default process.env.NODE_ENV === 'prod'
    ? { ...prodConfig }
    : { ...developConfig };
