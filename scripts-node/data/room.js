'use strict';

import mongoose from 'mongoose';
import DEFAULT_PLAYERS from '../constants/model-constants';

export class Quiz extends mongoose.Schema {
  constructor() {
    super({
      owner: { type: { userId: String, socketId: String } },
      connections: { type: [{ userId: String, socketId: String }] },
      isOpen: { type: Boolean, default: true },
      noOfPlayers: { type: Number, default: DEFAULT_PLAYERS },
      score: {
        type: [{ round: Number, answers: Object, _id: { id: false } }],
        default: [{ round: 0, answers: {} }]
      }
    });
  }
}
