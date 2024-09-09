export interface RegistrationForm {
  personalDetails: { name: string; dob: string; gender: string };
  addressDetails: { presentAddress: string; permanentAddress: string };
  educationDetails: [
    {
      qualification: string;
      board: string;
      yearOfPassing: string;
    }
  ];
  parentDetails: { fatherName: string; motherName: string; contact: string };
}
