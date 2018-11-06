import { Mongo } from 'meteor/mongo';
 
export const TasksCollection = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return TasksCollection.find();
  });
}

Meteor.methods({
  'tasks.insert'(task) {
	

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    TasksCollection.insert(task);
  },
  'tasks.remove'(taskId) {
    TasksCollection.remove(taskId);
  },
  'tasks.setChecked'(task) {
    TasksCollection.update(task.id, task);
  },
});