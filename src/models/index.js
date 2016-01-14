import mongoose from 'mongoose';

export function instantiateModel(modelName, modelSchema){
  let result;
  if (!mongoose.models[modelName]){
    result = mongoose.model(modelName, modelSchema);
  } else {
    result = mongoose.model(modelName);
  }
  return result;
}
