'use strict';

import mongoose from 'mongoose';

export class Quiz extends mongoose.Schema {
  constructor() {
    super({
      question: { type: String, required: true },
      answer: { type: String, required: true },
      options: { type: [{ val: String, text: String, _id: { id: false } }] }
    });
  }
}
