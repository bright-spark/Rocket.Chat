Meteor.methods({
	'livechat:saveSurveyFeedback' (visitorToken, visitorRoom, formData) {
		check(visitorToken, String);
		check(visitorRoom, String);
		check(formData, [Match.ObjectIncluding({ name: String, value: String })]);

		console.log('[methods] livechat:saveSurveyFeedback -> '.green, 'arguments:', arguments);

		visitor = RocketChat.models.Users.getVisitorByToken(visitorToken);
		room = RocketChat.models.Rooms.findOneById(visitorRoom);

		if (visitor !== undefined && room !== undefined && room.v !== undefined && visitor.profile !== undefined && room.v.token === visitor.profile.token) {
			updateData = {};
			for (var item of formData) {
				if (_.contains(['satisfaction', 'agentKnowledge', 'agentResposiveness', 'agentFriendliness'], item.name) && _.contains(["1","2","3","4","5"], item.value)) {
					updateData[item.name] = item.value;
				} else if (item.name === 'additionalFeedback') {
					updateData[item.name] = item.value;
				}
			}
			if (!_.isEmpty(updateData)) {
				return RocketChat.models.Rooms.updateSurveyFeedbackById(room._id, updateData);
			}
		}
	}
});