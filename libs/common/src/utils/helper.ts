import * as otp from 'otp-generator';

export const getMongoUri = () => {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;

  let mongoUrl = '';
  if (process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD) {
    mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
    return mongoUrl;
  }
  mongoUrl = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
  // mongoUrl = `mongodb://localhost:27017/supsup`;
  return mongoUrl;
};

export function generateReferralCode(number: number) {
  console.log('Generating', otp);
  return otp?.generate(number, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });
}
export const generateOTP = (length: number) => {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export type ValueOf<T> = T[keyof T];

export const isStringEmpty = (string: string) => {
  if (
    string === '' ||
    string === null ||
    typeof string === 'undefined' ||
    string.length <= 0
  )
    return true;
  return false;
};

export const removeAllCharacterSpecial = (string: string) => {
  if (!isStringEmpty(string)) {
    let result = string.replace(/[^a-zA-Z0-9áàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]/g, ' ');
    result = result.replace(/\s+/g, ' ').trim();
    return result;
  }
  return string;
};
