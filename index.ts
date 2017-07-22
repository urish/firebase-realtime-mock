import * as Firebase from 'firebase';

const referencePrototype = (Firebase.database as any).Reference.prototype;

const originalSet = referencePrototype.set;
referencePrototype.set = function (data: any, cb: (err: any) => void) {
	originalSet.call(this, data);
	if (cb) {
		cb(null);
	}
	return Promise.resolve(true);
};

const originalUpdate = referencePrototype.update;
referencePrototype.update = function (data: any, cb: (err: any) => void) {
	originalUpdate.call(this, data);
	if (cb) {
		cb(null);
	}
	return Promise.resolve(true);
};

const originalRemove = referencePrototype.remove;
referencePrototype.remove = function (cb: (err: any) => void) {
	originalRemove.call(this);
	if (cb) {
		cb(null);
	}
	return Promise.resolve(true);
};

let mockId = 0;
export function createMockFirebase() {
	const app = Firebase.initializeApp({ databaseURL: 'ws://fakeserver.firebaseio.test' }, `mock-${mockId++}`);
	app.database().goOffline();
	const mockFb = app.database().ref();
	mockFb.set(null);
	return mockFb;
}

export const ServerValue = Firebase.database.ServerValue;
