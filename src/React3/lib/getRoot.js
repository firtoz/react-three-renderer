function getRoot(object) {
  const parentMarkup = object.userData.parentMarkup;
  if (parentMarkup) {
    return getRoot(parentMarkup.threeObject);
  }

  return object;
}

export default getRoot;
