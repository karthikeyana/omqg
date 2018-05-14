'use strict';

import { Controller } from '../util/controller';
import { modelManager } from '../data/model-manager';
import {
  USER_MODEL,
  QUIZ_MODEL,
  SESSION_MODEL
} from '../constants/model-constants';

const uuid = require('node-uuid');

export class GameApi extends Controller {
  namespace() {
    return '/game';
  }

  routing() {
    return {
      '/create-user': 'createUser',
      '/login': 'login'
    };
  }

  get UserModel() {
    return modelManager.getModel(USER_MODEL);
  }

  get SessionModel() {
    return modelManager.getModel(SESSION_MODEL);
  }

  get QuizModel() {
    return modelManager.getModel(QUIZ_MODEL);
  }

  login(req, res) {
    let args = req.body;
    return this.UserModel.findOne(args)
      .exec()
      .then(user => {
        return this.saveSession(user.user_uid).then(data => {
          return {
            message: 'user login successfully',
            result: {
              account_number: user.user_uid,
              session_id: data.sid
            }
          };
        });
      });
  }

  createUser(req, res) {
    let args = req.body;
    return new this.UserModel(args).save().then(data => {
      return {
        message: 'user created successfully'
      };
    });
  }

  saveSession(userdata) {
    var suuid = uuid.v4();
    return this.SessionModel.findOne({ user_uid: userdata })
      .exec()
      .then(data => {
        if (data !== null) {
          return this.SessionModel.findOneAndUpdate(
            { user_uid: data.user_uid },
            { $set: { session_id: suuid } },
            { new: true }
          )
            .exec()
            .then(data => {
              return {
                sid: data.session_id
              };
            });
        } else {
          return new this.SessionModel({
            user_uid: userdata,
            session_id: suuid
          })
            .save()
            .then(data => {
              return {
                sid: data.session_id
              };
            });
        }
      });
  }
}
