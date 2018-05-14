'use strict';

import { Config } from '../util/config';
import { User } from './user';
import { SessionID } from './session';
import { Quiz } from './quiz';
import {
  USER_MODEL,
  QUIZ_MODEL,
  SESSION_MODEL
} from '../constants/model-constants';

import mongoose from 'mongoose';

export class ModelManager {
  constructor() {
    this.models = {};
    mongoose.Promise = global.Promise;
    mongoose.connect(Config.mongoURL);
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.initModels();
  }

  initModels() {
    this.addModel(USER_MODEL, User);
    this.addModel(QUIZ_MODEL, Quiz);
    this.addModel(SESSION_MODEL, SessionID);
  }

  addModel(name, schemaClass) {
    this.models[name] = mongoose.model(name, new schemaClass(this));
  }

  getModel(name) {
    return this.models[name];
  }
}

export const modelManager = new ModelManager();
