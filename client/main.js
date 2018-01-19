import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base'


//accounts config

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
	notes(){
		return Notes.find({});
	}
});

Template.add.events({
	'submit .add-form': function(){
		event.preventDefault();

		// get input values
		const target = event.target;
		const text = target.text.value;

		/*//insert note into coollection

		Notes.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username,
		});
		*/

		Meteor.call('notes.insert', text);

		//clear form

		target.text.value = '';

		//close modal

		$('#addModal').modal('close');

		return false; 
	}
});

Template.note.events({
	'click .delete-note': function(){
		Meteor.call('notes.remove', this);
		/*Notes.remove(this._id);*/
		return false;
	}
});




/*Template.body.helpers({
	notes:[
		{text:'My Note 1'},
		{text:'My Note 1'},
		{text:'My Note 1'}
	]
});*/