export interface RegistrationForm {
  candidateName: string;
  fathersName: string;
  mothersName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
  confpassword: string;
  educationDetails: Array<{
    qualification: string;
    board: string;
    yearOfPassing: string;
  }>;
  image?: File | null;
}
