import { RequestHeader } from "src/app/_core/model/request-header";

export class User {
  userId: string;
  email?: string;
  emailId: string;
  passCode: string;
  password: string;
  name?: string;
  header: RequestHeader;
  phoneNumber: string;
  otp: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  locale: string;
  loginType: string;
  primaryEmail: string;
  profileImageUrl: string;
  alternativeEmailId: string;
  primaryPhoneNumber: string;
  dateOfBirth: string;
  location: string;
  gender: string;
  maritalStatus: string;
  marriageDate: string;
  middleName: string;
  secondaryPhoneNumber: string;
  userSecret: string;

}
