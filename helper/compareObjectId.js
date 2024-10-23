import mongoose from "mongoose";

const objectId = mongoose.Types.ObjectId;
const compareObjectId = (objectIdOne, objectIdTwo) => {
	return objectId(objectIdTwo).equals(objectId(objectIdOne));
};

export default compareObjectId;
