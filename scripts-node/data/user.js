'use strict';

import mongoose from 'mongoose';
import uuid from 'uuid';

export class User extends mongoose.Schema {
  constructor() {
    super({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, required: true },
      uId: { type: String, default: uuid.v1() }
    });
  }
}
