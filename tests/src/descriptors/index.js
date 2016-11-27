module.exports = (type) => {
  require('./common')(type);
  require('./Texture')(type);
  require('./Resources')(type);
  require('./DirectionalLight')(type);
  require('./HemisphereLight')(type);
  require('./PointLight')(type);
  require('./ArrowHelper')(type);
  require('./Shapes')(type);
};
