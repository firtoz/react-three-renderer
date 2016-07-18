import React from 'react';
import React3 from '../../../';
import THREE from 'three';
import { storiesOf } from '@kadira/storybook';
import { nomargin, Viewer } from './_utils';

import SimpleExample from './Simple/index';
import ClothExample from './AnimationCloth/index';
import CameraExample from './WebGLCameraExample/index';
import GeometriesExample from './Geometries/index';
import GeometryShapesExample from './GeometryShapes/index';
import DraggableCubes from './DraggableCubes/index';
import Physics from './Physics/index';
import PhysicsMousePick from './Physics/mousePick';

const stories = storiesOf('Examples - webgl', module)
  .addDecorator(nomargin);

// ---

stories.add('Simple', function () {
  const child = (w, h) => <SimpleExample width={w} height={h} />;
  return <Viewer child={child} />;
});

stories.add('Cloth', function () {
  const child = (w, h) => <ClothExample width={w} height={h} />;
  return <Viewer child={child} />;
});

stories.add('Camera', function () {
  const child = (w, h) => <CameraExample width={w} height={h} />;
  return <Viewer child={child} />;
});

stories.add('Geometries', function () {
  const child = (w, h) => <GeometriesExample width={w} height={h} />;
  return <Viewer child={child} />;
});

stories.add('Geometry Shapes', function () {
  const child = (w, h) => <GeometryShapesExample width={w} height={h} />;
  return <Viewer child={child} />;
});

stories.add('Draggable Cubes', function () {
  const child = (w, h) => <DraggableCubes width={w} height={h} />;
  return <Viewer child={child} />;
});

stories.add('Physics', function () {
  const child = (w, h) => <Physics width={w} height={h} />;
  return <Viewer child={child} />;
});

stories.add('Physics - MousePick', function () {
  const child = (w, h) => <PhysicsMousePick width={w} height={h} />;
  return <Viewer child={child} />;
});
