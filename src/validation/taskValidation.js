export const validateTitle = title => {
  return (title && title.trim().length >= 4)
};

export const validateDescription = description => {
  return (description && description.trim().length >= 5)
};

export const validateEstimation = estimation => {
  return (estimation && !isNaN(estimation) && estimation > 0)
};
