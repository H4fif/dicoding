const validateRequired = (value) => {
  try {
    if (typeof value === 'object') {
      return Object.keys(value).length;
    } else if (validateNumeric(value) || (value?.length > 0) || (typeof value === 'boolean')) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('an error occurred on validateRequired => ', error);
    return false;
  }
}

const validateNumeric = (value) => {
  try {
    if (value && (!isNaN(Number(value)) || typeof value === 'number')) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('an error occurred on validateNumeric => ', error);
    return false;
  }
}

module.exports = { validateRequired, validateNumeric };