function React3ContainerInfo(topLevelWrapper, instance) {
  void(instance);

  const info = {
    _topLevelWrapper: topLevelWrapper,
    _idCounter: 1,
  };

  return info;
}

module.exports = React3ContainerInfo;
