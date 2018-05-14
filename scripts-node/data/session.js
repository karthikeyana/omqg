'use strict';

const mongoose = require('mongoose');

export class SessionID extends mongoose.Schema {
  constructor() {
    super({
      user_uid: String,
      session_id: String
    });
  }
}
