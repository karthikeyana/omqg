'use strict';

import { GameApi } from './game-api';

export default function(app) {
  new GameApi(app);
}
